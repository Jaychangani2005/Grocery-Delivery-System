import React from 'react';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Bell, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NotificationsList: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useDelivery();
  
  // Filter to only show task notifications (new orders)
  const taskNotifications = notifications.filter(notification => notification.type === 'task');

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">New Orders</CardTitle>
        {taskNotifications.some(n => !n.read) && (
          <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead}>
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {taskNotifications.length > 0 ? (
            <div className="space-y-4">
              {taskNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border transition-colors ${
                    notification.read ? 'bg-background' : 'bg-accent border-delivery-primary'
                  }`}
                  onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Truck className="h-4 w-4 text-delivery-info" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bell className="h-8 w-8 mb-2" />
              <p>No new orders</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationsList;
