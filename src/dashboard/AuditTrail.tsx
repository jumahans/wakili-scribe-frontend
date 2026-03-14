import { useState } from 'react';
import { 
  Shield, 
  Search, 
  Filter,
  User,
  FileText,
  Edit3,
  Download,
  Eye,
  CheckCircle,
  Hash,
  Clock,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: 'view' | 'edit' | 'download' | 'verify' | 'export' | 'login' | 'logout';
  resource: string;
  resourceType: 'transcript' | 'document' | 'session' | 'account';
  details: string;
  ipAddress: string;
  hash: string;
}

const mockEvents: AuditEvent[] = [
  {
    id: '1',
    timestamp: '2024-03-15 14:32:15',
    user: 'Adv. Jane Doe',
    userRole: 'Senior Counsel',
    action: 'view',
    resource: 'E123/2024 Transcript',
    resourceType: 'transcript',
    details: 'Viewed transcript for 5 minutes',
    ipAddress: '192.168.1.100',
    hash: 'a3f7c2d8...5f2a',
  },
  {
    id: '2',
    timestamp: '2024-03-15 14:28:33',
    user: 'Assoc. John Mutua',
    userRole: 'Associate',
    action: 'edit',
    resource: 'C456/2024 Transcript',
    resourceType: 'transcript',
    details: 'Corrected 3 technical terms',
    ipAddress: '192.168.1.101',
    hash: '7e8d9f2a...8d3e',
  },
  {
    id: '3',
    timestamp: '2024-03-15 14:15:00',
    user: 'Jr. Assoc. Sarah Kimani',
    userRole: 'Junior Associate',
    action: 'verify',
    resource: 'A789/2024 Transcript',
    resourceType: 'transcript',
    details: 'Marked 12 corrections as verified',
    ipAddress: '192.168.1.102',
    hash: '2c5d6e7f...1c7f',
  },
  {
    id: '4',
    timestamp: '2024-03-15 13:45:22',
    user: 'Adv. Jane Doe',
    userRole: 'Senior Counsel',
    action: 'download',
    resource: 'E123/2024 PDF',
    resourceType: 'transcript',
    details: 'Downloaded verified transcript',
    ipAddress: '192.168.1.100',
    hash: '9a8b7c6d...4e5f',
  },
  {
    id: '5',
    timestamp: '2024-03-15 13:30:00',
    user: 'Assoc. John Mutua',
    userRole: 'Associate',
    action: 'export',
    resource: 'Contradiction Report',
    resourceType: 'document',
    details: 'Exported litigation analysis',
    ipAddress: '192.168.1.101',
    hash: '1a2b3c4d...5e6f',
  },
];

export default function AuditTrail() {
  const [events] = useState<AuditEvent[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<string>('7');

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         e.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = filterAction === 'all' || e.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const getActionIcon = (action: AuditEvent['action']) => {
    switch (action) {
      case 'view': return <Eye size={14} className="text-blue-400" />;
      case 'edit': return <Edit3 size={14} className="text-yellow-400" />;
      case 'download': return <Download size={14} className="text-green-400" />;
      case 'verify': return <CheckCircle size={14} className="text-purple-400" />;
      case 'export': return <FileText size={14} className="text-orange-400" />;
      case 'login': return <User size={14} className="text-cyan-400" />;
      case 'logout': return <User size={14} className="text-gray-400" />;
    }
  };

  const getActionColor = (action: AuditEvent['action']) => {
    const colors: Record<AuditEvent['action'], string> = {
      view: 'bg-blue-500/20 text-blue-400',
      edit: 'bg-yellow-500/20 text-yellow-400',
      download: 'bg-green-500/20 text-green-400',
      verify: 'bg-purple-500/20 text-purple-400',
      export: 'bg-orange-500/20 text-orange-400',
      login: 'bg-cyan-500/20 text-cyan-400',
      logout: 'bg-gray-500/20 text-gray-400',
    };
    return colors[action];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Audit Trail</h1>
        <p className="text-ws-text-secondary">Complete log of all system activities for compliance</p>
      </div>

      {/* Compliance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-green-400" />
              <span className="text-xs text-ws-text-secondary">SHA-256 Verified</span>
            </div>
            <p className="text-2xl font-bold text-ws-text-primary">100%</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-blue-400" />
              <span className="text-xs text-ws-text-secondary">Retention</span>
            </div>
            <p className="text-2xl font-bold text-ws-text-primary">7 Years</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <User size={16} className="text-purple-400" />
              <span className="text-xs text-ws-text-secondary">Active Users</span>
            </div>
            <p className="text-2xl font-bold text-ws-text-primary">12</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-orange-400" />
              <span className="text-xs text-ws-text-secondary">Events Today</span>
            </div>
            <p className="text-2xl font-bold text-ws-text-primary">{events.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ws-text-secondary" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit log..."
            className="pl-9 bg-ws-black/50 border-white/10 text-ws-text-primary"
          />
        </div>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-[140px] bg-ws-black/50 border-white/10 text-ws-text-primary">
            <Filter size={14} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-ws-black border-white/10">
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="view">View</SelectItem>
            <SelectItem value="edit">Edit</SelectItem>
            <SelectItem value="download">Download</SelectItem>
            <SelectItem value="verify">Verify</SelectItem>
            <SelectItem value="export">Export</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterDateRange} onValueChange={setFilterDateRange}>
          <SelectTrigger className="w-[140px] bg-ws-black/50 border-white/10 text-ws-text-primary">
            <Calendar size={14} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-ws-black border-white/10">
            <SelectItem value="1">Last 24 hours</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Log */}
      <Card className="bg-ws-black/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-ws-text-primary flex items-center gap-2">
            <Hash size={18} className="text-ws-coral" />
            Immutable Event Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getActionIcon(event.action)}
                      <Badge className={getActionColor(event.action)}>
                        {event.action.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-ws-text-secondary font-mono">
                        {event.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-ws-text-primary mb-1">
                      <span className="text-ws-coral">{event.user}</span> ({event.userRole})
                    </p>
                    <p className="text-sm text-ws-text-secondary">
                      {event.action === 'view' && 'Viewed'}
                      {event.action === 'edit' && 'Edited'}
                      {event.action === 'download' && 'Downloaded'}
                      {event.action === 'verify' && 'Verified'}
                      {event.action === 'export' && 'Exported'}
                      {' '}
                      <span className="text-ws-text-primary">{event.resource}</span>
                    </p>
                    <p className="text-xs text-ws-text-secondary mt-1">{event.details}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-ws-text-secondary font-mono">{event.ipAddress}</p>
                    <p className="text-xs text-ws-coral font-mono mt-1">{event.hash}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export */}
      <div className="flex justify-end">
        <Button variant="outline" className="border-white/10 text-ws-text-secondary">
          <Download size={16} className="mr-2" />
          Export Audit Log
        </Button>
      </div>
    </div>
  );
}
