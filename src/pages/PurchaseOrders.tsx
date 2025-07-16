import { useState } from "react";
import { Plus, Search, Package, Building2, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PurchaseOrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const mockSuppliers: Supplier[] = [
  { id: "1", name: "Tech Supplies Co.", email: "orders@techsupplies.com", phone: "+1-555-0101", address: "123 Business Ave" },
  { id: "2", name: "Electronics Hub", email: "sales@electronhub.com", phone: "+1-555-0102", address: "456 Commerce St" },
  { id: "3", name: "Global Distributors", email: "info@globaldist.com", phone: "+1-555-0103", address: "789 Trade Blvd" },
];

const mockProducts = [
  { id: "1", name: "iPhone 15 Pro", sku: "IPH15P", currentStock: 5, price: 999 },
  { id: "2", name: "Samsung Galaxy S24", sku: "SGS24", currentStock: 8, price: 899 },
  { id: "3", name: "MacBook Air M3", sku: "MBA3", currentStock: 3, price: 1299 },
  { id: "4", name: "iPad Pro 12.9", sku: "IPP129", currentStock: 6, price: 1099 },
];

export default function PurchaseOrders() {
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderDetails, setOrderDetails] = useState({
    orderDate: new Date().toISOString().split('T')[0],
    expectedDelivery: "",
    notes: "",
    priority: "medium"
  });
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProductToOrder = (product: typeof mockProducts[0], quantity: number, unitPrice: number) => {
    const existingItem = orderItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setOrderItems(items =>
        items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * unitPrice }
            : item
        )
      );
    } else {
      const newItem: PurchaseOrderItem = {
        id: product.id,
        productName: product.name,
        sku: product.sku,
        quantity,
        unitPrice,
        total: quantity * unitPrice
      };
      setOrderItems(items => [...items, newItem]);
    }
    
    setShowProductPicker(false);
    toast({
      title: "Product Added",
      description: `${product.name} added to purchase order`,
    });
  };

  const removeOrderItem = (id: string) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  const updateOrderItem = (id: string, quantity: number, unitPrice: number) => {
    setOrderItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity, unitPrice, total: quantity * unitPrice }
          : item
      )
    );
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

  const handleCreateOrder = () => {
    if (!selectedSupplier || orderItems.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select a supplier and add products to the order",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Purchase Order Created",
      description: `Order for ${totalAmount.toFixed(2)} created successfully`,
    });

    // Reset form
    setSelectedSupplier("");
    setOrderItems([]);
    setOrderDetails({
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: "",
      notes: "",
      priority: "medium"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Purchase Orders</h1>
        </div>
        <Button onClick={() => setShowProductPicker(false)}>
          <Plus className="h-4 w-4 mr-2" />
          New Purchase Order
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Order Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Supplier Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Supplier Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="supplier">Select Supplier</Label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSuppliers.map(supplier => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedSupplier && (
                <div className="p-3 bg-muted rounded-lg">
                  {(() => {
                    const supplier = mockSuppliers.find(s => s.id === selectedSupplier);
                    return supplier ? (
                      <div className="space-y-1">
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">{supplier.email}</p>
                        <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                        <p className="text-sm text-muted-foreground">{supplier.address}</p>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input
                    id="orderDate"
                    type="date"
                    value={orderDetails.orderDate}
                    onChange={(e) => setOrderDetails(prev => ({ ...prev, orderDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={orderDetails.expectedDelivery}
                    onChange={(e) => setOrderDetails(prev => ({ ...prev, expectedDelivery: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={orderDetails.priority} onValueChange={(value) => setOrderDetails(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes for the supplier..."
                  value={orderDetails.notes}
                  onChange={(e) => setOrderDetails(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Products
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => setShowProductPicker(!showProductPicker)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Products
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showProductPicker && (
                <div className="mb-6 p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="h-4 w-4" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  
                  <div className="grid gap-2 max-h-64 overflow-y-auto">
                    {filteredProducts.map(product => (
                      <ProductPickerItem
                        key={product.id}
                        product={product}
                        onAdd={addProductToOrder}
                      />
                    ))}
                  </div>
                </div>
              )}

              {orderItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No products added to this order yet
                </p>
              ) : (
                <div className="space-y-3">
                  {orderItems.map(item => (
                    <OrderItemRow
                      key={item.id}
                      item={item}
                      onUpdate={updateOrderItem}
                      onRemove={removeOrderItem}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>{orderItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Quantity:</span>
                  <span>{orderItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total Amount:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={handleCreateOrder}
                disabled={!selectedSupplier || orderItems.length === 0}
              >
                Create Purchase Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface ProductPickerItemProps {
  product: { id: string; name: string; sku: string; currentStock: number; price: number };
  onAdd: (product: any, quantity: number, unitPrice: number) => void;
}

function ProductPickerItem({ product, onAdd }: ProductPickerItemProps) {
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(product.price);

  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg bg-background">
      <div className="flex-1">
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
        <Badge variant={product.currentStock < 10 ? "destructive" : "secondary"} className="text-xs">
          Stock: {product.currentStock}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16"
        />
        <Input
          type="number"
          min="0"
          step="0.01"
          value={unitPrice}
          onChange={(e) => setUnitPrice(Number(e.target.value))}
          className="w-20"
        />
        <Button
          size="sm"
          onClick={() => onAdd(product, quantity, unitPrice)}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

interface OrderItemRowProps {
  item: PurchaseOrderItem;
  onUpdate: (id: string, quantity: number, unitPrice: number) => void;
  onRemove: (id: string) => void;
}

function OrderItemRow({ item, onUpdate, onRemove }: OrderItemRowProps) {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg">
      <div className="flex-1">
        <p className="font-medium">{item.productName}</p>
        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, Number(e.target.value), item.unitPrice)}
          className="w-16"
        />
        <span className="text-sm">×</span>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={item.unitPrice}
          onChange={(e) => onUpdate(item.id, item.quantity, Number(e.target.value))}
          className="w-20"
        />
        <span className="text-sm font-medium w-16 text-right">
          ${item.total.toFixed(2)}
        </span>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}