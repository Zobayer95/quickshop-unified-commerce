import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Notifications</h1>
        <Badge variant="destructive">3</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-medium">Low Stock Alert</p>
              <p className="text-sm text-muted-foreground">iPhone 15 Pro is running low on stock (5 units left)</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-medium">New Order</p>
              <p className="text-sm text-muted-foreground">Order #1234 has been placed by John Doe</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium">Rider Assignment</p>
              <p className="text-sm text-muted-foreground">Order #1230 has been assigned to rider Mike Johnson</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}