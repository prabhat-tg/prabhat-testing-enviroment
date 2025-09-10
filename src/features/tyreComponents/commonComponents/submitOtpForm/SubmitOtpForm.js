import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { getApiUrl } from '@/src/utils/utils';
import { postData } from '@/src/services/apiMethods';
import { handleOtpInputChange } from '@/src/utils';
import SuccessPopup from '@/src/features/tyreComponents/components/tyreRatingAndReviews/SuccessPopup';

// Popup Wrapper for overlays
const PopupWrapper = ({ children }) => (
  <div className="fixed left-0 right-0 top-0 z-30 flex h-full w-full items-center justify-center bg-gray-popup bg-opacity-45">
    <div className="container">{children}</div>
  </div>
);

// Dealer Info Block
const DealerInfo = ({ dealerContactName, dealerMobile, maskMobile }) => (
  <div className="mx-auto my-2 flex flex-col items-start justify-center rounded-lg border-[1px] border-primary bg-white px-8 py-1 text-sm text-primary">
    <div className="flex items-center pb-2">
      <span className="text-gray-500 text-xs">Dealer Name:</span>
      <span className="text-gray-900 ps-2 text-base font-semibold">{dealerContactName}</span>
    </div>
    <div className="flex items-center">
      <span className="text-gray-500 text-xs">Mobile Number:</span>
      <span className="text-gray-900 ps-2 text-base font-semibold">
        {maskMobile ? maskMobile(dealerMobile) : dealerMobile}
      </span>
    </div>
  </div>
);

// WhatsApp Channel Link
const WhatsappChannel = ({ translation }) => (
  <Link
    href="https://www.whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"
    target="_blank"
    className="inline-flex items-center gap-2 rounded-2xl bg-green-lighter px-4 py-2.5 text-xs text-primary md:text-sm"
  >
    <Image
      src="https://images.tractorgyan.com/uploads/117376/6780c85caf9ca-tractorgyan-whatsapp-icon.webp"
      height={100}
      width={100}
      title="whatsapp icon"
      alt="whatsapp icon"
      className="h-full max-h-10 min-h-10 w-auto"
    />
    {translation?.suggestedPopup.mainParaRForWhatsappJoin}
  </Link>
);

