"use client";
import DmcaCodeComponent from "@/src/features/tyreComponents/components/dmca/DmcaCodeComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { postData } from "@/src/services/apiMethods";
// import { useTranslation } from "react-i18next";
// import '../../i18n'

const MobileFooter = ({ translation }) => {
  // const { t, i18n } = useTranslation();
  // const currentLang = i18n.language;
  // const langPrefix = currentLang === "hi" ? "/hi" : "";
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const socialLinks = [
    {
      href: "https://www.facebook.com/TractorsGyan",
      imgSrc:
        "https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp",
      alt: "facebook-icon",
      title: "facebook-icon",
      linkTitle: translation.footer.VisitTractorsGyanFacebookpage,
      ariaLabel: translation.footer.VisittheofficialFacebookpageofTractorsGyan,
    },
    {
      href: "https://www.linkedin.com/company/tractorgyan",
      imgSrc:
        "https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp",
      alt: "linkedin-icon",
      title: "linkedin-icon",
      linkTitle: translation.footer.VisitTractorsGyanLinkedInpage,
      ariaLabel: translation.footer.VisittheofficialLinkedInpageofTractorsGyan,
    },
    {
      href: "https://www.instagram.com/tractorgyan",
      imgSrc:
        "https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp",
      alt: "instagram-icon",
      title: "instagram-icon",
      linkTitle: translation.footer.VisitTractorsGyanInstagrampage,
      ariaLabel: translation.footer.VisittheofficialInstagrampageofTractorsGyan,
    },
    {
      href: "https://twitter.com/TractorGyan",
      imgSrc:
        "https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp",
      alt: "twitter-icon",
      title: "twitter-icon",
      linkTitle: translation.footer.VisitTractorsGyanTwitterprofile,
      ariaLabel:
        translation.footer.VisittheofficialTwitterprofileofTractorsGyan,
    },
    {
      href: "https://www.youtube.com/@TractorGyan",
      imgSrc:
        "https://images.tractorgyan.com/uploads/118002/67b46ff35f214-Youtube.webp",
      alt: "youtube-icon",
      title: "youtube-icon",
      linkTitle: translation.footer.VisitTractorsGyanYouTubechannel,
      ariaLabel:
        translation.footer.VisittheofficialYouTubechannelofTractorsGyan,
    },
  ];

  const toggleFooterButton = () => {
    setIsFooterOpen((pre) => !pre);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubscribe = async () => {
    console.log("click email");
    if (!email) {
      setResponseMessage("Email is required.");
      setMessageColor("red");
      return;
    }

    if (!validateEmail(email)) {
      setResponseMessage("Please enter a valid email address.");
      setMessageColor("red");
      return;
    }

    try {
      const response = await postData(
        "https://staging.tractorgyan.com/api/news_letter_save",
        { email },
      );
      if (response.success === true) {
        setResponseMessage("Thank You for Subscribing.");
        setMessageColor("green");
        setEmail("");
      } else if (response.success === false) {
        setResponseMessage("This email is already registered.");
        setMessageColor("red");
      } else {
        setResponseMessage("Something went wrong. Please try again.");
        setMessageColor("red");
      }
    } catch (error) {
      setResponseMessage("Network error. Please try again later.");
      setMessageColor("red");
    }
  };

  return (
    <footer className="block bg-[url('https://images.tractorgyan.com/uploads/118076/67bd69b907c22-footer-bg.webp')] py-10 md:hidden">
      <div className="container">
        <div className="mb-[54px] flex justify-between">
          <div className="h-[51px] w-full max-w-[245px] lg:h-[73px] lg:max-w-[352px]">
            <Image
              src="https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp"
              alt="tractorGyan logo"
              title="tractorGyan logo"
              height={52}
              width={245}
              className="h-auto w-full max-w-[245px]"
            />
          </div>
        </div>
        <div className="mb-6 grid grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
              {translation?.footer?.popularSearches}
            </h5>
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-3 text-sm text-gray-grey">
                <li>
                  <Link
                    href="/tyre/mrf-tractor-tyre-in-india"
                    title={translation.footer.mrfTractorTyres}
                    aria-label={translation.footer.mrfTractorTyres}
                  >
                    {translation?.footer?.mrfTractorTyres}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor-implements-in-india/rotavator"
                    title={translation.footer.rotavators}
                    aria-label={translation.footer.rotavators}
                  >
                    {translation?.footer?.rotavators}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tyre/apollo-tractor-tyre-in-india"
                    title={translation.footer.apolloTractorTyres}
                    aria-label={translation.footer.apolloTractorTyres}
                  >
                    {translation?.footer?.apolloTractorTyres}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor-implements-in-india/backhoe-loader"
                    title={translation.footer.backhoeLoaders}
                    aria-label={translation.footer.backhoeLoaders}
                  >
                    {translation?.footer?.backhoeLoaders}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor-implements-in-india/cultivator"
                    title={translation.footer.cultivators}
                    aria-label={translation.footer.cultivators}
                  >
                    {translation?.footer?.cultivators}
                  </Link>
                </li>
              </ul>
              {isFooterOpen && (
                <ul className="flex flex-col gap-3 text-sm text-gray-grey">
                  <li>
                    <Link
                      href="/tractor-implements-in-india/power-tiller"
                      title={translation.footer.powerTillers}
                      aria-label={translation.footer.powerTillers}
                    >
                      {translation?.footer?.powerTillers}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements-in-india/combine-harvester"
                      title={translation.footer.combineHarvesters}
                      aria-label={translation.footer.combineHarvesters}
                    >
                      {translation?.footer?.combineHarvesters}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements/backhoe-loader/jcb-3dx-xtra/8"
                      title={translation.footer.jcb3DxXtra}
                      aria-label={translation.footer.jcb3DxXtra}
                    >
                      {translation?.footer?.jcb3DxXtra}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tyre/mrf-shakti-3-rib-6-x-16/13"
                      title={translation.footer.mrf3RibTractorTyre}
                      aria-label={translation.footer.mrf3RibTractorTyre}
                    >
                      {translation?.footer?.mrf3RibTractorTyre}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/tractor-implements/rotavator/shaktiman-regular-plus/38"
                      title={translation.footer.shaktimanRegularPlusRotavator}
                      aria-label={
                        translation.footer.shaktimanRegularPlusRotavator
                      }
                    >
                      {translation?.footer?.shaktimanRegularPlusRotavator}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
              {translation?.footer?.topTractorInIndia}
            </h5>
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-3 text-sm text-gray-grey">
                <li>
                  <Link
                    href="/tractor/swaraj-855-fe/23"
                    title={translation.footer?.swaraj855}
                    aria-label={translation.footer?.swaraj855}
                  >
                    {" "}
                    {translation?.footer?.swaraj855}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/mahindra-575-di-xp-plus/440"
                    title={translation.footer?.mahindra575}
                    aria-label={translation.footer?.mahindra575}
                  >
                    {translation?.footer?.mahindra575}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/john-deere-5310-4wd/155"
                    title={translation.footer?.johnDeere5310}
                    aria-label={translation.footer?.johnDeere5310}
                  >
                    {translation?.footer?.johnDeere5310}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/new-holland-3630-tx-plus/44"
                    title={translation.footer?.newHolland3630}
                    aria-label={translation.footer?.newHolland3630}
                  >
                    {translation?.footer?.newHolland3630}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/powertrac-euro-50/52"
                    title={translation.footer?.powertracEuro50}
                    aria-label={translation.footer?.powertracEuro50}
                  >
                    {translation?.footer?.powertracEuro50}
                  </Link>
                </li>
              </ul>
              {isFooterOpen && (
                <ul className="flex flex-col gap-3 text-sm text-gray-grey">
                  <li>
                    <Link
                      href="/tractor/massey-ferguson-1035-di/47"
                      title={translation.footer?.masseyFerguson1035}
                      aria-label={translation.footer?.masseyFerguson1035}
                    >
                      {translation?.footer?.masseyFerguson1035}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/swaraj-735-fe/24"
                      title={translation.footer?.swaraj735}
                      aria-label={translation.footer?.swaraj735}
                    >
                      {translation?.footer?.swaraj735}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/eicher-380-super-di/38"
                      title={translation.footer?.eicher380}
                      aria-label={translation.footer?.eicher380}
                    >
                      {translation?.footer?.eicher380}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/farmtrac-45-super-smart-supermaxx/929"
                      title={translation.footer?.farmtrac45}
                      aria-label={translation.footer?.farmtrac45}
                    >
                      {translation?.footer?.farmtrac45}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/sonalika-di-750iii/64"
                      title={translation.footer?.sonalika750}
                      aria-label={translation.footer?.sonalika750}
                    >
                      {translation?.footer?.sonalika750}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <button
          className="mx-auto mb-4 flex h-[30px] w-[52px] items-center justify-center rounded-full bg-primary p-2"
          onClick={toggleFooterButton}
        >
          <Image
            src={
              !isFooterOpen
                ? "https://images.tractorgyan.com/uploads/113314/6661e046dbf30_downArrowIcon.webp"
                : "https://images.tractorgyan.com/uploads/113707/66851b6fbfdb1-upArrowIcon.webp"
            }
            height={20}
            width={20}
            alt="down-arrow"
            title="down-arrow"
            className="h-2 w-4"
          />
        </button>
        <div className="mb-6 grid grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-2">
            <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
              {translation?.about.aboutTractorGyan}
            </h5>
            <div className="mb-8">
              <ul className="flex flex-col gap-3 text-sm text-gray-grey">
                <li>
                  <Link
                    href="/about"
                    title={translation.about?.aboutTractorGyan}
                    aria-label={translation.about?.aboutTractorGyan}
                  >
                    {translation?.about.aboutTractorGyan}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner"
                    title={translation.about?.partnerWithUs}
                    aria-label={translation.about?.partnerWithUs}
                  >
                    {translation?.about.partnerWithUs}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractorjunction"
                    title={translation.about?.tractorJunction}
                    aria-label={translation.about?.tractorJunction}
                  >
                    {translation?.about.tractorJunction}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/our-contacts"
                    title={translation.about?.tractorJunction}
                    aria-label={translation.about?.tractorJunction}
                  >
                    {translation?.about.contantUs}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    title={translation.about?.career}
                    aria-label={translation.about?.career}
                  >
                    {translation?.about.career}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full max-w-[169px]">
              <h5 className="mb-2 mt-7 text-base font-semibold">
                By Rapsa Group
              </h5>
              <Link
                href="https://www.housegyan.com"
                target="_"
                title="HouseGyan-logo"
                aria-label="HouseGyan-logo"
              >
                <Image
                  src="https://images.tractorgyan.com/uploads/117176/676d470b03e48-Housegyan.webp"
                  height={200}
                  width={200}
                  alt="HouseGyan-logo"
                  title="HouseGyan-logo"
                  className="h-auto w-full max-w-[163px]"
                />
              </Link>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
              {translation?.footer?.topPopularBrands}
            </h5>
            <div className="flex flex-col gap-2">
              <ul className="flex flex-col gap-2 text-sm text-gray-grey">
                <li>
                  <Link
                    href="/tractor/Swaraj"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.swaraj}
                    aria-label={translation.footer?.swaraj}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109723/653b8500ea8ab-SWARAJ-16_small.webp"
                      height={100}
                      width={100}
                      title="Swaraj Logo"
                      alt="Swaraj Logo"
                      className="h-auto w-[30px]"
                    />
                    <span> {translation?.footer?.swaraj}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/Mahindra"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.mahindra}
                    aria-label={translation.footer?.mahindra}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/110907/658bf888bc083-MAHINDRA-09-(1)_small.webp"
                      height={100}
                      width={100}
                      title="Mahindra Logo"
                      alt="Mahindra Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.mahindra}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/John-deere"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.johnDeere}
                    aria-label={translation.footer?.johnDeere}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109740/653b8bd8a0193-JOHN-DEERE-07_small.webp"
                      height={100}
                      width={100}
                      title="John Deere Logo"
                      alt="John Deere Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.johnDeere}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/New-holland"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.newHolland}
                    aria-label={translation.footer?.newHolland}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/112011/65e59164cf80a-new-holland_new_small.webp"
                      height={100}
                      width={100}
                      title="New Holland Logo"
                      alt="New Holland Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.newHolland}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/Powertrac"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.powertrac}
                    aria-label={translation.footer?.powertrac}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109729/653b87c60d661-POWERTRAC-10_small.webp"
                      height={100}
                      width={100}
                      title="Powertrac Logo"
                      alt="Powertrac Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.powertrac}</span>
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-col gap-2 text-sm text-gray-grey">
                <li>
                  <Link
                    href="/tractor/Massey-ferguson"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.masseyFerguson}
                    aria-label={translation.footer?.masseyFerguson}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109731/653b884aa08ce-MASSEY-09_small.webp"
                      height={100}
                      width={100}
                      title="Massey Ferguson Logo"
                      alt="Massey Ferguson Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.masseyFerguson}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/Solis"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.solis}
                    aria-label={translation.footer?.solis}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109726/653b85deec369-SOLIS-05_small.webp"
                      height={100}
                      width={100}
                      title="Solis Logo"
                      alt="Solis Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.solis}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/Eicher"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.eicher}
                    aria-label={translation.footer?.eicher}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109747/653b8ebc24c67-eicher-12_small.webp"
                      height={100}
                      width={100}
                      title="Eicher Logo"
                      alt="Eicher Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.eicher}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/Farmtrac"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.farmtrac}
                    aria-label={translation.footer?.farmtrac}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109745/653b8e4b99291-FARMTRAC-01_small.webp"
                      height={100}
                      width={100}
                      title="Farmtrac Logo"
                      alt="Farmtrac Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.farmtrac}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tractor/Sonalika"
                    className="flex items-center gap-2.5"
                    title={translation.footer?.sonalika}
                    aria-label={translation.footer?.sonalika}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/109725/653b85a872402-SONALIKA-15_small.webp"
                      height={100}
                      width={100}
                      title="Sonalika Logo"
                      alt="Sonalika Logo"
                      className="h-auto w-[30px]"
                    />
                    <span>{translation?.footer?.sonalika}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-4">
            <div>
              <h6 className="mb-2.5 text-lg font-semibold">
                {translation?.follow.followUsOn}
              </h6>
              <div className="flex gap-2">
                {socialLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    title={item.linkTitle}
                    aria-label={item.ariaLabel}
                    className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-white"
                  >
                    <Image
                      src={item.imgSrc}
                      height={100}
                      width={100}
                      alt={item.alt}
                      title={item.title}
                      className="h-auto w-full min-w-[16px] object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="w-full max-w-[883px]">
            <h5 className="mb-2.5 text-lg font-semibold">
              {translation?.footer?.subscribetoNewsletter}
            </h5>
            <div className="w-full">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[40px] w-full flex-1 rounded-[40px] border-[1px] border-gray-secondary bg-transparent px-[27px] py-2 text-xs"
              />
              <div className="ms-2 h-5 text-sm">
                {responseMessage && (
                  <p style={{ color: messageColor }}>{responseMessage}</p>
                )}
              </div>
              <button
                onClick={handleSubscribe}
                className="h-[40px] w-full rounded-full bg-black px-4 py-2 text-base font-medium text-white"
              >
                {translation?.buttons.subscribe}
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col items-center md:col-span-1">
          <h5 className="mb-4 inline-block border-b border-[#BCBCBC] text-base font-semibold text-black">
            Content Protected By
          </h5>
          <div className="flex">
            <div className="h-[32px]">
              <DmcaCodeComponent />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h6 className="text-sm font-semibold text-black">
            {" "}
            {translation?.disclaimer.title}
          </h6>
          <div className="text-xs font-normal text-gray-main">
            <p className="">{translation?.disclaimer.body1}</p>
            <span>{translation?.disclaimer.body2}</span>
          </div>
        </div>
        <div className="mb-12">
          <p className="text-center text-sm font-medium text-gray-main">
            &copy; 2025 Rapsa Technologies Pvt Ltd.{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;
