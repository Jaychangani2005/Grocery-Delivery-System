import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, productService } from "@/services/api";
import BestSellerCard from "@/components/BestSellerCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Loader2 } from "lucide-react";
import CartDrawer from "@/components/CartDrawer";

interface ProductPageProps {
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
  onPlaceOrder: (paymentMethod: string, feeComponents?: any) => void;
}

const ProductPage = ({
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
}: ProductPageProps) => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        if (productId) {
          const productData = await productService.getProductById(parseInt(productId));
          setProduct(productData);
          
          // Fetch related products from the same category
          if (productData.category) {
            const related = await productService.getProductsByCategory(productData.category);
            // Filter out the current product and limit to 4 related products
            const filteredRelated = related
              .filter(p => p.id !== productData.id)
              .slice(0, 4);
            setRelatedProducts(filteredRelated);
          }
        }
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  if (isLoading) {
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
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
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
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Product not found</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">₹{product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onAddToCart(product, 1)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="relative">
              <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {relatedProducts.map((relatedProduct, index) => (
                  <div
                    key={relatedProduct.id}
                    className={`flex-none snap-start w-[45%] sm:w-[30%] md:w-[23%] lg:w-[19%] ${
                      loaded ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <BestSellerCard
                      product={relatedProduct}
                      onAddToCart={onAddToCart}
                      onUpdateCart={onUpdateCart}
                      onRemoveFromCart={onRemoveFromCart}
                      isInCart={isProductInCart(relatedProduct.id)}
                      cartQuantity={getCartQuantity(relatedProduct.id)}
                      toggleCart={toggleCart}
                      onClick={() => handleProductClick(relatedProduct.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
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
        onPlaceOrder={onPlaceOrder}
        addresses={addresses}
        onAddressChange={onAddressChange}
      />
    </div>
  );
};

export default ProductPage; 