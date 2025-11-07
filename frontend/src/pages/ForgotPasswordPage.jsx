import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { sendEmail, findUserByEmail } from '@/services/adminService';
import {
  Shield,
  Mail,
  ArrowLeft,
  CheckCircle,
  Clock,
  Key,
  Send
} from 'lucide-react';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState('email'); // 'email', 'sent', 'reset'
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendReset = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        toast.error('No user found with this email');
        return;
      }
      await sendEmail(user.userName || email);
      toast.success('Reset instructions sent to your email');
      setStep('sent');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to send reset email';
      toast.error(msg);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!resetCode || resetCode.length < 6) {
      toast.error('Please enter the 6-digit verification code');
      return;
    }

    // Mock verification
    toast.success('Code verified! You can now reset your password.');
    setStep('reset');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both password fields');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Mock password reset
    toast.success('Password reset successfully! You can now sign in with your new password.');
    
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <div className="mb-8">
          <Link to="/login" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>

        <Card className="border-border/50 shadow-elegant">
          <CardHeader className="space-y-6 pb-6">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">FleetCommand</h1>
                <Badge variant="secondary" className="text-xs">Pro</Badge>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground">
                {step === 'email' && 'Reset your password'}
                {step === 'sent' && 'Check your email'}
                {step === 'reset' && 'Set new password'}
              </h2>
              <p className="text-muted-foreground mt-1">
                {step === 'email' && 'Enter your email to receive a reset link'}
                {step === 'sent' && 'We sent a verification code to your email'}
                {step === 'reset' && 'Create a strong new password'}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Enter Email */}
            {step === 'email' && (
              <form onSubmit={handleSendReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send a verification code to this email address.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Reset Code
                </Button>
              </form>
            )}

            {/* Step 2: Code Sent */}
            {step === 'sent' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-success" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Reset code sent!</p>
                    <p className="text-sm text-muted-foreground">
                      We sent a 6-digit verification code to<br />
                      <span className="font-medium text-foreground">{email}</span>
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetCode">Verification Code</Label>
                    <Input
                      id="resetCode"
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="text-center text-lg tracking-widest"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify Code
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code? 
                    <button 
                      onClick={() => setStep('email')}
                      className="text-primary hover:text-primary/80 ml-1 font-medium"
                    >
                      Try again
                    </button>
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Code expires in 15 minutes</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Reset Password */}
            {step === 'reset' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Reset Password
                  </Button>
                </form>
              </div>
            )}

            {/* Security Note */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium mb-1">Security Note</p>
                  <p>For your security, reset codes expire after 15 minutes and can only be used once.</p>
                </div>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;