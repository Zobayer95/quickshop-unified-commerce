import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-card">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search products, orders, customers..."
          className="pl-10 bg-muted/50 border-0 focus:bg-card focus:ring-1 focus:ring-primary/20"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-xs rounded-full flex items-center justify-center text-destructive-foreground">
            3
          </span>
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User size={16} />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};