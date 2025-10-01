import ImplementOnRoadPricePage from "@/src/features/implements/ImplementOnRoadPricePage";
import "../../../../tyreGlobals.css";

export const dynamic = "force-dynamic";

// This handles URLs like: hi/agrizone-reversible-mb-plough/plough-on-road-price/93
export default async function page({ params, searchParams }) {
    const resolvedParams = await params;
    const searchParamsPage = await searchParams;

    const brandModel = resolvedParams['brand-model']; // This would be the implement slug
    const priceType = resolvedParams['price-type'];
    const implementId = resolvedParams['implement-id'];

    // Only handle if this is actually an implement on-road-price URL
    if (priceType && priceType.includes('on-road-price') && !priceType.includes('tractor')) {
        return (
            <ImplementOnRoadPricePage
                params={{
                    implementSlug: brandModel, // Rename for clarity in the component
                    priceType,
                    implementId,
                    ...resolvedParams
                }}
                searchParams={searchParamsPage}
            />
        );
    }

    // If not our pattern, return null
    return null;
}
