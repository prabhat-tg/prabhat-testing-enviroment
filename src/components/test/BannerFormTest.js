/**
 * Test component for Banner Form Modal functionality
 * This can be used to test the banner slider with form modal integration
 */

'use client';
import React, { useState, useEffect } from 'react';
import BannerSlider from '@/src/components/shared/bannners/BannerSlider';
import { validateBannersForFormTriggers, mergeTranslation } from '@/src/utils/bannerFormUtils';

const BannerFormTest = () => {
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on client side
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Test banner data
    const testBanners = [
        {
            sno: 1,
            image: `
        <div style="position: relative; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white; border-radius: 12px;">
          <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: bold;">🚜 Get Best Tractor Prices!</h2>
          <p style="margin: 0 0 20px 0; font-size: 16px;">Compare prices from top dealers in your area</p>
          <button class="enquiry_form" style="background: #ff6b6b; color: white; padding: 12px 24px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer;">
            Get Price Quote →
          </button>
        </div>
      `
        },
        {
            sno: 2,
            image: `
        <div style="position: relative; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px; text-align: center; color: white; border-radius: 12px;">
          <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: bold;">🌾 Agricultural Equipment</h2>
          <p style="margin: 0 0 20px 0; font-size: 16px;">Explore our wide range of farming equipment</p>
          <a href="https://tractorgyan.com" style="background: #4ecdc4; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            View Catalog →
          </a>
        </div>
      `
        },
        {
            sno: 3,
            image: `
        <div style="position: relative; background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 40px; text-align: center; color: #333; border-radius: 12px;">
          <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: bold;">💰 Special Financing</h2>
          <p style="margin: 0 0 20px 0; font-size: 16px;">Get instant loan approval for your tractor purchase</p>
          <div class="enquiry_form" style="background: #6c5ce7; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; display: inline-block; cursor: pointer;">
            Check Eligibility →
          </div>
        </div>
      `
        }
    ];

    // Translation for the form
    const translation = mergeTranslation({
        enquiryForm: {
            tractorTextForOtp: 'Get personalized tractor recommendations and best prices in your area'
        }
    });

    // Validate banners
    const bannerValidation = validateBannersForFormTriggers(testBanners);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-4 text-3xl font-bold">Banner Form Modal Test</h1>
                <div className="rounded-lg bg-gray-100 p-4">
                    <h3 className="mb-2 font-semibold">Test Status:</h3>
                    <ul className="space-y-1 text-sm">
                        <li>✅ Modal type: BannerAd enquiry</li>
                        <li>✅ Skip OTP verification: Enabled</li>
                        <li>✅ Mobile detection: {isMobile ? 'Mobile' : 'Desktop'} view</li>
                        <li>✅ Banners validated: {bannerValidation.triggersFound} form triggers found</li>
                        <li>✅ Suggested products: Disabled (thank you only)</li>
                    </ul>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">Instructions:</h2>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <ul className="space-y-2 text-sm">
                        <li>• Click on banners with "Get Price Quote" or "Check Eligibility" buttons to open the form modal</li>
                        <li>• The "View Catalog" banner will navigate to a regular URL</li>
                        <li>• Elements with class="enquiry_form" will trigger the modal</li>
                        <li>• Modal now follows WhatsAppTopButton design with green background and bottom banner</li>
                        <li>• The form includes tractor brand/model selection and location fields</li>
                        <li>• OTP verification can be skipped (skipVerifyOTP: true)</li>
                        <li>• Uses BannerAd enquiry type with no suggested products</li>
                        <li>• Form uses real APIs for brands, models, states, and districts</li>
                    </ul>
                </div>
            </div>

            <BannerSlider
                banners={testBanners}
                translation={translation}
                currentLang="en"
                isMobile={isMobile}
                additionalClasses="shadow-lg"
                skipVerifyOTP={true}
            />

            <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">Banner Analysis:</h3>
                <div className="overflow-x-auto">
                    <table className="w-full rounded-lg border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="border-b px-4 py-2 text-left">Banner #</th>
                                <th className="border-b px-4 py-2 text-left">Has Form Trigger</th>
                                <th className="border-b px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testBanners.map((banner, index) => {
                                const hasTrigger = banner.image.includes('class="enquiry_form"');
                                return (
                                    <tr key={banner.sno} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                        <td className="border-b px-4 py-2">Banner {banner.sno}</td>
                                        <td className="border-b px-4 py-2">
                                            {hasTrigger ? (
                                                <span className="text-green-600">✅ Yes</span>
                                            ) : (
                                                <span className="text-red-600">❌ No</span>
                                            )}
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            {hasTrigger ? 'Opens form modal' : 'Regular navigation'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="mb-4 text-lg font-semibold">API Details:</h3>
                <div className="rounded-lg bg-yellow-50 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="font-semibold">Form Submission:</h4>
                            <p className="text-sm text-gray-600">POST /api/enquiry_data_otp_send</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Type IDs:</h4>
                            <p className="text-sm text-gray-600">Desktop: 112, Mobile: 113</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerFormTest;
