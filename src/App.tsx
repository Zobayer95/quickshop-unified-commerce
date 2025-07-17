import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import POS from "./pages/POS";
import Sales from "./pages/Sales";
import Delivery from "./pages/Delivery";
import Riders from "./pages/Riders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Notifications from "./pages/Notifications";
import Categories from "./pages/Categories";
import LowStock from "./pages/LowStock";
import Locations from "./pages/Locations";
import ScanItems from "./pages/ScanItems";
import Purchases from "./pages/Purchases";
import Invoices from "./pages/Invoices";
import Returns from "./pages/Returns";
import Payments from "./pages/Payments";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import Shipments from "./pages/Shipments";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Performance from "./pages/Performance";
import Tools from "./pages/Tools";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import PurchaseOrders from "./pages/PurchaseOrders";
import WarehouseShelving from "./pages/WarehouseShelving";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="warehouse-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Login onLogin={handleLogin} />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="warehouse-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="search" element={<Search />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory/add" element={<Inventory />} />
              <Route path="inventory/categories" element={<Categories />} />
              <Route path="inventory/low-stock" element={<LowStock />} />
              <Route path="inventory/locations" element={<Locations />} />
              <Route path="inventory/shelving" element={<WarehouseShelving />} />
              <Route path="inventory/scan" element={<ScanItems />} />
              <Route path="purchases" element={<PurchaseOrders />} />
              <Route path="sales" element={<Sales />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="returns" element={<Returns />} />
              <Route path="operations/returns" element={<Returns />} />
              <Route path="payments" element={<Payments />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/create" element={<CreateOrder />} />
              <Route path="shipments" element={<Shipments />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="pos" element={<POS />} />
              <Route path="delivery" element={<Delivery />} />
              <Route path="riders" element={<Riders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="reports" element={<Reports />} />
              <Route path="performance" element={<Performance />} />
              <Route path="tools/import" element={<Tools />} />
              <Route path="tools/export" element={<Tools />} />
              <Route path="tools/backup" element={<Tools />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="profile" element={<Profile />} />
              <Route path="help" element={<Help />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
