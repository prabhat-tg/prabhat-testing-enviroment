"use client";
import DmcaCodeComponent from "@/src/features/tyreComponents/components/dmca/DmcaCodeComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FixedFooterSection from "./FixedFooterSection";
import { postData } from "@/src/services/apiMethods";
import { useTranslation } from "react-i18next";
// import '../../i18n'

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const langPrefix = currentLang === "hi" ? "/hi" : "";
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageColor, setMessageColor] = useState("black");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubscribe = async () => {
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
    <>
      <footer className="hidden bg-[url('https://images.tractorgyan.com/uploads/118076/67bd69b907c22-footer-bg.webp')] py-5 pt-12 md:block">
        <div className="container">
          <div className="mb-[54px] flex justify-between">
            <Link
              href={"/"}
              className="h-[51px] w-full max-w-[245px] lg:max-h-[73px] lg:max-w-[352px]"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp"
                height={500}
                width={500}
                alt="logo-icon"
                className="h-full w-auto"
              />
            </Link>
            <div>
              <div>
                <h5 className="mb-6 text-lg font-semibold">
                  {t(`follow.followUsOn`)}
                </h5>
                {/* <div className="flex gap-7">
                  <Link
                    href={"https://www.facebook.com/TractorsGyan"}
                    title="Visit Tractors Gyan Facebook page"
                    aria-label="Visit the official Facebook page of Tractors Gyan"
                    className="w-[47px] h-[47px] p-2 bg-[#fffffff] border-[1px] border-black rounded-full flex items-center justify-center"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp"
                      // src="https://images.tractorgyan.com/uploads/116843/6750527b60631-facebook-footer-icon.webp"
                      height={100}
                      width={100}
                      alt="facebook-icon"
                      title="facebook-icon"
                      className="min-w-[16px] max-w-[22px] h-auto w-full object-contain"
                    />
                  </Link>
                  <Link
                    href={"https://www.linkedin.com/company/tractorgyan"}
                    title="Visit Tractors Gyan LinkedIn page"
                    aria-label="Visit the official LinkedIn page of Tractors Gyan"
                    className="w-[47px] h-[47px] p-2 bg-black rounded-full flex items-center justify-center"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp"
                      // src="https://images.tractorgyan.com/uploads/116846/6750567be9e4a-linkedin-footer-icon.webp"
                      height={100}
                      width={100}
                      alt="linkedin-icon"
                      title="linkedin-icon"
                      className="min-w-[16px] max-w-[22px] h-auto w-full object-contain"
                    />
                  </Link>
                  <Link
                    href={"https://www.instagram.com/tractorgyan"}
                    title="Visit Tractors Gyan Instagram page"
                    aria-label="Visit the official Instagram page of Tractors Gyan"
                    className="w-[47px] h-[47px] p-2 bg-black rounded-full flex items-center justify-center"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp"
                      // src="https://images.tractorgyan.com/uploads/116844/675052d03db19-instagram-footer-icon.webp"
                      height={100}
                      width={100}
                      alt="instagram-icon"
                      title="instagram-icon"
                      className="min-w-[16px] max-w-[22px] h-auto w-full object-contain"
                    />
                  </Link>
                  <Link
                    href="https://twitter.com/TractorGyan"
                    title="Visit Tractors Gyan Twitter profile"
                    aria-label="Visit the official Twitter profile of Tractors Gyan"
                    className="w-[47px] h-[47px] p-2 bg-black rounded-full flex items-center justify-center"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp"
                      // src="https://images.tractorgyan.com/uploads/116842/67504af626b16-twitter-footer-icon.webp"
                      height={100}
                      width={100}
                      alt="twitter-icon"
                      title="twitter-icon"
                      className="min-w-[16px] max-w-[22px] h-auto w-full object-contain"
                    />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@TractorGyan"
                    title="Visit Tractors Gyan YouTube channel"
                    aria-label="Visit the official YouTube channel of Tractors Gyan"
                    className="w-[47px] h-[47px] p-2 bg-black rounded-full flex items-center justify-center"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/118002/67b46ff35f214-Youtube.webp"
                      // src="https://images.tractorgyan.com/uploads/116845/6750531fde83b-youtube-footer-icon.webp"
                      height={100}
                      width={100}
                      alt="youtube-icon"
                      title="youtube-icon"
                      className="min-w-[16px] max-w-[22px] h-auto w-full object-contain"
                    />
                  </Link>
                </div> */}
                <div className="flex gap-7">
                  <Link
                    href={"https://www.facebook.com/TractorsGyan"}
                    title="Visit Tractors Gyan Facebook page"
                    aria-label="Visit the official Facebook page of Tractors Gyan"
                    className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/117998/67b46c43e3416-Facebook.webp"
                      height={100}
                      width={100}
                      alt="facebook-icon"
                      title="facebook-icon"
                      className="h-auto w-full min-w-[16px] object-contain"
                    />
                  </Link>
                  <Link
                    href={"https://www.linkedin.com/company/tractorgyan"}
                    title="Visit Tractors Gyan LinkedIn page"
                    aria-label="Visit the official LinkedIn page of Tractors Gyan"
                    className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/118000/67b46f6e496ca-Linkedin.webp"
                      height={100}
                      width={100}
                      alt="linkedin-icon"
                      title="linkedin-icon"
                      className="h-auto w-full min-w-[16px] object-contain"
                    />
                  </Link>
                  <Link
                    href={"https://www.instagram.com/tractorgyan"}
                    title="Visit Tractors Gyan Instagram page"
                    aria-label="Visit the official Instagram page of Tractors Gyan"
                    className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/117999/67b46cae03911-Instagram.webp"
                      height={100}
                      width={100}
                      alt="instagram-icon"
                      title="instagram-icon"
                      className="h-auto w-full min-w-[16px] object-contain"
                    />
                  </Link>
                  <Link
                    href="https://twitter.com/TractorGyan"
                    title="Visit Tractors Gyan Twitter profile"
                    aria-label="Visit the official Twitter profile of Tractors Gyan"
                    className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/118001/67b46fb47e1b7-X.webp"
                      height={100}
                      width={100}
                      alt="twitter-icon"
                      title="twitter-icon"
                      className="h-auto w-full min-w-[16px] object-contain"
                    />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@TractorGyan"
                    title="Visit Tractors Gyan YouTube channel"
                    aria-label="Visit the official YouTube channel of Tractors Gyan"
                    className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#fffffff]"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/118002/67b46ff35f214-Youtube.webp"
                      height={100}
                      width={100}
                      alt="youtube-icon"
                      title="youtube-icon"
                      className="h-auto w-full min-w-[16px] object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-x-[54px] gap-y-5">
            <div className="col-span-3 md:col-span-1">
              <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {t(`footer.popularSearches`)}
              </h5>
              <div className="flex gap-4">
                <ul className="flex w-1/2 flex-col gap-3 text-base font-medium text-gray-grey">
                  <li>
                    <Link
                      href="/tyre/mrf-tractor-tyre-in-india"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.mrfTractorTyres`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements-in-india/rotavator"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.rotavators`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tyre/apollo-tractor-tyre-in-india"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.apolloTractorTyres`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements-in-india/backhoe-loader"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.backhoeLoaders`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements/rotavator/shaktiman-regular-plus/38"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.shaktimanRegularPlusRotavator`)}
                    </Link>
                  </li>
                </ul>
                <ul className="flex w-1/2 flex-col gap-3 text-base font-medium text-gray-grey">
                  <li>
                    <Link
                      href="/tyre/mrf-shakti-3-rib-6-x-16/13"
                      title="MRF 3 Rib Tractor Tyre"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.mrf3RibTractorTyre`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements-in-india/power-tiller"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.powerTillers`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements-in-india/combine-harvester"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.combineHarvesters`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements/backhoe-loader/jcb-3dx-xtra/8"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.jcb3DxXtra`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor-implements-in-india/cultivator"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.cultivators`)}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {t(`footer.topTractorInIndia`)}
              </h5>
              <div className="flex gap-4">
                <ul className="flex w-1/2 flex-col gap-3 text-base text-gray-grey">
                  <li>
                    <Link
                      href="/tractor/swaraj-855-fe/23"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.swaraj855`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/mahindra-575-di-xp-plus/440"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.mahindra575`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/john-deere-5310-4wd/155"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.johnDeere5310`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/new-holland-3630-tx-plus/44"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.newHolland3630`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/powertrac-euro-50/52"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.powertracEuro50`)}
                    </Link>
                  </li>
                </ul>
                <ul className="flex w-1/2 flex-col gap-3 text-base text-gray-grey">
                  <li>
                    <Link
                      href="/tractor/massey-ferguson-1035-di/47"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.masseyFerguson1035`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/swaraj-735-fe/24"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.swaraj735`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/eicher-380-super-di/38"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.eicher380`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/farmtrac-45-super-smart-supermaxx/929"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.farmtrac45`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/sonalika-di-750iii/64"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`footer.sonalika750`)}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <h5 className="mb-1 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {t(`footer.topPopularBrands`)}
              </h5>
              <div className="flex gap-4">
                <ul className="flex w-1/2 flex-col text-base text-gray-grey">
                  <li>
                    <Link
                      href="/tractor/Swaraj"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109723/653b8500ea8ab-SWARAJ-16_small.webp"
                        height={100}
                        width={100}
                        title="Swaraj Logo"
                        alt="Swaraj Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.swaraj`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/Mahindra"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/110907/658bf888bc083-MAHINDRA-09-(1)_small.webp"
                        height={100}
                        width={100}
                        title="Mahindra Logo"
                        alt="Mahindra Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.mahindra`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/John-deere"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109740/653b8bd8a0193-JOHN-DEERE-07_small.webp"
                        height={100}
                        width={100}
                        title="John Deere Logo"
                        alt="John Deere Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.johnDeere`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/New-holland"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/112011/65e59164cf80a-new-holland_new_small.webp"
                        height={100}
                        width={100}
                        title="New Holland Logo"
                        alt="New Holland Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.newHolland`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/Powertrac"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109729/653b87c60d661-POWERTRAC-10_small.webp"
                        height={100}
                        width={100}
                        title="Powertrac Logo"
                        alt="Powertrac Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.powertrac`)}
                      </span>
                    </Link>
                  </li>
                </ul>
                <ul className="flex w-1/2 flex-col text-base text-gray-grey">
                  <li>
                    <Link
                      href="/tractor/Massey-ferguson"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109731/653b884aa08ce-MASSEY-09_small.webp"
                        height={100}
                        width={100}
                        title="Massey Ferguson Logo"
                        alt="Massey Ferguson Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.masseyFerguson`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/Solis"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109726/653b85deec369-SOLIS-05_small.webp"
                        height={100}
                        width={100}
                        title="Solis Logo"
                        alt="Solis Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.solis`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/Eicher"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109747/653b8ebc24c67-eicher-12_small.webp"
                        height={100}
                        width={100}
                        title="Eicher Logo"
                        alt="Eicher Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.eicher`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/Farmtrac"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109745/653b8e4b99291-FARMTRAC-01_small.webp"
                        height={100}
                        width={100}
                        title="Farmtrac Logo"
                        alt="Farmtrac Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.farmtrac`)}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tractor/Sonalika"
                      className="flex items-center gap-2.5"
                    >
                      <Image
                        src="https://images.tractorgyan.com/uploads/109725/653b85a872402-SONALIKA-15_small.webp"
                        height={100}
                        width={100}
                        title="Sonalika Logo"
                        alt="Sonalika Logo"
                        className="h-auto w-[40px]"
                      />
                      <span className="hover:font-bold hover:text-black">
                        {t(`footer.sonalika`)}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-2">
              <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {t(`about.aboutTractorGyan`)}
              </h5>
              <div className="flex gap-4">
                <ul className="flex gap-8 text-base text-gray-grey">
                  <li>
                    <Link
                      title="about"
                      href="/about"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`about.aboutTractorGyan`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      title="partner"
                      href="/partner"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`about.partnerWithUs`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      title="tractor junction"
                      href="/tractorjunction"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`about.tractorJunction`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      title="our-contacts"
                      href="/our-contacts"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`about.contantUs`)}
                    </Link>
                  </li>
                  <li>
                    <Link
                      title="career"
                      href="/career"
                      className="hover:font-bold hover:text-black"
                    >
                      {t(`about.career`)}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <h5 className="mb-4 inline-block border-b-[1px] border-[#BCBCBC] text-sm font-semibold text-black md:text-lg">
                Content Protected By
              </h5>
              <div className="flex">
                <div className="h-[46px]">
                  <DmcaCodeComponent />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="w-full max-w-[192px]">
              <h5 className="mb-5 text-lg font-semibold">By Rapsa Group</h5>
              <Link href="https://www.housegyan.com" className="max-w-[192px]">
                <Image
                  src="https://images.tractorgyan.com/uploads/117176/676d470b03e48-Housegyan.webp"
                  height={200}
                  width={200}
                  alt="house-gyan-logo"
                  title="house-gyan-logo"
                  className="h-auto w-full max-w-[192px]"
                />
              </Link>
            </div>
            <div className="w-full max-w-[650px]">
              <h5 className="mb-2 text-lg font-semibold">
                {t("footer.subscribetoNewsletter")}
              </h5>
              <div className="flex h-[45px] w-full gap-2.5">
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-full w-full flex-1 rounded-[40px] border-[1px] border-gray-secondary bg-transparent px-[27px] py-2 text-xs"
                />
                <button
                  onClick={handleSubscribe}
                  className="w-[135px] rounded-full bg-black px-4 py-2 text-base font-medium text-white"
                >
                  {t("buttons.subscribe")}
                </button>
              </div>
              <div className="mt-1 h-5 text-sm">
                {responseMessage && (
                  <p style={{ color: messageColor }}>{responseMessage}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h6 className="text-sm font-semibold text-black">
              {" "}
              {t("disclaimer.title")}
            </h6>
            <div className="text-xs font-normal text-gray-main">
              <p className="">{t("disclaimer.body1")}</p>
              <span>{t("disclaimer.body2")}</span>
            </div>
          </div>
          <div>
            <p className="text-center text-sm font-medium text-gray-main">
              &copy; 2025 Rapsa Technologies Pvt Ltd.
            </p>
          </div>
        </div>
      </footer>
      <FixedFooterSection />
    </>
  );
};

export default Footer;
