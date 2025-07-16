import { RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Returns() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <RotateCcw className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Returns</h1>
        <Badge>2</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Return Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Handle product returns and refunds</p>
        </CardContent>
      </Card>
    </div>
  );
}