import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiderFormProps {
  onClose: () => void;
}

export const RiderForm = ({ onClose }: RiderFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    zone: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Rider data:", formData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="rider@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Full address..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => handleChange('vehicleType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bike">Bicycle</SelectItem>
                  <SelectItem value="scooter">Scooter/Motorcycle</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={(e) => handleChange('vehicleNumber', e.target.value)}
                placeholder="e.g. BK-2024-001"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              value={formData.licenseNumber}
              onChange={(e) => handleChange('licenseNumber', e.target.value)}
              placeholder="Driver's license number"
            />
          </div>
        </CardContent>
      </Card>

      {/* Work Assignment */}
      <Card>
        <CardHeader>
          <CardTitle>Work Assignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="zone">Assigned Zone</Label>
            <Select value={formData.zone} onValueChange={(value) => handleChange('zone', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zone-a">Zone A - Downtown</SelectItem>
                <SelectItem value="zone-b">Zone B - Midtown</SelectItem>
                <SelectItem value="zone-c">Zone C - Uptown</SelectItem>
                <SelectItem value="zone-d">Zone D - East Side</SelectItem>
                <SelectItem value="zone-e">Zone E - West Side</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleChange('emergencyContact', e.target.value)}
                placeholder="Contact person name"
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                placeholder="+1 (555) 999-0000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-primary">
          Add Rider
        </Button>
      </div>
    </form>
  );
};