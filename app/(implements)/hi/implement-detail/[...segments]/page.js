import ImplementOnRoadPricePage from "@/src/features/implements/ImplementOnRoadPricePage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
    const resolvedParams = await params;
    const searchParamsPage = await searchParams;

    // URL pattern: hi/agrizone-reversible-mb-plough/plough-on-road-price/93
    const pathSegments = resolvedParams['...segments'];

    // Expect exactly 3 segments and the middle one should contain 'on-road-price'
    if (pathSegments && pathSegments.length === 3) {
        const [implementSlug, priceType, implementId] = pathSegments;

        // Validate that this is an implement on-road-price URL
        if (priceType && priceType.includes('on-road-price')) {
            return (
                <ImplementOnRoadPricePage
                    params={{
                        implementSlug,
                        priceType,
                        implementId,
                        ...resolvedParams
                    }}
                    searchParams={searchParamsPage}
                />
            );
        }
    }

    // If not matching our pattern, return null (will show 404)
    return null;
}
