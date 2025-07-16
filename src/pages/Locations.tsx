import { Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Locations() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Warehouse Locations</h1>
        </div>
        <Button>Add Location</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {["Main Warehouse", "Downtown Store", "Airport Branch"].map((location) => (
          <Card key={location}>
            <CardHeader>
              <CardTitle>{location}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {Math.floor(Math.random() * 1000 + 100)} items stored
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}