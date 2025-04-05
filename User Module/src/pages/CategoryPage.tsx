import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/services/api";
import BestSellerCard from "@/components/BestSellerCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Loader2 } from "lucide-react";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/api/products/category/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  const formattedCategoryName = category ? category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : '';

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
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>{formattedCategoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mt-6 mb-8">{formattedCategoryName}</h1>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <BestSellerCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onUpdateCart={onUpdateCart}
                onRemoveFromCart={onRemoveFromCart}
                isInCart={cartItems.some(item => item.product.id === product.id)}
                cartQuantity={cartItems.find(item => item.product.id === product.id)?.quantity || 0}
                toggleCart={toggleCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage; 