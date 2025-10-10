import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Users,
  Car,
  BarChart3,
  MapPin,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Driver & Passenger Management",
      description: "Complete user management with verification, profiles, and real-time status tracking."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Dynamic Pricing & Fares",
      description: "Smart pricing with surge zones, promotional rates, and automated commission tracking."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Real-time insights, performance metrics, and comprehensive reporting dashboards."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Dispute Resolution",
      description: "Streamlined ticket management with messaging and automated resolution workflows."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Route Optimization",
      description: "AI-powered route planning with live traffic integration and ETA predictions."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Operations",
      description: "Round-the-clock monitoring with automated alerts and emergency response systems."
    }
  ];

  const stats = [
    { value: "500K+", label: "Active Rides" },
    { value: "25K+", label: "Drivers" },
    { value: "150+", label: "Cities" },
    { value: "4.9", label: "Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fleet Manager, MetroRide",
      content: "FleetCommand transformed our operations. We increased efficiency by 40% and reduced disputes by 65%.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Operations Director, CityTrans",
      content: "The analytics dashboard is incredible. We can make data-driven decisions in real-time.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "CEO, RideShare Pro",
      content: "Best investment we've made. The ROI was visible within the first month of implementation.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">FleetCommand</span>
                <Badge variant="secondary" className="ml-2 text-xs">Pro</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/register/rider">
                <Button className="bg-gradient-primary hover:opacity-90">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Next-Generation Fleet Management
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Revolutionize Your
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Fleet Operations</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The most advanced admin console for ride-sharing and transportation services. 
                  Manage drivers, passengers, fares, and analytics with unprecedented control and insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register/admin">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
                    <Users className="w-5 h-5 mr-2" />
                    Start Admin Trial
                  </Button>
                </Link>
                <Link to="/register/rider">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Join as Rider
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-primary rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-primary-foreground">
                      {i === 4 ? '+' : i}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold text-foreground">25,000+</span> fleet managers worldwide
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
                <div className="space-y-6">
                  {/* Dashboard Preview */}
                  <div className="bg-background/80 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Live Dashboard</h3>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span className="text-xs text-success">Live</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-metrics-bg/50 rounded p-3">
                        <div className="text-2xl font-bold text-foreground">$485K</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <div className="bg-metrics-bg/50 rounded p-3">
                        <div className="text-2xl font-bold text-foreground">1,247</div>
                        <div className="text-xs text-muted-foreground">Drivers</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                      <CheckCircle className="w-6 h-6 text-success mb-2" />
                      <div className="text-sm font-medium text-foreground">99.9% Uptime</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                      <Globe className="w-6 h-6 text-primary mb-2" />
                      <div className="text-sm font-medium text-foreground">Global Scale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything you need to manage your fleet
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and analytics to optimize your transportation business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift interactive group">
                <CardContent className="p-6">
                  <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Trusted by industry leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to transform your fleet operations?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of fleet managers who trust FleetCommand to power their transportation business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/admin">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90 w-full sm:w-auto">
                  <Shield className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">FleetCommand</span>
              </div>
              <p className="text-muted-foreground">
                The most advanced fleet management platform for modern transportation services.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/login" className="hover:text-foreground transition-colors">Admin Dashboard</Link></li>
                <li><Link to="/register/rider" className="hover:text-foreground transition-colors">Rider App</Link></li>
                <li><Link to="/register/driver" className="hover:text-foreground transition-colors">Driver Portal</Link></li>
                <li><Link to="/api" className="hover:text-foreground transition-colors">API Access</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link to="/support" className="hover:text-foreground transition-colors">Support</Link></li>
                <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/updates" className="hover:text-foreground transition-colors">Updates</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FleetCommand. All rights reserved. Built with precision for the future of transportation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;