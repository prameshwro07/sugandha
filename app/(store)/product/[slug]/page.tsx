import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductSuggestions from "@/components/ProductSuggestions";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    const product = getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com";

    const productUrl = `${baseUrl}/product/${product.slug}`;

    const primaryCategory =
  product.categories.find((category) =>
    ["attar", "perfume", "men", "women", "unisex"].includes(category)
  ) ?? "attar";

const categoryName =
  primaryCategory.charAt(0).toUpperCase() +
  primaryCategory.slice(1);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",

  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Shop",
      item: `${baseUrl}/shop`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: categoryName,
      item: `${baseUrl}/shop/${primaryCategory}`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: product.name,
      item: productUrl,
    },
  ],
};

    const title = `${product.name} | Sugandha Nepal`;

    const description =
        product.description ||
        `${product.name}. Shop this fragrance online from Sugandha in Nepal.`;

    const imageUrl = product.images[0]
        ? `${baseUrl}${product.images[0]}`
        : undefined;

    return {
        title,
        description,

        alternates: {
            canonical: productUrl,
        },

        openGraph: {
            type: "website",
            url: productUrl,
            siteName: "Sugandha",
            title,
            description,
            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        alt: product.name,
                    },
                ]
                : undefined,
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: imageUrl ? [imageUrl] : undefined,
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function ProductPage({
    params,
}: Props) {
    const { slug } = await params;

    const product = getProductBySlug(slug);

    if (!product) notFound();

    const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com";

    const productUrl = `${baseUrl}/product/${product.slug}`;

    const imageUrls = product.images.map((image) =>
        image.startsWith("http")
            ? image
            : `${baseUrl}${image}`
    );

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",

        name: product.name,

        description: product.description,

        image: imageUrls,

        sku: product.id,

        brand: {
            "@type": "Brand",
            name: "Sugandha",
        },

        category: product.categories.join(", "),

        offers: {
            "@type": "Offer",

            url: productUrl,

            priceCurrency: "NPR",

            price: product.price,

            availability:
                product.stockStatus === "in-stock"
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",

            seller: {
                "@type": "Organization",
                name: "Sugandha",
                url: baseUrl,
            },
        },

        aggregateRating:
            product.reviews > 0
                ? {
                    "@type": "AggregateRating",
                    ratingValue: product.rating,
                    reviewCount: product.reviews,
                }
                : undefined,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema),
                }}
            />

            <section className="mx-auto max-w-5xl px-8 py-10">
                <div className="grid gap-12 lg:grid-cols-2">
                    <ProductGallery product={product} />
                    <ProductInfo product={product} />
                </div>
            </section>

            <ProductSuggestions product={product} />
        </>
    );
}