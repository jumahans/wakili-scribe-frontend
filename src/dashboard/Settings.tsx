import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Save,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+254 700 000 000',
    notifications: {
      email: true,
      push: true,
      transcriptReady: true,
      contradictionFound: true,
      paymentAlerts: true,
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
    },
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Settings</h1>
        <p className="text-ws-text-secondary">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="bg-ws-black/50 border border-white/10">
          <TabsTrigger value="profile" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            <User size={16} className="mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            <Bell size={16} className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            <Shield size={16} className="mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            <CreditCard size={16} className="mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="bg-ws-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-ws-text-primary">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-ws-text-secondary">Full Name</Label>
                  <Input 
                    value={settings.name}
                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary"
                  />
                </div>
                <div>
                  <Label className="text-ws-text-secondary">Email</Label>
                  <Input 
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    type="email"
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary"
                  />
                </div>
                <div>
                  <Label className="text-ws-text-secondary">Phone</Label>
                  <Input 
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary"
                  />
                </div>
                <div>
                  <Label className="text-ws-text-secondary">Firm</Label>
                  <Input 
                    value={user?.firmName}
                    disabled
                    className="bg-ws-black/50 border-white/10 text-ws-text-secondary"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleSave}
                  className="bg-ws-coral hover:bg-ws-coral/90 text-white"
                >
                  {saved ? (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-ws-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-ws-text-primary">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-ws-text-primary">Email Notifications</p>
                  <p className="text-xs text-ws-text-secondary">Receive updates via email</p>
                </div>
                <Switch 
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => 
                    setSettings({ 
                      ...settings, 
                      notifications: { ...settings.notifications, email: checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-ws-text-primary">Push Notifications</p>
                  <p className="text-xs text-ws-text-secondary">Browser push notifications</p>
                </div>
                <Switch 
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => 
                    setSettings({ 
                      ...settings, 
                      notifications: { ...settings.notifications, push: checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-ws-text-primary">Transcript Ready</p>
                  <p className="text-xs text-ws-text-secondary">When a transcript is completed</p>
                </div>
                <Switch 
                  checked={settings.notifications.transcriptReady}
                  onCheckedChange={(checked) => 
                    setSettings({ 
                      ...settings, 
                      notifications: { ...settings.notifications, transcriptReady: checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-ws-text-primary">Contradiction Alerts</p>
                  <p className="text-xs text-ws-text-secondary">When AI detects contradictions</p>
                </div>
                <Switch 
                  checked={settings.notifications.contradictionFound}
                  onCheckedChange={(checked) => 
                    setSettings({ 
                      ...settings, 
                      notifications: { ...settings.notifications, contradictionFound: checked } 
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-ws-text-primary">Payment Alerts</p>
                  <p className="text-xs text-ws-text-secondary">Low balance and payment confirmations</p>
                </div>
                <Switch 
                  checked={settings.notifications.paymentAlerts}
                  onCheckedChange={(checked) => 
                    setSettings({ 
                      ...settings, 
                      notifications: { ...settings.notifications, paymentAlerts: checked } 
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card className="bg-ws-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-ws-text-primary">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm text-ws-text-primary">Two-Factor Authentication</p>
                  <p className="text-xs text-ws-text-secondary">Add an extra layer of security</p>
                </div>
                <Switch 
                  checked={settings.security.twoFactor}
                  onCheckedChange={(checked) => 
                    setSettings({ 
                      ...settings, 
                      security: { ...settings.security, twoFactor: checked } 
                    })
                  }
                />
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-sm text-ws-text-primary mb-2">Change Password</p>
                <div className="space-y-2">
                  <Input 
                    type="password"
                    placeholder="Current password"
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary"
                  />
                  <Input 
                    type="password"
                    placeholder="New password"
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary"
                  />
                  <Input 
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-ws-black/50 border-white/10 text-ws-text-primary"
                  />
                  <Button className="bg-ws-coral hover:bg-ws-coral/90 text-white">
                    Update Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-4">
          <Card className="bg-ws-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-ws-text-primary">Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-ws-coral/10 border border-ws-coral/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-medium text-ws-text-primary">Enterprise Plan</p>
                  <span className="text-sm text-ws-coral font-mono">KES 120,000/mo</span>
                </div>
                <p className="text-sm text-ws-text-secondary mb-4">
                  Unlimited everything + Priority GPU processing + Custom Legal Dictionary
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/10 text-ws-text-secondary">
                    Change Plan
                  </Button>
                  <Button variant="outline" className="border-white/10 text-red-400 hover:text-red-400">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-ws-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-ws-text-primary">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-400 text-xs font-bold">M</span>
                  </div>
                  <div>
                    <p className="text-sm text-ws-text-primary">M-PESA</p>
                    <p className="text-xs text-ws-text-secondary">+254 700 *** 000</p>
                  </div>
                </div>
                <span className="text-xs text-green-400">Default</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
