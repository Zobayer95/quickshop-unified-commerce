import { useState } from "react";
import { Save, User, Store, CreditCard, Bell, Shield, Database, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    lowStock: true,
    newOrders: true,
    marketing: false,
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your business settings and preferences.</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="BizManager Store" />
                </div>
                <div>
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input id="ownerName" defaultValue="John Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea id="address" defaultValue="123 Business St, City, State 12345" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="business@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="mr-2 h-5 w-5" />
                Store Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" defaultValue="USD" />
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" defaultValue="8.25" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lowStockThreshold">Default Low Stock Threshold</Label>
                  <Input id="lowStockThreshold" type="number" defaultValue="10" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="America/New_York" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Delivery Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                  <Input id="deliveryFee" type="number" defaultValue="5.00" />
                </div>
                <div>
                  <Label htmlFor="freeDeliveryThreshold">Free Delivery Threshold ($)</Label>
                  <Input id="freeDeliveryThreshold" type="number" defaultValue="50.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryRadius">Delivery Radius (miles)</Label>
                  <Input id="deliveryRadius" type="number" defaultValue="10" />
                </div>
                <div>
                  <Label htmlFor="avgDeliveryTime">Average Delivery Time (mins)</Label>
                  <Input id="avgDeliveryTime" type="number" defaultValue="30" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Fast Delivery</h4>
                    <p className="text-sm text-muted-foreground">Offer 15-minute express delivery</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Real-time Tracking</h4>
                    <p className="text-sm text-muted-foreground">Allow customers to track deliveries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Delivery Updates</h4>
                    <p className="text-sm text-muted-foreground">Send SMS updates to customers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Accept Cash Payments</h4>
                    <p className="text-sm text-muted-foreground">Enable cash payments in POS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Accept Card Payments</h4>
                    <p className="text-sm text-muted-foreground">Enable credit/debit card payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Accept Mobile Payments</h4>
                    <p className="text-sm text-muted-foreground">Enable mobile wallet payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Low Stock Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                  </div>
                  <Switch 
                    checked={notifications.lowStock}
                    onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Order Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified about new orders</p>
                  </div>
                  <Switch 
                    checked={notifications.newOrders}
                    onCheckedChange={(checked) => setNotifications({...notifications, newOrders: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive marketing and promotional updates</p>
                  </div>
                  <Switch 
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button variant="outline">Change Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Backup & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automatic Backups</h4>
                    <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div>
                  <Button variant="outline" className="w-full">
                    Download Data Export
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full">
                    Restore from Backup
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}