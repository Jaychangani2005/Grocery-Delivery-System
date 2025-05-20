import React from 'react';
import DeliveryLayout from '@/components/delivery/DeliveryLayout';
import DeliveryList from '@/components/delivery/DeliveryList';
import DeliveryDetail from '@/components/delivery/DeliveryDetail';
import DeliverySummaryCard from '@/components/delivery/DeliverySummaryCard';
import { useDelivery } from '@/contexts/DeliveryContext';

const Dashboard: React.FC = () => {
  const { activeTask, setActiveTask } = useDelivery();

  return (
    <DeliveryLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Delivery Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTask ? (
            <DeliveryDetail task={activeTask} onBack={() => setActiveTask(null)} />
          ) : (
            <DeliveryList />
          )}
        </div>

        <div>
          <DeliverySummaryCard />
        </div>
      </div>
    </DeliveryLayout>
  );
};

export default Dashboard;
