"use client";

import { Settings, User, Bell, Palette, Moon, Sun, Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
          <Settings className="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Account Information</span>
              </CardTitle>
              <CardDescription>Update your account details and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Name</span>
                </Label>
                <div className="relative">
                  <Input id="name" defaultValue="John Doe" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <div className="relative">
                  <Input id="email" type="email" defaultValue="john@example.com" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Current Password</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="current-password" 
                    type={showPassword ? "text" : "password"} 
                    className="pl-10 pr-10"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">{showPassword ? 'Hide' : 'Show'} password</span>
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Enable 2FA
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium text-destructive flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  <span>Danger Zone</span>
                </h3>
                <div className="flex flex-col gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <div>
                    <h4 className="font-medium text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
                  </div>
                  <Button variant="destructive" className="w-fit">
                    <Lock className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>Customize how Diamond Art looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <Label htmlFor="theme" className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <span>Theme</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                </div>
                <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    size="sm" 
                    className="h-10 sm:h-8 justify-start sm:justify-center"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    <span className="sm:hidden">Light</span>
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    size="sm" 
                    className="h-10 sm:h-8 justify-start sm:justify-center"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    <span className="sm:hidden">Dark</span>
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'} 
                    size="sm" 
                    className="h-10 sm:h-8 justify-start sm:justify-center"
                    onClick={() => setTheme('system')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="sm:hidden">System</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4" />
                    <span>Reduced Motion</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">Reduce animations and transitions</p>
                </div>
                <Switch id="reduced-motion" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                <div className="space-y-1">
                  <Label htmlFor="high-contrast" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>High Contrast Mode</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">Increase color contrast for better visibility</p>
                </div>
                <Switch id="high-contrast" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Email Notifications</span>
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-activity">Activity</Label>
                    <p className="text-sm text-muted-foreground">Get notified about your account activity</p>
                  </div>
                  <Switch id="email-activity" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-newsletter">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                  </div>
                  <Switch id="email-newsletter" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-promotions">Promotions</Label>
                    <p className="text-sm text-muted-foreground">Get updates about new features and offers</p>
                  </div>
                  <Switch id="email-promotions" />
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  <span>Push Notifications</span>
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-activity">Activity</Label>
                    <p className="text-sm text-muted-foreground">Get push notifications for activities</p>
                  </div>
                  <Switch id="push-activity" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-reminders">Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive daily practice reminders</p>
                  </div>
                  <Switch id="push-reminders" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
