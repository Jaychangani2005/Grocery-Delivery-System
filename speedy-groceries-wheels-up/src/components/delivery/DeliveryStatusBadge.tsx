import React from 'react';
import { DeliveryStatus } from '@/types/delivery';
import { cn } from '@/lib/utils';

interface DeliveryStatusBadgeProps {
  status: DeliveryStatus;
  className?: string;
}

const DeliveryStatusBadge: React.FC<DeliveryStatusBadgeProps> = ({ status, className }) => {
  const getStatusDisplay = (status: DeliveryStatus) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'assigned': return 'Assigned';
      case 'picked-up': return 'Picked Up';
      case 'in-transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'issue': return 'Issue Reported';
      default: return status;
    }
  };

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
      case 'picked-up':
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'issue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={cn(
      'px-2 py-1 rounded-full text-xs font-medium',
      getStatusColor(status),
      className
    )}>
      {getStatusDisplay(status)}
    </span>
  );
};

export default DeliveryStatusBadge;
