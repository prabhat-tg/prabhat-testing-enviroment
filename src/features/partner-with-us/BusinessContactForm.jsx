'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { postPartnerForm } from '@/src/services/partner/partner-service';
import TG_InputField from '@/src/components/ui/inputs/TG_InputField';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import {
  sendOtp,
  verifyOtp,
  watiMessageService,
} from '@/src/services/otp-and-wati/otp-and-wati-service';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const BusinessContactForm = ({ isMobile }) => {
  // --- State hooks ---
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    message: '',
    terms: true,
  });
  const [touchedFields, setTouchedFields] = useState({ number: false });
  const [otpSent, setOtpSent] = useState(false);
  const [lastOtpSentNumber, setLastOtpSentNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [localOtp, setLocalOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpError, setOtpError] = useState('');
  const [otpSuccessMsg, setOtpSuccessMsg] = useState('');
  const [userSuccessMsg, setUserSuccessMsg] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  // --- Timer logic ---
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // --- Handlers ---
  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    // —— Name validation (letters/spaces only, max 50 chars) ——
    if (name === 'name') {
      const sanitized = value.replace(/[^A-Za-z\s]/g, '').substring(0, 50);
      setFormData(prev => ({ ...prev, name: sanitized }));
      setErrors(prev => ({ ...prev, name: null }));
      return;
    }

    // —— Number validation + OTP logic ——
    if (name === 'number') {
      // Reset OTP state
      setIsVerified(false);
      setOtpSent(false);
      setLocalOtp('');
      setLastOtpSentNumber('');

      // Validate Indian mobile pattern (starts 6–9, up to 10 digits)
      if (/^[6-9]\d{0,9}$/.test(value)) {
        setFormData(prev => ({ ...prev, number: value }));
        setErrors(prev => ({ ...prev, number: null }));
      } else {
        setErrors(prev => ({
          ...prev,
          number: 'Please enter a valid 10-digit mobile number.',
        }));
      }
      return;
    }

    // —— Fallback for checkboxes & other fields ——
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear any residual errors/OTP messages
    setErrors(prev => ({ ...prev, [name]: null }));
    setOtpError('');
    setOtpSuccessMsg('');
  };

  // Validate on blur
  const handleBlur = e => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));

    if (name === 'number') {
      const valid = /^[6-9]\d{9}$/.test(value.trim());
      setErrors(prev => ({
        ...prev,
        number: valid ? null : 'Please enter a valid 10-digit mobile number.',
      }));
    }
  };

  const isMobileValid = /^[6-9]\d{9}$/.test(formData.number.trim());

  const handleGetOtp = async e => {
    e.preventDefault();
    setOtpError('');
    setOtpSuccessMsg('');
    try {
      const res = await sendOtp(formData.number);
      if (res?.text === 'Non_Verified_Exist') {
        setIsVerified(true);
        setOtpSuccessMsg('Mobile number already verified.');
        setOtpSent(false);
        setLocalOtp(res.primary_id);
        setLastOtpSentNumber(formData.number);
        return;
      }
      if (res?.enc_otp) {
        setOtpSuccessMsg('OTP sent successfully.');
        setOtpSent(true);
        setTimer(30);
        setIsResendEnabled(false);
        setLocalOtp(res.enc_otp);
        setLastOtpSentNumber(formData.number);
      } else {
        setOtpError('Failed to send OTP.');
      }
    } catch (err) {
      console.error('OTP send error:', err);
      setOtpError('Error sending OTP.');
    }
  };

  const handleVerifyOtp = async entered => {
    const code = (entered ?? otp).trim();
    if (code.length !== 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      return;
    }
    if (!localOtp) {
      setOtpError('OTP not received. Please resend.');
      return;
    }
    try {
      const res = await verifyOtp({
        otp: code,
        mobile: formData.number,
        main_id: localOtp,
      });
      if (res.message === 'valid_otp') {
        setIsVerified(true);
        setOtpSuccessMsg('OTP verified successfully. ');
        setOtpError('');
      } else {
        setOtpError('Invalid OTP. Try again.');
      }
    } catch (err) {
      console.error('OTP verify error:', err);
      setOtpError('Error verifying OTP.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.number.trim() || !isMobileValid) {
      newErrors.number = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    if (!formData.terms) newErrors.terms = 'You must accept the terms.';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    if (!isVerified) {
      setErrors(prev => ({
        ...prev,
        number: 'Please verify your mobile first.',
      }));
      return;
    }

    try {
      const payload = {
        name: formData.name,
        mobile_name: formData.number,
        email: formData.email,
        text: formData.message,
        type_id: isMobile ? 110 : 111,
        'user-message': 'Partner Contact Us',
        otp_type: 'form_submit_otp_send',
      };
      const resp = await postPartnerForm(payload);
      try {
        const res = await watiMessageService({
          mobile: formData.number,
          name: formData.name,
        });
        console.log('WhatsApp message API called successfully');
      } catch (whErr) {
        console.error('Error calling WhatsApp message API', whErr);
      }
      if (resp.status === 'success') {
        setOtpSuccessMsg('')
        setIsVerified(false)
        setUserSuccessMsg('Thank you! We will get back to you soon.');
        setShowThankYouPopup(true);
        setFormData({ name: '', number: '', email: '', message: '', terms: false });
        setTouchedFields({ number: false });
        setIsVerified(false);
        setOtp('');
        setLocalOtp('');
        setErrors({});
      } else {
        setUserSuccessMsg('Submission failed. Please try again later.');
        setIsVerified(false)
      }
    } catch (err) {
      console.error('Partner form submit error:', err);
      setUserSuccessMsg('Error submitting form.');
      setIsVerified(false)
    }
  };
  const PopupWrapper = ({ children }) => (
    <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
      <div className="container">{children}</div>
    </div>
  );
  return (
    <section id="business-contact-form">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="shadow-lg w-full rounded-2xl border border-gray-light bg-white md:max-w-[900px]">
            <div className="h-[131px] w-full md:h-[160px]">
              <Image
                src="https://images.tractorgyan.com/uploads/120106/687f82d685f3a-bussiness-banner-desktop.webp"
                alt="Business Contact Form"
                title="Business Contact Form"
                width={774}
                height={160}
                className="fill hidden h-full w-full md:block"
              />
              <Image
                src="https://images.tractorgyan.com/uploads/120107/687f8303418a6-bussiness-banner-mobile.webp"
                alt="Business Contact Form"
                title="Business Contact Form"
                width={200}
                height={200}
                className="fill h-full w-full md:hidden"
              />
            </div>
            <form onSubmit={handleSubmit} className="space-y-2 p-6 pt-4 md:px-8">
              <p className="text-sm text-gray-description md:text-base">
                Enter your comments through the form below, and our customer service professionals
                will contact you as soon as possible.
              </p>
              <div className="grid grid-cols-4 gap-x-4 gap-y-2 md:mb-4">
                <div className="col-span-6 md:col-span-2">
                  <TG_InputField
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    // required
                    label="Name"
                    error={errors.name}
                  />
                </div>
                <div className="col-span-6 md:col-span-2">
                  <div className="flex items-end gap-2">
                    <div className="relative w-full flex-grow">
                      <TG_InputField
                        id="number"
                        name="number"
                        type="tel"
                        placeholder="XXXXXXXXXX"
                        value={formData.number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={10}
                        label="Mobile"
                        error={errors.number}
                        prefix={
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
                            +91
                          </div>
                        }
                        inputClassName="pl-10" // Add padding for the prefix
                      />
                    </div>
                    {isMobileValid && !isVerified && (
                      <div className="mt-2 md:mt-6">
                        {formData.number === lastOtpSentNumber ? (
                          isResendEnabled ? (
                            <TG_Button
                              onClick={handleGetOtp}
                              variant="outline"
                              className="!h-[38px]"
                            >
                              Resend
                            </TG_Button>
                          ) : (
                            !otpSent && (
                              <TG_Button
                                variant="outline"
                                onClick={handleGetOtp}
                                disabled={!formData.number}
                                className="!h-[38px] text-nowrap"
                              >
                                Get OTP
                              </TG_Button>
                            )
                          )
                        ) : (
                          <TG_Button
                            onClick={handleGetOtp}
                            disabled={!formData.number}
                            variant="outline"
                            className="!h-[38px] text-nowrap"
                          >
                            Get OTP
                          </TG_Button>
                        )}
                      </div>
                    )}
                  </div>
                  {otpError && !otpSent && (
                    <span className="error-message mt-2 text-start">{otpError}</span>
                  )}
                  {otpSuccessMsg && otpSent && (
                    <span className="success-message text-end lg:mt-1">{otpSuccessMsg}</span>
                  )}
                  {isVerified && (
                    <span className="success-message"> Mobile verified successfully!</span>
                  )}
                </div>

                <div className="col-span-6 md:col-span-2 mt-[-20px]">
                  {otpSent && !isVerified && formData.number === lastOtpSentNumber && (
                    <span
                      className={`${otpError ? 'mt-4' : otpSuccessMsg ? 'mt-[-16px]' : 'mt-0'} relative`}
                    >
                      <label
                        htmlFor="otp"
                        className="mb-1 block text-[14px] font-semibold text-black"
                      >
                        OTP
                      </label>

                      <span className="verifyOtpBtnSpan">
                        <span className="viefyOtpWithTimer">
                          <input
                            type="tel"
                            id="otp"
                            name="otp"
                            // required
                            placeholder="Enter OTP"
                            value={otp}
                            maxLength="4"
                            onChange={e => {
                              const val = e.target.value.replace(/\D/g, '');
                              setOtpError(null);
                              if (val.length <= 4) {
                                setOtp(val);
                                if (val.length === 4) handleVerifyOtp(val);
                              }
                            }}
                            className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-4 text-sm text-black placeholder:text-gray-main focus:outline-none ${otpError ? 'error' : ''}`}
                          />
                          {!isResendEnabled && <span className="otpTimer block">{timer}s</span>}
                        </span>
                      </span>
                      {otpError && (
                        <span className="mt-1 text-xs font-medium text-error-main">{otpError}</span>
                      )}
                    </span>
                  )}
                </div>
              </div>

              <TG_InputField
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email here"
                value={formData.email}
                onChange={handleChange}
                // required
                label="Email"
                error={errors.email}
              />

              <TG_InputField
                id="message"
                name="message"
                type="textarea"
                isTextarea
                placeholder="Enter your message or query"
                value={formData.message}
                onChange={handleChange}
                // required
                label="Message"
                error={errors.message}
              />

              <div className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="text-blue-600 form-checkbox h-3.5 w-3.5"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <label htmlFor="terms" className="text-sm text-gray-dark">
                  By proceeding ahead you expressly agree to the TractorGyan{' '}
                  <Link
                    href={'https://tractorgyan.com/terms-of-use'}
                    className="ms-1 font-bold text-blue-link"
                  >
                    Terms and Condition
                  </Link>
                </label>
              </div>
              {errors.terms && <p className="error-message">{errors.terms}</p>}

              <TG_Button
                type="submit"
                // disabled={isSubmitting}
                icon={tgi_arrow_right_white}
                className="mx-auto flex w-full max-w-[283px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-lg text-white"
              >
                <span>Submit </span>
              </TG_Button>
            </form>
          </div>

          <div className="hidden md:block">
            <Image
              src="https://images.tractorgyan.com/uploads/120108/687f855d820a9-Partner-Form-Banner.webp"
              alt="Business Team Meeting"
              title="Business Team Meeting"
              width={386}
              height={645}
            />
          </div>
        </div>
      </div>
      {showThankYouPopup && (
        <PopupWrapper>
          <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[600px] md:px-4">
            <div className="flex flex-col items-center justify-center gap-2 overflow-auto">
              <Image
                src="https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp"
                height={100}
                width={100}
                title="success icon"
                alt="success icon"
                className="mx-auto my-2 flex max-w-[60px] md:my-4 md:max-w-[80px]"
              />
              <button
                className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                onClick={() => {
                  setShowThankYouPopup(false);
                }}
              >
                <Image
                  src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                  height={50}
                  width={50}
                  alt="close icon"
                  title="close icon"
                />
              </button>
              <div className="mb-4 text-center">
                <span className="text-sm text-gray-main md:text-2xl">
                  We’ve received your partnership inquiry and our team will review it shortly.
                </span>
              </div>
              <Link
                href="https://www.whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-2xl bg-green-lighter px-4 py-2.5 text-xs text-primary md:text-sm lg:text-base"
              >
                <Image
                  src="https://images.tractorgyan.com/uploads/117376/6780c85caf9ca-tractorgyan-whatsapp-icon.webp"
                  height={100}
                  width={100}
                  title="whatsapp icon"
                  alt="whatsapp icon"
                  className="h-full max-h-10 min-h-10 w-auto"
                />
                For more interesting content please join TractorGyan Channel.
              </Link>
            </div>
          </div>
        </PopupWrapper>
      )}
    </section>
  );
};

export default BusinessContactForm;
