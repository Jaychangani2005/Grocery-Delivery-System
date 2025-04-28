import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import BestSellerCard from "./BestSellerCard";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import { Badge } from "@/components/ui/badge";
import { Product, CartItem } from "@/services/api";

interface BestSellersProps {
  products: Product[];
  isLoading: boolean;
  cartItems: { product: Product; quantity: number }[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const BestSellers = ({
  products,
  isLoading,
  cartItems,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  isCartOpen,
  toggleCart,
  selectedAddress,
  isLoggedIn,
  onLoginClick,
}: BestSellersProps) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="pt-6 pb-3 md:py-3 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-display font-bold">
            Best Sellers
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-1">
            Our most popular products based on sales
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "flex-none snap-start",
                  "w-[45%] sm:w-[30%] md:w-[23%] lg:w-[19%]",
                  loaded ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
                )}
                style={{ transitionDelay: `₹{index * 50}ms` }}
              >
                <BestSellerCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onUpdateCart={onUpdateCart}
                  onRemoveFromCart={onRemoveFromCart}
                  isInCart={cartItems.some(item => item.product.id === product.id)}
                  cartQuantity={cartItems.find(item => item.product.id === product.id)?.quantity || 0}
                  toggleCart={toggleCart}
                  onClick={() => handleProductClick(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems.map(item => ({
          ...item,
          product: item.product
        }))}
        updateQuantity={onUpdateCart}
        removeFromCart={onRemoveFromCart}
        selectedAddress={selectedAddress}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onPlaceOrder={() => {}}
        addresses={[]}
        onAddressChange={() => {}}
      />
    </section>
  );
};

export default BestSellers;
