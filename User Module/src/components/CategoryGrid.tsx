// import { Link } from "react-router-dom";
// import { useIsMobile } from "@/hooks/use-mobile";

// const categories = [
//   {
//     id: 1,
//     name: "Atta, Rice & Pulses",
//     image: "https://images.unsplash.com/photo-1594489573123-9e4c15e2a05c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "200+ items",
//     link: "/category/pantry"
//   },
//   {
//     id: 2,
//     name: "Fresh Fruits",
//     image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "125+ items",
//     link: "/category/fresh-fruits"
//   },
//   {
//     id: 3,
//     name: "Vegetables",
//     image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "150+ items",
//     link: "/category/vegetables"
//   },
//   {
//     id: 4,
//     name: "Dairy",
//     image: "https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "80+ items",
//     link: "/category/dairy-eggs"
//   },
//   {
//     id: 5,
//     name: "Snacks",
//     image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "65+ items",
//     link: "/category/bakery"
//   },
//   {
//     id: 6,
//     name: "Beverages",
//     image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "110+ items",
//     link: "/category/beverages"
//   },
//   {
//     id: 7,
//     name: "Snacks",
//     image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "90+ items",
//     link: "/category/meat-seafood"
//   },
//   {
//     id: 8,
//     name: "Household",
//     image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "75+ items",
//     link: "/category/household"
//   }
// ];

// const CategoryGrid = () => {
//   const isMobile = useIsMobile();

//   return (
//     <section className={`py-8 md:py-16 ${isMobile ? 'mt-4' : ''}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mt-5 mb-6 md:mb-10 md:mt-24">
//           <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4">
//             Shop by Category
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Explore our wide selection of fresh and high-quality products
//           </p>
//         </div>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
//           {categories.map((category) => (
//             <Link 
//               key={category.id}
//               to={category.link}
//               className="group block overflow-hidden rounded-xl shadow-soft hover:shadow-lg transition-all duration-300"
//             >
//               <div className="relative overflow-hidden aspect-[1.2/1] md:aspect-[5/3]">
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
//                 <img 
//                   src={category.image} 
//                   alt={category.name}
//                   className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 z-20 text-white">
//                   <h3 className="font-medium text-sm md:text-lg">{category.name}</h3>
//                   {/* <p className="text-xs md:text-sm text-white/80">{category.count}</p> */}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryGrid;



// import { Link } from "react-router-dom";
// import { useIsMobile } from "@/hooks/use-mobile";

// const categories = [
//   {
//     id: 1,
//     name: "Atta, Rice & Pulses",
//     image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "200+ items",
//     link: "/category/pantry"
//   },
//   {
//     id: 2,
//     name: "Fresh Fruits",
//     image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "125+ items",
//     link: "/category/fresh-fruits"
//   },
//   {
//     id: 3,
//     name: "Vegetables",
//     image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "150+ items",
//     link: "/category/vegetables"
//   },
//   {
//     id: 4,
//     name: "Dairy",
//     image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "80+ items",
//     link: "/category/dairy-eggs"
//   },
//   {
//     id: 5,
//     name: "Snacks",
//     image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "65+ items",
//     link: "/category/snacks"
//   },
//   {
//     id: 6,
//     name: "Beverages",
//     image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "110+ items",
//     link: "/category/beverages"
//   },
//   {
//     id: 7,
//     name: "Masalas, Oil & More",
//     image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "120+ items",
//     link: "/category/masalas-oil"
//   },
//   {
//     id: 8,
//     name: "Household",
//     image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
//     count: "75+ items",
//     link: "/category/household"
//   }
// ];

// const CategoryGrid = () => {
//   const isMobile = useIsMobile();

//   return (
//     <section className={`py-8 md:py-16 ${isMobile ? 'mt-4' : ''}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mt-5 mb-6 md:mb-10 md:mt-24">
//           <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4">
//             Shop by Category
//           </h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Explore our wide selection of fresh and high-quality products
//           </p>
//         </div>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
//           {categories.map((category) => (
//             <Link 
//               key={category.id}
//               to={category.link}
//               className="group block overflow-hidden rounded-xl shadow-soft hover:shadow-lg transition-all duration-300"
//             >
//               <div className="relative overflow-hidden aspect-[1.2/1] md:aspect-[5/3]">
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
//                 <img 
//                   src={category.image} 
//                   alt={category.name}
//                   className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 z-20 text-white">
//                   <h3 className="font-medium text-sm md:text-lg">{category.name}</h3>
//                   {/* <p className="text-xs md:text-sm text-white/80">{category.count}</p> */}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryGrid;





import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  {
    id: 1,
    name: "Atta, Rice & Dal",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "200+ items",
    link: "/category/atta-rice-dal"
  },
  {
    id: 2,
    name: "Masala, Oil & More",
    image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "150+ items",
    link: "/category/masala-oil-more"
  },
  {
    id: 3,
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "120+ items",
    link: "/category/snacks"
  },
  {
    id: 4,
    name: "Cold Drinks & Juices",
    image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "90+ items",
    link: "/category/cold-drinks-juices"
  },
  {
    id: 5,
    name: "Tea, Coffee & More",
    image: "https://images.unsplash.com/photo-1428660386617-8d277e7deaf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "80+ items",
    link: "/category/tea-coffee-more"
  },
  {
    id: 6,
    name: "Bakery & Biscuit",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "70+ items",
    link: "/category/bakery-biscuit"
  },
  {
    id: 7,
    name: "Chocolates",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "60+ items",
    link: "/category/chocolates"
  },
  {
    id: 8,
    name: "Home Essential",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
    count: "100+ items",
    link: "/category/home-essential"
  }
];

const CategoryGrid = () => {
  const isMobile = useIsMobile();

  return (
    <section className={`py-8 md:py-16 ${isMobile ? 'mt-4' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mt-5 mb-6 md:mb-10 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 md:mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide selection of fresh and high-quality products
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={category.link}
              className="group block overflow-hidden rounded-xl shadow-soft hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[1.2/1] md:aspect-[5/3]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 z-20 text-white">
                  <h3 className="font-medium text-sm md:text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;