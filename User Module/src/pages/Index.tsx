import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Truck, Clock, Leaf, ShieldCheck, ShoppingCart, ChevronRight, Search, Minus, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productService, cartService, userService, categoryService, Product, CartItem, Order, Category, orderService, PlaceOrderData, Address } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import BestSellerCard from "@/components/BestSellerCard";

interface IndexProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  isLoggedIn: boolean;
  user: { name: string; email: string; id: number } | null;
  onLogout: () => void;
  selectedAddress: string;
  onAddressChange: (address: string) => void;
  onLoginClick: () => void;
  addresses: Address[];
  onPlaceOrder: (paymentMethod: string) => void;
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
  const { categoryName, productId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{ [key: number]: Product[] }>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const isMobile = useIsMobile();

  // Helper functions for cart
  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

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
        
        // If we have a product ID, fetch that specific product
        if (productId) {
          try {
            const product = await productService.getProductById(parseInt(productId));
            setSelectedProduct(product);
            
            // Fetch related products from the same category
            if (product.category) {
              const related = await productService.getProductsByCategory(product.category);
              // Filter out the current product and limit to 4 related products
              const filteredRelated = related
                .filter(p => p.id !== product.id)
                .slice(0, 4);
              setRelatedProducts(filteredRelated);
            }
          } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to load product details');
            navigate('/');
          }
          return;
        }
        
        // If we have a category name in the URL, fetch products for that category
        if (categoryName) {
          const category = categoriesData.find(cat => 
            cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === categoryName.toLowerCase()
          );
          if (category) {
            const products = await productService.getProductsByCategory(category.id);
            setCategoryProducts({ [category.id]: products });
          }
        } else {
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
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryName, productId, navigate]);

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

  // Remove redundant cart handling functions and use the ones from props
  const handleAddToCartWrapper = async (product: Product, quantity: number) => {
    if (!isLoggedIn || !user) {
      onLoginClick();
      return;
    }
    try {
      await onAddToCart(product, quantity);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add item to cart');
    }
  };

  const handleUpdateCartWrapper = async (productId: number, quantity: number) => {
    if (!isLoggedIn || !user) return;
    try {
      await onUpdateCart(productId, quantity);
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(error.message || 'Failed to update cart');
    }
  };

  const handleRemoveFromCartWrapper = async (productId: number) => {
    if (!isLoggedIn || !user) return;
    try {
      await onRemoveFromCart(productId);
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error(error.message || 'Failed to remove item from cart');
    }
  };

  const handlePlaceOrder = async (paymentMethod: string) => {
    if (!user || !selectedAddress) {
      toast.error('Please select an address and ensure you are logged in');
      return;
    }

    try {
      // Find the selected address object with safety checks
      const selectedAddressObj = selectedAddress && addresses.length > 0
        ? addresses.find(addr => addr && addr.address_id && addr.address_id.toString() === selectedAddress)
        : undefined;

      if (!selectedAddressObj) {
        toast.error('Invalid address selected');
        return;
      }

      const orderData: PlaceOrderData = {
        userId: user.id,
        items: cartItems.map(item => ({
          id: item.id,
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          product: item.product
        })),
        addressId: selectedAddressObj.address_id,
        paymentMethod: paymentMethod,
        total: cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };

      await orderService.placeOrder(orderData);
      toast.success('Order placed successfully');
      navigate('/orders');
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

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
    if (imagePath.startsWith('http')) return imagePath;
    // If the image path is relative, prepend the backend URL
    return `http://localhost:5000${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  };

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
      <main className="flex-grow pt-16 md:pt-20">
        {productId ? (
          // Show product details
          isLoading ? (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-200 aspect-square rounded-lg"></div>
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : selectedProduct ? (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative aspect-square">
                    <img
                      src={getImageUrl(selectedProduct.image)}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        console.error('Image failed to load:', selectedProduct.image);
                        console.error('Attempted URL:', getImageUrl(selectedProduct.image));
                        e.currentTarget.src = "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
                      }}
                    />
                    {selectedProduct.oldPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white border-none text-xs font-medium px-2 py-0.5">
                        -{Math.round(((selectedProduct.oldPrice - selectedProduct.price) / selectedProduct.oldPrice) * 100)}%
                      </Badge>
                    )}
                    {selectedProduct.isOrganic && (
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white border-none text-xs font-medium px-2 py-0.5">
                        Organic
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{selectedProduct.name}</h1>
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-2xl text-primary font-medium">₹{selectedProduct.price.toFixed(2)}</p>
                      {selectedProduct.oldPrice && (
                        <p className="text-lg text-muted-foreground line-through">
                          ₹{selectedProduct.oldPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-6">{selectedProduct.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-sm text-muted-foreground">Unit: {selectedProduct.unit}</span>
                      <span className="text-sm text-muted-foreground">Stock: {selectedProduct.stock}</span>
                    </div>
                    {isProductInCart(selectedProduct.id) ? (
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 flex items-center justify-center p-0"
                            onClick={() => handleUpdateCartWrapper(selectedProduct.id, getCartQuantity(selectedProduct.id) - 1)}
                            disabled={getCartQuantity(selectedProduct.id) <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center text-lg font-medium select-none">
                            {getCartQuantity(selectedProduct.id)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 flex items-center justify-center p-0"
                            onClick={() => handleUpdateCartWrapper(selectedProduct.id, getCartQuantity(selectedProduct.id) + 1)}
                            disabled={getCartQuantity(selectedProduct.id) >= 10 || !selectedProduct.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-gray-700">
                          Total: ₹{(selectedProduct.price * getCartQuantity(selectedProduct.id)).toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleAddToCartWrapper(selectedProduct, 1)}
                        className="w-full md:w-auto"
                        size="lg"
                        disabled={!selectedProduct.stock}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {selectedProduct.stock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Related Products Section */}
              {relatedProducts.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 py-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold mb-8">More from {selectedProduct.category}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {relatedProducts.map((product) => (
                        <div key={product.id} className="flex-none">
                          <BestSellerCard
                            product={product}
                            onAddToCart={handleAddToCartWrapper}
                            onUpdateCart={handleUpdateCartWrapper}
                            onRemoveFromCart={handleRemoveFromCartWrapper}
                            isInCart={isProductInCart(product.id)}
                            cartQuantity={getCartQuantity(product.id)}
                            toggleCart={toggleCart}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
              <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/')}>Return to Home</Button>
            </div>
          )
        ) : (
          <>
            {!isMobile && !categoryName && <div className="h-[40vh] md:h-[50vh]"><FullScreenSlider /></div>}
            {!categoryName && <CategoryGrid categories={categories} />}

            {!categoryName && (
              <BestSellers
                products={bestSellers}
                isLoading={isLoading}
                cartItems={cartItems}
                onAddToCart={handleAddToCartWrapper}
                onUpdateCart={handleUpdateCartWrapper}
                onRemoveFromCart={handleRemoveFromCartWrapper}
                isCartOpen={isCartOpen}
                toggleCart={toggleCart}
                selectedAddress={selectedAddress}
                isLoggedIn={isLoggedIn}
                onLoginClick={onLoginClick}
              />
            )}

            {categoryName ? (
              // Show only the selected category's products
              categories.map(category => {
                const formattedCategoryName = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                if (formattedCategoryName === categoryName) {
                  return (
                    <CategoryProducts
                      key={category.id}
                      categoryId={category.name.toLowerCase()}
                      categoryName={category.name}
                      description={`Explore our ${category.name.toLowerCase()} collection`}
                      products={categoryProducts[category.id] || []}
                      cartItems={cartItems}
                      onAddToCart={handleAddToCartWrapper}
                      onUpdateCart={handleUpdateCartWrapper}
                      onRemoveFromCart={handleRemoveFromCartWrapper}
                      isCartOpen={isCartOpen}
                      toggleCart={toggleCart}
                      selectedAddress={selectedAddress}
                      isLoggedIn={isLoggedIn}
                      onLoginClick={onLoginClick}
                    />
                  );
                }
                return null;
              })
            ) : (
              // Show all categories on the home page
              categories.map(category => (
                <CategoryProducts
                  key={category.id}
                  categoryId={category.name.toLowerCase()}
                  categoryName={category.name}
                  description={`Explore our ${category.name.toLowerCase()} collection`}
                  products={categoryProducts[category.id] || []}
                  cartItems={cartItems}
                  onAddToCart={handleAddToCartWrapper}
                  onUpdateCart={handleUpdateCartWrapper}
                  onRemoveFromCart={handleRemoveFromCartWrapper}
                  isCartOpen={isCartOpen}
                  toggleCart={toggleCart}
                  selectedAddress={selectedAddress}
                  isLoggedIn={isLoggedIn}
                  onLoginClick={onLoginClick}
                />
              ))
            )}

            {!categoryName && (
              <>
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
              </>
            )}
          </>
        )}
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
        updateQuantity={handleUpdateCartWrapper}
        removeFromCart={handleRemoveFromCartWrapper}
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
