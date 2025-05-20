import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DeliveryTask } from '@/types/delivery';
import DeliveryStatusBadge from './DeliveryStatusBadge';
import { ArrowLeft, MapPin, Phone, Truck, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Separator } from '@/components/ui/separator';

interface DeliveryDetailProps {
  task: DeliveryTask;
  onBack: () => void;
}

const DeliveryDetail: React.FC<DeliveryDetailProps> = ({ task, onBack }) => {
  const { updateTaskStatus } = useDelivery();

  const handleStatusUpdate = (status: any) => {
    updateTaskStatus(task.id, status);
  };

  // Automatically update status to 'picked-up' when component mounts if status is 'assigned'
  useEffect(() => {
    if (task.status === 'assigned') {
      handleStatusUpdate('picked-up');
    }
  }, [task.id]);

  const renderActionButtons = () => {
    switch(task.status) {
      case 'picked-up':
        return (
          <div className="grid grid-cols-1 gap-3">
            <Button 
              className="w-full" 
              onClick={() => handleStatusUpdate('in-transit')}
            >
              <Truck className="mr-2 h-4 w-4" />
              Start Delivery
            </Button>
          </div>
        );
      case 'in-transit':
        return (
          <div className="grid grid-cols-1 gap-3">
            <Button 
              className="w-full" 
              onClick={() => handleStatusUpdate('delivered')}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete
            </Button>
          </div>
        );
      case 'delivered':
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="px-0 mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Order {task.orderNumber}</h2>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Delivery Status</CardTitle>
            <DeliveryStatusBadge status={task.status} />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col space-y-3">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-0.5 text-delivery-primary" />
              <div className="flex-1">
                <p className="font-medium">{task.customerName}</p>
                <p className="text-sm text-muted-foreground">{task.customerAddress}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-3 mt-0.5 text-delivery-primary" />
              <div className="flex-1">
                <p className="text-sm">{task.customerPhone}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <Separator className="my-2" />
        <CardContent className="pt-2 pb-3">
          <h4 className="font-medium mb-2">Order Items</h4>
          <ul className="space-y-2">
            {task.items.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-muted-foreground">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <Separator className="my-0" />
        <CardContent className="pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Order Amount</span>
            <div className="flex items-center text-delivery-primary font-medium">
              <span className="mr-1">₹</span>
              <span>{task.earnings.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Payment Method</span>
            <div className="flex items-center">
              <span className="text-sm font-medium">
                {task.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
              </span>
            </div>
          </div>
        </CardContent>
        {renderActionButtons() && (
          <CardFooter>
            {renderActionButtons()}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default DeliveryDetail;

