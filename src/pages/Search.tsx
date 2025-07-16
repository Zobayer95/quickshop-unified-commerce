import { Search as SearchIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SearchIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-primary">Search</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Search</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search products, customers, orders..." className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}