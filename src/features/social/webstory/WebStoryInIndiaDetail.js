import SeoHead from '@/src/components/shared/header/SeoHead';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import { getBrandWebStoryDetails } from '@/src/services/social/WebstoryDetail';

export const config = {
  amp: true,
};

export default async function WebStoryDetailsPage({ params }) {
  const currentSlug = params.slug;

  let storyData = [];
  let seoDescription;

  try {
    const payload = {
      slug: currentSlug,
    };

    const seoPayload = {
      slug: currentSlug,
      page_type: 'webstory_detail',
    };

    const storyDetails = await getBrandWebStoryDetails(payload);
    storyData = await storyDetails?.data;

    const seoVideoDetails = await getDetailPageHeaderSEO(seoPayload);

    seoDescription = await seoVideoDetails?.data;
  } catch (error) {
    console.error('Error fetching brand story data:', error);
    throw error;
  }

  const cover = storyData[0];
  const slides = storyData?.slice(1);

  const ampCustomStyles = `
    .amp-story-main-container{
          font-size: 13px;
          font-family: tj-regular;
          line-height: 24px;
          color: #333;
          letter-spacing: .2px
        }
        .main_img { object-fit: cover; animation: none;  }
        .slide-overlay-gradient {
          padding: 20px;
          color: white;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
        }
        .main_img {
          width: 720px;
          height: 1280px;
         }
        #cover0 :nth-child(1 of .main_img) {
          width: 720px;
          height: 1280px;
          animation: none; 
        }
        .fix-item {
          position: absolute;
          bottom: 30px;
          width: 100%;
          text-align: center;
        }
        .second-fix-item{
           position: absolute;
          bottom: 80px;
          width: 90%;
          text-align: left;
          padding-left: 40px;
          }
          .second-fix-item p {
        font-family: 'Oswald',sans-serif;
        }  
        .fit-item p {
        font-family: 'Oswald',sans-serif;
        }  
        h1, h2 { font-size: 22px; line-height: 30px; padding: 0px 20px; font-weight: bold; font-family: tj-bold;}
        p { font-size: 16px;font-family: 'Oswald',sans-serif; padding-top: 7px; }
        a { color: white; font-weight: bold; text-decoration: underline; }
        .logo-containers {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 99999999;
        }
  `;

  return (
    <>
      <SeoHead
        seo={{}}
        staticMetadata={{}}
        preloadUrls={[]}
        seoWebDetailsHTMLDescription={seoDescription}
      />
      <style {...{ 'amp-boilerplate': '' }}>{`...`}</style>
      <noscript>
        <style {...{ 'amp-boilerplate': '' }}>{`...`}</style>
      </noscript>
      <style amp-custom="" dangerouslySetInnerHTML={{ __html: ampCustomStyles }} />

      <div className="amp-story-main-container" suppressHydrationWarning>
        <amp-story
          suppressHydrationWarning
          standalone
          title={cover?.title || ''}
          publisher="Tractorgyan"
          publisher-logo-src="https://images.tractorgyan.com/uploads/smm/images/tractorgyan-whitelogo.png"
          poster-portrait-src={`https://images.tractorgyan.com/uploads/${cover?.featured_image}`}
        >
          {/* Cover Page */}
          <amp-story-page id="cover0" auto-advance-after="10s">
            <amp-story-grid-layer template="fill">
              <amp-img
                src={`https://images.tractorgyan.com/uploads/${cover?.featured_image}`}
                width="720"
                height="1280"
                layout="responsive"
                alt={cover?.title}
              />
            </amp-story-grid-layer>

            <a href="https://tractorgyan.com" className="logo-containers" title="tractorgyan">
              <amp-img
                data-hero
                width="100"
                height="100"
                layout="fixed"
                src="https://images.tractorgyan.com/uploads/smm/images/tractorgyan-sticker-logo.png"
                alt="tractorgyan"
              ></amp-img>
            </a>

            <amp-story-grid-layer template="vertical" className="slide-overlay-gradient">
              <div className="fix-item">
                <h1>{cover?.title}</h1>
                <p>
                  Published{' '}
                  {new Date(cover?.publish_date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </amp-story-grid-layer>
          </amp-story-page>

          {/* Slides */}
          {slides?.length > 0 &&
            slides?.map((item, index) => (
              <amp-story-page key={item.id} id={`slide-${index + 1}`} auto-advance-after="12s">
                <amp-story-grid-layer template="fill">
                  <amp-img
                    src={`https://images.tractorgyan.com/uploads/${item?.featured_image}`}
                    width="720"
                    height="1280"
                    layout="responsive"
                    alt={item.title || `Slide ${index + 1}`}
                    className="main_img"
                  />
                </amp-story-grid-layer>
                <amp-story-grid-layer template="vertical" className="slide-overlay-gradient">
                  <div className="second-fix-item">
                    {/* {item.button_text && <h2>{item.button_text}</h2>} */}
                    {item.story_description && (
                      <p animate-in="fade-in" animate-in-duration="4.5s">
                        {item.story_description}
                      </p>
                    )}
                  </div>
                </amp-story-grid-layer>
                {item.redirect_url && (
                  <amp-story-page-outlink
                    layout="nodisplay"
                    theme="custom"
                    cta-accent-element="background"
                    cta-accent-color="darkgreen"
                  >
                    <a href={item.redirect_url}>{item.button_text || 'Read more'}</a>
                  </amp-story-page-outlink>
                )}
              </amp-story-page>
            ))}
        </amp-story>
      </div>
    </>
  );
}
