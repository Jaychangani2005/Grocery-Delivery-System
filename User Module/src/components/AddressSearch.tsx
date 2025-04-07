import React, { useState, useRef, useEffect } from "react";
import { Command } from "cmdk";
import {
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { userService, Address } from "@/services/api";
import { toast } from "react-hot-toast";

interface AddressSearchProps {
  selectedAddress: string;
  onAddressChange: (address: string) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({
  selectedAddress,
  onAddressChange,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [filteredAddresses, setFilteredAddresses] = useState<Address[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch user addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userAddresses = await userService.getAddresses();
        setAddresses(userAddresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast.error('Failed to load addresses');
      }
    };

    fetchAddresses();
  }, []);

  // Filter addresses based on input
  useEffect(() => {
    if (inputValue.length >= 3) {
      const filtered = addresses.filter(
        (address) =>
          address.area.toLowerCase().includes(inputValue.toLowerCase()) ||
          address.city.toLowerCase().includes(inputValue.toLowerCase()) ||
          address.street.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredAddresses(filtered);
    } else {
      setFilteredAddresses([]);
    }
  }, [inputValue, addresses]);

  const formatAddress = (address: Address): string => {
    return `${address.house_no}${address.building_name ? `, ${address.building_name}` : ''}, ${address.street}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const handleAddressSelect = (address: Address) => {
    const formattedAddress = formatAddress(address);
    onAddressChange(formattedAddress);
        setOpen(false);
    setInputValue("");
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
              {selectedAddress || "Select address"}
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
              placeholder="Search your addresses..."
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="max-h-[300px] overflow-auto p-2">
            {addresses.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                No saved addresses found
              </div>
            ) : inputValue.length >= 3 ? (
              filteredAddresses.length > 0 ? (
                filteredAddresses.map((address) => (
            <Button
                    key={address.address_id}
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1.5"
                    onClick={() => handleAddressSelect(address)}
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {address.address_type} - {address.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatAddress(address)}
                      </span>
                    </div>
                  </Button>
                ))
              ) : (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No matching addresses found
          </div>
              )
            ) : (
              addresses.map((address) => (
                <Button
                  key={address.address_id}
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2 py-1.5"
                  onClick={() => handleAddressSelect(address)}
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                      {address.address_type} - {address.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatAddress(address)}
                    </span>
                  </div>
                </Button>
              ))
            )}
            </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddressSearch; 