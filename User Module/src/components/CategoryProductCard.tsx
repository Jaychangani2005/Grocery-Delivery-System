import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Product } from "@/services/api";
import { toast } from "sonner";

// Constants
const IMAGE_BASE_URL = 'http://localhost:5000'; // Backend static files server URL

interface CategoryProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isInCart: boolean;
  cartQuantity: number;
  toggleCart: () => void;
  onClick?: () => void;
}

const CategoryProductCard = ({
  product,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  isInCart,
  cartQuantity,
  toggleCart,
  onClick,
}: CategoryProductCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setIsUpdating(true);
      await onAddToCart(product, 1);
      toast.success(`${product.name} added to cart`);
      toggleCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add item to cart');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  const handleUpdateQuantity = async (e: React.MouseEvent, newQuantity: number) => {
    e.stopPropagation();
    try {
      setIsUpdating(true);
      if (newQuantity === 0) {
        await onRemoveFromCart(product.id);
        toast.success(`${product.name} removed from cart`);
      } else {
        await onUpdateCart(product.id, newQuantity);
        toast.success(`Quantity updated to ${newQuantity}`);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(error.message || 'Failed to update cart');
    } finally {
      setIsUpdating(false);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
    if (imagePath.startsWith('http')) return imagePath;
    return `${IMAGE_BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden hover:shadow-md transition-shadow h-full cursor-pointer",
        loaded ? "opacity-100" : "opacity-0"
      )}
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="relative aspect-square overflow-hidden">
          {!imageError ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
              onLoad={() => setLoaded(true)}
              onError={(e) => {
                console.error('Image failed to load:', product.image);
                console.error('Attempted URL:', getImageUrl(product.image));
                setImageError(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <span className="text-gray-400 dark:text-gray-500 text-sm">Image not available</span>
            </div>
          )}
        </div>
        {product.oldPrice && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white border-none text-xs font-medium px-2 py-0.5">
            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
          </Badge>
        )}
        {product.isOrganic && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-white border-none text-xs font-medium px-2 py-0.5">
            Organic
          </Badge>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-xs sm:text-sm mt-1 mb-1 truncate">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-xs sm:text-sm">₹{product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {isInCart ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex items-center justify-center p-0"
                onClick={(e) => handleUpdateQuantity(e, cartQuantity - 1)}
                disabled={isUpdating || cartQuantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium select-none">
                {cartQuantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex items-center justify-center p-0"
                onClick={(e) => handleUpdateQuantity(e, cartQuantity + 1)}
                disabled={isUpdating || cartQuantity >= 10 || !product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            className="rounded-md h-8 text-xs w-full transition-all"
            onClick={handleAddToCart}
            disabled={isUpdating || !product.stock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.stock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CategoryProductCard; 