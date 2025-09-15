'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TG_Button from '@/src/components/ui/buttons/MainButtons';
import { getApiUrl } from '@/src/utils/utils';
import { postData } from '@/src/services/apiMethods';

const CareerJobOpenings = ({ isMobile, translation, jobsData, jobListError }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [lastOtpSentNumber, setLastOtpSentNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccessMsg, SetOtpSuccessMsg] = useState(false);
  const [localOtp, setLocalOtp] = useState('');
  const [mainId, setMainId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [showOtpVerifiedMessage, setShowOtpVerifiedMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [timer, setTimer] = useState(30);
  const [touchedFields, setTouchedFields] = useState({
    number: false,
  });
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    mobile: '',
    resume: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const apiUrl = getApiUrl();
  const ChevronDownIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  if (jobListError) {
    return <span className="ms-6 pt-8">failed To fetch job Openings, please try again later</span>;
  }

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendEnabled(true);
    }

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const toggleSection = sectionId => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleApply = job => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplyNow = () => {
    setIsModalOpen(false);
    setIsFormModalOpen(true);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setOtpError(null);
    SetOtpSuccessMsg(null);

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setFormErrors(prev => ({
          ...prev,
          resume: 'Resume file size should not exceed 10MB',
        }));
        return;
      }

      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(file.type)) {
        setFormErrors(prev => ({
          ...prev,
          resume: 'Please upload a PDF or Word document',
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file,
      }));
      setFormErrors(prev => ({
        ...prev,
        resume: '',
      }));
    }
  };

  const handleGetOtp = async event => {
    event.preventDefault();
    setOtpError('');
    try {
      const res = await postData('/api/enquiry_sendotp', {
        mobile_name: formData.mobile,
        otp_type: 'send',
        get_otp_type: 'without_db',
      });

      if (res?.enc_otp) {
        const generatedOtp = res;
        if (generatedOtp) {
          SetOtpSuccessMsg(`${translation?.signin?.otpSentMobile}`);
          setShowVerifyMessage(false);
          setOtpSent(true);
          setTimer(30);
          setIsResendEnabled(false);
          setLocalOtp(generatedOtp?.enc_otp);
          setMainId('');
          setLastOtpSentNumber(formData.mobile);

          setFormErrors(prev => ({
            ...prev,
            mobile: null,
          }));
        } else {
          setOtpError(`${translation?.signin?.faildToGenerateOTP}`);
        }
      } else {
        setOtpError(
          `${res?.message == 'mobile_exists' && `${translation?.signin?.mobileIsAlreadyRegistered}`
          }` || `${translation?.signin?.faildToSentOTP}`
        );
        setOtpSent(false);
      }
    } catch (error) {
      setOtpError(`${translation?.signin?.errorOccurredOTP}`);
    }
  };

  const handleVerifyOtp = async (enteredValue = otp.trim()) => {
    const sanitizedOtp = enteredValue.replace(/\D/g, '');

    if (sanitizedOtp.length < 4) {
      setOtpError(`${translation?.signin?.enterOtp}`);
      SetOtpSuccessMsg('');
      return;
    }

    if (!localOtp) {
      setOtpError(`${translation?.signin?.otpNotRecived}`);
      SetOtpSuccessMsg('');
      return;
    }

    try {
      const res = await postData('/api/enquiry_verification_otp', {
        out: sanitizedOtp,
        mobile: formData.mobile,
        main_id: localOtp,
        keyup: `session_verify`,
      });

      if (res.message === 'valid_otp') {
        setIsVerified(true);
        setShowOtpVerifiedMessage(true);
        setOtpSent(false);
        setOtp('');
        setShowVerifyMessage(false);
        setTimer(0);
        setIsResendEnabled(false);

        SetOtpSuccessMsg(`${translation?.signin?.otpSuccessfullyVerified}`);
        setOtpError('');

        setTimeout(() => {
          setShowOtpVerifiedMessage(false);
        }, 3000);
      } else {
        setOtpError(`${translation?.signin?.otpIsValid}`);
        SetOtpSuccessMsg('');
      }
    } catch (error) {
      setOtpError(`${translation?.signin?.faildToGenerateOTP}`);
      SetOtpSuccessMsg('');
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.userName.trim()) {
      errors.userName = 'Name is required';
    }

    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.resume) {
      errors.resume = 'Please upload your resume';
    }

    return errors;
  };

  const isMobileValid = /^[6-9]\d{9}$/.test(formData.mobile.trim());

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!isVerified) {
      setFormErrors(prev => ({
        ...prev,
        mobile: 'please Verify your mobile number before submiting',
      }));
      return;
    }

    try {
      const payload = new FormData();
      payload.append('job_id', selectedJob.id);
      payload.append('name', formData.userName);
      payload.append('mobile', formData.mobile);
      payload.append('resume', formData.resume);

      const response = await fetch(`${apiUrl}/api/job_application_store`, {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      setFormData({
        userName: '',
        mobile: '',
        resume: null,
      });
      setFormErrors({});
      setIsFormModalOpen(false);
      setIsModalOpen(false);
      setShowSuccessPopup(true);
    } catch (errors) {
      console.error('somting went in job posting', errors);
      setFormErrors(prev => ({
        ...prev,
        resume: 'Something went wrong please try again later',
      }));
    }
  };

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsFormModalOpen(false);
    setShowSuccessPopup(false);
    setFormData({
      userName: '',
      mobile: '',
      resume: null,
    });
    setFormErrors({});
  };

  const validateMobile = number => {
    if (!number.trim()) return `${translation?.signin?.mobileIsRequired}`;
    if (!/^[6-9]\d{9}$/.test(number.trim())) return `${translation?.signin?.mobileIsValid}`;
    return null;
  };

  return (
    <>
      <div className="bg-blue-lightest pb-6 pt-6 md:pb-8 md:pt-6">
        <div className="container">
          <div className="lg:flex-cols-2 grid grid-cols-1 gap-8">
            <div className="shadow-sm rounded-lg bg-blue-lightest">
              {isMobile ? (
                <div className="mb-4 flex items-center justify-center">
                  <div>
                    <Image
                      src={`https://images.tractorgyan.com/uploads/120169/6880c005a8c1f-file-(6)-1.webp`}
                      alt={`Job Openings at TractorGyan`}
                      title={`Job Openings at TractorGyan`}
                      width={92}
                      height={92}
                      className="h-[60px] w-[60px] object-cover transition-opacity duration-500"
                    />
                  </div>
                  <div className="w-[75%] ps-2">
                    <h2 className="mb-1 text-lg font-bold leading-[21px] text-black md:text-2xl">
                      Job Openings at Tractor<span className="text-primary">Gyan</span>
                    </h2>
                    <p className="text-xs font-medium text-black md:text-base">
                      We're always looking for great folks to join us on our mission. If you want to
                      be a part of our story, apply today.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h2 className="text-md mb-2 font-bold text-black md:text-2xl">
                    Job Openings at Tractor<span className="text-primary">Gyan</span>
                  </h2>
                  <p className="text-sm font-medium text-black md:text-base">
                    We're always looking for great folks to join us on our mission. If you want to
                    be a part of our story, apply today.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {jobsData?.map(category =>
                  category.data?.length > 0 ? (
                    <div key={category.title} className="h-fit rounded-lg bg-white">
                      <button
                        onClick={() => toggleSection(category.title)}
                        className="hover:bg-gray-50 flex w-full items-center justify-between p-4 text-left transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-green-600 flex h-11 w-11 items-center justify-center rounded-[50%] bg-primary">
                            <Image
                              src={`https://images.tractorgyan.com/uploads${category.icon}`}
                              width={53}
                              height={52}
                              title={category.title}
                              alt={category.title}
                              className="h-[20px] w-[20px]"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-black">{category.title}</h3>
                            <p className="leading-sm text-[10px] font-medium text-black md:text-xs md:leading-relaxed">
                              {category.data.length} Positions
                            </p>
                          </div>
                        </div>
                        <div className="rounded-full p-1 text-black shadow-[1px_2px_2px_1px_#00000038]">
                          {openSections[category.id] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </div>
                      </button>

                      {openSections[category.title] && (
                        <div className="grid gap-4 rounded-xl bg-white px-4 pb-4 pt-0">
                          {category.data.map(job => (
                            <div key={job.id} className="rounded-xl bg-blue-lightest px-4 py-3">
                              <div className="grid gap-4 lg:flex lg:items-center lg:justify-between lg:gap-0">
                                <div className="flex-1">
                                  <h4 className="mb-0 text-lg font-bold text-black">{job.title}</h4>
                                  {(job?.experience || job.location) && (
                                    <p className="leading-sm text-[10px] font-medium md:text-xs md:leading-relaxed">
                                      Experience: {job.experience || null} | Location: {job.location || null}
                                    </p>
                                  )}
                                </div>
                                <TG_Button
                                  onClick={() => handleApply(job)}
                                  className="!rounded-full px-6"
                                >
                                  Apply
                                </TG_Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </div>

            {/* {!isMobile && (
              <>
                <div className="flex items-center justify-center">
                  <div className="relative h-96 overflow-hidden rounded-lg">
                    <Image
                      src={`https://images.tractorgyan.com/uploads/120094/687f7ab6721c0-file-(6)-1.webp`}
                      alt={`Job Openings at TractorGyan`}
                      title={`Job Openings at TractorGyan`}
                      width={450}
                      height={450}
                      className="h-full w-full object-cover transition-opacity duration-500"
                    />
                  </div>
                </div>
              </>
            )} */}
          </div>
        </div>

        {/* Job Details Modal */}
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-[5px]">
            <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white relative">
              <div className="flex items-center justify-between border-b border-primary p-6 py-4">
                <h2 className="text-xl font-bold text-black">{selectedJob.title}</h2>
                <button
                  onClick={closeAllModals}
                  className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                >
                  <Image
                    src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                    height={50}
                    width={50}
                    alt="close icon"
                    title="close icon"
                  />
                </button>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  Job Title - {selectedJob.title}
                </h3>
                {(selectedJob.experience || selectedJob.location) && (
                  <p className="mb-4 text-black">
                    Experience: {selectedJob.experience || null} | Location: {selectedJob.location || null}
                  </p>
                )}

                <div className="mb-6">
                  {/* <h4 className="mb-2 font-medium text-black">Job Description</h4> */}
                  <div
                    className="prose prose-sm max-w-none text-black"
                    dangerouslySetInnerHTML={{ __html: selectedJob.details }}
                  />
                  {/* <p className="leading-relaxed text-black">{selectedJob.details}</p> */}
                </div>

                <div className="flex space-x-4">
                  <TG_Button onClick={handleApplyNow} className="flex-1">
                    Apply Now
                  </TG_Button>
                  <TG_Button
                    type="button"
                    onClick={closeAllModals}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </TG_Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Application Form Modal */}
        {isFormModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-[5px]">
            <div className="max-h-[80vh] w-full max-w-lg overflow-hidden overflow-y-auto rounded-2xl rounded-lg bg-green-lighter shadow-main">
              <div className="flex items-center justify-between border-b border-primary p-6">
                <h2 className="text-xl font-bold text-black">Apply for {selectedJob.title}</h2>
                <button
                  onClick={closeAllModals}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <Image
                    src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                    height={50}
                    width={50}
                    alt="close icon"
                    title="close icon"
                  />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="col-span-3">
                  <label htmlFor="name" className="mb-0 block text-sm font-bold text-black">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      placeholder={'Enter Name'}
                      autoComplete="given-name"
                      className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                    />
                  </div>
                  {formErrors.userName && <p className="error_message">{formErrors.userName}</p>}
                </div>

                {/* <div className="col-span-3 mt-4">
                <label htmlFor="mobile" className="mb-0 block text-sm font-bold text-black">
                  Mobile Number
                </label>
                <div className="relative mt-1">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    placeholder=" xxxxxxxxxx"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    pattern="[6-9]{1}[0-9]{9}"
                    maxLength="10"
                    className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none"
                  />
                  <div className="absolute left-3 top-0 h-full py-2 text-sm font-bold leading-[22px] text-black">
                    <span>+91</span>
                  </div>
                </div>
                {formErrors.mobile && <p className="error_message">{formErrors.mobile}</p>}
              </div> */}

                <div className="mt-4 flex items-center justify-between">
                  <div
                    className={`relative col-span-6 hidden w-full md:col-span-2 md:block ${isMobileValid && !isVerified ? 'lg:w-[70%]' : 'w-full'}`}
                  >
                    <label
                      htmlFor="mobileNumber"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      Mobile Number
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        placeholder=" xxxxxxxxxx"
                        value={formData.mobile}
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, '');
                          handleInputChange({
                            target: {
                              name: 'mobile',
                              value: value,
                            },
                          });
                        }}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, number: true }))}
                        maxLength="10"
                        className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${formErrors.mobile ? 'error' : ''
                          }`}
                      />
                      <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                        <span>+91</span>
                      </div>
                    </div>
                    {(touchedFields.number || formErrors.mobile) && (
                      <p className="error_message absolute bottom-[-20px]">
                        {validateMobile(formData.mobile) || formErrors.mobile}
                      </p>
                    )}
                  </div>
                  {isMobileValid && !isVerified && (
                    <div className="mt-6 hidden w-fit md:block">
                      {formData.mobile === lastOtpSentNumber ? (
                        isResendEnabled ? (
                          <TG_Button onClick={handleGetOtp}>
                            {translation?.signInForm?.resend}
                          </TG_Button>
                        ) : (
                          !otpSent && (
                            <TG_Button onClick={handleGetOtp} disabled={!formData.mobile}>
                              {translation?.signInForm?.getOtp}
                            </TG_Button>
                          )
                        )
                      ) : (
                        <TG_Button onClick={handleGetOtp} disabled={!formData.mobile}>
                          {translation?.signInForm?.getOtp}
                        </TG_Button>
                      )}
                    </div>
                  )}
                </div>

                <div className="block flex w-full items-end gap-2 pt-2 md:hidden">
                  <div className="col-span-6 w-full md:col-span-2">
                    <label
                      htmlFor="mobileNumber"
                      className="mb-0 block text-sm font-bold text-black"
                    >
                      {translation?.signInForm?.mobileLabel}
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="tel"
                        id="number"
                        name="number"
                        placeholder=" xxxxxxxxxx"
                        value={formData.mobile}
                        onChange={e => {
                          const value = e.target.value.replace(/\D/g, '');
                          handleInputChange({
                            target: {
                              name: 'number',
                              value: value,
                            },
                          });
                        }}
                        onBlur={() => setTouchedFields(prev => ({ ...prev, number: true }))}
                        maxLength="10"
                        className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${formErrors.mobile ? 'error' : ''
                          }`}
                      />
                      <div className="full absolute left-3 top-0 py-2 text-sm font-bold leading-[22px] text-black">
                        <span>+91</span>
                      </div>
                    </div>
                    {(touchedFields.number || formErrors.mobile) && (
                      <p className="error_message">
                        {validateMobile(formData.mobile) || formErrors.mobile}
                      </p>
                    )}
                  </div>

                  {isMobileValid && !isVerified && (
                    <>
                      {formData.mobile === lastOtpSentNumber ? (
                        isResendEnabled ? (
                          <button
                            onClick={handleGetOtp}
                            className="whitespace-nowrap px-[10px] text-xs"
                          >
                            {translation?.signInForm?.resend}
                          </button>
                        ) : (
                          !otpSent && (
                            <button
                              onClick={handleGetOtp}
                              disabled={!formData.mobile}
                              className="text-green text-red whitespace-nowrap px-[10px] text-xs"
                            >
                              {translation?.signInForm?.getOtp}
                            </button>
                          )
                        )
                      ) : (
                        <button
                          onClick={handleGetOtp}
                          disabled={!formData.mobile}
                          className="text-green text-red whitespace-nowrap px-[10px] text-xs"
                        >
                          {translation?.signInForm?.getOtp}
                        </button>
                      )}
                    </>
                  )}
                </div>

                {otpError && !otpSent && (
                  <span className="error-message mt-2 text-start">{otpError}</span>
                )}
                {otpSuccessMsg && otpSent && (
                  <span className="success-message mt-[-7px] text-end lg:mt-1">
                    {otpSuccessMsg}
                  </span>
                )}

                {otpSent && !isVerified && formData.mobile === lastOtpSentNumber && (
                  <>
                    <span
                      className={`${otpError ? 'mt-4' : otpSuccessMsg ? 'mt-1' : 'mt-0'
                        } registerOtpSpan relative mt-4`}
                    >
                      <label htmlFor="otp" className="mb-0 block text-sm font-bold text-black">
                        {translation?.signInForm?.otpLabel}
                      </label>
                      {otpSent && !isResendEnabled && (
                        <span className="absolute right-0 text-end text-xs font-medium text-[#4682b4] md:hidden">
                          {timer}s
                        </span>
                      )}
                      <span className="verifyOtpBtnSpan">
                        <span className="viefyOtpWithTimer">
                          <input
                            type="tel"
                            id="otp"
                            name="otp"
                            required
                            placeholder={translation?.signInForm?.otpPlaceholder}
                            value={otp}
                            maxLength="4"
                            onChange={e => {
                              const enteredValue = e.target.value.replace(/\D/g, '');
                              setOtpError(null);
                              if (enteredValue.length <= 4) {
                                setOtp(enteredValue);
                                if (enteredValue.length === 4) {
                                  handleVerifyOtp(enteredValue);
                                }
                              }
                            }}
                            className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-10 text-sm text-black placeholder:text-gray-main focus:outline-none ${otpError ? 'error' : ''
                              }`}
                          />
                          {!isResendEnabled && (
                            <span className="otpTimer hidden md:block">{timer}s</span>
                          )}
                        </span>
                        {/* <button type="button" onClick={handleVerifyOtp}>
                  {"Verify"}
                </button> */}
                      </span>
                      {otpError && <span className="error-message">{otpError}</span>}
                    </span>
                  </>
                )}

                {showOtpVerifiedMessage && (
                  <span className="success-message">
                    {' '}
                    {`${translation?.signin?.otpSuccessfullyVerified}!`}
                  </span>
                )}
                {showVerifyMessage && (
                  <span className="error-message mt-1 text-start">
                    {translation?.signin?.verifyYourMobile}
                  </span>
                )}
                {showThankYouMessage && (
                  <span className="success-message">
                    {translation?.signin?.thanksForRegistration}
                  </span>
                )}

                <div className="mb-6 mt-4">
                  <label htmlFor="resume" className="mb-2 block text-sm font-bold text-black">
                    Upload Resume
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className={`h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 ps-2 text-sm text-black placeholder:text-gray-main focus:outline-none ${formErrors.resume ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  <p className="ms-2 mt-1 text-[12px] text-black">
                    Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX
                  </p>
                  {formErrors.resume && <p className="error_message">{formErrors.resume}</p>}
                </div>

                <div className="flex space-x-4">
                  <TG_Button type="submit" className="flex-1">
                    {isMobile ? `Submit` : `Submit Application`}
                  </TG_Button>
                  <TG_Button
                    type="button"
                    onClick={closeAllModals}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </TG_Button>
                </div>
              </form>
              <div className="mt-6">
                <Image
                  src={`https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp`}
                  width={532}
                  height={110}
                  title="Career Footer Img"
                  alt="Career Footer Img"
                  className="max-h-[110px] w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {showSuccessPopup && (
        <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
          <div className="container">
            <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[700px] md:px-4">
              <div className="flex flex-col items-center justify-center gap-2 overflow-auto">
                <Image
                  src="https://images.tractorgyan.com/uploads/113943/669c0b5d6481e-relatedSuccessIcon.webp"
                  height={100}
                  width={100}
                  title="success icon"
                  alt="success icon"
                  className="mx-auto flex max-w-[60px]"
                />
                <button
                  className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                  onClick={closeAllModals}
                >
                  <Image
                    src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                    height={50}
                    width={50}
                    alt="close icon"
                    title="close icon"
                  />
                </button>
                <div className="text-center grid">
                  <span className="md:text-md text-sm text-gray-main">
                    Your application has been submitted successfully!
                  </span>
                  <span className="md:text-md text-sm text-gray-main">
                    Our HR team will contact you soon. Thank you for your interest.
                  </span>
                </div>
                <Link
                  href="https://www.whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-2xl bg-green-lighter px-4 py-2.5 text-xs text-primary md:text-sm"
                >
                  <Image
                    src="https://images.tractorgyan.com/uploads/117376/6780c85caf9ca-tractorgyan-whatsapp-icon.webp"
                    height={100}
                    width={100}
                    title="youtube icon"
                    alt="youtube icon"
                    className="h-full max-h-10 min-h-10 w-auto"
                  />
                  {translation?.suggestedPopup.mainParaRForWhatsappJoin}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CareerJobOpenings;
