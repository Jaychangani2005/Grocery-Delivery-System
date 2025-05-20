import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';
import { useDelivery } from '@/contexts/DeliveryContext';

const DeliverySummaryCard: React.FC = () => {
  const { summary } = useDelivery();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Delivery Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <Truck className="h-4 w-4 mr-2 text-delivery-primary" />
              <span className="text-sm">Total Deliveries</span>
            </div>
            <p className="text-xl font-semibold">{summary.totalDeliveries}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliverySummaryCard;
