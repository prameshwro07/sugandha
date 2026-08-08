import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import  ProductSuggestions from "@/components/ProductSuggestions";
import { SiteFooter } from "@/components/SiteFooter";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductPage({
    params,
}: Props) {

    const { slug } = await params;

    const product = getProductBySlug(slug);

    if (!product) notFound();

    return (
        <>
        <section className="mx-auto max-w-5xl px-8 py-10">

            <div className="grid gap-12 lg:grid-cols-2">

                <ProductGallery product={product} />
                <ProductInfo product={product} />


            </div>

        </section>

        <ProductSuggestions product={product}  />
        </>
    );
}