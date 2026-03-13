import { useState } from 'react';
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

interface Transcript {
  id: string;
  caseNumber: string;
  court: string;
  date: string;
  duration: string;
  status: 'processing' | 'pending_review' | 'verified' | 'exported';
  accuracy: number;
  speakers: Speaker[];
  segments: Segment[];
  hash: string;
}

interface Speaker {
  id: string;
  name: string;
  role: 'judge' | 'counsel' | 'witness' | 'clerk';
  color: string;
}

interface Segment {
  id: string;
  speakerId: string;
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

const mockTranscripts: Transcript[] = [
  {
    id: '1',
    caseNumber: 'E123/2024',
    court: 'Milimani Commercial Court',
    date: '2024-03-15',
    duration: '1:45:23',
    status: 'verified',
    accuracy: 96.5,
    hash: 'a3f7c2d8e9b1...5f2a',
    speakers: [
      { id: 's1', name: 'Hon. Justice Kimani', role: 'judge', color: '#FF4D2E' },
      { id: 's2', name: 'Adv. Ochieng', role: 'counsel', color: '#3B82F6' },
      { id: 's3', name: 'Mr. Kamau', role: 'witness', color: '#10B981' },
    ],
    segments: [
      { id: 'seg1', speakerId: 's1', text: 'Calling Case Number E123 of 2024. Parties present?', startTime: 0, endTime: 5, confidence: 98 },
      { id: 'seg2', speakerId: 's2', text: 'May it please Your Honor, I appear for the plaintiff, Ochieng for the plaintiff.', startTime: 6, endTime: 12, confidence: 95 },
      { id: 'seg3', speakerId: 's1', text: 'Thank you, Mr. Ochieng. Let us proceed with the examination of the witness.', startTime: 13, endTime: 18, confidence: 97 },
    ],
  },
  {
    id: '2',
    caseNumber: 'C456/2024',
    court: 'High Court - Family Division',
    date: '2024-03-14',
    duration: '2:30:15',
    status: 'pending_review',
    accuracy: 94.2,
    hash: '7e8d9f2a1b4c...8d3e',
    speakers: [
      { id: 's1', name: 'Hon. Justice Wanjiku', role: 'judge', color: '#FF4D2E' },
      { id: 's2', name: 'Adv. Mutua', role: 'counsel', color: '#3B82F6' },
      { id: 's3', name: 'Mrs. Achieng', role: 'witness', color: '#10B981' },
    ],
    segments: [],
  },
];

export default function Transcripts() {
  const [transcripts] = useState<Transcript[]>(mockTranscripts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
  const [playingSegment, setPlayingSegment] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTranscripts = transcripts.filter(t => {
    const matchesSearch = t.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.court.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: Transcript['status']) => {
    const styles = {
      processing: 'bg-yellow-500/20 text-yellow-400',
      pending_review: 'bg-orange-500/20 text-orange-400',
      verified: 'bg-green-500/20 text-green-400',
      exported: 'bg-blue-500/20 text-blue-400',
    };
    const labels = {
      processing: 'Processing',
      pending_review: 'Pending Review',
      verified: 'Verified',
      exported: 'Exported',
    };
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending_review">Pending Review</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="exported">Exported</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transcripts List */}
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
                      <h3 className="font-medium text-ws-text-primary">{transcript.caseNumber}</h3>
                      {getStatusBadge(transcript.status)}
                    </div>
                    <p className="text-sm text-ws-text-secondary">{transcript.court}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <p className="text-xs text-ws-text-secondary">Date</p>
                    <p className="text-sm text-ws-text-primary">{transcript.date}</p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs text-ws-text-secondary">Duration</p>
                    <p className="text-sm text-ws-text-primary">{transcript.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-ws-text-secondary">Accuracy</p>
                    <p className="text-sm font-mono text-green-400">{transcript.accuracy}%</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/10 text-ws-text-secondary hover:text-ws-text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Download transcript
                    }}
                  >
                    <Download size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transcript Viewer Dialog */}
      <Dialog open={!!selectedTranscript} onOpenChange={() => setSelectedTranscript(null)}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-sora">{selectedTranscript?.caseNumber}</DialogTitle>
                <p className="text-sm text-ws-text-secondary">{selectedTranscript?.court}</p>
              </div>
              <div className="flex items-center gap-2">
                {selectedTranscript && getStatusBadge(selectedTranscript.status)}
                <div className="flex items-center gap-1 text-xs text-ws-text-secondary">
                  <Hash size={12} />
                  <span className="font-mono">{selectedTranscript?.hash}</span>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Audio Player */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <Button 
              size="sm"
              className="bg-ws-coral hover:bg-ws-coral/90 text-white"
              onClick={() => setPlayingSegment(playingSegment ? null : 'all')}
            >
              {playingSegment ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <div className="flex-1 h-8 bg-white/10 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-ws-coral/50" />
            </div>
            <span className="text-xs font-mono text-ws-text-secondary">12:34 / 45:23</span>
          </div>

          {/* Speakers */}
          <div className="flex items-center gap-2 py-2 border-b border-white/10">
            <User size={14} className="text-ws-text-secondary" />
            <span className="text-xs text-ws-text-secondary">Speakers:</span>
            {selectedTranscript?.speakers.map((speaker) => (
              <Badge 
                key={speaker.id}
                className="text-xs"
                style={{ backgroundColor: `${speaker.color}30`, color: speaker.color, borderColor: speaker.color }}
                variant="outline"
              >
                {speaker.name} ({speaker.role})
              </Badge>
            ))}
          </div>

          {/* Transcript Content */}
          <div className="flex-1 overflow-y-auto space-y-2 py-4">
            {selectedTranscript?.segments.map((segment) => {
              const speaker = selectedTranscript.speakers.find(s => s.id === segment.speakerId);
              return (
                <div 
                  key={segment.id}
                  className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <button 
                    onClick={() => setPlayingSegment(playingSegment === segment.id ? null : segment.id)}
                    className="mt-0.5 text-ws-text-secondary hover:text-ws-coral transition-colors"
                  >
                    {playingSegment === segment.id ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="text-xs font-medium"
                        style={{ color: speaker?.color }}
                      >
                        {speaker?.name}
                      </span>
                      <span className="text-xs text-ws-text-secondary font-mono">
                        {formatTime(segment.startTime)} - {formatTime(segment.endTime)}
                      </span>
                      <span className="text-xs text-ws-text-secondary">
                        {segment.confidence}%
                      </span>
                    </div>
                    <p className="text-sm text-ws-text-primary">{segment.text}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-ws-text-secondary hover:text-ws-coral transition-all">
                    <Edit3 size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Actions */}
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
