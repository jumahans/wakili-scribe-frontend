import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  FileText, 
  Scale, 
  Upload, 
  BookOpen, 
  CreditCard, 
  Shield, 
  Users, 
  Settings,
  LogOut,
  Menu,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Overview', exact: true },
  { path: '/dashboard/dispatch', icon: Radio, label: 'Dispatch' },
  { path: '/dashboard/transcripts', icon: FileText, label: 'Transcripts' },
  { path: '/dashboard/litigation', icon: Scale, label: 'Litigation AI' },
  { path: '/dashboard/corpus', icon: Upload, label: 'Case Corpus' },
  { path: '/dashboard/dictionary', icon: BookOpen, label: 'Dictionary' },
  { path: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
  { path: '/dashboard/audit', icon: Shield, label: 'Audit Trail' },
  { path: '/dashboard/team', icon: Users, label: 'Team' },
  { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ws-black flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-ws-black border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="font-sora font-bold text-xl text-ws-text-primary">
              Wakili-Scribe
            </div>
            <p className="text-xs text-ws-text-secondary mt-1">Shadow Record Engine</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact 
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors
                    ${isActive 
                      ? 'bg-ws-coral/20 text-ws-coral' 
                      : 'text-ws-text-secondary hover:text-ws-text-primary hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-ws-coral/20 flex items-center justify-center">
                <span className="text-ws-coral font-semibold text-sm">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ws-text-primary truncate">{user?.name}</p>
                <p className="text-xs text-ws-text-secondary truncate">{user?.firmName}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-ws-text-secondary">
                Credits: <span className="text-ws-coral font-mono">KES {user?.credits.toLocaleString()}</span>
              </span>
              <button 
                onClick={logout}
                className="text-ws-text-secondary hover:text-ws-coral transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 lg:px-6">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-ws-text-secondary hover:text-ws-text-primary"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <button className="relative text-ws-text-secondary hover:text-ws-text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-ws-coral rounded-full text-[10px] flex items-center justify-center text-white">
                3
              </span>
            </button>
            <Button 
              size="sm"
              className="bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              <Radio size={16} className="mr-2" />
              New Session
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
