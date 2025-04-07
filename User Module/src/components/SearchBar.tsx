import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { productService } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface SearchBarProps {
  onClose?: () => void;
  className?: string;   
}

const SearchBar = ({ onClose, className }: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      console.log("Searching for:", query);
      
      // Call the search API
      const results = await productService.searchProducts(query.trim());
      console.log("Search results:", results);
      
      // Navigate to search results page
      navigate(`/category/all?search=${encodeURIComponent(query.trim())}`);
      
      // Close search dropdown
      setIsFocused(false);
      
      // Close search bar on mobile after submitting
      if (onClose && window.innerWidth < 768) {
        onClose();
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setIsVisible(true);
    setHasInteracted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setHasInteracted(true);
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsFocused(false);
    handleSubmit(new Event('submit') as any);
  };

  const recentSearches = ["organic apples", "milk", "whole wheat bread", "avocados"];

  const popularCategories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Bakery",
    "Meat & Seafood",
    "Organic",
  ];

  // Only show dropdown when focused AND has interacted (clicked or typed)
  const shouldShowDropdown = isFocused && hasInteracted;

  return (
    <div className={cn("w-full relative", className)}>
      <form 
        onSubmit={handleSubmit}
        className="relative"
      >
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for products, categories, brands..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={cn(
            "w-full pl-10 pr-14 py-2 border rounded-full bg-background transition-all duration-300",
            isFocused ? "shadow-soft ring-1 ring-primary/20" : ""
          )}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={() => setQuery("")}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
        
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 hover:bg-primary hover:text-primary-foreground rounded-full transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <ArrowRight className="h-3.5 w-3.5" />
          )}
        </Button>
      </form>

      {shouldShowDropdown && (
        <div 
          ref={dropdownRef}
          className={cn(
            "absolute z-50 w-full mt-1 bg-white dark:bg-gray-950 shadow-lg rounded-lg p-4 max-h-80 overflow-y-auto",
            isVisible ? "animate-fade-in" : "animate-fade-out"
          )}
        >
          {query ? (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-2">Suggested Products</h3>
              <ul className="space-y-1.5">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <button 
                      className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-sm flex items-center justify-between group"
                      onClick={() => selectSuggestion(`Suggested Product ${i} for "${query}"`)}
                    >
                      <span>Suggested Product {i} for "<strong>{query}</strong>"</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2">Recent Searches</h3>
                  <ul className="space-y-1.5">
                    {recentSearches.map((search, i) => (
                      <li key={i}>
                        <button 
                          className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-sm flex items-center justify-between group"
                          onClick={() => selectSuggestion(search)}
                        >
                          <span>{search}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <h3 className="text-xs font-medium text-muted-foreground mb-2">Popular Categories</h3>
                <ul className="space-y-1.5">
                  {popularCategories.map((category, i) => (
                    <li key={i}>
                      <button 
                        className="w-full text-left px-2 py-1.5 rounded-md hover:bg-accent text-sm flex items-center justify-between group"
                        onClick={() => selectSuggestion(category)}
                      >
                        <span>{category}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
