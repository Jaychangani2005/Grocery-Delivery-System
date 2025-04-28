import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";
import { BestSellerProduct } from "./BestSellerCard";
import AddressSearch from "./AddressSearch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from '@/hooks/use-cart';
import { authService } from '@/services/auth';

interface NavbarProps {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  selectedAddress: string;
  onAddressChange: (address: string) => void;
  cartItems: any[];
  isCartOpen: boolean;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  user,
  onLogout,
  selectedAddress,
  onAddressChange,
  cartItems,
  isCartOpen,
  toggleCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getCartQuantity } = useCart();

  // Handle scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 bg-white",
        isScrolled ? "shadow-sm py-2" : "py-3"
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout: Address, Cart, Profile */}
        <div className="flex items-center justify-between mb-2 md:mb-0">
          {/* Logo - Hidden on mobile, visible on desktop */}
          <Link to="/" className="hidden md:flex items-center flex-shrink-0">
            <span className="font-display text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-grocery-green to-grocery-light-green">
              {/* ApnaKirana */}
              ApnaKirana
            </span>
          </Link>

          {/* Location Selector */}
          <div className="flex items-center flex-shrink-0 order-1">
            <AddressSearch
              selectedAddress={selectedAddress}
              onAddressChange={onAddressChange}
            />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-grow mx-4">
            <SearchBar className="w-full" />
          </div>

          {/* Actions: Cart & Profile */}
          <div className="flex items-center gap-5 order-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-transparent"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Button>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-transparent"
                  >
                    <User className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/addresses" className="flex items-center cursor-pointer">
                      <MapPinned className="mr-2 h-4 w-4" />
                      <span>Saved Addresses</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="font-medium shadow-button transition-transform duration-300 hover:shadow-lg hover:-translate-y-0.5"
                asChild
              >
                <Link to="/auth">
                  <User className="h-4 w-4 mr-0 md:mr-2" />
                  <span className="hidden md:inline">Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mb-1">
          <SearchBar className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
