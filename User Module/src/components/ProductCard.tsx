import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BestSellerProduct } from "./BestSellerCard";

export interface ProductProps extends BestSellerProduct {
  onAddToCart: (product: BestSellerProduct, quantity: number) => void;
  toggleCart: () => void;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  category,
  inStock = true,
  unit = "each",
  onAddToCart,
  toggleCart,
}: ProductProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddedToCart(true);
    onAddToCart(
      {
        id,
        name,
        description,
        price,
        image,
        category,
        unit,
        quantity: 1,
      },
      1
    );
    toggleCart();
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => {
      const newQuantity = Math.min(prev + 1, 10);
      onAddToCart(
        {
          id,
          name,
          description,
          price,
          image,
          category,
          unit,
          quantity: newQuantity,
        },
        newQuantity
      );
      return newQuantity;
    });
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => {
      if (prev === 1) {
        setIsAddedToCart(false);
        return 1;
      }
      const newQuantity = prev - 1;
      onAddToCart(
        {
          id,
          name,
          description,
          price,
          image,
          category,
          unit,
          quantity: newQuantity,
        },
        newQuantity
      );
      return newQuantity;
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`, {
      state: {
        id,
        name,
        description,
        price,
        image,
        category,
        inStock,
        unit,
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
        </div>

        {isAddedToCart ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex items-center justify-center p-0"
                onClick={decrementQuantity}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium select-none">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex items-center justify-center p-0"
                onClick={incrementQuantity}
                disabled={quantity >= 10}
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