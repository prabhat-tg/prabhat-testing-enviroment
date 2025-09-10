// "use client";
import CommunityCard from "@/src/features/tyreComponents/components/joinOurCommunity/CommunityCard";
import React from "react";
// import { useTranslation } from "react-i18next";
// import '../../i18n'

const JoinOurCommunity = ({ translation, currentLang }) => {
  // const { t, i18n } = useTranslation();
  // const currentLang = i18n.language;
  currentLang = currentLang === "hi" ? "/hi" : "";
  return (
    <section className="bg-green-lighter">
      <div className="container pb-8 pt-8">
        <h4 className="mb-4 text-center text-xl font-semibold md:mb-8 md:text-2xl">
          {translation?.community.joinOurCommunity}
        </h4>
        <div className="flex w-full flex-wrap justify-center gap-2 md:gap-3">
          <CommunityCard
            linkUrl={"https://www.facebook.com/TractorsGyan"}
            imgUrl={
              "https://images.tractorgyan.com/uploads/114305/66b35aff52251-Facebook.webp"
            }
            title={"facebook"}
            followers={"676k"}
            text={"followTractorGyanOn"}
            followersText={"followers"}
            translation={translation}
          />
          {/* <CommunityCard linkUrl={"https://news.google.com/publications/CAAqBwgKMKPPmQswzdmxAw?ceid=IN:en&oc=3"} imgUrl={"https://images.tractorgyan.com/uploads/114311/66b36625bca03-Google-News.webp"} title={'googleNews'} followers={'1.5k'} text={'followTractorGyanOn'} followersText={'followers'} /> */}
          <CommunityCard
            linkUrl={"https://www.instagram.com/tractorgyan"}
            imgUrl={
              "https://images.tractorgyan.com/uploads/114306/66b35b307282e-Instagram.webp"
            }
            title={"instagram"}
            followers={"83k"}
            text={"followTractorGyanOn"}
            followersText={"followers"}
            translation={translation}
          />
          <CommunityCard
            linkUrl={"https://www.youtube.com/@TractorGyan"}
            imgUrl={
              "https://images.tractorgyan.com/uploads/114310/66b3657aaba5e-Youtube.webp"
            }
            title={"youtube"}
            followers={"241k"}
            text={"subscribeTractorGyan"}
            followersText={"subscribers"}
            translation={translation}
          />
          <CommunityCard
            linkUrl={"https://twitter.com/TractorGyan"}
            imgUrl={
              "https://images.tractorgyan.com/uploads/114309/66b365489611f-X.png"
            }
            title={"twitter"}
            followers={"1k"}
            text={"followTractorGyanOn"}
            followersText={"followers"}
            translation={translation}
          />
          <CommunityCard
            linkUrl={"https://whatsapp.com/channel/0029VaBrPnQBKfi99fRpOJ1e"}
            imgUrl={
              "https://images.tractorgyan.com/uploads/114308/66b3652663abb-Whatsapp.webp"
            }
            title={"whatsapp"}
            followers={"1k"}
            text={"followTractorGyanOn"}
            followersText={"followers"}
            translation={translation}
          />
          <CommunityCard
            linkUrl={"https://www.linkedin.com/company/tractorgyan"}
            imgUrl={
              "https://images.tractorgyan.com/uploads/114307/66b361eeedc07-Linkedin.webp"
            }
            title={"linkedin"}
            followers={"10k"}
            text={"followTractorGyanOn"}
            followersText={"followers"}
            translation={translation}
          />
        </div>
      </div>
    </section>
  );
};

export default JoinOurCommunity;
