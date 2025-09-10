import React from 'react';
import SecondHandTractorCard from '@/src/components/ui/cards/secondHandTractorCards/SecondHandTractorCard';
import { getAllSecondHandTractorList } from '@/src/services/second-hand-tractors/allSecondHandTractorList';

/**
 * Listing for second hand mini tractors with filters and pagination
 * @param {Object} props
 * @param {string} [props.brand] - Brand filter
 * @param {string} [props.state] - State filter
 * @param {string} [props.district] - District filter
 * @param {string} [props.search] - Search keyword
 * @param {number} [props.page] - Page number (1-based)
 * @param {number} [props.itemsPerPage] - Items per page
 */
export default async function SecondHandTractorListing({
    brand = '',
    state = '',
    district = '',
    search = '',
    page = 1,
    itemsPerPage = 16,
}) {
    const start_limit = (page - 1) * itemsPerPage;
    const end_limit = itemsPerPage;

    const res = await getAllSecondHandTractorList({
        brand_name: brand,
        state,
        district,
        search_keyword: search,
        start_limit,
        end_limit,
    });

    const tractors = res?.data || [];
    const totalCount = res?.count || 0;

    if (!tractors.length) {
        return <div className="my-10 text-center md:mt-40">No Result Found</div>;
    }

    return (
        <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
            {tractors.map((tractor, idx) => (
                <SecondHandTractorCard key={tractor.id || idx} data={tractor} pageUrl={tractor.page_url} />
            ))}
        </div>
    );
}
