import AgricultureFarmEquipmentIndiaPage from '@/src/features/AgricultureFarmEquipmentIndia/AgricultureFarmEquipmentIndiaPage';

export const dynamic = "force-dynamic";

export default async function page({ params, searchParams }) {
    return (
        <AgricultureFarmEquipmentIndiaPage params={params} searchParams={searchParams} />
    );
}
