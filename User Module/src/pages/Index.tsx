import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import FullScreenSlider from "@/components/FullScreenSlider";
import CategoryGrid from "@/components/CategoryGrid";
import BestSellers from "@/components/BestSellers";
import AttaRiceDal from "@/components/AttaRiceDal";
import MasalaOil from "@/components/MasalaOil";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Truck, Clock, Leaf, ShieldCheck, ShoppingCart, ChevronRight, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BestSellerProduct } from "@/components/BestSellerCard";

interface IndexProps {
  cartItems: BestSellerProduct[];
  onAddToCart: (product: BestSellerProduct, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  selectedAddress: string;
  onAddressChange: (address: string) => void;
  onLoginClick: () => void;
  addresses: string[];
  onPlaceOrder: () => void;
}

const Index = ({
  cartItems,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  isCartOpen,
  toggleCart,
  isLoggedIn,
  user,
  onLogout,
  selectedAddress,
  onAddressChange,
  onLoginClick,
  addresses,
  onPlaceOrder,
}: IndexProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const benefits = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Free Delivery",
      description: "Free delivery on orders over ₹50"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Same-Day Delivery",
      description: "Order by 2pm for same-day delivery"
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "Fresh Produce",
      description: "We source directly from local farms"
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Quality Guarantee",
      description: "Not satisfied? Get a full refund"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        toggleCart={toggleCart} 
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        selectedAddress={selectedAddress}
        onAddressChange={onAddressChange}
      />
      <main className="flex-grow pt-16 md:pt-20">
        {!isMobile && <div className="h-[40vh] md:h-[50vh]"><FullScreenSlider /></div>}

        <CategoryGrid />

        <BestSellers
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCart={onUpdateCart}
          onRemoveFromCart={onRemoveFromCart}
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
          selectedAddress={selectedAddress}
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
        />

        <AttaRiceDal
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCart={onUpdateCart}
          onRemoveFromCart={onRemoveFromCart}
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
          selectedAddress={selectedAddress}
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
        />

        <MasalaOil
          cartItems={cartItems}
          onAddToCart={onAddToCart}
          onUpdateCart={onUpdateCart}
          onRemoveFromCart={onRemoveFromCart}
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
          selectedAddress={selectedAddress}
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
        />

        {/* <FeaturedProducts /> */}

        <section className="py-10 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-3xl font-display font-bold mb-2 md:mb-4">
                Why Choose ApnaKirana
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best grocery delivery experience with quality products and exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl p-4 md:p-6 border shadow-soft text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mx-auto w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-3 md:mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-medium text-sm md:text-lg mb-1 md:mb-2">{benefit.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-20 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 md:p-12 flex flex-col justify-center">
                  <span className="text-xs md:text-sm text-primary font-medium mb-2">Download Our App</span>
                  <h2 className="text-xl md:text-3xl font-display font-bold mb-3 md:mb-4">
                    Shop Groceries On The Go
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    Get exclusive app-only deals and manage your deliveries with ease.
                    Download the ApnaKirana app today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on App Store"
                      className="h-8 md:h-10 w-auto"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-8 md:h-10 w-auto"
                    />
                  </div>
                </div>
                <div className="relative h-48 md:h-64 lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-multiply z-10"></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585232350744-4a33512e28e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80')] bg-cover bg-center"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Global Cart Summary Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center">
          <Button
            onClick={toggleCart}
            className="w-5/6 shadow-lg font-medium text-sm px-6 py-5 bg-primary"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        updateQuantity={onUpdateCart}
        removeFromCart={onRemoveFromCart}
        selectedAddress={selectedAddress}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onPlaceOrder={onPlaceOrder}
        addresses={addresses}
        onAddressChange={onAddressChange}
      />
    </div>
  );
};

export default Index;
