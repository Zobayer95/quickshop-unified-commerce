import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-card">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search inventory, orders, shipments..."
          className="pl-10 bg-muted/50 border-0 focus:bg-card focus:ring-1 focus:ring-primary/20"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-xs rounded-full flex items-center justify-center text-destructive-foreground">
                3
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Notifications</h3>
                <Badge variant="destructive">3</Badge>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="p-3 border-b border-border hover:bg-muted/50 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Low Stock Alert</p>
                    <p className="text-xs text-muted-foreground">iPhone 15 Pro is running low on stock (5 units left)</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-b border-border hover:bg-muted/50 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">New Order</p>
                    <p className="text-xs text-muted-foreground">Order #1234 has been placed by John Doe</p>
                    <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-muted/50 cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Rider Assignment</p>
                    <p className="text-xs text-muted-foreground">Order #1230 has been assigned to rider Mike Johnson</p>
                    <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border-t border-border">
              <Button variant="ghost" size="sm" className="w-full text-primary">
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <User size={16} />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};