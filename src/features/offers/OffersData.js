import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import OffersDataContianer from './OffersDataContianer';

const OfferData = ({ translation }) => {
  return (
    <>
      <section>
        <TittleAndCrumbs
          title={'Home'}
          breadcrumbs={[
            {
              label: `Home`,
              href: '/',
              title: `Home`,
            },
            {
              label: `Offers`,
              title: `Offers`,
              isCurrent: true,
            },
          ]}
        />
        <div>
          <OffersDataContianer translation={translation} />
        </div>
      </section>
    </>
  );
};
export default OfferData;
