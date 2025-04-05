// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Star } from "lucide-react";

// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     description: "This is a detailed description of Product 1.",
//     price: 199.99,
//     oldPrice: 249.99,
//     image: "/images/product1.jpg",
//     category: "Fruits",
//     rating: 4.5,
//     isOrganic: true,
//     unit: "1kg",
//   },
//   // Add more products here
// ];

// const ProductDetail = () => {
//   const { id } = useParams();
//   const product = products.find((p) => p.id === Number(id));

//   if (!product) {
//     return <div className="text-center text-xl">Product not found</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full h-80 object-cover rounded-md"
//       />
//       <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
//       <p className="text-gray-600 mt-2">{product.description}</p>
//       <div className="flex items-center mt-2">
//         <span className="text-xl font-bold">₹{product.price.toFixed(2)}</span>
//         {product.oldPrice && (
//           <span className="text-gray-500 line-through ml-2">₹{product.oldPrice.toFixed(2)}</span>
//         )}
//       </div>
//       <div className="flex items-center mt-2">
//         <span className="text-yellow-500">{product.rating}</span>
//         <Star className="w-4 h-4 text-yellow-500 ml-1" />
//       </div>
//       <Button className="mt-4 w-full">Add to Cart</Button>
//     </div>
//   );
// };

// export default ProductDetail;



// no need