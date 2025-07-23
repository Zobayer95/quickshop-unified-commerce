import { UserCog, History, Package, FileText, Heart, MapPin, User, Lock, Star, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <UserCog className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">User Account Management</h1>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="track">Track</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "#ORD-001", date: "2024-01-15", status: "Delivered", total: "$299.99", items: 3 },
                  { id: "#ORD-002", date: "2024-01-10", status: "Shipped", total: "$149.50", items: 2 },
                  { id: "#ORD-003", date: "2024-01-05", status: "Processing", total: "$89.99", items: 1 },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge variant={order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.total}</p>
                      <p className="text-sm text-muted-foreground">{order.items} items</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Track Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter order number (e.g., ORD-001)" />
                  <Button>Track</Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Order #ORD-002 Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Order Confirmed - Jan 10, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">In Transit - Jan 12, 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Out for Delivery - Expected Jan 15, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Download Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "INV-001", order: "#ORD-001", date: "2024-01-15", amount: "$299.99" },
                  { id: "INV-002", order: "#ORD-002", date: "2024-01-10", amount: "$149.50" },
                  { id: "INV-003", order: "#ORD-003", date: "2024-01-05", amount: "$89.99" },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">Order: {invoice.order} • {invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{invoice.amount}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Wishlist
                <Badge>4</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "iPhone 15 Pro", price: "$999", image: "📱", inStock: true },
                  { name: "MacBook Air M2", price: "$1199", image: "💻", inStock: true },
                  { name: "AirPods Pro", price: "$249", image: "🎧", inStock: false },
                  { name: "Apple Watch Series 9", price: "$399", image: "⌚", inStock: true },
                ].map((item, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-primary font-semibold">{item.price}</p>
                        <Badge variant={item.inStock ? "default" : "destructive"} className="mt-1">
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Saved Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Home", address: "123 Main St, Apt 4B", city: "New York, NY 10001", isDefault: true },
                  { type: "Work", address: "456 Business Ave, Suite 200", city: "New York, NY 10002", isDefault: false },
                ].map((addr, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{addr.type}</p>
                          {addr.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{addr.address}</p>
                        <p className="text-sm text-muted-foreground">{addr.city}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">Add New Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday">Date of Birth</Label>
                  <Input id="birthday" type="date" defaultValue="1990-01-01" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Loyalty Points & Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                  <h3 className="text-2xl font-bold text-primary">2,450 Points</h3>
                  <p className="text-muted-foreground">Available to redeem</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Available Rewards</h4>
                  <div className="space-y-3">
                    {[
                      { name: "$10 Off Next Order", points: 1000, available: true },
                      { name: "Free Shipping", points: 500, available: true },
                      { name: "$25 Off Next Order", points: 2500, available: false },
                      { name: "VIP Customer Status", points: 5000, available: false },
                    ].map((reward, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div>
                          <p className="font-medium">{reward.name}</p>
                          <p className="text-sm text-muted-foreground">{reward.points} points</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant={reward.available ? "default" : "outline"}
                          disabled={!reward.available}
                        >
                          {reward.available ? "Redeem" : "Need More Points"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Points History</h4>
                  <div className="space-y-2">
                    {[
                      { action: "Order #ORD-001", points: "+299", date: "Jan 15, 2024" },
                      { action: "Redeemed Free Shipping", points: "-500", date: "Jan 10, 2024" },
                      { action: "Order #ORD-002", points: "+149", date: "Jan 10, 2024" },
                    ].map((history, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border-l-2 border-primary/20 pl-3">
                        <div>
                          <p className="text-sm font-medium">{history.action}</p>
                          <p className="text-xs text-muted-foreground">{history.date}</p>
                        </div>
                        <span className={`text-sm font-medium ${history.points.startsWith('+') ? 'text-success' : 'text-warning'}`}>
                          {history.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}