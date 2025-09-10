import TafeTractorsPage from "@/src/features/tafe-tractor-in-india/TafeTractorsPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
    return (
        <TafeTractorsPage params={params} searchParams={searchParams} />
    );
}
