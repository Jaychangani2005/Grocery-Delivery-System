import React from 'react';
import { DeliveryTask } from '@/types/delivery';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DeliveryStatusBadge from './DeliveryStatusBadge';
import { Clock, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface DeliveryCardProps {
  delivery: DeliveryTask;
  onClick: () => void;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({ delivery, onClick }) => {
  const formattedTime = formatDistanceToNow(new Date(delivery.assignedAt), { addSuffix: true });
  
  return (
    <Card className="delivery-card mb-4 hover:border-delivery-primary cursor-pointer" onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <div className="flex items-center">
          <Package className="h-5 w-5 mr-2 text-delivery-primary" />
          <span className="font-medium">{delivery.orderNumber}</span>
        </div>
        <DeliveryStatusBadge status={delivery.status === 'assigned' ? 'picked-up' : delivery.status} />
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <div className="text-sm mb-3 font-medium">{delivery.customerName}</div>
        <div className="flex items-start text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-xs">{delivery.customerAddress}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <span className="text-xs">₹{delivery.earnings.toFixed(2)} • {delivery.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
          <Button 
            size="sm" 
            variant="default" 
            className="bg-delivery-primary hover:bg-delivery-primary/90"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryCard;
