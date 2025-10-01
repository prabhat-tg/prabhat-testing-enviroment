import TractorImplementBrandSubTypePage from "@/src/features/implements/TractorImplementBrandSubTypePage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
    return (
        <TractorImplementBrandSubTypePage params={params} searchParams={searchParams} />
    );
}
