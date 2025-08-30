import { Grid3x3, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Categories() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const handleAddCategory = () => {
    // Handle add category logic here
    console.log("Adding category:", { name: categoryName, description: categoryDescription });
    setCategoryName("");
    setCategoryDescription("");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Grid3x3 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Categories</h1>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category for better organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Electronics, Clothing..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="categoryDescription">Description (Optional)</Label>
                <Input
                  id="categoryDescription"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Brief description of the category..."
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddCategory}
                  className="bg-gradient-primary"
                  disabled={!categoryName.trim()}
                >
                  Add Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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