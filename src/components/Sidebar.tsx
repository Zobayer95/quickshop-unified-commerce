import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Truck,
  MapPin,
  Search,
  Bell,
  Plus,
  Grid3x3,
  AlertTriangle,
  Building,
  ScanLine,
  Receipt,
  FileText,
  RotateCcw,
  Wallet,
  ClipboardList,
  Package2,
  Send,
  Calendar,
  TrendingUp,
  FileBarChart,
  Zap,
  Upload,
  Download,
  Archive,
  User,
  UserCog,
  HelpCircle,
  LogOut,
  Warehouse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationGroups = [
  {
    title: "Main Navigation",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Search", href: "/search", icon: Search },
      { name: "Notifications", href: "/notifications", icon: Bell, badge: "3" },
    ]
  },
  {
    title: "Inventory Management",
    items: [
      { name: "All Inventory", href: "/inventory", icon: Package },
      { name: "Add Product", href: "/inventory/add", icon: Plus },
      { name: "Categories", href: "/inventory/categories", icon: Grid3x3 },
      { name: "Low Stock", href: "/inventory/low-stock", icon: AlertTriangle, badge: "12" },
      { name: "Locations", href: "/inventory/locations", icon: Building },
      { name: "Warehouse Shelving", href: "/inventory/shelving", icon: Warehouse },
      { name: "Scan Items", href: "/inventory/scan", icon: ScanLine },
    ]
  },
  {
    title: "Transactions",
    items: [
      { name: "Purchases", href: "/purchases", icon: Receipt, badge: "5" },
      { name: "Sales", href: "/sales", icon: CreditCard, badge: "23" },
      { name: "Invoices", href: "/invoices", icon: FileText, badge: "8" },
      { name: "Returns", href: "/returns", icon: RotateCcw, badge: "2" },
      { name: "Payments", href: "/payments", icon: Wallet },
    ]
  },
  {
    title: "Operations",
    items: [
      { name: "Orders", href: "/orders", icon: ClipboardList, badge: "8" },
      { name: "Create Order", href: "/orders/create", icon: Plus },
      { name: "Shipments", href: "/shipments", icon: Package2 },
      { name: "Returns", href: "/operations/returns", icon: RotateCcw, badge: "2" },
      { name: "Rider Tasks", href: "/riders", icon: MapPin },
      { name: "Schedule", href: "/schedule", icon: Calendar },
    ]
  },
  {
    title: "Analytics & Reports",
    items: [
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Reports", href: "/reports", icon: FileBarChart },
      { name: "Performance", href: "/performance", icon: TrendingUp },
    ]
  },
  {
    title: "Tools",
    items: [
      { name: "Import Data", href: "/tools/import", icon: Upload },
      { name: "Export Data", href: "/tools/export", icon: Download },
      { name: "Backup", href: "/tools/backup", icon: Archive },
    ]
  },
  {
    title: "System",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Users", href: "/users", icon: Users },
      { name: "Profile", href: "/profile", icon: User },
      { name: "Help", href: "/help", icon: HelpCircle },
      { name: "Logout", href: "/logout", icon: LogOut },
    ]
  }
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <div className={cn(
      "bg-gradient-secondary text-secondary-foreground transition-all duration-300 flex flex-col shadow-elevated",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-glow/20">
        {!collapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary-glow to-primary bg-clip-text text-transparent">
            BizManager
          </h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-secondary-foreground hover:bg-secondary-glow/20"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-secondary-foreground/60 uppercase tracking-wider px-3 py-1">
                {group.title}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                      "hover:bg-secondary-glow/20",
                      isActive && "bg-primary text-primary-foreground shadow-glow",
                      collapsed && "justify-center"
                    )
                  }
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="ml-3 truncate">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary-glow text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute left-full ml-2 bg-primary-glow text-primary-foreground text-xs px-1.5 py-0.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};