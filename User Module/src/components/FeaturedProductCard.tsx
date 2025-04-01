// import { useState, useEffect } from "react";
// import { Plus, Minus, ShoppingCart } from "lucide-react";
// import { Button } from "./ui/button";
// import { cn } from "@/lib/utils";

// export interface FeaturedProduct {
//   id: number;
//   name: string;
//   weight?: string;
//   price: number;
//   image: string;
// }

// interface FeaturedProductCardProps {
//   product: FeaturedProduct;
//   onAddToCart: (product: FeaturedProduct, quantity: number) => void;
//   isInCart: boolean;
//   cartQuantity?: number;
// }

// const FeaturedProductCard = ({
//   product,
//   onAddToCart,
//   isInCart = false,
//   cartQuantity = 0,
// }: FeaturedProductCardProps) => {
//   const [quantity, setQuantity] = useState(isInCart ? cartQuantity : 1);
//   const [isAddedToCart, setIsAddedToCart] = useState(isInCart);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     setLoaded(true);
//   }, []);

//   const handleAddToCart = () => {
//     onAddToCart(product, quantity);
//     setIsAddedToCart(true);
//   };

//   const incrementQuantity = () => {
//     setQuantity((prev) => {
//       const newQuantity = Math.min(prev + 1, 10);
//       if (isAddedToCart) onAddToCart(product, newQuantity);
//       return newQuantity;
//     });
//   };

//   const decrementQuantity = () => {
//     setQuantity((prev) => {
//       const newQuantity = prev - 1;

//       if (newQuantity < 1) {
//         setIsAddedToCart(false);
//         return 1;
//       }

//       if (isAddedToCart) onAddToCart(product, newQuantity);
//       return newQuantity;
//     });
//   };

//   return (
//     <div
//       className={cn(
//         "bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden hover:shadow-md transition-shadow h-full",
//         loaded ? "opacity-100" : "opacity-0"
//       )}
//     >
//       <div className="relative">
//         <div className="relative aspect-square overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
//             onLoad={() => setLoaded(true)}
//           />
//         </div>
//       </div>

//       <div className="p-3">
//         <h3 className="font-medium text-xs sm:text-sm mt-1 mb-1 truncate">{product.name}</h3>

//         {product.weight && <p className="text-xs text-muted-foreground">{product.weight}</p>}

//         <div className="flex items-center gap-2 mb-3">
//           <span className="font-bold text-xs sm:text-sm">₹{product.price.toFixed(2)}</span>
//         </div>

//         {isAddedToCart ? (
//           <div className="flex items-center gap-2">
//             <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
//               <Button variant="ghost" size="icon" className="h-8 w-8" onClick={decrementQuantity}>
//                 <Minus className="h-4 w-4" />
//               </Button>
//               <span className="w-10 text-center text-sm font-medium select-none">{quantity}</span>
//               <Button variant="ghost" size="icon" className="h-8 w-8" onClick={incrementQuantity} disabled={quantity >= 10}>
//                 <Plus className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <Button size="sm" className="rounded-md h-8 text-xs w-full transition-all" onClick={handleAddToCart}>
//             <ShoppingCart className="h-4 w-4 mr-1" />
//             Add to Cart
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProductCard;




import { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export interface FeaturedProduct {
  id: number;
  name: string;
  weight?: string;
  price: number;
  image?: string; // Image is now optional
}

interface FeaturedProductCardProps {
  product: FeaturedProduct;
  onAddToCart: (product: FeaturedProduct, quantity: number) => void;
  isInCart: boolean;
  cartQuantity?: number;
}

const FeaturedProductCard = ({
  product,
  onAddToCart,
  isInCart = false,
  cartQuantity = 0,
}: FeaturedProductCardProps) => {
  const [quantity, setQuantity] = useState(isInCart ? cartQuantity : 1);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAddedToCart(true);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = Math.min(prev + 1, 10);
      if (isAddedToCart) onAddToCart(product, newQuantity);
      return newQuantity;
    });
  };

  const decrementQuantity = () => {
    setQuantity((prev) => {
      const newQuantity = prev - 1;

      if (newQuantity < 1) {
        setIsAddedToCart(false);
        return 1;
      }

      if (isAddedToCart) onAddToCart(product, newQuantity);
      return newQuantity;
    });
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden hover:shadow-md transition-shadow h-full",
        loaded ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="relative">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={
              !imageError && product.image
                ? product.image
                : "https://via.placeholder.com/300?text=No+Image"
            }
            alt={product.name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-xs sm:text-sm mt-1 mb-1 truncate">
          {product.name}
        </h3>

        {product.weight && (
          <p className="text-xs text-muted-foreground">{product.weight}</p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-xs sm:text-sm">₹{product.price.toFixed(2)}</span>
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
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeaturedProductCard;
