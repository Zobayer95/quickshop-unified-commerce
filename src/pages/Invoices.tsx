import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Invoices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Invoices</h1>
        <Badge>8</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Generate and manage invoices</p>
        </CardContent>
      </Card>
    </div>
  );
}