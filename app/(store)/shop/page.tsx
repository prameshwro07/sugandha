import ShopContent from "@/components/ShopContent";

export default function ShopPage() {
    return (
        <main className="min-h-[calc(100vh-100px)] py-6 w-full">
            <ShopContent
                initialCategory="all"
                pageTitle="Explore Our Collection"
                pageDescription="Discover premium perfumes and attar crafted for every personality, occasion, and unforgettable moment with lasting fragrance."
                breadcrumb="Home / Shop"
            />
        </main>
    );
}