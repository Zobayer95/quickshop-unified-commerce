import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LowStock() {
  const lowStockItems = [
    { name: "iPhone 15 Pro", current: 5, minimum: 10, category: "Electronics" },
    { name: "Nike Air Max", current: 3, minimum: 15, category: "Footwear" },
    { name: "Samsung Galaxy Watch", current: 2, minimum: 8, category: "Electronics" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-6 w-6 text-destructive" />
        <h1 className="text-3xl font-bold text-primary">Low Stock Items</h1>
        <Badge variant="destructive">12</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Items Below Minimum Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    <span className="text-destructive font-medium">{item.current}</span> / {item.minimum}
                  </p>
                  <Button size="sm" variant="outline" className="mt-1">
                    Reorder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}