import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Truck, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const handlePartnerAccess = () => {
    if (isAuthenticated) {
      navigate('/delivery');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-green-50">
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Truck className="h-6 w-6 text-delivery-primary mr-2" />
          <h1 className="text-xl font-bold">ApnaKirana</h1>
        </div>
        <Button variant="outline" onClick={handlePartnerAccess}>
          {isAuthenticated ? 'Partner Dashboard' : 'Partner Login'}
        </Button>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Grocery Delivery <span className="text-delivery-primary">Partner Portal</span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 max-w-lg">
            Manage your deliveries, track earnings, and provide exceptional service to customers with our delivery partner platform.
          </p>
          <Button 
            size="lg" 
            className="bg-delivery-primary hover:bg-delivery-secondary"
            onClick={handlePartnerAccess}
          >
            {isAuthenticated ? 'Access Partner Dashboard' : 'Access Partner Login'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-4 -left-4 w-full h-full bg-delivery-accent rounded-xl"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-delivery-accent rounded-full flex items-center justify-center">
                  <Truck className="h-6 w-6 text-delivery-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold">Delivery Partner Benefits</h3>
                  <p className="text-sm text-gray-500">Join our delivery network</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Real-time delivery tracking and updates",
                  "Flexible schedules to fit your lifestyle",
                  "Competitive earnings with bonuses",
                  "Simple interface for managing deliveries",
                  "Dedicated support for delivery partners"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                      <ChevronRight className="h-3 w-3 text-delivery-primary" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>&copy; 2025 ApnaKirana. All rights reserved.</p>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
