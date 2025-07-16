import { Grid3x3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid3x3 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Categories</h1>
        </div>
        <Button>Add Category</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {["Electronics", "Clothing", "Food & Beverages", "Books", "Home & Garden", "Sports"].map((category) => (
          <Card key={category}>
            <CardContent className="p-6">
              <h3 className="font-semibold">{category}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.floor(Math.random() * 50 + 10)} products
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}