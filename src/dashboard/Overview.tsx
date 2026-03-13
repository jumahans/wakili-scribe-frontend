import { useEffect, useState } from 'react';
import { 
  Radio, 
  FileText, 
  Scale, 
  TrendingUp, 
  CheckCircle,
  Activity,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Session {
  id: string;
  caseNumber: string;
  court: string;
  status: 'live' | 'recording' | 'transcribing' | 'completed';
  startTime: string;
  duration: string;
  accuracy: number;
}

interface Stats {
  totalSessions: number;
  activeSessions: number;
  totalTranscripts: number;
  contradictionsFound: number;
  accuracyRate: number;
  creditsRemaining: number;
}

export default function Overview() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalSessions: 0,
    activeSessions: 0,
    totalTranscripts: 0,
    contradictionsFound: 0,
    accuracyRate: 0,
    creditsRemaining: 0,
  });

  useEffect(() => {
    // Mock data - in production, fetch from API
    setSessions([
      {
        id: '1',
        caseNumber: 'E123/2024',
        court: 'Milimani Commercial',
        status: 'live',
        startTime: '10:30 AM',
        duration: '45:23',
        accuracy: 96.5,
      },
      {
        id: '2',
        caseNumber: 'C456/2024',
        court: 'High Court - Family',
        status: 'recording',
        startTime: '11:00 AM',
        duration: '23:15',
        accuracy: 94.2,
      },
      {
        id: '3',
        caseNumber: 'A789/2024',
        court: 'Magistrate Court',
        status: 'transcribing',
        startTime: '09:15 AM',
        duration: '1:12:45',
        accuracy: 97.8,
      },
    ]);

    setStats({
      totalSessions: 156,
      activeSessions: 3,
      totalTranscripts: 142,
      contradictionsFound: 23,
      accuracyRate: 95.8,
      creditsRemaining: 45000,
    });
  }, []);

  const getStatusIcon = (status: Session['status']) => {
    switch (status) {
      case 'live':
        return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />;
      case 'recording':
        return <div className="w-2 h-2 rounded-full bg-ws-coral" />;
      case 'transcribing':
        return <Activity size={14} className="text-blue-400" />;
      case 'completed':
        return <CheckCircle size={14} className="text-green-500" />;
    }
  };

  const getStatusText = (status: Session['status']) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'recording':
        return 'Recording';
      case 'transcribing':
        return 'Transcribing';
      case 'completed':
        return 'Completed';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Dashboard</h1>
        <p className="text-ws-text-secondary">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ws-text-secondary">Active Sessions</p>
                <p className="text-2xl font-bold text-ws-text-primary">{stats.activeSessions}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-ws-coral/20 flex items-center justify-center">
                <Radio size={20} className="text-ws-coral" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ws-text-secondary">Total Transcripts</p>
                <p className="text-2xl font-bold text-ws-text-primary">{stats.totalTranscripts}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FileText size={20} className="text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ws-text-secondary">Contradictions</p>
                <p className="text-2xl font-bold text-ws-coral">{stats.contradictionsFound}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <Scale size={20} className="text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ws-text-secondary">Accuracy Rate</p>
                <p className="text-2xl font-bold text-green-400">{stats.accuracyRate}%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp size={20} className="text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions */}
      <Card className="bg-ws-black/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-ws-text-primary flex items-center gap-2">
            <Radio size={18} className="text-ws-coral" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div 
                key={session.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(session.status)}
                  <div>
                    <p className="text-sm font-medium text-ws-text-primary">{session.caseNumber}</p>
                    <p className="text-xs text-ws-text-secondary">{session.court}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-ws-text-secondary">{getStatusText(session.status)}</p>
                    <p className="text-sm font-mono text-ws-text-primary">{session.duration}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-ws-text-secondary">Accuracy</p>
                    <p className="text-sm font-mono text-green-400">{session.accuracy}%</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-ws-text-secondary">Started</p>
                    <p className="text-sm text-ws-text-primary">{session.startTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Credits */}
        <Card className="bg-ws-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-ws-text-primary">Credits & Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-ws-text-secondary">Remaining Credits</span>
                  <span className="text-sm font-mono text-ws-coral">
                    KES {stats.creditsRemaining.toLocaleString()}
                  </span>
                </div>
                <Progress value={75} className="h-2 bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-ws-text-secondary">This Month</p>
                  <p className="text-lg font-mono text-ws-text-primary">KES 12,500</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-xs text-ws-text-secondary">Sessions</p>
                  <p className="text-lg font-mono text-ws-text-primary">23</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-ws-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-lg text-ws-text-primary">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-ws-text-primary">Transcript completed for E123/2024</p>
                  <p className="text-xs text-ws-text-secondary">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-ws-coral/20 flex items-center justify-center flex-shrink-0">
                  <Scale size={14} className="text-ws-coral" />
                </div>
                <div>
                  <p className="text-sm text-ws-text-primary">3 contradictions detected in C456/2024</p>
                  <p className="text-xs text-ws-text-secondary">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Users size={14} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-ws-text-primary">Junior Associate verified 12 corrections</p>
                  <p className="text-xs text-ws-text-secondary">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
