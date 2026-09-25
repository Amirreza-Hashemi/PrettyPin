import { useParams } from "react-router-dom"; // ← جدید
import Footer from "../../components/footer/Footer.jsx";
import Container from "../../components/common/Container.jsx";
import Breadcrumb from "../../components/common/Breadcrumb.jsx";
import ProductGallery from "../../components/product/gallery/ProductGallery.jsx";
import ProductInfo from "../../components/product/info/ProductInfo.jsx";
import TrustBadges from "../../components/product/TrustBadges.jsx";
import ProductTabs from "../../components/product/tabs/ProductTabs.jsx";
import { getProductById } from "../../data/products.js";
import MainHeader from "../../components/layout/MainHeader.jsx";
import {useState} from "react";
import MobileMenu from "../../components/layout/MobileMenu.jsx";
import FooterTrustBadges from "../../components/footer/FooterTrustBadges.jsx";
import FooterBottom from "../../components/footer/FooterBottom.jsx";

const ProductDetailsPage = () => {
    const { id } = useParams(); // id همان چیزی است که در URL بعد از /products/ آمده
    const product = getProductById(id);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // اگر با یک id نامعتبر وارد این صفحه شویم (مثلاً لینک خراب)
    if (!product) {
        return (
            <>
                <MainHeader
                    isMenuOpen={isMenuOpen}
                    onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
                />
                <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                <div className="py-20 text-center text-gray-500">محصول مورد نظر یافت نشد.</div>
                <Footer />
            </>
        );
    }

    const breadcrumbItems = [
        { label: "خانه", href: "/" },
        { label: product.category.label, href: product.category.href },
        { label: product.title },
    ];



    return (
        <>
            <MainHeader
                isMenuOpen={isMenuOpen}
                onMenuToggle={() => setIsMenuOpen((prev) => !prev)}
            />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div dir="rtl" className="py-6 sm:py-8">
                <Container>
                    <div className="mb-6">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        <ProductGallery images={product.images} badge={product.badge} />
                        <ProductInfo product={product} />
                    </div>

                    <div className="mt-8">
                        <TrustBadges />
                    </div>

                    <div className="mt-10">
                        <ProductTabs product={product} />
                    </div>
                </Container>
            </div>

            <footer dir="rtl" className="bg-gray-900 pt-10 sm:pt-14">
                <Container>
                    <div className="border-t border-gray-800 pt-8">
                        <h4 className="mb-4 text-right text-sm font-bold text-white">نمادهای اعتماد</h4>
                        <FooterTrustBadges />
                    </div>

                    <div className="mt-8 pb-8">
                        <FooterBottom />
                    </div>
                </Container>
            </footer>
        </>
    );
};

export default ProductDetailsPage;