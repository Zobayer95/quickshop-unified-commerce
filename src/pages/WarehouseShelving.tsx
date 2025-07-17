import { useState } from "react";
import { Package, Plus, Search, Filter, QrCode, MapPin, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ShelfLocation {
  id: string;
  aisle: string;
  shelf: string;
  position: string;
  zone: string;
  capacity: number;
  occupied: number;
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  reserved: number;
  available: number;
}

const mockShelves: ShelfLocation[] = [
  {
    id: "A1-S1-P1",
    aisle: "A1",
    shelf: "S1",
    position: "P1",
    zone: "Electronics",
    capacity: 100,
    occupied: 75,
    products: [
      { id: "1", name: "iPhone 15", sku: "IPH15-128", quantity: 25, reserved: 5, available: 20 },
      { id: "2", name: "Samsung Galaxy", sku: "SGS23-256", quantity: 30, reserved: 8, available: 22 },
      { id: "3", name: "AirPods Pro", sku: "APR-3GEN", quantity: 20, reserved: 2, available: 18 },
    ]
  },
  {
    id: "A1-S2-P1",
    aisle: "A1",
    shelf: "S2",
    position: "P1",
    zone: "Electronics",
    capacity: 80,
    occupied: 45,
    products: [
      { id: "4", name: "MacBook Pro", sku: "MBP-14-M3", quantity: 15, reserved: 3, available: 12 },
      { id: "5", name: "iPad Air", sku: "IPA-11-256", quantity: 30, reserved: 5, available: 25 },
    ]
  },
  {
    id: "B2-S1-P2",
    aisle: "B2",
    shelf: "S1",
    position: "P2",
    zone: "Clothing",
    capacity: 150,
    occupied: 120,
    products: [
      { id: "6", name: "Nike Air Max", sku: "NAM-90-BLK", quantity: 40, reserved: 10, available: 30 },
      { id: "7", name: "Adidas Ultraboost", sku: "AUB-22-WHT", quantity: 35, reserved: 8, available: 27 },
      { id: "8", name: "Levi's Jeans", sku: "LVS-501-BLU", quantity: 45, reserved: 12, available: 33 },
    ]
  },
];

export default function WarehouseShelving() {
  const [shelves, setShelves] = useState<ShelfLocation[]>(mockShelves);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newShelf, setNewShelf] = useState({
    aisle: "",
    shelf: "",
    position: "",
    zone: "",
    capacity: ""
  });

  const zones = ["all", ...Array.from(new Set(shelves.map(shelf => shelf.zone)))];

  const filteredShelves = shelves.filter(shelf => {
    const matchesSearch = shelf.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelf.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shelf.products.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesZone = selectedZone === "all" || shelf.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const getOccupancyColor = (occupied: number, capacity: number) => {
    const percentage = (occupied / capacity) * 100;
    if (percentage < 50) return "bg-success";
    if (percentage < 80) return "bg-warning";
    return "bg-destructive";
  };

  const handleAddShelf = () => {
    if (newShelf.aisle && newShelf.shelf && newShelf.position && newShelf.zone && newShelf.capacity) {
      const shelfId = `${newShelf.aisle}-${newShelf.shelf}-${newShelf.position}`;
      const shelf: ShelfLocation = {
        id: shelfId,
        aisle: newShelf.aisle,
        shelf: newShelf.shelf,
        position: newShelf.position,
        zone: newShelf.zone,
        capacity: parseInt(newShelf.capacity),
        occupied: 0,
        products: []
      };
      setShelves([...shelves, shelf]);
      setNewShelf({ aisle: "", shelf: "", position: "", zone: "", capacity: "" });
      setIsAddDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Warehouse Shelving System</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Shelf Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Shelf Location</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="aisle">Aisle</Label>
                  <Input
                    id="aisle"
                    value={newShelf.aisle}
                    onChange={(e) => setNewShelf({ ...newShelf, aisle: e.target.value })}
                    placeholder="A1, B2, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="shelf">Shelf</Label>
                  <Input
                    id="shelf"
                    value={newShelf.shelf}
                    onChange={(e) => setNewShelf({ ...newShelf, shelf: e.target.value })}
                    placeholder="S1, S2, etc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newShelf.position}
                    onChange={(e) => setNewShelf({ ...newShelf, position: e.target.value })}
                    placeholder="P1, P2, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="zone">Zone</Label>
                  <Input
                    id="zone"
                    value={newShelf.zone}
                    onChange={(e) => setNewShelf({ ...newShelf, zone: e.target.value })}
                    placeholder="Electronics, Clothing, etc."
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newShelf.capacity}
                  onChange={(e) => setNewShelf({ ...newShelf, capacity: e.target.value })}
                  placeholder="100"
                />
              </div>
              <Button onClick={handleAddShelf}>Add Shelf Location</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search shelves, zones, or products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedZone} onValueChange={setSelectedZone}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by zone" />
          </SelectTrigger>
          <SelectContent>
            {zones.map(zone => (
              <SelectItem key={zone} value={zone}>
                {zone === "all" ? "All Zones" : zone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shelves</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shelves.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {shelves.reduce((sum, shelf) => sum + shelf.capacity, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Space</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {shelves.reduce((sum, shelf) => sum + shelf.occupied, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((shelves.reduce((sum, shelf) => sum + shelf.occupied, 0) / 
                 shelves.reduce((sum, shelf) => sum + shelf.capacity, 0)) * 100).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shelf Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredShelves.map((shelf) => (
          <Card key={shelf.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{shelf.id}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{shelf.zone}</Badge>
                <Badge 
                  variant="outline" 
                  className={`${getOccupancyColor(shelf.occupied, shelf.capacity)} text-white border-0`}
                >
                  {((shelf.occupied / shelf.capacity) * 100).toFixed(0)}% Full
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Capacity:</span>
                  <span className="font-medium">{shelf.occupied}/{shelf.capacity}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Products:</h4>
                  {shelf.products.length > 0 ? (
                    <div className="space-y-1">
                      {shelf.products.slice(0, 3).map((product) => (
                        <div key={product.id} className="flex justify-between items-center text-xs bg-muted/50 p-2 rounded">
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-muted-foreground">{product.sku}</div>
                          </div>
                          <div className="text-right">
                            <div>Qty: {product.quantity}</div>
                            <div className="text-muted-foreground">Avail: {product.available}</div>
                          </div>
                        </div>
                      ))}
                      {shelf.products.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{shelf.products.length - 3} more products
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">No products assigned</div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    Locate
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Package className="h-3 w-3 mr-1" />
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredShelves.length === 0 && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No shelves found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}