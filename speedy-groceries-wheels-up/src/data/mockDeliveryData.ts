import { DeliveryPartner, DeliveryTask, DeliverySummary, Notification } from "../types/delivery";

export const currentPartner: DeliveryPartner = {
  id: "dp-123456",
  name: "Rajesh Patel",
  email: "rajesh.patel@example.com",
  phone: "+91 98765 43210",
  avatar: "", // profile Image
  status: "online",
  joinedDate: "2023-01-15",
  totalDeliveries: 342,
  rating: 4.8
};

export const deliveryTasks: DeliveryTask[] = [
  {
    id: "del-1001",
    orderNumber: "ORD-5789",
    customerName: "Priya Shah",
    customerAddress: "123 Sardar Patel Road, Anand, Gujarat 388001",
    customerPhone: "+91 98765 12345",
    deliveryTime: "2023-07-20T14:30:00",
    assignedAt: "2023-07-20T14:00:00",
    status: "assigned",
    specialInstructions: "Please leave at the door. Ring doorbell.",
    items: [
      { name: "Organic Bananas", quantity: 1 },
      { name: "Whole Milk", quantity: 2 },
      { name: "Sourdough Bread", quantity: 1 }
    ],
    earnings: 120.50,
    distance: "2.3 km",
    estimatedTime: "15 min",
    storeAddress: "456 Vallabh Vidyanagar Road, Anand, Gujarat 388120",
    storeName: "Fresh Mart",
    paymentMethod: "cod"
  },
  {
    id: "del-1002",
    orderNumber: "ORD-5790",
    customerName: "Amit Patel",
    customerAddress: "789 Borsad Road, Anand, Gujarat 388001",
    customerPhone: "+91 98765 67890",
    deliveryTime: "2023-07-20T15:15:00",
    assignedAt: "2023-07-20T14:45:00",
    status: "picked-up",
    items: [
      { name: "Chicken Breast", quantity: 2 },
      { name: "Brown Rice", quantity: 1 },
      { name: "Broccoli", quantity: 1 }
    ],
    earnings: 145.75,
    distance: "3.1 km",
    estimatedTime: "20 min",
    storeAddress: "789 Vallabh Vidyanagar Road, Anand, Gujarat 388120",
    storeName: "Super Foods",
    paymentMethod: "online"
  },
  {
    id: "del-1003",
    orderNumber: "ORD-5791",
    customerName: "Neha Desai",
    customerAddress: "543 College Road, Anand, Gujarat 388001",
    customerPhone: "+91 98765 23456",
    deliveryTime: "2023-07-20T16:00:00",
    assignedAt: "2023-07-20T15:30:00",
    status: "in-transit",
    specialInstructions: "Call upon arrival. Customer has a dog.",
    items: [
      { name: "Orange Juice", quantity: 1 },
      { name: "Eggs (dozen)", quantity: 1 },
      { name: "Cereal", quantity: 2 }
    ],
    earnings: 110.25,
    distance: "1.8 km",
    estimatedTime: "12 min",
    storeAddress: "456 Vallabh Vidyanagar Road, Anand, Gujarat 388120",
    storeName: "Fresh Mart",
    paymentMethod: "cod"
  },

  {
    id: "del-1005",
    orderNumber: "ORD-5793",
    customerName: "Lakshmi Patel",
    customerAddress: "876 Sardar Patel Road, Anand, Gujarat 388001",
    customerPhone: "+91 98765 34567",
    deliveryTime: "2023-07-20T17:30:00",
    assignedAt: "2023-07-20T17:00:00",
    status: "delivered",
    specialInstructions: "Contactless delivery preferred.",
    items: [
      { name: "Ground Beef", quantity: 1 },
      { name: "Pasta", quantity: 2 },
      { name: "Tomato Sauce", quantity: 1 }
    ],
    earnings: 130.00,
    distance: "2.7 km",
    estimatedTime: "18 min",
    storeAddress: "456 Vallabh Vidyanagar Road, Anand, Gujarat 388120",
    storeName: "Fresh Mart",
    paymentMethod: "cod"
  },
  {
    id: "del-1006",
    orderNumber: "ORD-5794",
    customerName: "Jayesh Shah",
    customerAddress: "432 College Road, Anand, Gujarat 388001",
    customerPhone: "+91 98765 56789",
    deliveryTime: "2023-07-20T18:15:00",
    assignedAt: "2023-07-20T17:45:00",
    status: "delivered",
    specialInstructions: "Apartment complex, use entry code 4321.",
    items: [
      { name: "Yogurt", quantity: 3 },
      { name: "Granola", quantity: 1 },
      { name: "Honey", quantity: 1 }
    ],
    earnings: 105.75,
    distance: "2.0 km",
    estimatedTime: "14 min",
    storeAddress: "789 Vallabh Vidyanagar Road, Anand, Gujarat 388120",
    storeName: "Super Foods",
    paymentMethod: "online"
  }
];

