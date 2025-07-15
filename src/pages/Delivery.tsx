import { useState } from "react";
import { 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  User, 
  MapPin, 
  Phone,
  Search,
  Filter,
  Plus,
  Calendar,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeliveryOrder {
  id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  rider?: {
    id: string;
    name: string;
    phone: string;
  };
  items: number;
  totalAmount: number;
  status: "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "cancelled";
  priority: "normal" | "urgent";
  estimatedTime: string;
  createdAt: string;
  pickupTime?: string;
  deliveryTime?: string;
}

const deliveryOrders: DeliveryOrder[] = [
  {
    id: "DEL-001",
    orderId: "#3210",
    customer: {
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Downtown, NY 10001"
    },
    rider: {
      id: "R001",
      name: "Mike Wilson",
      phone: "+1 (555) 999-1111"
    },
    items: 3,
    totalAmount: 234.50,
    status: "in_transit",
    priority: "normal",
    estimatedTime: "25 mins",
    createdAt: "2024-01-15 14:30",
    pickupTime: "2024-01-15 14:45"
  },
  {
    id: "DEL-002", 
    orderId: "#3211",
    customer: {
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Midtown, NY 10002"
    },
    items: 1,
    totalAmount: 89.99,
    status: "pending",
    priority: "urgent",
    estimatedTime: "15 mins",
    createdAt: "2024-01-15 15:00"
  },
  {
    id: "DEL-003",
    orderId: "#3212", 
    customer: {
      name: "David Brown",
      phone: "+1 (555) 456-7890",
      address: "789 Pine Street, Uptown, NY 10003"
    },
    rider: {
      id: "R002",
      name: "Lisa Chen",
      phone: "+1 (555) 888-2222"
    },
    items: 5,
    totalAmount: 567.89,
    status: "picked_up",
    priority: "normal",
    estimatedTime: "30 mins",
    createdAt: "2024-01-15 14:15",
    pickupTime: "2024-01-15 14:30"
  }
];

const availableRiders = [
  { id: "R001", name: "Mike Wilson", status: "busy" },
  { id: "R002", name: "Lisa Chen", status: "busy" },
  { id: "R003", name: "Alex Thompson", status: "available" },
  { id: "R004", name: "Maria Garcia", status: "available" },
];

export default function Delivery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = deliveryOrders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "assigned": return "outline";
      case "picked_up": return "default";
      case "in_transit": return "default";
      case "delivered": return "default";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "assigned": return <User className="h-4 w-4" />;
      case "picked_up": return <Package className="h-4 w-4" />;
      case "in_transit": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const assignRider = (orderId: string, riderId: string) => {
    console.log(`Assigning rider ${riderId} to order ${orderId}`);
    // Handle rider assignment logic here
  };

  const stats = {
    total: deliveryOrders.length,
    pending: deliveryOrders.filter(o => o.status === "pending").length,
    inTransit: deliveryOrders.filter(o => o.status === "in_transit" || o.status === "picked_up").length,
    delivered: deliveryOrders.filter(o => o.status === "delivered").length,
    availableRiders: availableRiders.filter(r => r.status === "available").length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Delivery Management</h1>
          <p className="text-muted-foreground">Manage deliveries, assign riders, and track orders in real-time.</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Plus className="mr-2 h-4 w-4" />
          Create Delivery
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.inTransit}</p>
                <p className="text-xs text-muted-foreground">In Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{stats.delivered}</p>
                <p className="text-xs text-muted-foreground">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{stats.availableRiders}</p>
                <p className="text-xs text-muted-foreground">Available Riders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search by order ID, customer name, or delivery ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="picked_up">Picked Up</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Orders Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="mr-2 h-5 w-5" />
            Delivery Orders ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Delivery ID</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Items/Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {order.customer.phone}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {order.customer.address}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.rider ? (
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {order.rider.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{order.rider.name}</p>
                          <p className="text-xs text-muted-foreground">{order.rider.phone}</p>
                        </div>
                      </div>
                    ) : (
                      <Select onValueChange={(riderId) => assignRider(order.id, riderId)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Assign rider" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRiders.filter(r => r.status === "available").map(rider => (
                            <SelectItem key={rider.id} value={rider.id}>
                              {rider.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.items} items</p>
                      <p className="text-sm text-muted-foreground">${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status) as any} className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status.replace('_', ' ')}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.priority === "urgent" ? "destructive" : "outline"}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-3 w-3" />
                      {order.estimatedTime}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Track
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}