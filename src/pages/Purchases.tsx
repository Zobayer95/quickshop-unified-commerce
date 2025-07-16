import { Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Purchases() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Receipt className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Purchases</h1>
        <Badge>5</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Purchase order management system</p>
        </CardContent>
      </Card>
    </div>
  );
}