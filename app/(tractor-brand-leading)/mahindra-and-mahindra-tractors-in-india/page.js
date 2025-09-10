import MahindraAndMahindraTractorsPage from "@/src/features/mahindra-and-mahindra-tractors-in-india/MahindraAndMahindraTractorsPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
    return (
        <MahindraAndMahindraTractorsPage params={params} searchParams={searchParams} />
    );
}
