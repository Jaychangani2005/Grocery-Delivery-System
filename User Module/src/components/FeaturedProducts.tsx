// import { useState, useEffect, useRef } from "react";
// import { cn } from "@/lib/utils";
// import ProductCard, { ProductProps } from "./ProductCard";
// import { Button } from "@/components/ui/button";

// const featuredProducts: ProductProps[] = [
//   {
//     id: 1,
//     name: "Organic Avocado",
//     description: "Fresh organic avocados from California",
//     price: 2.99,
//     oldPrice: 3.99,
//     image: "https://images.unsplash.com/photo-1592151945055-97c8cc08cbe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Fruits & Vegetables",
//     rating: 4.8,
//     isOrganic: true,
//     unit: "each"
//   },
//   {
//     id: 2,
//     name: "Fresh Strawberries",
//     description: "Sweet and juicy strawberries, perfect for desserts",
//     price: 4.99,
//     image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Fruits & Vegetables",
//     rating: 4.5,
//     unit: "pack"
//   },
//   {
//     id: 3,
//     name: "Whole Grain Bread",
//     description: "Freshly baked whole grain bread, perfect for sandwiches",
//     price: 3.49,
//     oldPrice: 4.29,
//     image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Bakery",
//     rating: 4.6,
//     unit: "loaf"
//   },
//   {
//     id: 4,
//     name: "Free Range Eggs",
//     description: "Farm fresh free-range eggs from happy chickens",
//     price: 5.99,
//     image: "https://images.unsplash.com/photo-1551292831-023188e78222?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Dairy & Eggs",
//     rating: 4.9,
//     isOrganic: true,
//     unit: "dozen"
//   },
//   {
//     id: 5,
//     name: "Organic Milk",
//     description: "Fresh organic whole milk from pasture-raised cows",
//     price: 4.49,
//     image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Dairy & Eggs",
//     rating: 4.7,
//     isOrganic: true,
//     unit: "half-gallon"
//   },
//   {
//     id: 6,
//     name: "Wild-caught Salmon",
//     description: "Fresh wild-caught salmon fillets, never frozen",
//     price: 12.99,
//     oldPrice: 15.99,
//     image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Meat & Seafood",
//     rating: 4.8,
//     unit: "lb"
//   },
//   {
//     id: 7,
//     name: "Organic Spinach",
//     description: "Fresh organic baby spinach, pre-washed and ready to eat",
//     price: 3.99,
//     image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Fruits & Vegetables",
//     rating: 4.5,
//     isOrganic: true,
//     unit: "bag"
//   },
//   {
//     id: 8,
//     name: "Local Honey",
//     description: "Pure, raw, unfiltered honey from local beekeepers",
//     price: 8.99,
//     image: "https://images.unsplash.com/photo-1582127532153-31b5b7779363?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
//     category: "Pantry",
//     rating: 4.9,
//     unit: "jar"
//   }
// ];

// const FeaturedProducts = () => {
//   const [loaded, setLoaded] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setLoaded(true);
//   }, []);

//   return (
//     <div className="py-10 md:py-14 bg-accent/50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-end mb-6">
//           <div className="opacity-100">
//             <h2 className="text-2xl md:text-3xl font-display font-bold">Featured Products</h2>
//             <p className="text-muted-foreground mt-2">Handpicked selections for you</p>
//           </div>
//           <div className="opacity-100">
//             <Button 
//               variant="link" 
//               className="text-primary text-sm font-medium"
//               asChild
//             >
//               <a href="/shop">View All</a>
//             </Button>
//           </div>
//         </div>

//         <div className="relative">
//           <div 
//             ref={scrollRef}
//             className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {featuredProducts.map((product, index) => (
//               <div
//                 key={product.id}
//                 className={cn(
//                   "flex-none snap-start",
//                   "w-[40%] sm:w-[28%] md:w-[25%] lg:w-[20%]",
//                   loaded ? "opacity-100" : "opacity-0"
//                 )}
//               >
//                 <ProductCard {...product} />
//               </div>
//             ))}
//           </div>

//           <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-accent/50 to-transparent pointer-events-none"></div>
//           <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-accent/50 to-transparent pointer-events-none"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;





import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import FeaturedProductCard from "./FeaturedProductCard";
import { featuredProducts } from "@/data/featuredProducts";
import { Button } from "./ui/button";
import { ShoppingCart, ChevronRight } from "lucide-react";

interface CartItem {
  productId: number;
  quantity: number;
}

const FeaturedProducts = ({ toggleCart }: { toggleCart: () => void }) => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const addToCart = (product: any, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity } : item
        );
      } else {
        return [...prev, { productId: product.id, quantity }];
      }
    });
  };

  const isProductInCart = (productId: number) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  return (
    <section className="pt-6 pb-3 md:py-3 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-display font-bold">Featured Products</h2>
          <p className="text-muted-foreground text-xs md:text-sm mt-1">Top-rated and trending items</p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "flex-none snap-start",
                  "w-[45%] sm:w-[30%] md:w-[23%] lg:w-[19%]",
                  loaded ? "translate-y-0 opacity-100" : "translate-y-0 opacity-0"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <FeaturedProductCard
                  product={product}
                  onAddToCart={addToCart}
                  isInCart={isProductInCart(product.id)}
                  cartQuantity={getCartQuantity(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
