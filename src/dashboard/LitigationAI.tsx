import { useState } from 'react';
import { 
  AlertTriangle, 
  Play, 
  FileText, 
  MessageSquare, 
  CheckCircle,
  XCircle,
  ChevronRight,
  Lightbulb,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contradiction {
  id: string;
  caseNumber: string;
  witness: string;
  statement: string;
  previousStatement: string;
  previousSource: string;
  timestamp: string;
  confidence: number;
  severity: 'high' | 'medium' | 'low';
  audioSegment: {
    start: number;
    end: number;
  };
}

interface CrossExamQuestion {
  id: string;
  question: string;
  context: string;
  strategy: string;
}

interface DraftSubmission {
  id: string;
  title: string;
  type: 'submissions' | 'affidavit' | 'chronology';
  status: 'draft' | 'reviewing' | 'final';
  lastUpdated: string;
}

const mockContradictions: Contradiction[] = [
  {
    id: '1',
    caseNumber: 'E123/2024',
    witness: 'Mr. Kamau',
    statement: 'I signed the contract on January 10th, 2024.',
    previousStatement: 'The agreement was executed on January 12th, 2024.',
    previousSource: 'Witness Affidavit, Paragraph 5',
    timestamp: '00:23:45',
    confidence: 94,
    severity: 'high',
    audioSegment: { start: 1425, end: 1445 },
  },
  {
    id: '2',
    caseNumber: 'E123/2024',
    witness: 'Mr. Kamau',
    statement: 'I have never met the defendant before this case.',
    previousStatement: 'We had a business meeting in November 2023.',
    previousSource: 'Email Correspondence, 15/11/2023',
    timestamp: '00:45:12',
    confidence: 89,
    severity: 'high',
    audioSegment: { start: 2712, end: 2732 },
  },
  {
    id: '3',
    caseNumber: 'C456/2024',
    witness: 'Mrs. Achieng',
    statement: 'The property was valued at KES 5 million.',
    previousStatement: 'The market value is approximately KES 7 million.',
    previousSource: 'Pleadings, Paragraph 12',
    timestamp: '01:12:30',
    confidence: 78,
    severity: 'medium',
    audioSegment: { start: 4350, end: 4370 },
  },
];

const mockQuestions: CrossExamQuestion[] = [
  {
    id: '1',
    question: 'You stated in your affidavit that the agreement was executed on January 12th. Are you now saying that was incorrect?',
    context: 'Date of contract execution',
    strategy: 'Boxing-in: Force witness to admit inconsistency',
  },
  {
    id: '2',
    question: 'Let me show you your email dated November 15th, 2023. Who is this addressed to?',
    context: 'Prior meeting with defendant',
    strategy: 'Impeachment: Use documentary evidence',
  },
];

const mockDrafts: DraftSubmission[] = [
  {
    id: '1',
    title: 'Submissions on Contradictions',
    type: 'submissions',
    status: 'draft',
    lastUpdated: '2024-03-15',
  },
  {
    id: '2',
    title: 'Witness Impeachment Chronology',
    type: 'chronology',
    status: 'reviewing',
    lastUpdated: '2024-03-14',
  },
];

export default function LitigationAI() {
  const [selectedContradiction, setSelectedContradiction] = useState<Contradiction | null>(null);
  const [activeTab, setActiveTab] = useState('contradictions');

  const getSeverityColor = (severity: Contradiction['severity']) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    }
  };

  const getStatusIcon = (status: DraftSubmission['status']) => {
    switch (status) {
      case 'draft': return <FileText size={14} className="text-ws-text-secondary" />;
      case 'reviewing': return <AlertTriangle size={14} className="text-orange-400" />;
      case 'final': return <CheckCircle size={14} className="text-green-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Litigation AI</h1>
        <p className="text-ws-text-secondary">AI-powered contradiction detection and cross-examination assistance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-ws-black/50 border border-white/10">
          <TabsTrigger value="contradictions" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            <AlertTriangle size={16} className="mr-2" />
            Contradictions
          </TabsTrigger>
          <TabsTrigger value="cross-exam" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            <Target size={16} className="mr-2" />
            Cross-Exam
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            <FileText size={16} className="mr-2" />
            Draft Submissions
          </TabsTrigger>
        </TabsList>

        {/* Contradictions Tab */}
        <TabsContent value="contradictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Contradictions List */}
            <div className="lg:col-span-2 space-y-3">
              {mockContradictions.map((contradiction) => (
                <Card 
                  key={contradiction.id}
                  className="bg-ws-black/50 border-white/10 hover:border-ws-coral/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedContradiction(contradiction)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(contradiction.severity)}>
                            {contradiction.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-ws-text-secondary">{contradiction.caseNumber}</span>
                          <span className="text-xs text-ws-text-secondary font-mono">{contradiction.timestamp}</span>
                        </div>
                        <p className="text-sm text-ws-text-primary mb-2">
                          <span className="text-ws-coral">Witness:</span> {contradiction.witness}
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-ws-text-secondary">"{contradiction.statement}"</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-ws-text-secondary">"{contradiction.previousStatement}"</p>
                              <p className="text-xs text-ws-text-secondary mt-1">
                                Source: {contradiction.previousSource}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-12 h-12 rounded-full bg-ws-coral/20 flex items-center justify-center">
                          <span className="text-sm font-mono text-ws-coral">{contradiction.confidence}%</span>
                        </div>
                        <p className="text-xs text-ws-text-secondary mt-1">Confidence</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="bg-ws-black/50 border-white/10 h-fit">
              <CardHeader>
                <CardTitle className="text-lg text-ws-text-primary">Detection Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10 text-center">
                    <p className="text-2xl font-bold text-red-400">2</p>
                    <p className="text-xs text-ws-text-secondary">High Severity</p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-500/10 text-center">
                    <p className="text-2xl font-bold text-orange-400">1</p>
                    <p className="text-xs text-ws-text-secondary">Medium Severity</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-ws-text-secondary mb-2">Average Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-ws-coral rounded-full" />
                    </div>
                    <span className="text-sm font-mono text-ws-coral">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cross-Exam Tab */}
        <TabsContent value="cross-exam" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockQuestions.map((q) => (
              <Card key={q.id} className="bg-ws-black/50 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-ws-coral/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare size={14} className="text-ws-coral" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-ws-text-primary mb-2">"{q.question}"</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-ws-text-secondary">Context:</span>
                        <span className="text-xs text-ws-coral">{q.context}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                        <Lightbulb size={12} className="text-yellow-400" />
                        <span className="text-xs text-ws-text-secondary">{q.strategy}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Drafts Tab */}
        <TabsContent value="drafts" className="space-y-4">
          <div className="flex justify-end">
            <Button className="bg-ws-coral hover:bg-ws-coral/90 text-white">
              <FileText size={16} className="mr-2" />
              Generate New Draft
            </Button>
          </div>
          <div className="space-y-3">
            {mockDrafts.map((draft) => (
              <Card key={draft.id} className="bg-ws-black/50 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(draft.status)}
                      <div>
                        <h3 className="text-sm font-medium text-ws-text-primary">{draft.title}</h3>
                        <p className="text-xs text-ws-text-secondary">
                          {draft.type.charAt(0).toUpperCase() + draft.type.slice(1)} • Last updated {draft.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-white/10 text-ws-text-secondary">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-ws-coral hover:bg-ws-coral/90 text-white">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Contradiction Detail Dialog */}
      <Dialog open={!!selectedContradiction} onOpenChange={() => setSelectedContradiction(null)}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-sora">Contradiction Detail</DialogTitle>
              {selectedContradiction && (
                <Badge className={getSeverityColor(selectedContradiction.severity)}>
                  {selectedContradiction.severity.toUpperCase()}
                </Badge>
              )}
            </div>
          </DialogHeader>
          
          {selectedContradiction && (
            <div className="space-y-4 pt-4">
              {/* Audio Player */}
              <div className="p-3 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <Button size="sm" className="bg-ws-coral hover:bg-ws-coral/90 text-white">
                    <Play size={14} />
                  </Button>
                  <div className="flex-1">
                    <div className="h-8 bg-white/10 rounded-full overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 w-1/4 bg-ws-coral/50" />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-ws-text-secondary">
                    {selectedContradiction.timestamp}
                  </span>
                </div>
              </div>

              {/* Statements */}
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-xs text-red-400 mb-2">COURT STATEMENT</p>
                  <p className="text-sm text-ws-text-primary">"{selectedContradiction.statement}"</p>
                  <p className="text-xs text-ws-text-secondary mt-2">
                    Witness: {selectedContradiction.witness} • {selectedContradiction.timestamp}
                  </p>
                </div>

                <div className="flex justify-center">
                  <AlertTriangle size={20} className="text-ws-coral" />
                </div>

                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-xs text-green-400 mb-2">PREVIOUS STATEMENT</p>
                  <p className="text-sm text-ws-text-primary">"{selectedContradiction.previousStatement}"</p>
                  <p className="text-xs text-ws-text-secondary mt-2">
                    Source: {selectedContradiction.previousSource}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ws-text-secondary">AI Confidence:</span>
                  <span className="text-sm font-mono text-ws-coral">{selectedContradiction.confidence}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/10 text-ws-text-secondary">
                    <XCircle size={16} className="mr-2" />
                    Dismiss
                  </Button>
                  <Button className="bg-ws-coral hover:bg-ws-coral/90 text-white">
                    <ChevronRight size={16} className="mr-2" />
                    Generate Questions
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
