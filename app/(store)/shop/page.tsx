import ShopContent from "@/components/ShopContent";

type ShopPageProps = {
    searchParams: Promise<{
        category?: string;
    }>;
};

export default async function ShopPage({
    searchParams,
}: ShopPageProps) {
    const params = await searchParams;

    return (
        <main className="min-h-[calc(100vh-100px)] py-6 w-full">
            <ShopContent initialCategory={params.category || "all"} />
        </main>
    );
}