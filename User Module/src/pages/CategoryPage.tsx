import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Product, productService } from "@/services/api";
import BestSellerCard from "@/components/BestSellerCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface CategoryPageProps {
  cartItems: { product: Product; quantity: number }[];
  onAddToCart: (product: Product, quantity: number) => void;
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

const CategoryPage = ({
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
}: CategoryPageProps) => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let data: Product[] = [];

        if (searchQuery) {
          // If there's a search query, use the search API
          console.log('Fetching search results for:', searchQuery);
          data = await productService.searchProducts(searchQuery);
          console.log('Search results:', data);
        } else if (category && category !== 'all') {
          // If there's a category (and it's not 'all'), fetch by category
          console.log('Fetching products for category:', category);
          data = await productService.getProductsByCategory(category);
          console.log('Category products:', data);
        } else {
          // If no search query and no specific category (or 'all'), fetch all products
          console.log('Fetching all products');
          data = await productService.getAllProducts();
          console.log('All products:', data);
        }

        console.log('Setting products state with:', data);
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
        // Show error message to user
        toast.error('Failed to fetch products. Please try again.');
      }
    };

    console.log('CategoryPage effect running with:', { category, searchQuery });
    fetchProducts();
  }, [category, searchQuery]);

  // Add debug logging for render
  console.log('CategoryPage rendering with:', {
    isLoading,
    productsCount: products.length,
    searchQuery,
    category
  });

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    if (category === 'all') {
      return 'All Products';
    }
    return category ? category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : '';
  };

  const pageTitle = getPageTitle();

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
        isCartOpen={isCartOpen}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mt-6 mb-8">{pageTitle}</h1>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="relative">
            <div
              className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={cn(
                    "flex-none snap-start",
                    "w-[45%] sm:w-[30%] md:w-[23%] lg:w-[19%]",
                    "translate-y-0 opacity-100"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <BestSellerCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onUpdateCart={onUpdateCart}
                    onRemoveFromCart={onRemoveFromCart}
                    isInCart={cartItems.some(item => item.product.id === product.id)}
                    cartQuantity={cartItems.find(item => item.product.id === product.id)?.quantity || 0}
                    toggleCart={toggleCart}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              {searchQuery 
                ? `No products found matching "${searchQuery}"`
                : "No products found in this category."}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage; 