import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateOrder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Plus className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Create Order</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Order Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Create new customer orders</p>
        </CardContent>
      </Card>
    </div>
  );
}