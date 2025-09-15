import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import DisclaimerCard from '../cards/DisclaimerCard';
import StocksList from './StocksList';
import GoogleAdHorizontalClientWrapper from '../../social/GoogleAdHorizontal/GoogleAdHorizontalClientWrapper';
import GoogleAdVerticalClientWrapper from '../../social/GoogleAdVertical/GoogleAdVerticalClientWrapper';


const StocksSummary = ({ isMobile }) => {

    return (
        <section className='pt-3'>
            <div className="container">
                <TittleAndCrumbs
                    title={`Stock Summary`}
                    breadcrumbs={[
                        { label: "Home", href: "/", title: "Home" },
                        {
                            label: "Stock Summary",
                            title: "Stock Summary",
                            isCurrent: true,
                        },
                    ]}
                />
                <div className="flex max-md:flex-col gap-6">
                    <div className="flex-1">
                        <StocksList />
                    </div>
                    <div className="w-full md:w-1/4">
                        <DisclaimerCard />
                        <div className="lg:max-w-[300px]">
                            {isMobile ? (
                                <GoogleAdHorizontalClientWrapper />
                            ) : (
                                <GoogleAdVerticalClientWrapper />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StocksSummary; 