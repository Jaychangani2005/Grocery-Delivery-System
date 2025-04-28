import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import FeaturedProductCard from "./FeaturedProductCard";
import { Button } from "./ui/button";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { Product, CartItem } from "@/services/api";
import { toast } from "react-hot-toast";

interface FeaturedProductsProps {
  products: Product[];
  isLoading: boolean;
  cartItems?: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const FeaturedProducts = ({
  products,
  isLoading,
  cartItems = [],
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  isCartOpen,
  toggleCart,
  selectedAddress,
  isLoggedIn,
  onLoginClick,
}: FeaturedProductsProps) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.productId === productId);
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  if (isLoading) {
    return (
      <section className="pt-6 pb-3 md:py-3 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
            <div className="flex space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[45%] sm:w-[30%] md:w-[23%] lg:w-[19%]">
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-6 pb-3 md:py-3 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-display font-bold">Featured Products</h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-1">Top-rated and trending items</p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "flex-none snap-start",
                  "w-[45%] sm:w-[30%] md:w-[23%] lg:w-[19%]",
                  loaded ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <FeaturedProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onUpdateCart={onUpdateCart}
                  onRemoveFromCart={onRemoveFromCart}
                  isInCart={isProductInCart(product.id)}
                  cartQuantity={getCartQuantity(product.id)}
                  isCartOpen={isCartOpen}
                  toggleCart={toggleCart}
                  selectedAddress={selectedAddress}
                  isLoggedIn={isLoggedIn}
                  onLoginClick={onLoginClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
