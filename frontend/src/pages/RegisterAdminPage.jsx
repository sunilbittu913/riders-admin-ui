import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  User,
  Phone,
  Building,
  CheckCircle,
  Users,
  BarChart3,
  Globe,
  Crown,
  Zap
} from 'lucide-react';

const RegisterAdminPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    description: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const companySizes = [
    '1-10 employees',
    '11-50 employees', 
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const industries = [
    'Ride-sharing',
    'Food Delivery',
    'Package Delivery',
    'Corporate Transportation',
    'Public Transportation',
    'Logistics & Freight',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.companyName || !formData.companySize || !formData.industry) {
      toast.error('Please fill in all company information');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Please fill in password fields');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters for admin accounts');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!formData.acceptTerms) {
      toast.error('Please accept the Terms of Service');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (validateStep3()) {
      toast.success('Admin registration successful! Setting up your dashboard...');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    }
  };

  const adminFeatures = [
    { icon: <Users className="w-5 h-5" />, title: "Fleet Management", desc: "Manage drivers, passengers, and vehicles with complete control" },
    { icon: <BarChart3 className="w-5 h-5" />, title: "Advanced Analytics", desc: "Real-time insights, KPIs, and comprehensive reporting" },
    { icon: <Shield className="w-5 h-5" />, title: "Security & Compliance", desc: "Enterprise-grade security with role-based access control" },
    { icon: <Globe className="w-5 h-5" />, title: "Multi-City Operations", desc: "Scale across multiple cities with centralized management" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Back to home */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Features */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-warning/10 text-warning border-warning/20">
                      <Crown className="w-3 h-3 mr-1" />
                      Enterprise
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <Zap className="w-3 h-3 mr-1" />
                      Full Access
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground">
                Get complete control over your transportation network with FleetCommand's comprehensive admin dashboard.
              </p>
            </div>

            <div className="space-y-4">
              {adminFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-card border border-border/50 hover-lift">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center space-x-2 text-primary mb-3">
                <Crown className="w-6 h-6" />
                <span className="font-semibold text-lg">30-Day Free Trial</span>
              </div>
              <p className="text-sm text-primary/80 mb-4">
                Start your free trial with full access to all enterprise features. No credit card required.
              </p>
              <ul className="space-y-2 text-sm text-primary/80">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Unlimited drivers & passengers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Advanced analytics & reporting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>24/7 premium support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Form */}
          <Card className="border-border/50 shadow-elegant">
            <CardHeader className="space-y-4 pb-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Create Admin Account</h2>
                <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
              </div>
              
              <Progress value={progress} className="h-2" />
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            className="pl-10"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Smith"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      type="button" 
                      onClick={handleNext}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      Continue to Company Info
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setCurrentStep(1)}
                      className="mb-4"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Your Company Inc."
                          className="pl-10"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company Size *</Label>
                        <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {companySizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Industry *</Label>
                        <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Company Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourcompany.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Brief Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about your transportation business..."
                        className="min-h-20"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>

                    <Button 
                      type="button" 
                      onClick={handleNext}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      Continue to Security
                      <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setCurrentStep(2)}
                      className="mb-4"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>

                    <div className="space-y-2">
                      <Label htmlFor="password">Admin Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password (min 8 chars)"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your admin password"
                          className="pl-10 pr-10"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                          className="mt-1"
                        />
                        <Label htmlFor="terms" className="text-sm leading-5">
                          I agree to the <Link to="/terms" className="text-primary hover:text-primary/80">Enterprise Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:text-primary/80">Privacy Policy</Link>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="marketing"
                          checked={formData.acceptMarketing}
                          onCheckedChange={(checked) => handleInputChange('acceptMarketing', checked)}
                          className="mt-1"
                        />
                        <Label htmlFor="marketing" className="text-sm leading-5">
                          Send me product updates, feature announcements, and exclusive offers
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 h-12">
                      <Shield className="w-5 h-5 mr-2" />
                      Create Admin Account & Start Trial
                    </Button>
                  </div>
                )}
              </form>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdminPage;