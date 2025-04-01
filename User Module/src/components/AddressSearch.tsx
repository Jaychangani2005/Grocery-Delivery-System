import React, { useState, useRef, useEffect } from "react";
import { Command } from "cmdk";
import {
  MapPin,
  Loader2,
  Navigation,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

interface Address {
  id: string;
  mainText: string;
  secondaryText: string;
  fullAddress: string;
}

interface AddressSearchProps {
  selectedAddress: string;
  onAddressChange: (address: string) => void;
}

// Mock data for address suggestions
const mockAddressSuggestions: Address[] = [
  {
    id: "1",
    mainText: "Bandra West",
    secondaryText: "Mumbai, Maharashtra",
    fullAddress: "Bandra West, Mumbai, Maharashtra - 400050",
  },
  {
    id: "2",
    mainText: "Andheri East",
    secondaryText: "Mumbai, Maharashtra",
    fullAddress: "Andheri East, Mumbai, Maharashtra - 400069",
  },
  {
    id: "3",
    mainText: "Powai",
    secondaryText: "Mumbai, Maharashtra",
    fullAddress: "Powai, Mumbai, Maharashtra - 400076",
  },
];

const AddressSearch: React.FC<AddressSearchProps> = ({
  selectedAddress,
  onAddressChange,
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Address[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.length >= 3) {
      // Simulate API call for address suggestions
      const filteredSuggestions = mockAddressSuggestions.filter(
        (address) =>
          address.mainText.toLowerCase().includes(inputValue.toLowerCase()) ||
          address.secondaryText.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleDetectLocation = async () => {
    setIsDetecting(true);
    try {
      if ("geolocation" in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // Simulate reverse geocoding with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mock detected address
        const detectedAddress = "Detected: Mumbai, Maharashtra - 400001";
        onAddressChange(detectedAddress);
        setOpen(false);
        
        toast({
          title: "Location detected",
          description: "Your location has been successfully detected.",
        });
      } else {
        throw new Error("Geolocation is not supported");
      }
    } catch (error) {
      toast({
        title: "Location detection failed",
        description: "Please enter your address manually or try again.",
        variant: "destructive",
      });
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between hover:bg-transparent"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="truncate">
              {selectedAddress || "Select location"}
            </span>
          </div>
          <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <div className="flex items-center border-b px-3">
            <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your location..."
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="p-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={handleDetectLocation}
              disabled={isDetecting}
            >
              {isDetecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Detecting location...</span>
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4" />
                  <span>Detect my location</span>
                </>
              )}
            </Button>
          </div>
          {suggestions.length > 0 && (
            <div className="max-h-[300px] overflow-auto p-2">
              {suggestions.map((address) => (
                <Button
                  key={address.id}
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 py-1.5"
                  onClick={() => {
                    onAddressChange(address.fullAddress);
                    setOpen(false);
                    setInputValue("");
                  }}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {address.mainText}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {address.secondaryText}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          )}
          {inputValue.length >= 3 && suggestions.length === 0 && (
            <div className="p-4 text-sm text-muted-foreground text-center">
              No locations found
            </div>
          )}
          {inputValue.length > 0 && inputValue.length < 3 && (
            <div className="p-4 text-sm text-muted-foreground text-center">
              Type at least 3 characters to search
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddressSearch; 