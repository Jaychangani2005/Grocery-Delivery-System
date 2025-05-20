import React from 'react';
import { DeliveryTask } from '@/types/delivery';
import DeliveryCard from './DeliveryCard';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DeliveryList: React.FC = () => {
  const { tasks, setActiveTask, isLoading } = useDelivery();
  
  // Group tasks by status priority
  const groupedTasks = {
    active: tasks.filter(task => 
      ['assigned', 'picked-up'].includes(task.status)
    ),
    pending: tasks.filter(task => 
      ['pending', 'in-transit'].includes(task.status)
    ),
    completed: tasks.filter(task => 
      ['delivered', 'issue'].includes(task.status)
    )
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="delivery-card">
                <CardHeader className="flex flex-row items-center justify-between py-3">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-20" />
                </CardHeader>
                <CardContent className="pt-0 pb-4">
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedTasks.active.length > 0 && (
        <div>
          <h3 className="font-medium text-lg mb-3">Active Deliveries</h3>
          {groupedTasks.active.map(task => (
            <DeliveryCard
              key={task.id}
              delivery={task}
              onClick={() => setActiveTask(task)}
            />
          ))}
        </div>
      )}
      
      {groupedTasks.pending.length > 0 && (
        <div>
          <h3 className="font-medium text-lg mb-3">Pending Deliveries</h3>
          {groupedTasks.pending.map(task => (
            <DeliveryCard
              key={task.id}
              delivery={task}
              onClick={() => setActiveTask(task)}
            />
          ))}
        </div>
      )}
      
      {groupedTasks.completed.length > 0 && (
        <div>
          <h3 className="font-medium text-lg mb-3">Recently Completed</h3>
          {groupedTasks.completed.map(task => (
            <DeliveryCard
              key={task.id}
              delivery={task}
              onClick={() => setActiveTask(task)}
            />
          ))}
        </div>
      )}
      
      {Object.values(groupedTasks).every(group => group.length === 0) && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No deliveries found.</p>
        </div>
      )}
    </div>
  );
};

export default DeliveryList;
