import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 86
  },
  {
    id: 2,
    name: "Dairy & Eggs",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 42
  },
  {
    id: 3,
    name: "Bakery",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 38
  },
  {
    id: 4,
    name: "Meat & Seafood",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 54
  },
  {
    id: 5,
    name: "Pantry",
    image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 112
  },
  {
    id: 6,
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1620705337377-5aa9535351f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 67
  },
  {
    id: 7,
    name: "Frozen Foods",
    image: "https://images.unsplash.com/photo-1580982327559-c1e24a2978f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 45
  },
  {
    id: 8,
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
    count: 78
  }
];

const CategorySection = () => {
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScroll);
      }
    };
  }, [loaded]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;
    
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div className={cn(
            "transition-all duration-500",
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Find what you need in our curated collections</p>
          </div>
          <div className={cn(
            "transition-all duration-500 delay-150",
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            <div className="hidden md:flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
                onClick={() => scrollTo('left')}
                disabled={!canScrollLeft}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
                onClick={() => scrollTo('right')}
                disabled={!canScrollRight}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            <Link 
              to="/categories" 
              className="text-sm font-medium text-primary underline-offset-4 hover:underline md:hidden"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={cn(
                  "flex-none w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5 snap-start transition-all duration-700",
                  loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `₹{150 + index * 50}ms` }}
              >
                <Link 
                  to={`/categories/₹{category.id}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-square bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0 z-10"></div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                      <span className="text-xs text-white/80">{category.count} items</span>
                      <h3 className="font-medium text-white">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Gradient fades on sides for scrolling indication */}
          <div className="absolute top-0 bottom-4 left-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-4 right-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>

        {/* Mobile navigation buttons */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={() => scrollTo('left')}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={() => scrollTo('right')}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
