import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BestSellerProduct } from "./BestSellerCard";

export interface ProductProps extends BestSellerProduct {
  onAddToCart: (product: BestSellerProduct, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  toggleCart: () => void;
  isInCart?: boolean;
  cartQuantity?: number;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  oldPrice,
  image,
  category,
  inStock = true,
  unit = "each",
  weight,
  origin,
  shelfLife,
  isOrganic,
  rating,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  toggleCart,
  isInCart = false,
  cartQuantity = 0,
}: ProductProps) => {
  const [quantity, setQuantity] = useState(isInCart ? cartQuantity : 1);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    setIsAddedToCart(isInCart);
    if (isInCart) {
      setQuantity(cartQuantity);
    }
  }, [isInCart, cartQuantity]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const product: BestSellerProduct = {
      id,
      name,
      description,
      price,
      oldPrice,
      image,
      category,
      inStock,
      unit,
      weight,
      origin,
      shelfLife,
      isOrganic,
      rating,
      quantity: 1
    };
    onAddToCart(product, 1);
    setIsAddedToCart(true);
    toggleCart();
  };

  const handleIncrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = Math.min(quantity + 1, 10);
    setQuantity(newQuantity);
    onUpdateCart(id, newQuantity);
  };

  const handleDecrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity <= 1) {
      onRemoveFromCart(id);
      setIsAddedToCart(false);
      setQuantity(1);
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateCart(id, newQuantity);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`, {
      state: {
        id,
        name,
        description,
        price,
        oldPrice,
        image,
        category,
        inStock,
        unit,
        weight,
        origin,
        shelfLife,
        isOrganic,
        rating
      },
    });
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
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-xs sm:text-sm mt-1 mb-1 truncate">
          {name}
        </h3>

        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-xs sm:text-sm">₹{price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-xs text-gray-500 line-through">₹{oldPrice.toFixed(2)}</span>
          )}
        </div>

        {isAddedToCart ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDecrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium select-none">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleIncrementQuantity} disabled={quantity >= 10}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            size="sm"
            className="rounded-md h-8 text-xs w-full transition-all"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;