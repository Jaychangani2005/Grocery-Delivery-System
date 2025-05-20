import React from 'react';
import DeliveryLayout from '@/components/delivery/DeliveryLayout';
import { useDelivery } from '@/contexts/DeliveryContext';
import DeliveryCard from '@/components/delivery/DeliveryCard';
import DeliveryDetail from '@/components/delivery/DeliveryDetail';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompletedDeliveries: React.FC = () => {
  const { tasks, setActiveTask, activeTask } = useDelivery();
  
  // Filter completed deliveries
  const completedDeliveries = tasks.filter(task => 
    task.status === 'delivered'
  );

  return (
    <DeliveryLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Completed Deliveries</h1>
        <p className="text-muted-foreground">
          View your successfully completed deliveries
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {activeTask ? (
          <DeliveryDetail 
            task={activeTask} 
            onBack={() => setActiveTask(null)} 
          />
        ) : (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Today's Completed</CardTitle>
            </CardHeader>
            <CardContent>
              {completedDeliveries.length > 0 ? (
                <div className="space-y-4">
                  {completedDeliveries.map(delivery => (
                    <DeliveryCard
                      key={delivery.id}
                      delivery={delivery}
                      onClick={() => setActiveTask(delivery)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No completed deliveries today</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DeliveryLayout>
  );
};

export default CompletedDeliveries; 