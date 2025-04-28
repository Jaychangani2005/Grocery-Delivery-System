import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import BestSellerCard from "./BestSellerCard";
import CartDrawer from "./CartDrawer";
import { Product, CartItem, productService } from "@/services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface CategoryProductsProps {
  categoryId: string | number;  // Allow both string and number
  categoryName: string;
  description: string;
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const CategoryProducts = ({
  categoryId,
  categoryName,
  description,
  cartItems,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  isCartOpen,
  toggleCart,
  selectedAddress,
  isLoggedIn,
  onLoginClick,
}: CategoryProductsProps) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching products for category:', categoryId, categoryName);
        const identifier = typeof categoryId === 'number' ? categoryId : categoryName.toLowerCase();
        const categoryProducts = await productService.getProductsByCategory(identifier);
        console.log('Fetched products:', categoryProducts);
        // Only set products if there are any available with stock
        const availableProducts = categoryProducts.filter(p => p.stock > 0);
        setProducts(availableProducts); // Show all available products
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    setLoaded(true);
  }, [categoryId, categoryName]);

  // Don't render anything if there are no products and we're not loading
  if (!isLoading && products.length === 0) {
    return null;
  }

  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.productId === productId);
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading) {
    return (
      <section className="pt-6 pb-3 md:py-3 bg-white dark:bg-gray-800">
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
    <section className="pt-6 pb-3 md:py-3 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-display font-bold">
            {categoryName}
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-1">
            {description}
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
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <BestSellerCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onUpdateCart={onUpdateCart}
                  onRemoveFromCart={onRemoveFromCart}
                  isInCart={isProductInCart(product.id)}
                  cartQuantity={getCartQuantity(product.id)}
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
        cartItems={cartItems}
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

export default CategoryProducts;