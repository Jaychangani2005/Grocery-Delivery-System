// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "./ui/button";
// import { useIsMobile } from "@/hooks/use-mobile";

// const slides = [
//   {
//     image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
//     title: "Fresh Seasonal Produce",
//     description: "Shop our selection of locally-sourced fruits and vegetables",
//     buttonText: "Shop Now",
//     buttonLink: "/shop/produce",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
//     title: "Artisan Bakery",
//     description: "Freshly baked bread and pastries delivered to your door",
//     buttonText: "View Bakery",
//     buttonLink: "/shop/bakery",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1543168256-418811576931?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80",
//     title: "Special Offers",
//     description: "Save up to 30% on premium organic groceries this week",
//     buttonText: "See Offers",
//     buttonLink: "/offers",
//   },
// ];

// const FullScreenSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const isMobile = useIsMobile();

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Hide on mobile devices
//   if (isMobile) {
//     return null;
//   }

//   return (
//     <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={cn(
//             "absolute inset-0 w-full h-full transition-opacity duration-1000",
//             currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
//           )}
//         >
//           <div className="absolute inset-0 bg-black/40 z-10"></div>
//           <div
//             className="absolute inset-0 bg-cover bg-center z-0"
//             style={{ backgroundImage: `url(${slide.image})` }} // ✅ Fixed here
//           ></div>
//           <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
//             <div className="max-w-3xl text-center space-y-4">
//               <h2 className="text-2xl md:text-4xl font-display font-bold leading-tight">{slide.title}</h2>
//               <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">{slide.description}</p>
//               <Button size="lg" className="mt-3 rounded-full px-6" asChild>
//                 <a href={slide.buttonLink}>{slide.buttonText}</a>
//               </Button>
//             </div>
//           </div>
//         </div>
//       ))}

//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft size={24} />
//       </button>

//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
//         aria-label="Next slide"
//       >
//         <ChevronRight size={24} />
//       </button>

//       <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={cn(
//               "w-2.5 h-2.5 rounded-full transition-all",
//               currentSlide === index ? "bg-white scale-110" : "bg-white/50"
//             )}
//             aria-label={`Go to slide ${index + 1}`} // ✅ Fixed here
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FullScreenSlider;




import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const slides = [
  {
    // image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=800&q=80",
    image: "https://i.ibb.co/7x3HVZ8d/bannerslider.png",
    title: "Premium Atta, Rice & More",
    description: "Discover our finest selection of kitchen staples for authentic home cooking",
    buttonText: "Shop Grocery Essentials",
    buttonLink: "/category/atta-rice-dal",
  },
  {
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=800&q=80",
    title: "Delight Your Loved Ones",
    description: "Handpicked chocolates and sweets to sweeten every occasion",
    buttonText: "Explore Chocolates",
    buttonLink: "/category/chocolates",
  },
  {
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=800&q=80",
    title: "Complete Your Home Needs",
    description: "Everything you need for a clean, organized, and comfortable home",
    buttonText: "Browse Home Essentials",
    buttonLink: "/category/home-essential",
  },
];

const FullScreenSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
            <div className="max-w-3xl text-center space-y-4">
              <h2 className="text-2xl md:text-4xl font-display font-bold leading-tight">
                {slide.title}
              </h2>
              <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
                {slide.description}
              </p>
              <Button size="lg" className="mt-3 rounded-full px-6" asChild>
                <a href={slide.buttonLink}>{slide.buttonText}</a>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              currentSlide === index ? "bg-white scale-110" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenSlider;