import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Minus, Plus, ShoppingCart, CreditCard, MapPin, Check, Wallet, QrCode, BanknoteIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { format, addDays, addHours } from "date-fns";
import { CartItem } from "@/services/api";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onPlaceOrder: () => void;
  addresses: string[];
  onAddressChange: (address: string) => void;
}

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  selectedAddress,
  isLoggedIn,
  onLoginClick,
  onPlaceOrder,
  addresses,
  onAddressChange,
}: CartDrawerProps) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // If the image path is relative, prepend the backend URL
    return `http://localhost:3000${imagePath}`;
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <img
                      src={getImageUrl(item.product.image)}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/300x300/e2e8f0/1e293b?text=No+Image";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">₹{total.toFixed(2)}</span>
            </div>

            {!isLoggedIn ? (
              <Button className="w-full" onClick={onLoginClick}>
                Login to Checkout
              </Button>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Delivery Address</label>
                  <select
                    value={selectedAddress}
                    onChange={(e) => onAddressChange(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select an address</option>
                    {addresses.map((address, index) => (
                      <option key={index} value={address}>
                        {address}
                      </option>
                    ))}
                  </select>
                </div>

                <Button 
                  className="w-full"
                  onClick={onPlaceOrder}
                  disabled={!selectedAddress || cartItems.length === 0}
                >
                  Place Order
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
