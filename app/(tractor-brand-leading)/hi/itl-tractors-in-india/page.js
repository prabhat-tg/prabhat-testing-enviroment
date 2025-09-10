import ItlTractorsPage from "@/src/features/itl-tractor-in-india/itlTractorsPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
    return (
        <ItlTractorsPage params={params} searchParams={searchParams} />
    );
}
