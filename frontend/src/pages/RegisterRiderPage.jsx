import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Car,
  CheckCircle,
  MapPin,
  Star,
  Smartphone
} from 'lucide-react';

const RegisterRiderPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });

  const totalSteps = 2;
  const progress = (currentStep / totalSteps) * 100;

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
    if (!formData.password || !formData.confirmPassword) {
      toast.error('Please fill in password fields');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
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
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (validateStep2()) {
      toast.success('Registration successful! Welcome to FleetCommand!');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  const riderBenefits = [
    { icon: <Car className="w-5 h-5" />, title: "Instant Booking", desc: "Book rides in seconds with real-time driver matching" },
    { icon: <MapPin className="w-5 h-5" />, title: "Live Tracking", desc: "Track your ride in real-time with accurate ETAs" },
    { icon: <Star className="w-5 h-5" />, title: "Quality Drivers", desc: "All drivers are verified and highly rated" },
    { icon: <Smartphone className="w-5 h-5" />, title: "Mobile First", desc: "Seamless experience across all devices" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back to home */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Benefits */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Join as Rider</h1>
                  <Badge variant="secondary" className="text-xs">Premium Experience</Badge>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground">
                Experience the future of transportation with FleetCommand's premium ride-sharing platform.
              </p>
            </div>

            <div className="space-y-4">
              {riderBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-card border border-border/50">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-success mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Special Launch Offer</span>
              </div>
              <p className="text-sm text-success/80">
                Get 50% off your first 5 rides when you sign up this month!
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <Card className="border-border/50 shadow-elegant">
            <CardHeader className="space-y-4 pb-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Create Rider Account</h2>
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
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
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
                      Continue
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
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a strong password"
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
                          placeholder="Confirm your password"
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
                          I agree to the <Link to="/terms" className="text-primary hover:text-primary/80">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:text-primary/80">Privacy Policy</Link>
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
                          I want to receive promotional emails and updates about new features
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create Rider Account
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

export default RegisterRiderPage;