const SubmitOtpForm = ({
  translation,
  isMobile,
  primaryId,
  onClose,
  mobile,
  // selectedType, // Replaced by enquiryType for clarity of main enquiry context
  bradn_name,
  selectedModel,
  product_id,
  state,
  district,
  tehsil,
  name,
  dealerMobile,
  dealerContactName,
  successDealerFormShow,
  setSuccessDealerFormShow,
  setIsCloseAfterSubmit,
  existVerified,
  closeEnquryPopup,
  // New props from WhatsAppTopButton for generalization
  productNameSingular,
  productNamePlural,
  enquiryType, // This will determine the main context ('Tyre', 'Tractor', 'Dealer', 'Insurance')
  currentLang,
}) => {
  // State
  const [otpTimer, setOtpTimer] = useState(20);
  const [localMobile, setLocalMobile] = useState(mobile || '');
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState();
  const [showSuggestedPopup, setShowSuggestedPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(true);
  const [suggestedProducts, setSuggestedProducts] = useState([]); // Renamed from suggestedTyres
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [priceRange, setPriceRange] = useState('');
  const [showEnquiryLimitPopup, setShowEnquiryLimitPopup] = useState(false); // New state for enquiry limit
  const [showInsuranceSuccess, setShowInsuranceSuccess] = useState(false); // New state for insurance success
  const [isOtpSkipped, setIsOtpSkipped] = useState(false); // New state to track if OTP was skipped
  const apiUrl = getApiUrl();
  // State for Interest OTP flow
  const [showInterestOtpForm, setShowInterestOtpForm] = useState(false);
  const [interestOtpData, setInterestOtpData] = useState({
    product: null,
    primaryId: null,
    generatedOtp: '', // To store OTP for this specific flow
  });
  const [enteredInterestOtp, setEnteredInterestOtp] = useState('');
  const [interestOtpTimer, setInterestOtpTimer] = useState(20);
  const [showInterestResendButton, setShowInterestResendButton] = useState(false);
  const [interestOtpError, setInterestOtpError] = useState('');
  const [interestSubmittedProductId, setInterestSubmittedProductId] = useState(null); // New state
  const [isInterestOtpFlow, setIsInterestOtpFlow] = useState(false);
  // Helpers
  const formatPrice = price => {
    if (
      price === null ||
      price === undefined ||
      String(price).trim() === '' ||
      String(price).toLowerCase() === 'na'
    ) {
      return 'Price Details Coming Soon';
    }
    const [value, unit] = String(price).split(/(lakh|crore)/i);
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) {
      return String(price); // Return original if not a parsable number part
    }
    const formattedNum = num.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
      // minimumFractionDigits: 2, // Uncomment if you always want two decimal places
    });
    return `₹ ${formattedNum}${unit ? ' ' + unit : ''}`;
  };

  const maskMobile = m => {
    if (!m || m.length < 2) return m; // Return as is if too short to mask
    if (m.length <= 2) return m[0] + 'x'; // e.g. 9x if length is 2
    // Show first and last, replace middle with 'x's
    return m[0] + 'x'.repeat(m.length - 2) + m[m.length - 1];
  };

  const maskOneWords = str => {
    if (!str || typeof str !== 'string') return str;
    if (str === 'Price Details Coming Soon') return str;

    // This regex will find sequences of digits, possibly with commas.
    // It will then apply masking to each found number.
    return str.replace(/(\d[\d,]*\d|\d)/g, match => {
      // Remove commas for length calculation and masking logic, but remember their positions later if needed (complex)
      // For simplicity now, we'll re-format after masking the core number.
      const numericValue = match.replace(/,/g, '');
      if (numericValue.length < 2) return numericValue; // if single digit, no masking
      if (numericValue.length === 2) return numericValue[0] + 'x';

      const maskedCore =
        numericValue[0] +
        'x'.repeat(numericValue.length - 2) +
        numericValue[numericValue.length - 1];

      // Attempt to re-apply comma formatting to the masked version.
      // This is tricky because 'x' is not a digit.
      // A simpler approach for now: if original had commas, the masked version might look odd if we just put x's.
      // Example: 1,23,456 -> 1,xx,xx6.
      // Let's try to put x's and then re-evaluate comma strategy if it looks bad.
      // The current formatPrice function expects a number, not a masked string.
      // So, we'll just return the maskedCore, and the surrounding symbols (like ₹, -) will be preserved by .replace()

      // Let's refine: the goal is to replace digits, not commas.
      // Mask digits within the number, keeping original commas.
      let digitsOnly = '';
      let structure = '';
      for (let char of match) {
        if (/\d/.test(char)) {
          digitsOnly += char;
          structure += 'D'; // Placeholder for digit
        } else {
          structure += char; // Keep comma
        }
      }

      if (digitsOnly.length < 2) return match; // Not enough digits to mask
      let maskedDigits;
      if (digitsOnly.length === 2) {
        maskedDigits = digitsOnly[0] + 'x';
      } else {
        maskedDigits =
          digitsOnly[0] + 'x'.repeat(digitsOnly.length - 2) + digitsOnly[digitsOnly.length - 1];
      }

      // Reconstruct the number with original commas and masked digits
      let result = '';
      let digitIdx = 0;
      for (let sChar of structure) {
        if (sChar === 'D') {
          result += maskedDigits[digitIdx++];
        } else {
          result += sChar;
        }
      }
      return result;
    });
  };

  const formatTime = time =>
    `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;

  useEffect(() => {
    setShowOTPPopup(true);
  }, [primaryId]);

  // OTP Timer
  useEffect(() => {
    if (!showOTPPopup || otpTimer <= 0) return;
    const timer = setInterval(() => setOtpTimer(t => t - 1), 1000);
    if (otpTimer === 1) setShowResendButton(true);
    return () => clearInterval(timer);
  }, [showOTPPopup, otpTimer]);

  // Timer for Interest OTP
  useEffect(() => {
    if (!showInterestOtpForm || interestOtpTimer <= 0) {
      if (interestOtpTimer <= 0) setShowInterestResendButton(true);
      return;
    }
    const timer = setInterval(() => setInterestOtpTimer(t => t - 1), 1000);
    if (interestOtpTimer === 1) setShowInterestResendButton(true); // Show immediately if timer is 1
    return () => clearInterval(timer);
  }, [showInterestOtpForm, interestOtpTimer]);

  // Fetch suggested products if already verified
  useEffect(() => {
    // if (!otp && existVerified === "exist_verified") {
    //   setShowEnquiryLimitPopup(true);
    //   setShowOTPPopup(false);
    //   setShowSuggestedPopup(false);
    // } else
    if (existVerified === 'exist_verified') {
      fetchSuggestedProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existVerified]); // Added otp to dependency array

  useEffect(() => {
    // Reset OTP UI and related states when a new enquiry is started
    // Also ensure enquiry limit popup is reset if conditions change
    if (existVerified !== 'exist_verified') {
      setShowEnquiryLimitPopup(false);
    }

    if (!isInterestOtpFlow) {
      setShowOTPPopup(true); // Default to showing OTP unless conditions above hide it
      setShowSuggestedPopup(false);
      setEnteredOtp('');
      setOtpTimer(20);
      setShowResendButton(false);
      // setIsOtpVerified(false);
      setSuccessDealerFormShow?.('no'); // Always reset to "no"

      // Also reset interest OTP form if it was open
      setShowInterestOtpForm(false);
      setInterestOtpError('');
      setEnteredInterestOtp('');

      // If the new condition for enquiry limit is met, ensure other popups are hidden.
      if (existVerified === 'exist_verified' || existVerified === 'Exist_Verified') {
        setShowEnquiryLimitPopup(true);
        setShowOTPPopup(false);
        setShowSuggestedPopup(false);
      }
    }
  }, [primaryId, product_id, bradn_name, existVerified, isInterestOtpFlow]);

  // API Calls
  const verifyOtp = e => {
    e.preventDefault();
    if (!primaryId) return alert('OTP or request ID missing.');
    postData(`api/enquiry_otp_verify`, {
      otp: enteredOtp,
      primary_id: primaryId,
    })
      .then(res => {
        if (res.success) {
          if (enquiryType == 'Dealer')
            setSuccessDealerFormShow?.('yes');
          setIsCloseAfterSubmit?.(false);
          setIsOtpVerified(
            ['verified', 'exist_verified', 'inserted', 'Inserted'].includes(res.data.text)
          );
          setShowOTPPopup(false);

          // Handle insurance enquiry success
          if (enquiryType === 'Insurance') {
            setShowInsuranceSuccess(true);
          } else if (enquiryType === 'Dealership') {
            // For dealership enquiries, call onClose to trigger success popup
            onClose?.();
          } else {
            fetchSuggestedProducts(!dealerContactName); // Call renamed function for other types
          }
        } else {
          alert('Failed to verify OTP. Please try again.');
          setIsOtpVerified(false);
        }
      })
      .catch(() => {
        alert('Error verifying OTP.');
        setIsOtpVerified(false);
      });
  };

  const handleResendOtp = () => {
    if (!localMobile || !primaryId) return alert('Mobile or request ID missing.');
    postData(`api/enquiry_otp_resend`, {
      mobile: localMobile,
      primary_id: primaryId,
    })
      .then(res => {
        if (res.success) {
          setGeneratedOtp(res.data.otp);
          setOtpTimer(20);
          setShowResendButton(false);
        } else alert('Failed to resend OTP.');
      })
      .catch(() => alert('Error resending OTP.'));
  };

  const fetchSuggestedProducts = () => {
    // Renamed and logic updated
    if (dealerContactName || !enquiryType || enquiryType === 'Insurance') return; // Don't fetch for dealers, insurance, or if enquiryType is not set

    let endpoint = '';
    if (enquiryType === 'Tractor') {
      endpoint = `api/suggested_tractor`;
    } else if (enquiryType === 'Tyre') {
      endpoint = `api/suggested_tyre`;
    } else {
      return; // Do not fetch for other types like 'Dealer' or 'Insurance'
    }
    console.log('sgg : ', dealerContactName, enquiryType);

    postData(endpoint, {
      product_id, // This might be specific to the main product, ensure API handles it
      brand_name: bradn_name, // This might be specific to the main product
      otp_verify: existVerified,
    })
      .then(res => {
        console.log('sgg : ', res);

        if (res.success) {
          let mainProductPriceDisplay = 'Price Details Coming Soon';
          if (res.enquiry_data) {
            if (res.enquiry_data.price && String(res.enquiry_data.price).toLowerCase() !== 'na') {
              mainProductPriceDisplay = formatPrice(res.enquiry_data.price);
            } else if (
              res.enquiry_data.price_range &&
              String(res.enquiry_data.price_range).toLowerCase() !== 'na'
            ) {
              const rangeString = String(res.enquiry_data.price_range);
              const parts = rangeString.split('-');
              if (parts.length === 2) {
                const part1 = parts[0].trim();
                const part2 = parts[1].trim();
                // Ensure parts are not "NA" before formatting to avoid "₹ NA"
                const formattedPart1 =
                  String(part1).toLowerCase() === 'na' ? part1 : formatPrice(part1);
                const formattedPart2 =
                  String(part2).toLowerCase() === 'na' ? part2 : formatPrice(part2);
                mainProductPriceDisplay = `${formattedPart1} - ${formattedPart2}`;
              } else {
                mainProductPriceDisplay = formatPrice(rangeString);
              }
            }
          }
          // The API seems to also return res.price_range directly sometimes.
          // We prioritize enquiry_data.price_range if available, then res.price_range
          if (
            mainProductPriceDisplay === 'Price Details Coming Soon' &&
            res.price_range &&
            String(res.price_range).toLowerCase() !== 'na'
          ) {
            const rangeString = String(res.price_range);
            const parts = rangeString.split('-');
            if (parts.length === 2) {
              const part1 = parts[0].trim();
              const part2 = parts[1].trim();
              const formattedPart1 =
                String(part1).toLowerCase() === 'na' ? part1 : formatPrice(part1);
              const formattedPart2 =
                String(part2).toLowerCase() === 'na' ? part2 : formatPrice(part2);
              mainProductPriceDisplay = `${formattedPart1} - ${formattedPart2}`;
            } else {
              mainProductPriceDisplay = formatPrice(rangeString);
            }
          }

          console.log('price range : ', mainProductPriceDisplay, isOtpVerified);

          const formattedSuggestedProducts = (res.data || []).map(product => {
            let displayPrice = 'Price Details Coming Soon';
            if (product.price && String(product.price).toLowerCase() !== 'na') {
              displayPrice = formatPrice(product.price);
            } else if (product.price_range && String(product.price_range).toLowerCase() !== 'na') {
              const rangeString = String(product.price_range);
              const parts = rangeString.split('-');
              if (parts.length === 2) {
                const part1 = parts[0].trim();
                const part2 = parts[1].trim();
                const formattedPart1 =
                  String(part1).toLowerCase() === 'na' ? part1 : formatPrice(part1);
                const formattedPart2 =
                  String(part2).toLowerCase() === 'na' ? part2 : formatPrice(part2);
                displayPrice = `${formattedPart1} - ${formattedPart2}`;
              } else {
                displayPrice = formatPrice(rangeString);
              }
            }
            return { ...product, displayPrice }; // Add a new field for the formatted price
          });

          setSuggestedProducts(formattedSuggestedProducts);
          setShowSuggestedPopup(true);
          setPriceRange(mainProductPriceDisplay); // Store the formatted price range
        } else {
          console.error(`Failed to fetch suggested ${enquiryType}s:`, res.message);
          setSuggestedProducts([]);
        }
      })
      .catch(err => {
        console.error(`Error fetching suggested ${enquiryType}s:`, err);
        setSuggestedProducts([]);
      });
  };

  // UI Handlers
  const handleEditMobile = () => setIsEditingMobile(true);
  const handleSaveMobile = () => {
    setIsEditingMobile(false);
    handleResendOtp();
  };
  const handleCancelEdit = () => setIsEditingMobile(false);
  const handleGetPrice = () => {
    setShowOTPPopup(true);
    setShowSuggestedPopup(false);
    setSuccessDealerFormShow?.('no');
  };
  const skipOtpVerification = () => {
    setShowOTPPopup(false);

    // Handle insurance enquiry success when skipping OTP
    if (enquiryType === 'Insurance') {
      setIsOtpSkipped(true);
      setShowInsuranceSuccess(true);
    } else if (enquiryType === 'Dealership') {
      setIsOtpSkipped(true);
      onClose?.();
    } else {
      if (!dealerContactName) fetchSuggestedProducts(); // Call renamed function for other types
    }

    setSuccessDealerFormShow?.('skipVerification');
  };
  const verifyOtpForPrice = () => {
    handleResendOtp();
    setShowSuggestedPopup(false);
    setShowOTPPopup(true);
  };
  const handleInterestClick = product => {
    // Renamed 'tyre' to 'product'
    // Assuming 'product' has a 'product_category' field ('tyre' or 'tractor')
    // and 'brand_name', 'model' fields.
    // Also assuming 'product.id' is the product_id for the suggested item.

    let typeIdForSuggested;
    let payloadProductType;

    // Determine typeIdForSuggested based on enquiryType and product.product_category
    if (enquiryType === 'Tyre') {
      // Rule 2: If form is for tyre, and suggested product is also tyre (or not explicitly tractor)
      // (Original logic for this case was already 108/109, which matches the requirement)
      if (product.product_category === 'tractor') {
        typeIdForSuggested = isMobile ? 81 : 82;
        payloadProductType = product.product_category || 'Tyre'; // Fallback to Tyre if category is missing
      } else {
        // Suggested product is tyre (or other)
        typeIdForSuggested = isMobile ? 108 : 109;
        payloadProductType = product.product_category || 'Tyre';
      }
    } else if (enquiryType === 'Tractor') {
      // Rule 4: If form is for tractor, but enquiry through suggested product (tractor)
      // then Tyre Mobile = 104 & desktop 103.
      if (product.product_category === 'tractor') {
        typeIdForSuggested = isMobile ? 81 : 82;
        payloadProductType = 'Tractor'; // The suggested product is still a tractor
      } else {
        typeIdForSuggested = isMobile ? 81 : 82;
        payloadProductType = product.product_category || 'Tyre';
      }
    } else {
      // Default fallback if enquiryType is neither Tyre nor Tractor (e.g., Dealer or undefined)
      // Using the original logic as a base for this fallback.
      if (product.product_category === 'tractor') {
        typeIdForSuggested = isMobile ? 81 : 82; // Original suggested tractor IDs
        payloadProductType = 'Tractor';
      } else {
        typeIdForSuggested = isMobile ? 108 : 109; // Original suggested tyre IDs
        payloadProductType = product.product_category || 'Tyre';
      }
    }

    postData(`api/whatsapp_popup_enquiry`, {
      name,
      mobile: localMobile,
      type: payloadProductType, // Type of the suggested product
      brand: product.brand_name || product.brand,
      model: product.model,
      state, // User's state
      district, // User's district
      tehsil, // User's tehsil
      primary_id: primaryId, // ID of the original enquiry
      page_source: window.location.href, // Send current page URL
      type_id: typeIdForSuggested,
      product_id: product.id, // ID of the suggested product itself
      verified_flag: isOtpVerified ? 'Verified' : 'Non_Verified', // Main OTP verification status
    })
      .then(res => {
        console.log('Interest submission response:', res);

        if (res.success) {
          setInterestSubmittedProductId(product.id); // Mark as submitted for this product
          return;
        } else {
          // Handle failure to submit interest
          setInterestOtpError(res.data.message || 'Failed to submit interest. Please try again.');
        }

        // if (res.success && res.data.text === 'non_verified_exist') {
        //   setInterestOtpData({
        //     product: product,
        //     primaryId: res.data.primary_id,
        //     generatedOtp: res.data?.otp, // Store the OTP for this interest verification
        //   });
        //   // setGeneratedOtp(res.data.otp); // Optionally update main generatedOtp if UI needs it, but interestOtpData.generatedOtp is primary
        //   setEnteredInterestOtp('');
        //   setInterestOtpTimer(20);
        //   setShowInterestResendButton(false);
        //   setInterestOtpError('');
        //   setShowInterestOtpForm(true);
        //   // setShowSuggestedPopup(false); // Hide suggested products popup
        //   // setIsInterestOtpFlow(true);
        // } else if (res.success && isOtpVerified) {
        //   // OTP is already verified, and interest submission was successful
        //   setInterestSubmittedProductId(product.id); // Mark as submitted for this product
        //   // Optionally, you might want to keep the suggested popup open or close it:
        //   // setShowSuggestedPopup(false);
        //   // closeEnquryPopup();
        //   // onClose();
        // } else if (res.success) {
        //   // Handle normal success for non-verified users where OTP flow didn't trigger (e.g. direct insert)
        //   // This case might need specific handling based on exact API behavior for "success" without "non_verified_exist"
        //   // For now, treating it as a general success, perhaps also close or show a generic message.
        //   console.log('Interest submitted (non-OTP flow or other success):', res.data.message);
        //   // Potentially set a generic success message or close popups.
        //   // To simply close everything:
        //   // closeEnquryPopup();
        //   // onClose();
        // }
      })
      .catch(err => {
        console.error('Error submitting interest:', err);
        setInterestOtpError('An error occurred while submitting interest.');
      });
  };

  const verifyInterestOtp = async e => {
    e.preventDefault();
    setInterestOtpError('');
    if (!interestOtpData.primaryId || !enteredInterestOtp) {
      setInterestOtpError('Missing OTP or request data.');
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/api/enquiry_otp_verify`, {
        otp: enteredInterestOtp,
        primary_id: interestOtpData.primaryId,
      });
      console.log('Interest OTP verification response:', res);

      if (res.data.success) {
        setShowInterestOtpForm(false);
        // Show a success message
        const successMessage =
          enquiryType === 'Tractor'
            ? 'Tractor interest successfully verified and submitted!'
            : 'Interest successfully verified and submitted!';
        alert(successMessage); // Placeholder for better UI notification
        closeEnquryPopup(); // Close main enquiry form
        onClose(); // Close OTP form wrapper (SubmitOtpForm itself)
      } else {
        setInterestOtpError(res.data.message || 'Failed to verify OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying interest OTP:', error);
      setInterestOtpError('An error occurred during OTP verification.');
    }
  };

  const handleResendInterestOtp = async () => {
    setInterestOtpError('');
    if (!localMobile || !interestOtpData.primaryId) {
      setInterestOtpError('Cannot resend OTP without mobile number or request ID.');
      return;
    }
    try {
      const res = await axios.post(`${apiUrl}/api/enquiry_otp_resend`, {
        mobile: localMobile,
        primary_id: interestOtpData.primaryId,
      });
      if (res.data.success) {
        setInterestOtpData(prev => ({
          ...prev,
          generatedOtp: res.data.data.otp,
        }));
        // setGeneratedOtp(res.data.data.otp); // Again, if main OTP display needs update
        setInterestOtpTimer(20);
        setShowInterestResendButton(false);
      } else {
        setInterestOtpError(res.data.message || 'Failed to resend OTP.');
      }
    } catch (error) {
      console.error('Error resending interest OTP:', error);
      setInterestOtpError('An error occurred while resending OTP.');
    }
  };

  // Main Render
  return (
    <>
      {/* Main OTP Popup (for initial enquiry) */}
      {(existVerified === 'non_verified_exist' ||
        existVerified === 'Non_Verified_Exist' ||
        existVerified == 'inserted' ||
        existVerified == 'Inserted') &&
        showOTPPopup && (
          <PopupWrapper>
            <div className="mx-auto mt-10 w-full max-w-[450px] overflow-hidden rounded-xl bg-green-lighter shadow-main md:mt-4">
              <div className="relative p-4 md:p-4 md:pt-3">
                <div className="mb-5 flex items-center justify-between">
                  <div className="h-[44px] w-full max-w-[180px]">
                    <Image
                      src="https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp"
                      alt="tractorGyan logo"
                      title="tractorGyan logo"
                      height={52}
                      width={245}
                      className="h-auto w-full"
                    />
                  </div>
                  <button
                    className="flex items-center justify-center gap-2 rounded-md bg-primary px-2 py-1 text-base text-white"
                    onClick={skipOtpVerification}
                  >
                    <span>{translation?.whatsappPopup.skip}</span>
                  </button>
                </div>
                <div className="mx-auto max-w-[350px]">
                  <div className="mb-3 text-center text-xl font-bold text-black">
                    <span className="border-b-2 border-b-secondary pb-1">
                      {translation?.whatsappPopup.EnterOTP}
                    </span>
                  </div>
                  <div className="mb-2 text-center text-sm font-normal text-gray-main">
                    <span>
                      {translation?.whatsappPopup?.otpMessagePrefix ||
                        'Please enter the OTP sent to your mobile number'}
                      {/* TODO */}
                      {/* {' '}
                      {productNameSingular || 'your enquiry'}{' '}
                      {translation?.whatsappPopup?.priceText || 'price'}. */}
                    </span>
                  </div>
                  <form className="mb-6 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2">
                    <div className="col-span-6">
                      {isEditingMobile ? (
                        <>
                          <label className="mb-0 block text-sm font-semibold text-black">
                            {translation?.whatsappPopup.EditNumber}
                          </label>
                          <div className="mt-1 flex gap-2">
                            <input
                              type="text"
                              value={localMobile}
                              onChange={e => setLocalMobile(e.target.value)}
                              className="h-[38px] w-full max-w-[220px] rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={handleSaveMobile}
                                className="rounded-md bg-primary px-2 py-2 text-sm text-white"
                              >
                                <span>{translation?.whatsappPopup.save}</span>
                              </button>
                              <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="rounded-md bg-red-danger px-2 py-1.5 text-sm text-white"
                              >
                                <span>{translation?.whatsappPopup.Cancel}</span>
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <label className="mb-0 block text-sm font-semibold text-black">
                            {translation?.whatsappPopup.EditNumber}
                          </label>
                          <div className="mt-1 flex gap-2">
                            <input
                              type="text"
                              className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-black placeholder:text-gray-main focus:outline-none"
                              value={localMobile}
                              readOnly
                            />
                            <button
                              onClick={handleEditMobile}
                              className="text-nowrap text-blue-light"
                            >
                              ✎ {translation?.whatsappPopup.EditNumber}
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-span-6">
                      <label className="mb-0 block text-sm font-semibold text-black">
                        {translation?.whatsappPopup.enterOtp}
                      </label>
                      <div className="relative mt-1">
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={enteredOtp}
                          onChange={e => handleOtpInputChange(e, setEnteredOtp)}
                          className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-gray-main placeholder:text-gray-main focus:outline-none"
                          placeholder={translation?.whatsappPopup.enterOtp}
                          maxLength="6"
                        />
                        <span className="absolute right-2 top-2 text-blue-light">
                          {otpTimer > 0 && (
                            <span className="timerSection">{formatTime(otpTimer)}</span>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-end">
                        {showResendButton && (
                          <button
                            type="button"
                            className="mt-1 text-nowrap text-blue-light"
                            onClick={handleResendOtp}
                          >
                            <span>{translation?.whatsappPopup.resentOtp}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                  <button
                    type="submit"
                    onClick={verifyOtp}
                    className="mx-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-lg text-white"
                  >
                    <span>{translation?.whatsappPopup.verify}</span>
                  </button>
                </div>
              </div>
              <Image
                src="https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp"
                height={500}
                width={500}
                alt="enquiry-form-image"
                title="enquiry-form-image"
                className="h-auto max-w-full"
              />
            </div>
          </PopupWrapper>
        )}

      {/* Suggested Tyres Popup */}
      {(dealerContactName == null || dealerContactName == undefined) && showSuggestedPopup && (
        <PopupWrapper>
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
                onClick={() => {
                  setShowSuggestedPopup(false);
                  closeEnquryPopup();
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
              <div className="text-center">
                <span className="md:text-md text-sm text-gray-main">
                  {existVerified == 'Non_Verified_Exist' ? 'You can only submit one enquiry within 24 hours.' : translation?.suggestedPopup?.mainPara ||
                    'Your OTP is verified. You will receive a call from our agent shortly.'}
                </span>
                <div className="mx-auto my-2 flex flex-col items-center justify-center rounded-lg border-[1px] border-primary bg-white px-8 py-1 text-sm text-primary">
                  <span className="text-xs">
                    {translation?.suggestedPopup?.getThisProduct ||
                      `Get this ${productNameSingular || 'product'} At`}
                  </span>
                  <span className="text-base font-bold">
                    {isOtpVerified
                      ? priceRange // Already formatted by formatPrice or is "Price Details Coming Soon"
                      : maskOneWords(priceRange) || '₹X,XX,XXX - ₹XX,XX,XXX*'}
                    {/* Keep maskOneWords for unverified, but priceRange is now pre-formatted */}
                  </span>
                  <span className="text-xs text-gray-main">
                    {translation?.suggestedPopup.priceMayVary}
                  </span>
                </div>
                {!isOtpVerified && (
                  <button onClick={handleGetPrice} className="text-base text-blue-link">
                    {translation?.suggestedPopup.verifyMobile}
                  </button>
                )}
              </div>
              <WhatsappChannel translation={translation} />
            </div>
            {suggestedProducts.length > 0 && (
              <div className="text-cente">
                <div className="my-1 text-center text-sm font-bold md:text-lg">
                  {translation?.suggestedPopup?.similarProducts ||
                    `Similar ${productNamePlural || 'Products'}`}
                </div>
                <div className="updates-section w-full pb-8 md:pb-2">
                  <Slider
                    className="custom-slider"
                    infinite
                    speed={500}
                    slidesToShow={suggestedProducts.length < 3 ? suggestedProducts.length : 3}
                    slidesToScroll={1}
                    dots={false}
                    autoplay={false}
                    arrows={false}
                    responsive={[
                      {
                        breakpoint: 786,
                        settings: {
                          slidesToShow: suggestedProducts.length < 2 ? suggestedProducts.length : 2,
                          slidesToScroll: 1,
                          dots: true,
                          arrows: true,
                          autoplay: true,
                        },
                      },
                      {
                        breakpoint: 400,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          dots: true,
                          arrows: true,
                          autoplay: true,
                        },
                      },
                    ]}
                  >
                    {suggestedProducts.map(
                      (
                        product,
                        idx // Renamed tyre to product
                      ) => (
                        <div key={idx} className="h-full p-2">
                          <div className="h-full w-full rounded-2xl p-4 shadow-card">
                            <div className="mx-auto max-h-[168px] w-full max-w-[210px]">
                              <Image
                                src={`https://images.tractorgyan.com/uploads/${product.image?.replace(
                                  /\.(jpg|jpeg|png)$/i,
                                  '.webp'
                                )}`}
                                title={`${product.brand_name || product.brand} ${product.model}`}
                                alt={`${product.brand_name || product.brand} ${product.model}`}
                                height={200}
                                width={200}
                                className="mx-auto h-auto max-h-[100px] min-h-[100px] w-auto max-w-[210px]"
                              />
                            </div>
                            <div className="mb-2 flex h-[45px] items-center justify-center text-center">
                              <span>
                                {(product.brand_name || product.brand) + ' ' + product.model}
                              </span>
                            </div>
                            {interestSubmittedProductId === product.id ? (
                              <div className="text-md text-gray-900 mx-auto mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-solid bg-white px-2 py-1.5 text-center">
                                <span>
                                  {enquiryType === 'Tractor'
                                    ? 'Thanks for tractor inquiry!'
                                    : translation?.suggestedPopup?.thankYouForEnquiry ||
                                    'Thanks for enquiry!'}
                                </span>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleInterestClick(product)}
                                className="text-md mx-auto mb-2 flex w-full animate-pulse items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-white hover:animate-none"
                              >
                                <span>{translation?.suggestedPopup.interested}</span>
                              </button>
                            )}
                            <div className="mx-auto flex w-full flex-col items-center justify-center rounded-lg border-[1px] border-primary bg-white px-1 py-1.5 text-sm text-primary">
                              {isOtpVerified ? (
                                <span className="font-bold">{product.displayPrice}</span>
                              ) : (
                                <button onClick={verifyOtpForPrice} className="font-bold">
                                  Verify mobile number to know the price
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </Slider>
                </div>
              </div>
            )}
          </div>
        </PopupWrapper>
      )}

      {/* Enquiry Limit Popup */}
      {showEnquiryLimitPopup && (
        <PopupWrapper>
          <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[400px] md:px-4">
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
                onClick={() => {
                  setShowEnquiryLimitPopup(false);
                  onClose(); // Close SubmitOtpForm itself
                  closeEnquryPopup(); // Close the main enquiry form (WhatsappTopButton)
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
              <div className="text-center">
                <span className="md:text-md px-4 text-sm text-gray-main">
                  {translation?.suggestedPopup.enquiryLimitMessage ||
                    'You can only submit one enquiry within 24 hours.'}
                </span>
              </div>
              <WhatsappChannel translation={translation} />
            </div>
          </div>
        </PopupWrapper>
      )}

      {/* Dealer Success Popup */}
      {(successDealerFormShow === 'yes' ||
        (existVerified === 'Exist_Verified' && !showEnquiryLimitPopup)) && ( // Ensure not shown if enquiry limit is active
          <PopupWrapper>
            <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[400px] md:px-4">
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
                  onClick={() => {
                    onClose();
                    setIsCloseAfterSubmit(false);
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
                <div className="text-center">
                  <span className="md:text-md text-sm text-gray-main">
                    {enquiryType === 'Tractor'
                      ? 'Thank you for your tractor inquiry!'
                      : 'Thank you for reaching out.'}
                  </span>
                  {dealerContactName !== '' ? <DealerInfo dealerContactName={dealerContactName} dealerMobile={dealerMobile} /> : null}
                </div>
                <WhatsappChannel translation={translation} />
              </div>
            </div>
          </PopupWrapper>
        )}

      {/* Skip Verification Popup */}
      {successDealerFormShow === 'skipVerification' && (
        <PopupWrapper>
          <div className="relative mx-auto h-full max-h-[660px] w-full rounded-xl bg-white px-2.5 py-4 shadow-main md:max-h-[800px] md:max-w-[400px] md:px-4">
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
                onClick={() => {
                  onClose();
                  setIsCloseAfterSubmit(false);
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
              <div className="text-center">
                <span className="md:text-md text-sm text-gray-main">
                  {enquiryType === 'Tractor'
                    ? 'Thank you for your tractor inquiry!'
                    : 'Thank you for reaching out.'}
                </span>
                <DealerInfo
                  dealerContactName={dealerContactName}
                  dealerMobile={dealerMobile}
                  maskMobile={maskMobile}
                />
                <button onClick={handleGetPrice} className="text-base text-blue-link">
                  {translation?.suggestedPopup.verifyMobile}
                </button>
              </div>
              <WhatsappChannel translation={translation} />
            </div>
          </div>
        </PopupWrapper>
      )}

      {/* Interest Verification OTP Popup */}
      {showInterestOtpForm && (
        <PopupWrapper>
          <div className="mx-auto mt-10 w-full max-w-[450px] overflow-hidden rounded-xl bg-green-lighter shadow-main md:mt-4">
            <div className="relative p-4 md:p-4 md:pt-3">
              <button
                className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
                onClick={() => setShowInterestOtpForm(false)} // Close only this OTP form
              >
                <Image
                  src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                  height={50}
                  width={50}
                  alt="close icon"
                  title="close icon"
                />
              </button>
              <div className="mx-auto max-w-[350px]">
                <div className="mb-3 text-center text-xl font-bold text-black">
                  <span className="border-b-2 border-b-secondary pb-1">
                    Verify OTP for {interestOtpData.product?.brand_name}{' '}
                    {interestOtpData.product?.model}
                  </span>
                </div>
                <div className="mb-2 text-center text-sm font-normal text-gray-main">
                  <span>
                    Please enter the OTP sent to {maskMobile(localMobile)} to confirm your interest.
                    {/* Displaying the OTP for testing if needed: {interestOtpData.generatedOtp} */}
                  </span>
                </div>
                <form
                  onSubmit={verifyInterestOtp}
                  className="mb-6 grid grid-cols-6 gap-x-4 gap-y-4 md:gap-y-2"
                >
                  <div className="col-span-6">
                    <label className="mb-0 block text-sm font-semibold text-black">Enter OTP</label>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={enteredInterestOtp}
                        onChange={e => handleOtpInputChange(e, setEnteredInterestOtp)}
                        className="h-[38px] w-full rounded-lg border border-gray-light bg-transparent px-4 py-2 text-sm text-gray-main placeholder:text-gray-main focus:outline-none"
                        placeholder={translation?.whatsappPopup.enterOtp}
                        maxLength="6"
                      />
                      <span className="absolute right-2 top-2 text-blue-light">
                        {interestOtpTimer > 0 && (
                          <span className="timerSection">{formatTime(interestOtpTimer)}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      {showInterestResendButton && (
                        <button
                          type="button"
                          className="mt-1 text-nowrap text-blue-light"
                          onClick={handleResendInterestOtp}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                  {interestOtpError && (
                    <div className="text-red-600 col-span-6 -mt-2 text-center text-xs">
                      {interestOtpError}
                    </div>
                  )}
                  <div className="col-span-6">
                    <button
                      type="submit"
                      className="mx-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-lg text-white"
                    >
                      Verify & Submit Interest
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <Image
              src="https://images.tractorgyan.com/uploads/113891/6697a29502303-otpFooterImg.webp"
              height={500}
              width={500}
              alt="enquiry-form-image"
              title="enquiry-form-image"
              className="h-auto max-w-full"
            />
          </div>
        </PopupWrapper>
      )}

      {/* Insurance Success Popup */}
      {showInsuranceSuccess && (
        <SuccessPopup
          translation={translation}

          message={
            isOtpSkipped
              ? currentLang === 'hi'
                ? translation?.enquiryForm?.insuranceSkipOtpSuccess ||
                'आपकी बीमा पूछताछ के लिए धन्यवाद! आपका अनुरोध सबमिट हो गया है और हम जल्द ही आपसे संपर्क करेंगे।'
                : translation?.enquiryForm?.insuranceSkipOtpSuccess ||
                'Thank you for your insurance enquiry! Your request has been submitted and we will contact you soon.'
              : currentLang === 'hi'
                ? translation?.enquiryForm?.insuranceOtpSuccess ||
                'आपकी बीमा पूछताछ सफलतापूर्वक सबमिट हो गई है!'
                : translation?.enquiryForm?.insuranceOtpSuccess ||
                'Your insurance enquiry has been submitted successfully!'
          }
          onClose={() => {
            setShowInsuranceSuccess(false);
            setIsOtpSkipped(false);
            onClose?.();
          }}
        />
      )}
    </>
  );
};

export default SubmitOtpForm;
