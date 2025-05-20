import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Truck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <Truck className="h-6 w-6 text-delivery-primary" />
            Partner Access
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Link to="/login" className="w-full" onClick={onClose}>
            <Button className="w-full" variant="default">
              Login
            </Button>
          </Link>
          <Link to="/register" className="w-full" onClick={onClose}>
            <Button className="w-full" variant="outline">
              Register as Partner
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal; 