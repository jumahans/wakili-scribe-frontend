import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Search, 
  Play, 
  Pause,
  Download, 
  Edit3, 
  CheckCircle,
  User,
  Hash,
  Filter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/api/api';

interface Utterance {
  id: string;
  speaker_label: string;
  teams_participant_name: string | null;
  teams_role: string | null;
  text: string;
  start_time: number;
  end_time: number;
  confidence: number;
  sequence_number: number;
}

interface Transcript {
  id: string;
  title: string;
  status: string;
  source: string;
  language: string;
  word_count: number;
  speaker_count: number;
  duration_seconds: number | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  utterances: Utterance[];
}

const SPEAKER_COLORS = [
  '#FF4D2E', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'
];

export default function Transcripts() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [playingSegment, setPlayingSegment] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [liveSegments, setLiveSegments] = useState<Utterance[]>([]);
  const [isLive, setIsLive] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const segmentCounter = useRef(0);
  const liveEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get('/transcripts/')
      .then(res => {
        setTranscripts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch transcripts:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api.get('/court-sessions/session-list')
      .then(res => {
        const active = res.data.find((s: any) =>
          s.status === 'recording' || s.status === 'joining'
        );
        if (!active) return;

        const ws = new WebSocket(`ws://localhost:8000/ws/transcribe/${active.id}/`);
        wsRef.current = ws;

        ws.onopen = () => setIsLive(true);
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.transcript) {
            const newSegment: Utterance = {
              id: `live-${segmentCounter.current++}`,
              speaker_label: 'Live',
              teams_participant_name: null,
              teams_role: null,
              text: data.transcript,
              start_time: segmentCounter.current * 5,
              end_time: segmentCounter.current * 5 + 5,
              confidence: 90,
              sequence_number: segmentCounter.current,
            };
            setLiveSegments(prev => [...prev, newSegment]);
            liveEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }
        };
        ws.onclose = () => setIsLive(false);
        ws.onerror = () => setIsLive(false);
      })
      .catch(err => console.error('Failed to fetch sessions:', err));

    return () => wsRef.current?.close();
  }, []);

  const filteredTranscripts = transcripts.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      scheduled: 'bg-gray-500/20 text-gray-400',
      joining: 'bg-blue-500/20 text-blue-400',
      recording: 'bg-red-500/20 text-red-400',
      processing: 'bg-yellow-500/20 text-yellow-400',
      completed: 'bg-green-500/20 text-green-400',
      error: 'bg-red-500/20 text-red-400',
    };
    const labels: Record<string, string> = {
      scheduled: 'Scheduled',
      joining: 'Joining',
      recording: 'Recording',
      processing: 'Processing',
      completed: 'Completed',
      error: 'Error',
    };
    return <Badge className={styles[status] || 'bg-gray-500/20 text-gray-400'}>{labels[status] || status}</Badge>;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
  };

  const getSpeakerColor = (speakerLabel: string) => {
    const index = parseInt(speakerLabel.replace(/\D/g, '')) || 0;
    return SPEAKER_COLORS[index % SPEAKER_COLORS.length];
  };

  const getUniqueSpeakers = (utterances: Utterance[]) => {
    const seen = new Set();
    return utterances.filter(u => {
      if (seen.has(u.speaker_label)) return false;
      seen.add(u.speaker_label);
      return true;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Transcripts</h1>
          <p className="text-ws-text-secondary">View, edit, and verify court transcripts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ws-text-secondary" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcripts..."
              className="pl-9 bg-ws-black/50 border-white/10 text-ws-text-primary w-[250px]"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px] bg-ws-black/50 border-white/10 text-ws-text-primary">
              <Filter size={14} className="mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ws-black border-white/10">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="joining">Joining</SelectItem>
              <SelectItem value="recording">Recording</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(liveSegments.length > 0 || isLive) && (
        <Card className="bg-ws-black/50 border-ws-coral/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-sm font-medium text-ws-coral">
                {isLive ? 'Live Transcription' : 'Transcription Ended'}
              </span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {liveSegments.map((segment) => (
                <div key={segment.id} className="p-2 rounded bg-white/5">
                  <p className="text-sm text-ws-text-primary">{segment.text}</p>
                </div>
              ))}
              <div ref={liveEndRef} />
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center text-ws-text-secondary py-10">Loading transcripts...</div>
      ) : filteredTranscripts.length === 0 ? (
        <div className="text-center text-ws-text-secondary py-10">No transcripts found.</div>
      ) : (
        <div className="space-y-3">
          {filteredTranscripts.map((transcript) => (
            <Card
              key={transcript.id}
              className="bg-ws-black/50 border-white/10 hover:border-ws-coral/50 transition-colors cursor-pointer"
              onClick={() => setSelectedTranscript(transcript)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-ws-coral/20 flex items-center justify-center">
                      <FileText size={18} className="text-ws-coral" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-ws-text-primary">{transcript.title}</h3>
                        {getStatusBadge(transcript.status)}
                      </div>
                      <p className="text-sm text-ws-text-secondary">{transcript.source} • {transcript.language}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div className="hidden sm:block">
                      <p className="text-xs text-ws-text-secondary">Date</p>
                      <p className="text-sm text-ws-text-primary">
                        {transcript.created_at ? new Date(transcript.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs text-ws-text-secondary">Duration</p>
                      <p className="text-sm text-ws-text-primary">{formatDuration(transcript.duration_seconds)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-ws-text-secondary">Words</p>
                      <p className="text-sm font-mono text-green-400">{transcript.word_count}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-ws-text-secondary hover:text-ws-text-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedTranscript} onOpenChange={() => setSelectedTranscript(null)}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-sora">{selectedTranscript?.title}</DialogTitle>
                <p className="text-sm text-ws-text-secondary">{selectedTranscript?.source}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedTranscript && getStatusBadge(selectedTranscript.status)}
                <div className="flex items-center gap-1 text-xs text-ws-text-secondary">
                  <Hash size={12} />
                  <span className="font-mono">{selectedTranscript?.id.slice(0, 8)}...</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="flex items-center gap-2 py-2 border-b border-white/10 flex-wrap">
            <User size={14} className="text-ws-text-secondary" />
            <span className="text-xs text-ws-text-secondary">Speakers:</span>
            {selectedTranscript && getUniqueSpeakers(selectedTranscript.utterances).map((u) => (
              <Badge
                key={u.speaker_label}
                className="text-xs"
                style={{
                  backgroundColor: `${getSpeakerColor(u.speaker_label)}30`,
                  color: getSpeakerColor(u.speaker_label),
                  borderColor: getSpeakerColor(u.speaker_label)
                }}
                variant="outline"
              >
                {u.teams_participant_name || u.speaker_label} {u.teams_role ? `(${u.teams_role})` : ''}
              </Badge>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 py-4">
            {selectedTranscript?.utterances.length === 0 ? (
              <p className="text-center text-ws-text-secondary py-10">No utterances yet.</p>
            ) : (
              selectedTranscript?.utterances.map((utterance) => (
                <div
                  key={utterance.id}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <button
                    onClick={() => setPlayingSegment(playingSegment === utterance.id ? null : utterance.id)}
                    className="mt-0.5 text-ws-text-secondary hover:text-ws-coral transition-colors"
                  >
                    {playingSegment === utterance.id ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-medium"
                        style={{ color: getSpeakerColor(utterance.speaker_label) }}
                      >
                        {utterance.teams_participant_name || utterance.speaker_label}
                      </span>
                      {utterance.start_time != null && (
                        <span className="text-xs text-ws-text-secondary font-mono">
                          {formatTime(utterance.start_time)} - {formatTime(utterance.end_time)}
                        </span>
                      )}
                      {utterance.confidence != null && (
                        <span className="text-xs text-ws-text-secondary">
                          {Math.round(utterance.confidence * 100)}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-ws-text-primary">{utterance.text}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-ws-text-secondary hover:text-ws-coral transition-all">
                    <Edit3 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-white/10 text-ws-text-secondary">
                <Edit3 size={16} className="mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="border-white/10 text-ws-text-secondary">
                <CheckCircle size={16} className="mr-2" />
                Mark Verified
              </Button>
            </div>
            <Button className="bg-ws-coral hover:bg-ws-coral/90 text-white">
              <Download size={16} className="mr-2" />
              Export PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}