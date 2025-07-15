import { TrendingUp, DollarSign, ShoppingCart, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const analyticsData = {
  revenue: {
    current: 45231.89,
    previous: 37654.23,
    change: 20.1
  },
  orders: {
    current: 1250,
    previous: 1100,
    change: 13.6
  },
  customers: {
    current: 428,
    previous: 380,
    change: 12.6
  },
  averageOrder: {
    current: 156.78,
    previous: 142.50,
    change: 10.0
  }
};

export default function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Track your business performance and insights.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.revenue.current.toLocaleString()}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{analyticsData.revenue.change}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.orders.current.toLocaleString()}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{analyticsData.orders.change}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.customers.current}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{analyticsData.customers.change}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.averageOrder.current}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{analyticsData.averageOrder.change}% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart component will be implemented here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart component will be implemented here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}