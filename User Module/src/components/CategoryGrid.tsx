import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Category } from "@/services/api";
import { useState } from "react";

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const isMobile = useIsMobile();
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (categoryName: string) => {
    setImageErrors(prev => ({ ...prev, [categoryName]: true }));
  };

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
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group block overflow-hidden rounded-xl shadow-soft hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[1.2/1] md:aspect-[5/3]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                <img 
                  src={imageErrors[category.name] 
                    ? "/placeholder.svg" 
                    : `http://localhost:5000/images/${category.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  onError={() => handleImageError(category.name)}
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