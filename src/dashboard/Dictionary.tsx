import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface DictionaryEntry {
  id: string;
  term: string;
  pronunciation?: string;
  definition: string;
  category: 'legal' | 'technical' | 'medical' | 'custom';
  addedBy: string;
  addedDate: string;
  usage: number;
}

const mockEntries: DictionaryEntry[] = [
  {
    id: '1',
    term: 'Habeas Corpus',
    pronunciation: 'ˈheɪbiəs ˈkɔːrpəs',
    definition: 'A writ requiring a person under arrest to be brought before a judge or into court.',
    category: 'legal',
    addedBy: 'System',
    addedDate: '2024-01-01',
    usage: 45,
  },
  {
    id: '2',
    term: 'Sub Judice',
    pronunciation: 'sʌb ˈdʒuːdɪsi',
    definition: 'Under judicial consideration and therefore prohibited from public discussion.',
    category: 'legal',
    addedBy: 'System',
    addedDate: '2024-01-01',
    usage: 32,
  },
  {
    id: '3',
    term: 'M-PESA',
    definition: 'Mobile phone-based money transfer service used in Kenya.',
    category: 'technical',
    addedBy: 'Adv. Kimani',
    addedDate: '2024-03-10',
    usage: 128,
  },
  {
    id: '4',
    term: 'Matatu',
    definition: 'A privately owned public transport vehicle in Kenya.',
    category: 'custom',
    addedBy: 'Junior Assoc. Mutua',
    addedDate: '2024-03-12',
    usage: 67,
  },
];

export default function Dictionary() {
  const [entries, setEntries] = useState<DictionaryEntry[]>(mockEntries);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newEntry, setNewEntry] = useState({ term: '', definition: '', category: 'custom' as const });

  const filteredEntries = entries.filter(e => 
    e.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addEntry = () => {
    const entry: DictionaryEntry = {
      id: Date.now().toString(),
      term: newEntry.term,
      definition: newEntry.definition,
      category: newEntry.category,
      addedBy: 'Current User',
      addedDate: new Date().toISOString().split('T')[0],
      usage: 0,
    };
    setEntries([entry, ...entries]);
    setNewEntry({ term: '', definition: '', category: 'custom' });
    setShowAddDialog(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const getCategoryColor = (category: DictionaryEntry['category']) => {
    const colors: Record<DictionaryEntry['category'], string> = {
      legal: 'bg-blue-500/20 text-blue-400',
      technical: 'bg-purple-500/20 text-purple-400',
      medical: 'bg-green-500/20 text-green-400',
      custom: 'bg-orange-500/20 text-orange-400',
    };
    return colors[category];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Legal Dictionary</h1>
          <p className="text-ws-text-secondary">Custom vocabulary for improved transcription accuracy</p>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-ws-coral hover:bg-ws-coral/90 text-white"
        >
          <Plus size={18} className="mr-2" />
          Add Term
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-ws-text-primary">{entries.length}</p>
            <p className="text-xs text-ws-text-secondary">Total Terms</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-ws-coral">{entries.filter(e => e.category === 'custom').length}</p>
            <p className="text-xs text-ws-text-secondary">Custom Terms</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-400">
              {entries.reduce((acc, e) => acc + e.usage, 0).toLocaleString()}
            </p>
            <p className="text-xs text-ws-text-secondary">Total Usage</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-400">
              {Math.round(entries.reduce((acc, e) => acc + e.usage, 0) / entries.length)}
            </p>
            <p className="text-xs text-ws-text-secondary">Avg Usage/Term</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ws-text-secondary" />
        <Input 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search dictionary..."
          className="pl-9 bg-ws-black/50 border-white/10 text-ws-text-primary"
        />
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="bg-ws-black/50 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-ws-text-primary">{entry.term}</h3>
                    <Badge className={getCategoryColor(entry.category)}>
                      {entry.category}
                    </Badge>
                    {entry.pronunciation && (
                      <span className="text-xs text-ws-text-secondary font-mono">
                        /{entry.pronunciation}/
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ws-text-secondary">{entry.definition}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-ws-text-secondary">
                    <span>Added by {entry.addedBy}</span>
                    <span>{entry.addedDate}</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp size={12} />
                      Used {entry.usage} times
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/10 text-ws-text-secondary hover:text-ws-text-primary"
                  >
                    <Edit3 size={14} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteEntry(entry.id)}
                    className="border-white/10 text-ws-text-secondary hover:text-red-400 hover:border-red-400"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-sora">Add New Term</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-ws-text-secondary">Term</label>
              <Input 
                value={newEntry.term}
                onChange={(e) => setNewEntry({ ...newEntry, term: e.target.value })}
                placeholder="e.g., Habeas Corpus"
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <div>
              <label className="text-sm text-ws-text-secondary">Definition</label>
              <Input 
                value={newEntry.definition}
                onChange={(e) => setNewEntry({ ...newEntry, definition: e.target.value })}
                placeholder="Enter definition..."
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <Button 
              onClick={addEntry}
              disabled={!newEntry.term || !newEntry.definition}
              className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              <Plus size={16} className="mr-2" />
              Add Term
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
