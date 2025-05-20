
import React from 'react';
import DeliveryLayout from '@/components/delivery/DeliveryLayout';
import NotificationsList from '@/components/delivery/NotificationsList';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

const Notifications: React.FC = () => {
  const { markAllNotificationsAsRead, unreadNotificationsCount } = useDelivery();
  
  return (
    <DeliveryLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with delivery requests and important messages
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {unreadNotificationsCount > 0 && (
          <div className="mb-4 flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllNotificationsAsRead}
              className="text-xs"
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark all as read
            </Button>
          </div>
        )}
        <NotificationsList />
      </div>
    </DeliveryLayout>
  );
};

export default Notifications;
