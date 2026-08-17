import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopContent from "@/components/ShopContent";

type Props = {
    params: Promise<{
        category: string;
    }>;
};


const categoryData: Record<
    string,
    {
        name: string;
        title: string;
        description: string;
    }
> = {
    attar: {
        name: "Attars",
        title: "Attars in Nepal | Shop Premium Attars Online",
        description:
            "Shop premium alcohol-free attars online in Nepal. Discover long-lasting fragrances from Sugandha for men, women and unisex wear.",
    },

    perfume: {
        name: "Perfumes",
        title: "Perfumes in Nepal | Shop Fragrances Online",
        description:
            "Explore perfumes online in Nepal from Sugandha. Discover fruity, woody, musky and premium fragrances for every occasion.",
    },

    men: {
        name: "Men's Fragrances",
        title: "Men's Perfume & Attar in Nepal | Sugandha",
        description:
            "Explore men's perfumes and attars in Nepal. Find fresh, woody, musky and long-lasting fragrances from Sugandha.",
    },

    women: {
        name: "Women's Fragrances",
        title: "Women's Perfume & Attar in Nepal | Sugandha",
        description:
            "Explore women's perfumes and attars in Nepal. Discover elegant, sweet, fruity and long-lasting fragrances from Sugandha.",
    },

    unisex: {
        name: "Unisex Fragrances",
        title: "Unisex Perfume & Attar in Nepal | Sugandha",
        description:
            "Shop unisex perfumes and attars online in Nepal. Discover fragrances designed to be enjoyed by anyone.",
    },

    "best-seller": {
        name: "Best Sellers",
        title: "Best-Selling Perfumes & Attars in Nepal | Sugandha",
        description:
            "Discover Sugandha's best-selling perfumes and attars in Nepal. Explore popular fragrances chosen by our customers.",
    },

    new: {
        name: "New Arrivals",
        title: "New Perfumes & Attars in Nepal | Sugandha",
        description:
            "Explore the latest perfume and attar arrivals from Sugandha. Discover new fragrances available online in Nepal.",
    },

    combo: {
        name: "Combo Offers",
        title: "Perfume & Attar Combo Offers in Nepal | Sugandha",
        description:
            "Shop premium perfume and attar combo offers from Sugandha. Discover special fragrance combinations at exclusive prices.",
    },
};

export async function generateStaticParams() {
    return Object.keys(categoryData).map((category) => ({
        category,
    }));
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { category } = await params;

    const data = categoryData[category];

    if (!data) {
        return {
            title: "Category Not Found",
        };
    }

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com";

    const canonicalUrl = `${baseUrl}/shop/${category}`;

    return {
        title: data.title,

        description: data.description,

        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            type: "website",
            url: canonicalUrl,
            siteName: "Sugandha",
            title: data.title,
            description: data.description,
        },

        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.description,
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function CategoryPage({
    params,
}: Props) {
    const { category } = await params;
    const seoCategories = new Set([
        "men",
        "women",
        "unisex",
        "attar",
        "perfume",
        "new",
        "best-seller",
        "combo",
    ]);

    const data = categoryData[category];

    if (!data) {
        notFound();
    }

    const isSeoCategory = seoCategories.has(category);

    return (
        <main className="min-h-[calc(100vh-100px)] py-6 w-full">
            <ShopContent
                initialCategory={category}
                pageTitle={isSeoCategory ? data.name : "Explore Our Collection"}
                pageDescription={
                    isSeoCategory
                        ? data.description
                        : "Discover premium alcohol-free attars crafted for every personality and every occasion."
                }
                breadcrumb={
                    isSeoCategory
                        ? `Home / Shop / ${data.name}`
                        : "Home / Shop"
                }
            />
        </main>
    );
}