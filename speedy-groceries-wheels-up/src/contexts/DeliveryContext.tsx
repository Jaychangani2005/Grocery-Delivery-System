import React, { createContext, useContext, useState, useEffect } from "react";
import { DeliveryTask, DeliveryStatus, DeliverySummary, Notification, DeliveryPartner } from "../types/delivery";
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface DeliveryContextType {
  tasks: DeliveryTask[];
  activeTask: DeliveryTask | null;
  pastDeliveries: DeliveryTask[];
  summary: DeliverySummary;
  notifications: Notification[];
  unreadNotificationsCount: number;
  partner: DeliveryPartner;
  isLoading: boolean;
  
  setActiveTask: (task: DeliveryTask | null) => void;
  updateTaskStatus: (taskId: string, status: DeliveryStatus) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  updatePartner: (partnerData: Partial<DeliveryPartner>) => void;
  refreshTasks: () => Promise<void>;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<DeliveryTask[]>([]);
  const [activeTask, setActiveTask] = useState<DeliveryTask | null>(null);
  const [pastDeliveries, setPastDeliveries] = useState<DeliveryTask[]>([]);
  const [summary, setSummary] = useState<DeliverySummary>({
    totalDeliveries: 0,
    totalEarnings: 0,
    todayEarnings: 0,
    weeklyEarnings: 0,
    ratings: 0,
    activeHours: 0
  });
  const [partnerNotifications, setPartnerNotifications] = useState<Notification[]>([]);
  const [partner, setPartner] = useState<DeliveryPartner>({
    id: '',
    name: '',
    email: '',
    phone: '',
    status: 'offline',
    joinedDate: new Date().toISOString(),
    totalDeliveries: 0,
    rating: 0
  });
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAssignedOrders = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:4000/api/delivery/assigned-orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch assigned orders');
      }

      const data = await response.json();
      
      // Transform the backend data to match our frontend types
      const transformedTasks: DeliveryTask[] = data.orders.map((order: any) => ({
        id: order.delivery_id.toString(),
        orderNumber: `ORD-${order.order_id}`,
        customerName: order.customer_name,
        customerAddress: `${order.house_no}${order.building_name ? `, ${order.building_name}` : ''}, ${order.street}, ${order.area}, ${order.city}, ${order.state} - ${order.pincode}${order.landmark ? ` (${order.landmark})` : ''}`,
        customerPhone: order.customer_phone,
        deliveryTime: order.delivery_time || new Date().toISOString(),
        assignedAt: order.created_at,
        status: mapBackendStatusToFrontend(order.status),
        items: [], // We'll need to fetch order items separately
        earnings: order.total,
        distance: '0 km', // We'll need to calculate this
        estimatedTime: '0 min', // We'll need to calculate this
        storeAddress: '', // We'll need to fetch store details
        storeName: '', // We'll need to fetch store details
        paymentMethod: order.payment_method
      }));

      setTasks(transformedTasks);
    } catch (error) {
      console.error('Error fetching assigned orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch assigned orders",
        variant: "destructive",
      });
    }
  };

  // Helper function to map backend statuses to frontend statuses
  const mapBackendStatusToFrontend = (backendStatus: string): DeliveryStatus => {
    switch (backendStatus.toLowerCase()) {
      case 'new':
        return 'pending';
      case 'pending':
        return 'pending';
      case 'confirmed':
        return 'assigned';
      case 'preparing':
        return 'assigned';
      case 'ready':
        return 'assigned';
      case 'out for delivery':
        return 'in-transit';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
        return 'issue';
      default:
        return 'pending';
    }
  };

  const fetchDeliverySummary = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:4000/api/delivery/summary', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch delivery summary');
      }

      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching delivery summary:', error);
      toast({
        title: "Error",
        description: "Failed to fetch delivery summary",
        variant: "destructive",
      });
    }
  };

  const fetchPartnerProfile = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:4000/api/delivery/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch partner profile');
      }

      const data = await response.json();
      setPartner(data);
    } catch (error) {
      console.error('Error fetching partner profile:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partner profile",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchAssignedOrders(),
          fetchDeliverySummary(),
          fetchPartnerProfile()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const updateTaskStatus = async (taskId: string, status: DeliveryStatus) => {
    if (!token) return;

    try {
      // Find the task to get the order_id
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        throw new Error('Task not found');
      }

      // Extract order_id from orderNumber (format: "ORD-{order_id}")
      const orderId = task.orderNumber.split('-')[1];
      
      if (!orderId) {
        throw new Error(`Invalid order number format: ${task.orderNumber}`);
      }
      
      // Map frontend status to backend status
      const backendStatus = mapFrontendStatusToBackend(status);
      
      console.log('Updating order status:', {
        orderId,
        orderNumber: task.orderNumber,
        frontendStatus: status,
        backendStatus
      });
      
      // Call the backend API to update the status
      const response = await fetch(`http://localhost:4000/api/delivery/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: backendStatus })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Failed to update order status: ${response.status} ${response.statusText}${
            errorData ? ` - ${errorData.error}` : ''
          }`
        );
      }

      // Update local state
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, status };
          
          // If this is the active task, update it
          if (activeTask && activeTask.id === taskId) {
            setActiveTask(updatedTask);
          }
          
          // Show a toast notification
          const statusText = status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
          toast({
            title: `Order ${task.orderNumber} ${statusText}`,
            description: `Successfully updated order status to ${statusText}`,
            variant: status === 'issue' ? 'destructive' : 'default',
          });
          
          return updatedTask;
        }
        return task;
      })
    );
    
    // If delivery is completed, add it to past deliveries
    if (status === 'delivered' || status === 'issue') {
      const completedTask = tasks.find(task => task.id === taskId);
      if (completedTask) {
        setPastDeliveries(prev => [{ ...completedTask, status }, ...prev]);
      }
    }
    
    // If status is delivered, update the summary
    if (status === 'delivered') {
      const completedTask = tasks.find(task => task.id === taskId);
      if (completedTask) {
        setSummary(prev => ({
          ...prev,
          totalDeliveries: prev.totalDeliveries + 1,
          totalEarnings: prev.totalEarnings + completedTask.earnings,
          todayEarnings: prev.todayEarnings + completedTask.earnings
        }));
      }
      }
    } catch (error) {
      console.error('Error updating task status:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  // Helper function to map frontend statuses to backend statuses
  const mapFrontendStatusToBackend = (frontendStatus: DeliveryStatus): string => {
    switch (frontendStatus) {
      case 'pending':
        return 'pending';
      case 'assigned':
        return 'confirmed';
      case 'picked-up':
        return 'ready';
      case 'in-transit':
        return 'Out For delivery';
      case 'delivered':
        return 'delivered';
      case 'issue':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const markNotificationAsRead = (notificationId: string) => {
    setPartnerNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setPartnerNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const updatePartner = async (values: { name: string; email: string; phone: string }) => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:4000/api/delivery/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();
      setPartner(data);
      return data;
    } catch (error) {
      console.error('Error updating partner profile:', error);
      throw error;
    }
  };

  const refreshTasks = async () => {
    setIsLoading(true);
    try {
      await fetchAssignedOrders();
    } catch (error) {
      console.error('Error refreshing tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DeliveryContext.Provider
      value={{
        tasks,
        activeTask,
        pastDeliveries,
        summary,
        notifications: partnerNotifications,
        unreadNotificationsCount,
        partner,
        isLoading,
        setActiveTask,
        updateTaskStatus,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        updatePartner,
        refreshTasks
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
};
