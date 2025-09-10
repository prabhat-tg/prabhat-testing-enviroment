import EscortAndEscortTractorsPage from "@/src/features/escort-and-escort-tractors-in-india/EscortAndEscortTractorsPage";

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
    return (
        <EscortAndEscortTractorsPage params={params} searchParams={searchParams} />
    );
}
