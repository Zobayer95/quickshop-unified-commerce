import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/ProductForm";

const products = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    sku: "IPH14P-001",
    category: "Electronics",
    price: 999.99,
    stock: 15,
    lowStockThreshold: 10,
    status: "active",
    variants: [
      { id: "1a", name: "128GB Space Black", stock: 5 },
      { id: "1b", name: "256GB Space Black", stock: 8 },
      { id: "1c", name: "512GB Space Black", stock: 2 },
    ]
  },
  {
    id: "2",
    name: "MacBook Air M2",
    sku: "MBA-M2-001",
    category: "Electronics",
    price: 1199.99,
    stock: 8,
    lowStockThreshold: 5,
    status: "active",
    variants: [
      { id: "2a", name: "8GB/256GB Silver", stock: 3 },
      { id: "2b", name: "8GB/512GB Silver", stock: 5 },
    ]
  },
  {
    id: "3",
    name: "AirPods Pro",
    sku: "APP-001",
    category: "Electronics",
    price: 249.99,
    stock: 25,
    lowStockThreshold: 15,
    status: "active",
    variants: []
  },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const };
    if (stock <= threshold) return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your products, stock levels, and variants.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new product with variants and stock information.
              </DialogDescription>
            </DialogHeader>
            <ProductForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search products by name, SKU, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock, product.lowStockThreshold);
                return (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        {product.variants.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {product.variants.length} variant{product.variants.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="font-medium">${product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{product.stock}</span>
                        {product.stock <= product.lowStockThreshold && (
                          <AlertCircle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant}>
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}