import React from 'react';
import CommunityCardServer from './CommunityCardServer';
import { modifiedSubsCount } from '@/src/utils';
import { getV2SocialMediaCount } from '@/src/services/social/V2SocialMediaCount';
import { getSelectedLanguage } from '@/src/services/locale';
import HandleError from '../HandleError/HandleError';
import CommunityCardSkeleton from '../../ui/listingSkeleton/CommunityCardSkeleton';

const JoinOurCommunityServer = async ({ translation }) => {
  let isError = false;
  let response;
  const prefLang = await getSelectedLanguage();
  const payload = {
    lang: prefLang,
  };

  try {
    response = await getV2SocialMediaCount(payload);
    isError = false;
  } catch {
    isError = true;
  }

  return (
    <section className="bg-green-lighter">
      <div className="container">
        <h4 className="mb-4 text-center text-xl font-semibold md:mb-8 md:text-2xl">
          {translation.community.joinOurCommunity}
        </h4>
        <div className="flex w-full flex-wrap justify-between gap-2 sm:justify-center md:gap-3">
          {isError ? (
            <HandleError
              isNoData={!response || response.length === 0}
              title={translation?.error_messages?.UnablefetchData}
              description={translation?.error_messages?.tryAgainLater}
            />
          ) : !response ? (
            <CommunityCardSkeleton />
          ) : (
            response.map((val, index) => (
              <CommunityCardServer
                key={index}
                linkUrl={val.url}
                imgUrl={`https://images.tractorgyan.com/uploads/${val.image_url}`}
                title={val.name}
                followers={modifiedSubsCount(val.count)}
                text={val.label}
                followersText={val.type}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinOurCommunityServer;
