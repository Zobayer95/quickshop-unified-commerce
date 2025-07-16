import { HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Help() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Help & Support</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Access help documentation and support</p>
        </CardContent>
      </Card>
    </div>
  );
}