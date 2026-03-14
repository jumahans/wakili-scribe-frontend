import { useState, useCallback } from 'react';
import { 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Trash2,
  File,
  Scale
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface Document {
  id: string;
  name: string;
  type: 'affidavit' | 'pleading' | 'witness_statement' | 'contract' | 'exhibit' | 'other';
  caseNumber: string;
  uploadDate: string;
  size: string;
  pages: number;
  status: 'processing' | 'indexed' | 'error';
  extractedText?: string;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Affidavit_of_Mr_Kamau.pdf',
    type: 'affidavit',
    caseNumber: 'E123/2024',
    uploadDate: '2024-03-10',
    size: '2.4 MB',
    pages: 8,
    status: 'indexed',
  },
  {
    id: '2',
    name: 'Plaintiff_Pleadings.pdf',
    type: 'pleading',
    caseNumber: 'E123/2024',
    uploadDate: '2024-03-08',
    size: '5.1 MB',
    pages: 24,
    status: 'indexed',
  },
  {
    id: '3',
    name: 'Witness_Statement_Mrs_Achieng.pdf',
    type: 'witness_statement',
    caseNumber: 'C456/2024',
    uploadDate: '2024-03-12',
    size: '1.8 MB',
    pages: 12,
    status: 'processing',
  },
];

export default function CaseCorpus() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = documents.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         d.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || d.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleUpload(files);
  }, []);

  const handleUpload = (files: File[]) => {
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return null;
        }
        return prev + 10;
      });
    }, 200);

    // Add mock documents
    files.forEach((file, index) => {
      setTimeout(() => {
        const newDoc: Document = {
          id: Date.now().toString() + index,
          name: file.name,
          type: 'other',
          caseNumber: 'Pending',
          uploadDate: new Date().toISOString().split('T')[0],
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          pages: Math.floor(Math.random() * 20) + 5,
          status: 'processing',
        };
        setDocuments(prev => [newDoc, ...prev]);
      }, 1000 + index * 500);
    });
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const getTypeColor = (type: Document['type']) => {
    const colors: Record<Document['type'], string> = {
      affidavit: 'bg-purple-500/20 text-purple-400',
      pleading: 'bg-blue-500/20 text-blue-400',
      witness_statement: 'bg-green-500/20 text-green-400',
      contract: 'bg-orange-500/20 text-orange-400',
      exhibit: 'bg-yellow-500/20 text-yellow-400',
      other: 'bg-gray-500/20 text-gray-400',
    };
    return colors[type];
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'processing':
        return <div className="w-4 h-4 rounded-full border-2 border-ws-coral border-t-transparent animate-spin" />;
      case 'indexed':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={16} className="text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Case Corpus</h1>
          <p className="text-ws-text-secondary">Upload and manage case documents for AI analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ws-text-secondary" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="pl-9 bg-ws-black/50 border-white/10 text-ws-text-primary w-[250px]"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] bg-ws-black/50 border-white/10 text-ws-text-primary">
              <Filter size={14} className="mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ws-black border-white/10">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="affidavit">Affidavit</SelectItem>
              <SelectItem value="pleading">Pleading</SelectItem>
              <SelectItem value="witness_statement">Witness Statement</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="exhibit">Exhibit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center transition-colors
          ${isDragging 
            ? 'border-ws-coral bg-ws-coral/10' 
            : 'border-white/20 hover:border-white/40'
          }
        `}
      >
        <Upload size={48} className="text-ws-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-ws-text-primary mb-2">
          Drop documents here or click to upload
        </h3>
        <p className="text-sm text-ws-text-secondary mb-4">
          Support PDF, DOCX, TXT up to 50MB
        </p>
        <Button className="bg-ws-coral hover:bg-ws-coral/90 text-white">
          Select Files
        </Button>
      </div>

      {/* Upload Progress */}
      {uploadProgress !== null && (
        <div className="p-4 rounded-lg bg-ws-coral/10 border border-ws-coral/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ws-text-primary">Uploading...</span>
            <span className="text-sm font-mono text-ws-coral">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2 bg-white/10" />
        </div>
      )}

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.map((doc) => (
          <Card 
            key={doc.id}
            className="bg-ws-black/50 border-white/10 hover:border-ws-coral/50 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-ws-coral/20 flex items-center justify-center">
                    <File size={18} className="text-ws-coral" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 
                        className="font-medium text-ws-text-primary cursor-pointer hover:text-ws-coral"
                        onClick={() => setSelectedDocument(doc)}
                      >
                        {doc.name}
                      </h3>
                      <Badge className={getTypeColor(doc.type)}>
                        {doc.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-ws-text-secondary">
                      {doc.caseNumber} • {doc.pages} pages • {doc.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-ws-text-secondary">Uploaded</p>
                    <p className="text-sm text-ws-text-primary">{doc.uploadDate}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(doc.status)}
                    <span className="text-xs text-ws-text-secondary ml-1 capitalize">{doc.status}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/10 text-ws-text-secondary hover:text-ws-text-primary"
                    >
                      <Download size={14} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteDocument(doc.id)}
                      className="border-white/10 text-ws-text-secondary hover:text-red-400 hover:border-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-sora">{selectedDocument?.name}</DialogTitle>
              {selectedDocument && (
                <Badge className={getTypeColor(selectedDocument.type)}>
                  {selectedDocument.type.replace('_', ' ')}
                </Badge>
              )}
            </div>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-4 pt-4 flex-1 overflow-hidden flex flex-col">
              {/* Document Info */}
              <div className="flex items-center gap-6 p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-xs text-ws-text-secondary">Case</p>
                  <p className="text-sm text-ws-text-primary">{selectedDocument.caseNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-ws-text-secondary">Pages</p>
                  <p className="text-sm text-ws-text-primary">{selectedDocument.pages}</p>
                </div>
                <div>
                  <p className="text-xs text-ws-text-secondary">Size</p>
                  <p className="text-sm text-ws-text-primary">{selectedDocument.size}</p>
                </div>
                <div>
                  <p className="text-xs text-ws-text-secondary">Uploaded</p>
                  <p className="text-sm text-ws-text-primary">{selectedDocument.uploadDate}</p>
                </div>
              </div>

              {/* Extracted Content Preview */}
              <div className="flex-1 overflow-y-auto p-4 rounded-lg bg-white/5">
                <p className="text-xs text-ws-text-secondary mb-2">EXTRACTED CONTENT</p>
                <p className="text-sm text-ws-text-primary leading-relaxed">
                  I, JOHN KAMAU, of P.O. Box 12345-00100, Nairobi, Kenya, do hereby make oath and state as follows:
                </p>
                <p className="text-sm text-ws-text-primary leading-relaxed mt-4">
                  1. That I am a businessman carrying on business in Nairobi and I have personal knowledge of the facts hereinafter deposed to.
                </p>
                <p className="text-sm text-ws-text-primary leading-relaxed mt-4">
                  2. That on or about the 12th day of January 2024, I entered into an agreement with the defendant for the supply of goods worth KES 5,000,000.
                </p>
                <p className="text-sm text-ws-text-secondary italic mt-4">
                  [Content truncated for preview...]
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Scale size={16} className="text-ws-coral" />
                  <span className="text-sm text-ws-text-secondary">
                    Indexed for contradiction detection
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/10 text-ws-text-secondary">
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                  <Button className="bg-ws-coral hover:bg-ws-coral/90 text-white">
                    <Scale size={16} className="mr-2" />
                    Analyze
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
