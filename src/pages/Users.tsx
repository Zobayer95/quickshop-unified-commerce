import { UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <UserCog className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">User Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </CardContent>
      </Card>
    </div>
  );
}