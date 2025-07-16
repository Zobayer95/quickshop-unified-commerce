import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Schedule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Schedule</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage delivery schedules and time slots</p>
        </CardContent>
      </Card>
    </div>
  );
}