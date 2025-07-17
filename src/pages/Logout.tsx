import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogoutProps {
  onLogout: () => void;
}

const Logout = ({ onLogout }: LogoutProps) => {
  const { toast } = useToast();

  useEffect(() => {
    // Auto logout after 2 seconds
    const timer = setTimeout(() => {
      handleLogout();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    onLogout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-destructive/10 p-3 rounded-full">
              <LogOut className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Logging Out
          </CardTitle>
          <CardDescription>
            Thank you for using Warehouse Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              You are being logged out securely...
            </p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
          
          <Button onClick={handleLogout} className="w-full" variant="outline">
            Logout Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logout;