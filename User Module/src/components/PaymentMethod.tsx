import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X, CreditCard, QrCode, Wallet } from "lucide-react";

interface PaymentMethodProps {
  onBack: () => void;
  onProceed: (method: string) => void;
}

export default function PaymentMethod({ onBack, onProceed }: PaymentMethodProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("cod");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleProceed = () => {
    onProceed(selectedMethod);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Payment Method</h2>
            <Button variant="ghost" size="icon" onClick={onBack}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Credit Card Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expiry Date</Label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                  />
                </div>
              </div>
              <div>
                <Label>Name on Card</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Options */}
            <RadioGroup
              value={selectedMethod}
              onValueChange={setSelectedMethod}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                  <QrCode className="h-5 w-5" />
                  UPI Payment
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer">
                  <Wallet className="h-5 w-5" />
                  Digital Wallet
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-5 w-5" />
                  Cash on Delivery
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            className="w-full mt-6" 
            onClick={handleProceed}
          >
            Proceed to Summary
          </Button>
        </div>
      </div>
    </div>
  );
} 