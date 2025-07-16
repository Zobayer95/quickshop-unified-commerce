import { ScanLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ScanItems() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ScanLine className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Scan Items</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Barcode Scanner</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
            <ScanLine className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-4">Position barcode within the frame to scan</p>
            <Button>Start Camera</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}