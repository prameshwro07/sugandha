import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopContent from "@/components/ShopContent";
import { products } from "@/lib/products"

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
        title: "Attars in Nepal | Shop Premium Attars in Nepal",
        description:
            "Shop premium alcohol-free attars in Nepal. Discover long-lasting fragrances from Sugandha for men, women, and every occasion.",
    },

    perfume: {
        name: "Perfumes",
        title: "Perfumes in Nepal | Shop Fragrances Online",
        description:
            "Explore perfumes online in Nepal from Sugandha. Discover fruity, woody, musky, and long-lasting fragrances for every occasion.",
    },

    men: {
        name: "Men's Fragrances",
        title: "Men's Perfume & Attar in Nepal | Sugandha",
        description:
            "Explore premium men's perfumes and attars in Nepal. Find fresh, woody, musky, and long-lasting fragrances from Sugandha.",
    },

    women: {
        name: "Women's Fragrances",
        title: "Women's Perfume & Attar in Nepal | Sugandha",
        description:
            "Explore premium women's perfumes and attars in Nepal. Discover sweet, fruity, elegant, and long-lasting fragrances from Sugandha.",
    },

    unisex: {
        name: "Unisex Fragrances",
        title: "Unisex Perfume & Attar in Nepal | Sugandha",
        description:
            "Shop premium unisex perfumes and attars online in Nepal. Discover elegant fragrances designed for everyone, every occasion.",
    },

    "best-seller": {
        name: "Best Sellers",
        title: "Best-Selling Perfumes & Attars in Nepal | Sugandha",
        description:
            "Discover Sugandha's best-selling perfumes and attars in Nepal. Explore popular fragrances loved by customers for lasting everyday wear.",
    },

    new: {
        name: "New Arrivals",
        title: "New Perfumes & Attars in Nepal | Sugandha",
        description:
            "Explore Sugandha's latest perfume and attar arrivals in Nepal. Discover new fragrances available online for every occasion.",
    },

    combo: {
        name: "Combo Offers",
        title: "Perfume & Attar Combo Offers in Nepal | Sugandha",
        description:
            "Shop premium perfume and attar combo offers from Sugandha. Discover special fragrance combinations at exclusive prices for gifting.",
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

    const data = categoryData[category];

    if (!data) {
        notFound();
    }

    const categoryProducts = products.filter((product) =>
        product.categories.includes(category)
    );

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com";

    const categoryUrl = `${baseUrl}/shop/${category}`;

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: data.name,
        url: categoryUrl,
        numberOfItems: categoryProducts.length,
        itemListElement: categoryProducts.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}/product/${product.slug}`,
            name: product.name,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(itemListSchema),
                }}
            />

            <main className="min-h-[calc(100vh-100px)] py-6 w-full">
                <ShopContent
                    key={category}
                    initialCategory={category}
                    pageTitle={data.name}
                    pageDescription={data.description}
                    breadcrumb={`Home / Shop / ${data.name}`}
                    categoryContent={categoryData}
                />
            </main>
        </>
    );
}