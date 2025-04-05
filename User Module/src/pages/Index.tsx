import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Hero from "@/components/Hero";
import FullScreenSlider from "@/components/FullScreenSlider";
import CategoryGrid from "@/components/CategoryGrid";
import BestSellers from "@/components/BestSellers";
import CategoryProducts from "@/components/CategoryProducts";
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
import { productService, cartService, userService, categoryService, Product, CartItem, Order, Category } from "@/services/api";

interface IndexProps {
  cartItems: CartItem[];
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
  const [isLoading, setIsLoading] = useState(false);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{ [key: number]: Product[] }>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch categories and best sellers
        const [categoriesData, bestSellersData] = await Promise.all([
          categoryService.getAllCategories(),
          productService.getBestSellers()
        ]);
        
        setCategories(categoriesData);
        setBestSellers(bestSellersData.slice(0, 10)); // Show top 10 best sellers
        
        // Fetch products for each category
        const productsPromises = categoriesData.map(category => 
          productService.getProductsByCategory(category.id)
        );
        
        const productsData = await Promise.all(productsPromises);
        const categoryProductsMap: { [key: number]: Product[] } = {};
        
        categoriesData.forEach((category, index) => {
          categoryProductsMap[category.id] = productsData[index];
        });
        
        setCategoryProducts(categoryProductsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        setIsLoading(true);
        await productService.searchProducts(searchTerm.trim());
        navigate(`/category/all?search=${encodeURIComponent(searchTerm.trim())}`);
      } catch (error) {
        console.error('Error searching products:', error);
        toast.error('Failed to search products');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddToCart = async (product: Product, quantity: number) => {
    if (!isLoggedIn) {
      onLoginClick();
      return;
    }

    onAddToCart(product, quantity);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cartItems,
        address: selectedAddress,
        paymentMethod: 'cod' as const
      };
      await cartService.placeOrder(orderData);
      onPlaceOrder();
      toast.success('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
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

        <CategoryGrid categories={categories} />

        <BestSellers
          products={bestSellers}
          isLoading={isLoading}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCart={onUpdateCart}
          onRemoveFromCart={onRemoveFromCart}
          isCartOpen={isCartOpen}
          toggleCart={toggleCart}
          selectedAddress={selectedAddress}
          isLoggedIn={isLoggedIn}
          onLoginClick={onLoginClick}
        />

        {categories.map(category => (
          <CategoryProducts
            key={category.id}
            categoryId={category.name.toLowerCase()}
            categoryName={category.name}
            description={`Explore our ${category.name.toLowerCase()} collection`}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCart={onUpdateCart}
            onRemoveFromCart={onRemoveFromCart}
            isCartOpen={isCartOpen}
            toggleCart={toggleCart}
            selectedAddress={selectedAddress}
            isLoggedIn={isLoggedIn}
            onLoginClick={onLoginClick}
          />
        ))}

        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {benefit.description}
                    </p>
                  </div>
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
        onPlaceOrder={handlePlaceOrder}
        addresses={addresses}
        onAddressChange={onAddressChange}
      />
    </div>
  );
};

export default Index;
