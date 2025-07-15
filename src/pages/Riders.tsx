import { useState } from "react";
import { 
  User, 
  Phone, 
  MapPin, 
  Star, 
  Truck, 
  Clock, 
  CheckCircle,
  Search,
  Plus,
  Edit,
  MoreVertical,
  Activity,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiderForm } from "@/components/RiderForm";

interface Rider {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: "bike" | "scooter" | "car";
  vehicleNumber: string;
  status: "available" | "busy" | "offline";
  rating: number;
  totalDeliveries: number;
  completedToday: number;
  earnings: {
    today: number;
    total: number;
  };
  location: {
    current: string;
    zone: string;
  };
  joinedDate: string;
  lastActive: string;
}

const riders: Rider[] = [
  {
    id: "R001",
    name: "Mike Wilson",
    phone: "+1 (555) 999-1111",
    email: "mike.wilson@delivery.com",
    vehicleType: "bike",
    vehicleNumber: "BK-2024-001",
    status: "busy",
    rating: 4.8,
    totalDeliveries: 245,
    completedToday: 8,
    earnings: {
      today: 120.50,
      total: 3456.78
    },
    location: {
      current: "Downtown Area",
      zone: "Zone A"
    },
    joinedDate: "2023-06-15",
    lastActive: "5 mins ago"
  },
  {
    id: "R002", 
    name: "Lisa Chen",
    phone: "+1 (555) 888-2222",
    email: "lisa.chen@delivery.com",
    vehicleType: "scooter",
    vehicleNumber: "SC-2024-002",
    status: "busy",
    rating: 4.9,
    totalDeliveries: 189,
    completedToday: 6,
    earnings: {
      today: 95.75,
      total: 2890.45
    },
    location: {
      current: "Midtown Area",
      zone: "Zone B"
    },
    joinedDate: "2023-08-22",
    lastActive: "2 mins ago"
  },
  {
    id: "R003",
    name: "Alex Thompson", 
    phone: "+1 (555) 777-3333",
    email: "alex.thompson@delivery.com",
    vehicleType: "car",
    vehicleNumber: "CAR-2024-003",
    status: "available",
    rating: 4.7,
    totalDeliveries: 156,
    completedToday: 4,
    earnings: {
      today: 78.25,
      total: 2145.60
    },
    location: {
      current: "Uptown Area",
      zone: "Zone C"
    },
    joinedDate: "2023-09-10",
    lastActive: "Just now"
  },
  {
    id: "R004",
    name: "Maria Garcia",
    phone: "+1 (555) 666-4444", 
    email: "maria.garcia@delivery.com",
    vehicleType: "bike",
    vehicleNumber: "BK-2024-004",
    status: "available",
    rating: 4.6,
    totalDeliveries: 98,
    completedToday: 3,
    earnings: {
      today: 52.00,
      total: 1456.89
    },
    location: {
      current: "East Side",
      zone: "Zone D"
    },
    joinedDate: "2023-11-05",
    lastActive: "1 min ago"
  },
  {
    id: "R005",
    name: "James Rodriguez",
    phone: "+1 (555) 555-5555",
    email: "james.rodriguez@delivery.com", 
    vehicleType: "scooter",
    vehicleNumber: "SC-2024-005",
    status: "offline",
    rating: 4.5,
    totalDeliveries: 234,
    completedToday: 0,
    earnings: {
      today: 0,
      total: 3234.78
    },
    location: {
      current: "West Side",
      zone: "Zone E"
    },
    joinedDate: "2023-05-20",
    lastActive: "2 hours ago"
  }
];

export default function Riders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredRiders = riders.filter(rider =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.phone.includes(searchTerm) ||
    rider.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.location.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "default";
      case "busy": return "secondary";
      case "offline": return "outline";
      default: return "outline";
    }
  };

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case "bike": return "🚲";
      case "scooter": return "🛵";
      case "car": return "🚗";
      default: return "🚲";
    }
  };

  const stats = {
    total: riders.length,
    available: riders.filter(r => r.status === "available").length,
    busy: riders.filter(r => r.status === "busy").length,
    offline: riders.filter(r => r.status === "offline").length,
    totalEarningsToday: riders.reduce((sum, r) => sum + r.earnings.today, 0),
    totalDeliveriesToday: riders.reduce((sum, r) => sum + r.completedToday, 0)
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rider Management</h1>
          <p className="text-muted-foreground">Manage delivery riders, track performance, and assign zones.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Rider
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Rider</DialogTitle>
              <DialogDescription>
                Register a new delivery rider with their details and vehicle information.
              </DialogDescription>
            </DialogHeader>
            <RiderForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Riders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">{stats.available}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">{stats.busy}</p>
                <p className="text-xs text-muted-foreground">Busy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.offline}</p>
                <p className="text-xs text-muted-foreground">Offline</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.totalDeliveriesToday}</p>
                <p className="text-xs text-muted-foreground">Deliveries Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">${stats.totalEarningsToday.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Earnings Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search riders by name, phone, vehicle number, or zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Riders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRiders.map((rider) => (
          <Card key={rider.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {rider.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{rider.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">ID: {rider.id}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Rider
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MapPin className="mr-2 h-4 w-4" />
                      Track Location
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Activity className="mr-2 h-4 w-4" />
                      View Performance
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Status and Rating */}
              <div className="flex items-center justify-between">
                <Badge variant={getStatusColor(rider.status) as any} className="capitalize">
                  {rider.status}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{rider.rating}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  {rider.phone}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {rider.location.current} ({rider.location.zone})
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getVehicleIcon(rider.vehicleType)}</span>
                  <div>
                    <p className="text-sm font-medium capitalize">{rider.vehicleType}</p>
                    <p className="text-xs text-muted-foreground">{rider.vehicleNumber}</p>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-xl font-bold text-primary">{rider.completedToday}</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-success">{rider.totalDeliveries}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>

              {/* Earnings */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-success">${rider.earnings.today.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Today's Earnings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-muted-foreground">${rider.earnings.total.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Total Earnings</p>
                </div>
              </div>

              {/* Last Active */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  Last active: {rider.lastActive}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}