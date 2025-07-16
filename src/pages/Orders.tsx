import { ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Orders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Orders</h1>
        <Badge>8</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </CardContent>
      </Card>
    </div>
  );
}