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
import { authApi } from '@/api/api';
import { useAuth } from '@/contexts/AuthContext';

interface Session {
  id: string;
  caseNumber: string;
  court: string;
  status: 'live' | 'recording' | 'transcribing' | 'completed' | 'scheduled' | 'joining';
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

interface DashboardData {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    name: string;
    role: string;
  };
  stats: Stats;
  recentSessions: Session[];
}

export default function Overview() {
  const { setUser } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await authApi.getDashboard();
        const data: DashboardData = response.data;
        
        // Update user in auth context
        setUser(data.user);
        
        // Set dashboard data
        setStats(data.stats);
        setSessions(data.recentSessions);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [setUser]);

  const getStatusIcon = (status: Session['status']) => {
    switch (status) {
      case 'live':
      case 'recording':
        return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />;
      case 'joining':
        return <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />;
      case 'transcribing':
        return <Activity size={14} className="text-blue-400" />;
      case 'completed':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'scheduled':
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500" />;
    }
  };

  const getStatusText = (status: Session['status']) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'joining':
        return 'Joining';
      case 'recording':
        return 'Recording';
      case 'transcribing':
        return 'Transcribing';
      case 'completed':
        return 'Completed';
      case 'scheduled':
        return 'Scheduled';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-ws-coral/30 border-t-ws-coral rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

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
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-ws-text-secondary">
              <p>No sessions yet. Start your first transcription!</p>
            </div>
          ) : (
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
          )}
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
                  <p className="text-lg font-mono text-ws-text-primary">{stats.totalSessions}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity - Static for now */}
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
                  <p className="text-sm text-ws-text-primary">System ready</p>
                  <p className="text-xs text-ws-text-secondary">Dashboard loaded</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}