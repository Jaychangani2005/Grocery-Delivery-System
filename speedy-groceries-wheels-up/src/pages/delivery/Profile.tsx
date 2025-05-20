import React, { useState } from 'react';
import DeliveryLayout from '@/components/delivery/DeliveryLayout';
import { useDelivery } from '@/contexts/DeliveryContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { AlertCircle, AtSign, Calendar, Edit, LogOut, Mail, MapPin, Phone, Settings, Shield, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import EditProfileForm from '@/components/delivery/EditProfileForm';

const Profile: React.FC = () => {
  const { partner, summary } = useDelivery();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = () => {
    logout();
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
  };
  
  return (
    <DeliveryLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account information
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Personal Information</CardTitle>
                {!isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <EditProfileForm 
                  partner={partner}
                  onCancel={() => setIsEditing(false)}
                  onSuccess={handleEditSuccess}
                />
              ) : (
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={partner.avatar} />
                    <AvatarFallback className="text-xl">{partner.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-2" />
                          Full Name
                        </div>
                        <p className="font-medium">{partner.name}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Address
                        </div>
                        <p className="font-medium">{partner.email}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 mr-2" />
                          Phone Number
                        </div>
                        <p className="font-medium">{partner.phone}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          Joined Date
                        </div>
                        <p className="font-medium">{format(new Date(partner.joinedDate), 'MMMM dd, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <AtSign className="h-5 w-5 mr-3 text-delivery-primary" />
                    <div>
                      <p className="font-medium">Notification Preferences</p>
                      <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-3 text-delivery-primary" />
                    <div>
                      <p className="font-medium">Security Settings</p>
                      <p className="text-sm text-muted-foreground">Update password and security options</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-delivery-primary" />
                    <div>
                      <p className="font-medium">Delivery Zone</p>
                      <p className="text-sm text-muted-foreground">Set your preferred delivery areas</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Delivery Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Deliveries</span>
                  <span className="font-medium">{summary.totalDeliveries}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Report an Issue
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  App Settings
                </Button>
                
                <div className="p-3 bg-accent rounded-lg">
                  <p className="text-sm font-medium mb-1">Need help?</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Our support team is available 24/7 to assist you with any delivery issues.
                  </p>
                  <Button size="sm" variant="default" className="w-full">
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
           */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DeliveryLayout>
  );
};

export default Profile;
