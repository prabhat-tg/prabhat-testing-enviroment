import DmcaCodeComponent from '@/src/features/tyreComponents/components/dmca/DmcaCodeComponent';
import Image from 'next/image';
import Link from 'next/link';
import SubscriptionForm from './SubscriptionForm';
import FixedFooterSection from './FixedFooterSection';
import { getSelectedLanguage } from '@/src/services/locale';
// import { useTranslation } from "react-i18next";

const FooterServer = async ({ translation }) => {
  const currentLang = await getSelectedLanguage();
  //   const { t, i18n } = useTranslation();
  //   const currentLang = i18n.language;
  const langPrefix = currentLang === 'hi' ? '/hi' : '';

  return (
    <>
      <footer className="hidden bg-[url('https://images.tractorgyan.com/uploads/118076/67bd69b907c22-footer-bg.webp')] py-5 pt-12 md:block">
        <div className="container">
          <div className="mb-[54px] flex justify-between">
            <Link
              href={currentLang === 'hi' ? '/hi' : '/'}
              title={translation.footer.VisitTractorsGyanHomePage}
              aria-label={translation.footer.VisittheofficialHomepageofTractorsGyan}
              className="h-[51px] w-full max-w-[245px] lg:max-h-[73px] lg:max-w-[352px]"
            >
              <Image
                src="https://images.tractorgyan.com/uploads/113702/66850cfd67de7-TractorGyanDarkWith.webp"
                height={500}
                width={500}
                alt="logo-icon"
                title="logo-icon"
                className="h-full w-auto"
              />
            </Link>
            <div>
              <h5 className="mb-6 text-lg font-semibold">{translation.follow.followUsOn}</h5>
              <div className="flex gap-7">
                <Link
                  href={'https://www.facebook.com/TractorsGyan'}
                  title={translation.follow?.VisitTractorsGyanFacebookpage}
                  aria-label={translation.follow?.VisittheofficialFacebookpageofTractorsGyan}
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
                  href={'https://www.linkedin.com/company/tractorgyan'}
                  title={translation.follow?.VisitTractorsGyanLinkedInpage}
                  aria-label={translation.follow?.VisittheofficialLinkedInpageofTractorsGyan}
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
                  href={'https://www.instagram.com/tractorgyan'}
                  title={translation.follow?.VisitTractorsGyanInstagrampage}
                  aria-label={translation.follow?.VisittheofficialInstagrampageofTractorsGyan}
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
                  title={translation.follow?.VisitTractorsGyanTwitterprofile}
                  aria-label={translation.follow?.VisittheofficialTwitterprofileofTractorsGyan}
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
                  title={translation.follow?.VisitTractorsGyanYouTubechannel}
                  aria-label={translation.follow?.VisittheofficialYouTubechannelofTractorsGyan}
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
          <div className="mb-4 grid grid-cols-3 gap-x-[54px] gap-y-5">
            <div className="col-span-3 md:col-span-1">
              <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {translation.footer.popularSearches}
              </h5>
              <div className="flex gap-4">
                <ul className="flex w-1/2 flex-col gap-3 text-base font-medium text-gray-grey">
                  <li>
                    <Link
                      href={`${langPrefix}/tyre/mrf-tractor-tyre-in-india`}
                      title={translation.footer.mrfTractorTyres}
                      aria-label={translation.footer.mrfTractorTyres}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.footer.mrfTractorTyres}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor-implements-in-india/rotavator`}
                      title={translation.footer.rotavators}
                      aria-label={translation.footer.rotavators}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.footer.rotavators}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tyre/apollo-tractor-tyre-in-india`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.apolloTractorTyres}
                      aria-label={translation.footer.apolloTractorTyres}
                    >
                      {translation.footer.apolloTractorTyres}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor-implements-in-india/backhoe-loader`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.backhoeLoaders}
                      aria-label={translation.footer.backhoeLoaders}
                    >
                      {translation.footer.backhoeLoaders}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor-implements/rotavator/shaktiman-regular-plus/38`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.shaktimanRegularPlusRotavator}
                      aria-label={translation.footer.shaktimanRegularPlusRotavator}
                    >
                      {translation.footer.shaktimanRegularPlusRotavator}
                    </Link>
                  </li>
                </ul>
                <ul className="flex w-1/2 flex-col gap-3 text-base font-medium text-gray-grey">
                  <li>
                    <Link
                      href={`${langPrefix}/tyre/mrf-shakti-3-rib-6-x-16/13`}
                      title="MRF 3 Rib Tractor Tyre"
                      aria-label={translation.footer.mrf3RibTractorTyre}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.footer.mrf3RibTractorTyre}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor-implements-in-india/power-tiller`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.powerTillers}
                      aria-label={translation.footer.powerTillers}
                    >
                      {translation.footer.powerTillers}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor-implements-in-india/combine-harvester`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.combineHarvesters}
                      aria-label={translation.footer.combineHarvesters}
                    >
                      {translation.footer.combineHarvesters}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor-implements/backhoe-loader/jcb-3dx-xtra/8`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.jcb3DxXtra}
                      aria-label={translation.footer.jcb3DxXtra}
                    >
                      {translation.footer.jcb3DxXtra}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor-implements-in-india/cultivator`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.cultivators}
                      aria-label={translation.footer.cultivators}
                    >
                      {translation.footer.cultivators}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {translation.footer.topTractorInIndia}
              </h5>
              <div className="flex gap-4">
                <ul className="flex w-1/2 flex-col gap-3 text-base text-gray-grey">
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/swaraj-855-fe/23`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.swaraj855}
                      aria-label={translation.footer.swaraj855}
                    >
                      {translation.footer.swaraj855}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/mahindra-575-di-xp-plus/440`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.mahindra575}
                      aria-label={translation.footer.mahindra575}
                    >
                      {translation.footer.mahindra575}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/john-deere-5310-4wd/155`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.johnDeere5310}
                      aria-label={translation.footer.johnDeere5310}
                    >
                      {translation.footer.johnDeere5310}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/new-holland-3630-tx-plus/44`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.newHolland3630}
                      aria-label={translation.footer.newHolland3630}
                    >
                      {translation.footer.newHolland3630}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/powertrac-euro-50/52`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.powertracEuro50}
                      aria-label={translation.footer.powertracEuro50}
                    >
                      {translation.footer.powertracEuro50}
                    </Link>
                  </li>
                </ul>
                <ul className="flex w-1/2 flex-col gap-3 text-base text-gray-grey">
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/massey-ferguson-1035-di/47`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.masseyFerguson1035}
                      aria-label={translation.footer.masseyFerguson1035}
                    >
                      {translation.footer.masseyFerguson1035}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/swaraj-735-fe/24`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.swaraj735}
                      aria-label={translation.footer.swaraj735}
                    >
                      {translation.footer.swaraj735}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/eicher-380-super-di/38`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.eicher380}
                      aria-label={translation.footer.eicher380}
                    >
                      {translation.footer.eicher380}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/farmtrac-45-super-smart-supermaxx/929`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.farmtrac45}
                      aria-label={translation.footer.farmtrac45}
                    >
                      {translation.footer.farmtrac45}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/sonalika-di-750iii/64`}
                      className="hover:font-bold hover:text-black"
                      title={translation.footer.sonalika750}
                      aria-label={translation.footer.sonalika750}
                    >
                      {translation.footer.sonalika750}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-1">
              <h5 className="mb-1 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {translation.footer.topPopularBrands}
              </h5>
              <div className="flex gap-4">
                <ul className="flex w-1/2 flex-col text-base text-gray-grey">
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Swaraj`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.swaraj}
                      aria-label={translation.footer.swaraj}
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
                        {translation.footer.swaraj}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Mahindra`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.mahindra}
                      aria-label={translation.footer.mahindra}
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
                        {translation.footer.mahindra}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/John-deere`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.johnDeere}
                      aria-label={translation.footer.johnDeere}
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
                        {translation.footer.johnDeere}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/New-holland`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.newHolland}
                      aria-label={translation.footer.newHolland}
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
                        {translation.footer.newHolland}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Powertrac`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.powertrac}
                      aria-label={translation.footer.powertrac}
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
                        {translation.footer.powertrac}
                      </span>
                    </Link>
                  </li>
                </ul>
                <ul className="flex w-1/2 flex-col text-base text-gray-grey">
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Massey-ferguson`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.masseyFerguson}
                      aria-label={translation.footer.masseyFerguson}
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
                        {translation.footer.masseyFerguson}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Solis`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.solis}
                      aria-label={translation.footer.solis}
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
                        {translation.footer.solis}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Eicher`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.eicher}
                      aria-label={translation.footer.eicher}
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
                        {translation.footer.eicher}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Farmtrac`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.farmtrac}
                      aria-label={translation.footer.farmtrac}
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
                        {translation.footer.farmtrac}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`${langPrefix}/tractor/Sonalika`}
                      className="flex items-center gap-2.5"
                      title={translation.footer.sonalika}
                      aria-label={translation.footer.sonalika}
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
                        {translation.footer.sonalika}
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3 md:col-span-2">
              <h5 className="mb-3 inline-block border-b-[1px] border-gray-grey text-sm font-semibold text-black md:text-lg">
                {translation.about.aboutTractorGyan}
              </h5>
              <div className="flex gap-4">
                <ul className="flex gap-8 text-base text-gray-grey">
                  <li>
                    <Link
                      href={`/about`}
                      title={translation.about.aboutTitle}
                      aria-label={translation.about.aboutAria}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.about.aboutTractorGyan}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/partner`}
                      title={translation.about.partnerTitle}
                      aria-label={translation.about.partnerAria}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.about.partnerWithUs}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/tractorjunction`}
                      title={translation.about.tractorJunctionTitle}
                      aria-label={translation.about.tractorJunctionAria}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.about.tractorJunction}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/our-contacts`}
                      title={translation.about.contactUsTitle}
                      aria-label={translation.about.contactUsAria}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.about.contantUs}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/career`}
                      title={translation.about.careerTitle}
                      aria-label={translation.about.careerAria}
                      className="hover:font-bold hover:text-black"
                    >
                      {translation.about.career}
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
              <Link
                href="https://www.housegyan.com"
                className="max-w-[192px]"
                alt="house-gyan-logo"
                title="house-gyan-logo"
              >
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
            {/* Subscription Form */}
            <SubscriptionForm translation={translation} />
          </div>
          <div className="mb-4">
            <h6 className="text-sm font-semibold text-black">{translation.disclaimer.title}</h6>
            <div className="text-xs font-normal text-gray-main">
              <p>{translation.disclaimer.body1}</p>
              <span>{translation.disclaimer.body2}</span>
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

export default FooterServer;
