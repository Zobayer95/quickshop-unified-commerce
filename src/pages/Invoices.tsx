import { FileText, Plus, Download, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const invoicesData = [
  {
    id: "INV-001",
    customer: "John Doe",
    amount: 1250.00,
    status: "paid",
    dueDate: "2024-01-20",
    issueDate: "2024-01-15",
    items: ["iPhone 15 Pro", "AirPods Pro"]
  },
  {
    id: "INV-002",
    customer: "Jane Smith",
    amount: 890.50,
    status: "pending",
    dueDate: "2024-01-25",
    issueDate: "2024-01-16",
    items: ["MacBook Air", "Magic Mouse"]
  },
  {
    id: "INV-003",
    customer: "Mike Johnson",
    amount: 2100.00,
    status: "overdue",
    dueDate: "2024-01-10",
    issueDate: "2024-01-05",
    items: ["iPad Pro", "Apple Pencil", "Smart Keyboard"]
  }
];

export default function Invoices() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    amount: "",
    dueDate: "",
    items: ""
  });

  const filteredInvoices = invoicesData.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "default";
      case "pending": return "secondary";
      case "overdue": return "destructive";
      default: return "outline";
    }
  };

  const handleCreateInvoice = () => {
    if (!newInvoice.customer || !newInvoice.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer and amount fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invoice Created",
      description: `Invoice for ${newInvoice.customer} created successfully`,
    });

    setNewInvoice({ customer: "", amount: "", dueDate: "", items: "" });
    setIsCreateDialogOpen(false);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice ${invoiceId}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Invoices</h1>
          <Badge variant="secondary">8</Badge>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                Generate a new invoice for a customer.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customer">Customer Name</Label>
                <Input
                  id="customer"
                  value={newInvoice.customer}
                  onChange={(e) => setNewInvoice(prev => ({ ...prev, customer: e.target.value }))}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="items">Items/Description</Label>
                <Textarea
                  id="items"
                  value={newInvoice.items}
                  onChange={(e) => setNewInvoice(prev => ({ ...prev, items: e.target.value }))}
                  placeholder="List of items or service description"
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateInvoice}
                  className="bg-gradient-primary"
                >
                  Create Invoice
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search invoices by ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Invoices ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono">{invoice.id}</TableCell>
                  <TableCell className="font-medium">{invoice.customer}</TableCell>
                  <TableCell className="font-medium">${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(invoice.status) as any}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
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