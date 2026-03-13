import { useState } from 'react';
import { 
  Radio, 
  Plus, 
  Trash2, 
  Play, 
  Square, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Copy
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Session {
  id: string;
  caseNumber: string;
  meetingUrl: string;
  platform: 'teams' | 'zoom' | 'google_meet';
  status: 'idle' | 'connecting' | 'recording' | 'paused' | 'completed' | 'error';
  startTime?: string;
  duration?: string;
  accuracy?: number;
}

const MAX_SESSIONS = 5;

export default function Dispatch() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newSession, setNewSession] = useState<{
    caseNumber: string;
    meetingUrl: string;
    platform: 'teams' | 'zoom' | 'google_meet';
  }>({
    caseNumber: '',
    meetingUrl: '',
    platform: 'teams',
  });

  const addSession = () => {
    if (sessions.length >= MAX_SESSIONS) return;
    
    const session: Session = {
      id: Date.now().toString(),
      caseNumber: newSession.caseNumber,
      meetingUrl: newSession.meetingUrl,
      platform: newSession.platform,
      status: 'idle',
    };
    
    setSessions([...sessions, session]);
    setNewSession({ caseNumber: '', meetingUrl: '', platform: 'teams' });
    setShowAddDialog(false);
  };

  const removeSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const startRecording = (id: string) => {
    setSessions(sessions.map(s => 
      s.id === id 
        ? { ...s, status: 'recording', startTime: new Date().toLocaleTimeString() }
        : s
    ));
  };

  const stopRecording = (id: string) => {
    setSessions(sessions.map(s => 
      s.id === id 
        ? { ...s, status: 'completed', duration: '45:23', accuracy: 96.5 }
        : s
    ));
  };

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'idle': return 'text-ws-text-secondary';
      case 'connecting': return 'text-yellow-400';
      case 'recording': return 'text-red-500';
      case 'paused': return 'text-orange-400';
      case 'completed': return 'text-green-400';
      case 'error': return 'text-red-400';
    }
  };

  const getStatusIcon = (status: Session['status']) => {
    switch (status) {
      case 'recording':
        return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle size={14} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={14} className="text-red-400" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-ws-text-secondary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Session Dispatch</h1>
          <p className="text-ws-text-secondary">Manage up to 5 concurrent court sessions</p>
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

      {/* Session Counter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-ws-text-secondary">Sessions:</span>
        <span className="text-sm font-mono text-ws-text-primary">
          {sessions.length} / {MAX_SESSIONS}
        </span>
        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden max-w-[200px]">
          <div 
            className="h-full bg-ws-coral rounded-full transition-all"
            style={{ width: `${(sessions.length / MAX_SESSIONS) * 100}%` }}
          />
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className="bg-ws-black/50 border-white/10">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-ws-text-primary">{session.caseNumber}</CardTitle>
                  <p className="text-xs text-ws-text-secondary mt-1">{session.platform}</p>
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
              {/* URL Display */}
              <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                <ExternalLink size={14} className="text-ws-text-secondary flex-shrink-0" />
                <span className="text-xs text-ws-text-secondary truncate flex-1">
                  {session.meetingUrl}
                </span>
                <button 
                  onClick={() => navigator.clipboard.writeText(session.meetingUrl)}
                  className="text-ws-text-secondary hover:text-ws-text-primary"
                >
                  <Copy size={14} />
                </button>
              </div>

              {/* Stats */}
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

              {/* Actions */}
              <div className="flex items-center gap-2">
                {session.status === 'idle' && (
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

        {/* Empty State */}
        {sessions.length === 0 && (
          <Card className="bg-ws-black/50 border-white/10 border-dashed col-span-full">
            <CardContent className="p-12 text-center">
              <Radio size={48} className="text-ws-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-ws-text-primary mb-2">No Active Sessions</h3>
              <p className="text-sm text-ws-text-secondary mb-4">
                Add a session to start capturing court proceedings
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

      {/* Add Session Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-sora">Add New Session</DialogTitle>
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
              <Label className="text-ws-text-secondary">Platform</Label>
              <Select 
                value={newSession.platform}
                onValueChange={(value: 'teams' | 'zoom' | 'google_meet') => 
                  setNewSession({ ...newSession, platform: value })
                }
              >
                <SelectTrigger className="bg-ws-black/50 border-white/10 text-ws-text-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-ws-black border-white/10">
                  <SelectItem value="teams">Microsoft Teams</SelectItem>
                  <SelectItem value="zoom">Zoom</SelectItem>
                  <SelectItem value="google_meet">Google Meet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-ws-text-secondary">Meeting URL</Label>
              <Input 
                value={newSession.meetingUrl}
                onChange={(e) => setNewSession({ ...newSession, meetingUrl: e.target.value })}
                placeholder="https://..."
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <Button 
              onClick={addSession}
              disabled={!newSession.caseNumber || !newSession.meetingUrl}
              className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              Add Session
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
