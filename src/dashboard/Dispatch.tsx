import { useState, useEffect } from 'react';
import { Radio, Plus, Trash2, Play, Square, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { authApi } from '@/api/api';

interface Session {
  id: string;
  caseNumber: string;
  meetingUrl: string;
  status: 'scheduled' | 'joining' | 'recording' | 'processing' | 'completed' | 'failed';
  startTime?: string;
  duration?: string;
  accuracy?: number;
}

const MAX_SESSIONS = 5;

export default function Dispatch() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newSession, setNewSession] = useState({ caseNumber: '', meetingUrl: '' });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await authApi.getCourtSessions();
      const today = new Date().toDateString();
      const mapped: Session[] = (response.data || [])
        .filter((s: any) => new Date(s.created_at).toDateString() === today)
        .map((s: any) => ({
          id: s.id,
          caseNumber: s.CaseNumber,
          meetingUrl: s.meetingurl,
          status: s.status,
          startTime: s.startime ?? undefined,
          duration: s.duration ?? undefined,
          accuracy: s.accuracy ?? undefined,
        }));
      setSessions(mapped);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    }
  };

  const addSession = async () => {
    if (sessions.length >= MAX_SESSIONS) return;
    setLoading(true);
    try {
      const response = await authApi.createSession({
        title: newSession.caseNumber,
        meeting_link: newSession.meetingUrl,
      });
      setSessions([...sessions, {
        id: response.data.id,
        caseNumber: response.data.title,
        meetingUrl: newSession.meetingUrl,
        status: 'scheduled',
      }]);
      setNewSession({ caseNumber: '', meetingUrl: '' });
      setShowAddDialog(false);
    } catch (error) {
      console.error('Failed to create session:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSession = async (id: string) => {
    try {
      await authApi.deleteSession(id);
      setSessions(sessions.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const startRecording = async (id: string) => {
    try {
      await authApi.startRecording(id);
      setSessions(sessions.map(s =>
        s.id === id ? { ...s, status: 'recording' as const, startTime: new Date().toLocaleTimeString() } : s
      ));
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async (id: string) => {
    try {
      await authApi.stopSession(id);
      setSessions(sessions.map(s =>
        s.id === id ? { ...s, status: 'completed' as const } : s
      ));
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const cancelMeeting = async (id: string) => {
    try {
      await authApi.cancelSession(id);
      setSessions(sessions.filter(s => s.id !== id));
    } catch (error) {
      console.error('Failed to cancel meeting:', error);
    }
  };

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'scheduled': return 'text-ws-text-secondary';
      case 'joining': return 'text-yellow-400';
      case 'recording': return 'text-red-500';
      case 'processing': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      case 'failed': return 'text-red-400';
    }
  };

  const getStatusIcon = (status: Session['status']) => {
    switch (status) {
      case 'recording':
        return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle size={14} className="text-green-400" />;
      case 'failed':
        return <AlertCircle size={14} className="text-red-400" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-ws-text-secondary" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Session Dispatch</h1>
          <p className="text-ws-text-secondary">Manage up to 5 concurrent Teams sessions</p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          disabled={sessions.length >= MAX_SESSIONS}
          className="bg-ws-coral hover:bg-ws-coral/90 text-white"
        >
          <Plus size={18} className="mr-2" />
          Add Session
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-ws-text-secondary">Sessions:</span>
        <span className="text-sm font-mono text-ws-text-primary">{sessions.length} / {MAX_SESSIONS}</span>
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden max-w-[200px]">
          <div
            className="h-full bg-ws-coral rounded-full transition-all"
            style={{ width: `${(sessions.length / MAX_SESSIONS) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="bg-ws-black/50 border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-ws-text-primary">{session.caseNumber}</CardTitle>
                  <p className="text-xs text-ws-text-secondary mt-1">Microsoft Teams</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(session.status)}
                  <span className={`text-xs ${getStatusColor(session.status)}`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-2 rounded bg-white/5">
                <span className="text-xs text-ws-text-secondary break-all">
                  {session.meetingUrl}
                </span>
              </div>

              {session.startTime && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-white/5">
                    <span className="text-ws-text-secondary">Started:</span>
                    <span className="text-ws-text-primary ml-2">{session.startTime}</span>
                  </div>
                  {session.duration && (
                    <div className="p-2 rounded bg-white/5">
                      <span className="text-ws-text-secondary">Duration:</span>
                      <span className="text-ws-text-primary ml-2">{session.duration}</span>
                    </div>
                  )}
                </div>
              )}

              {session.accuracy && (
                <div className="flex items-center justify-between p-2 rounded bg-green-500/10">
                  <span className="text-xs text-green-400">Accuracy</span>
                  <span className="text-sm font-mono text-green-400">{session.accuracy}%</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {session.status === 'scheduled' && (
                  <Button
                    onClick={() => startRecording(session.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <Play size={14} className="mr-2" />
                    Start
                  </Button>
                )}
                {session.status === 'recording' && (
                  <Button
                    onClick={() => stopRecording(session.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    <Square size={14} className="mr-2" />
                    Stop
                  </Button>
                )}
                {['scheduled', 'joining', 'recording'].includes(session.status) && (
                  <Button
                    onClick={() => cancelMeeting(session.id)}
                    variant="outline"
                    size="sm"
                    className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                  >
                    <XCircle size={14} className="mr-1" />
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={() => removeSession(session.id)}
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-ws-text-secondary hover:text-red-400 hover:border-red-400"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {sessions.length === 0 && (
          <Card className="bg-ws-black/50 border-white/10 border-dashed col-span-full">
            <CardContent className="p-12 text-center">
              <Radio size={48} className="text-ws-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-ws-text-primary mb-2">No Active Sessions</h3>
              <p className="text-sm text-ws-text-secondary mb-4">
                Add a Teams session to start capturing court proceedings
              </p>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-ws-coral hover:bg-ws-coral/90 text-white"
              >
                <Plus size={18} className="mr-2" />
                Add Session
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-sora">Add Teams Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label className="text-ws-text-secondary">Case Number</Label>
              <Input
                value={newSession.caseNumber}
                onChange={(e) => setNewSession({ ...newSession, caseNumber: e.target.value })}
                placeholder="e.g., E123/2024"
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <div>
              <Label className="text-ws-text-secondary">Teams Meeting URL</Label>
              <Input
                value={newSession.meetingUrl}
                onChange={(e) => setNewSession({ ...newSession, meetingUrl: e.target.value })}
                placeholder="https://teams.microsoft.com/l/meetup-join/..."
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <Button
              onClick={addSession}
              disabled={!newSession.caseNumber || !newSession.meetingUrl || loading}
              className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              {loading ? 'Creating...' : 'Add Session'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}