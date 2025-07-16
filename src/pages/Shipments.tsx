import { Package2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Shipments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Package2 className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Shipments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Shipment Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Track package deliveries and shipments</p>
        </CardContent>
      </Card>
    </div>
  );
}