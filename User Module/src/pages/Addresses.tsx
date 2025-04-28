import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BestSellerProduct } from "@/components/BestSellerCard";
import { MapPin, Plus, Home, Building2, Briefcase, Trash2, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { userService } from "@/services/api";
import { toast } from 'react-hot-toast';

interface AddressesProps {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  addresses: string[];
  onAddressChange: (address: string) => void;
  cartItems: any[];
  isCartOpen: boolean;
  toggleCart: () => void;
}

interface Address {
  address_id: number;
  address_type: 'Home' | 'Work' | 'Hotel' | 'Other';
  name: string;
  phone: string;
  house_no: string;
  building_name?: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

const AddressForm = ({ onClose, address, onSubmit }: { 
  onClose: () => void; 
  address?: Address;
  onSubmit: (data: Omit<Address, 'address_id'>) => Promise<void>;
}) => {
  const [formData, setFormData] = useState({
    address_type: address?.address_type || 'Home',
    name: address?.name || '',
    phone: address?.phone || '',
    house_no: address?.house_no || '',
    building_name: address?.building_name || '',
    street: address?.street || '',
    area: address?.area || '',
    city: address?.city || '',
    state: address?.state || '',
    pincode: address?.pincode || '',
    landmark: address?.landmark || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting address:', error);
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Address Type</Label>
            <Select
              value={formData.address_type}
              onValueChange={(value) => setFormData({ ...formData, address_type: value as Address['address_type'] })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select address type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Home">Home</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Hotel">Hotel</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>House/Flat No.</Label>
              <Input
                value={formData.house_no}
                onChange={(e) => setFormData({ ...formData, house_no: e.target.value })}
                placeholder="Enter house/flat number"
                required
                className="w-full"
              />
            </div>

            <div>
              <Label>Building Name (Optional)</Label>
              <Input
                value={formData.building_name}
                onChange={(e) => setFormData({ ...formData, building_name: e.target.value })}
                placeholder="Enter building name"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <Label>Street</Label>
            <Input
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="Enter street name"
              required
              className="w-full"
            />
          </div>

          <div>
            <Label>Area/Locality</Label>
            <Input
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              placeholder="Enter area/locality"
              required
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>City</Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Enter city"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Enter state"
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>PIN Code</Label>
              <Input
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="Enter PIN code"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label>Landmark (Optional)</Label>
              <Input
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                placeholder="Enter nearby landmark"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{address ? 'Update Address' : 'Save Address'}</Button>
        </div>
      </form>
    </div>
  );
};

const Addresses: React.FC<AddressesProps> = ({
  isLoggedIn,
  user,
  onLogout,
  addresses,
  onAddressChange,
  cartItems,
  isCartOpen,
  toggleCart,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addressesList, setAddressesList] = useState<Address[]>([]);
  const [selectedAddressForEdit, setSelectedAddressForEdit] = useState<Address | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getAddresses();
      setAddressesList(response);
      if (response.length > 0) {
        const firstAddress = formatAddress(response[0]);
        setSelectedAddress(firstAddress);
        onAddressChange(firstAddress);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch addresses",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: Address): string => {
    return `${address.address_type} - ${address.name}, ${address.house_no}, ${address.street}, ${address.area}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const handleAddAddress = async (data: Omit<Address, 'address_id'>) => {
    setIsLoading(true);
    try {
      await userService.addAddress(data);
      toast({
        title: "Success",
        description: "Address added successfully",
      });
      fetchAddresses();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding address:', error);
      toast({
        title: "Error",
        description: "Failed to add address",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAddress = async (data: Omit<Address, 'address_id'>) => {
    if (!selectedAddressForEdit) return;
    try {
      await userService.updateAddress(selectedAddressForEdit.address_id, data);
      toast({
        title: "Success",
        description: "Address updated successfully",
      });
      fetchAddresses();
      setSelectedAddressForEdit(undefined);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Error",
        description: "Failed to update address",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      await userService.deleteAddress(addressId);
      toast({
        title: "Success",
        description: "Address deleted successfully",
      });
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive",
      });
    }
  };

  const getAddressIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'work':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedAddressForEdit(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        selectedAddress={selectedAddress}
        onAddressChange={onAddressChange}
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
      />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Saved Addresses</h1>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{selectedAddressForEdit ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                </DialogHeader>
                <AddressForm 
                  onClose={handleDialogClose} 
                  address={selectedAddressForEdit}
                  onSubmit={selectedAddressForEdit ? handleUpdateAddress : handleAddAddress}
                />
              </DialogContent>
            </Dialog>
          </div>

          {addressesList.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No addresses saved yet
              </h3>
              <p className="text-gray-500 mb-4">
                Add a delivery address to get started
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary"
              >
                Add New Address
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {addressesList.map((address) => (
                <div
                  key={address.address_id}
                  className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getAddressIcon(address.address_type)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">
                            {address.address_type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.name}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {address.house_no}
                          {address.building_name && `, ${address.building_name}`}
                          {`, ${address.street}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.area}, {address.city}, {address.state} - {address.pincode}
                        </p>
                        {address.landmark && (
                          <p className="text-sm text-gray-500 mt-1">
                            Landmark: {address.landmark}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-primary"
                        onClick={() => {
                          setSelectedAddressForEdit(address);
                          setIsDialogOpen(true);
                        }}
                      >
                        <PenLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-red-600"
                        onClick={() => handleDeleteAddress(address.address_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Addresses; 