export const deliverySummary: DeliverySummary = {
  totalDeliveries: 342,
  totalEarnings: 48750.50,
  todayEarnings: 480.00,
  weeklyEarnings: 3257.75,
  ratings: 4.8,
  activeHours: 6.5
};

export const notifications: Notification[] = [
  {
    id: "notif-001",
    title: "New Delivery Assigned",
    message: "You have been assigned Order #ORD-5789 for delivery to Priya Shah.",
    timestamp: "2023-07-20T14:00:00",
    read: false,
    type: "task"
  },
  {
    id: "notif-002",
    title: "Weekly Earnings Update",
    message: "Your weekly earnings of ₹3,257.75 have been processed and will be deposited soon.",
    timestamp: "2023-07-20T09:30:00",
    read: true,
    type: "earnings"
  },
  {
    id: "notif-003",
    title: "Customer Left a Rating",
    message: "You received a 5-star rating from Lakshmi Patel for order #ORD-5793!",
    timestamp: "2023-07-20T17:45:00",
    read: false,
    type: "system"
  },
  {
    id: "notif-004",
    title: "Delivery Issue Reported",
    message: "Jayesh Shah reported an issue with order #ORD-5794. Please check the app for details.",
    timestamp: "2023-07-20T18:30:00",
    read: false,
    type: "issue"
  },
  {
    id: "notif-005",
    title: "New Promotion Available",
    message: "Earn extra ₹20 per delivery during peak hours (5PM-8PM) today!",
    timestamp: "2023-07-20T13:15:00",
    read: true,
    type: "system"
  }
];

// Function to get past deliveries (last 30 days)
export const getPastDeliveries = (): DeliveryTask[] => {
  const pastDeliveries: DeliveryTask[] = [];
  
  // Generate 20 past deliveries
  for (let i = 1; i <= 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within past 30 days
    
    const addresses = [
      "123 Sardar Patel Road, Anand, Gujarat 388001",
      "456 Borsad Road, Anand, Gujarat 388001",
      "789 College Road, Anand, Gujarat 388001",
      "321 Vallabh Vidyanagar Road, Anand, Gujarat 388120",
      "654 Borsad Road, Anand, Gujarat 388001"
    ];
    
    const customerNames = [
      "Rajesh Patel",
      "Priya Shah",
      "Amit Patel",
      "Neha Desai",
      "Rahul Mehta",
      "Lakshmi Patel",
      "Jayesh Shah"
    ];
    
    const storeNames = ["Fresh Mart", "Super Foods", "Green Grocery", "City Market"];
    
    const pastDelivery: DeliveryTask = {
      id: `del-past-${1000 + i}`,
      orderNumber: `ORD-${5000 + i}`,
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      customerAddress: addresses[Math.floor(Math.random() * addresses.length)],
      customerPhone: "+91 98765 12345",
      deliveryTime: date.toISOString(),
      assignedAt: date.toISOString(),
      status: "delivered",
      items: [
        { name: "Assorted Groceries", quantity: Math.floor(Math.random() * 5) + 1 }
      ],
      earnings: Number((80 + Math.random() * 100).toFixed(2)),
      distance: `${(1 + Math.random() * 4).toFixed(1)} km`,
      estimatedTime: `${10 + Math.floor(Math.random() * 20)} min`,
      storeAddress: "456 Vallabh Vidyanagar Road, Anand, Gujarat 388120",
      storeName: storeNames[Math.floor(Math.random() * storeNames.length)],
      paymentMethod: Math.random() > 0.5 ? "cod" : "online"
    };
    
    // 10% chance of having an issue
    if (Math.random() < 0.1) {
      pastDelivery.status = "issue";
    }
    
    pastDeliveries.push(pastDelivery);
  }
  
  // Sort by date, newest first
  return pastDeliveries.sort((a, b) => {
    return new Date(b.deliveryTime).getTime() - new Date(a.deliveryTime).getTime();
  });
};
