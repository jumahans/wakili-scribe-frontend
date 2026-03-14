import { useState } from 'react';
import { 
  Plus, 
  Mail,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'senior_counsel' | 'associate' | 'junior_associate' | 'admin';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
  lastActive: string;
  corrections: number;
  accuracy: number;
}

const mockMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Adv. Jane Doe',
    email: 'jane.doe@kimaniassociates.co.ke',
    role: 'senior_counsel',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2 minutes ago',
    corrections: 0,
    accuracy: 0,
  },
  {
    id: '2',
    name: 'John Mutua',
    email: 'john.mutua@kimaniassociates.co.ke',
    role: 'associate',
    status: 'active',
    joinDate: '2023-06-20',
    lastActive: '15 minutes ago',
    corrections: 145,
    accuracy: 96.5,
  },
  {
    id: '3',
    name: 'Sarah Kimani',
    email: 'sarah.kimani@kimaniassociates.co.ke',
    role: 'junior_associate',
    status: 'active',
    joinDate: '2024-01-10',
    lastActive: '1 hour ago',
    corrections: 89,
    accuracy: 94.2,
  },
  {
    id: '4',
    name: 'Peter Ochieng',
    email: 'peter.ochieng@kimaniassociates.co.ke',
    role: 'junior_associate',
    status: 'pending',
    joinDate: '-',
    lastActive: '-',
    corrections: 0,
    accuracy: 0,
  },
];

export default function Team() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newMember, setNewMember] = useState<{ name: string; email: string; role: TeamMember['role'] }>({ 
    name: '', 
    email: '', 
    role: 'junior_associate' 
  });

  const addMember = () => {
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: 'pending',
      joinDate: '-',
      lastActive: '-',
      corrections: 0,
      accuracy: 0,
    };
    setMembers([...members, member]);
    setNewMember({ name: '', email: '', role: 'junior_associate' });
    setShowAddDialog(false);
  };

  const deleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const getRoleColor = (role: TeamMember['role']) => {
    const colors: Record<TeamMember['role'], string> = {
      senior_counsel: 'bg-purple-500/20 text-purple-400',
      associate: 'bg-blue-500/20 text-blue-400',
      junior_associate: 'bg-green-500/20 text-green-400',
      admin: 'bg-orange-500/20 text-orange-400',
    };
    return colors[role];
  };

  const getRoleLabel = (role: TeamMember['role']) => {
    const labels: Record<TeamMember['role'], string> = {
      senior_counsel: 'Senior Counsel',
      associate: 'Associate',
      junior_associate: 'Junior Associate',
      admin: 'Admin',
    };
    return labels[role];
  };

  const getStatusIcon = (status: TeamMember['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={14} className="text-green-400" />;
      case 'pending':
        return <Clock size={14} className="text-yellow-400" />;
      case 'inactive':
        return <Activity size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Team</h1>
          <p className="text-ws-text-secondary">Manage firm members and their permissions</p>
        </div>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-ws-coral hover:bg-ws-coral/90 text-white"
        >
          <Plus size={18} className="mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-ws-text-primary">{members.length}</p>
            <p className="text-xs text-ws-text-secondary">Total Members</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green-400">
              {members.filter(m => m.status === 'active').length}
            </p>
            <p className="text-xs text-ws-text-secondary">Active</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-ws-coral">
              {members.reduce((acc, m) => acc + m.corrections, 0).toLocaleString()}
            </p>
            <p className="text-xs text-ws-text-secondary">Total Corrections</p>
          </CardContent>
        </Card>
        <Card className="bg-ws-black/50 border-white/10">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-blue-400">
              {members.filter(m => m.accuracy > 0).length > 0
                ? Math.round(members.filter(m => m.accuracy > 0).reduce((acc, m) => acc + m.accuracy, 0) / members.filter(m => m.accuracy > 0).length)
                : 0}%
            </p>
            <p className="text-xs text-ws-text-secondary">Avg Accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Team List */}
      <Card className="bg-ws-black/50 border-white/10">
        <CardHeader>
          <CardTitle className="text-lg text-ws-text-primary">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-ws-coral/20 flex items-center justify-center">
                    <span className="text-ws-coral font-semibold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-ws-text-primary">{member.name}</h3>
                      <Badge className={getRoleColor(member.role)}>
                        {getRoleLabel(member.role)}
                      </Badge>
                      {getStatusIcon(member.status)}
                    </div>
                    <p className="text-sm text-ws-text-secondary">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {member.corrections > 0 && (
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-ws-text-secondary">Corrections</p>
                      <p className="text-sm font-mono text-ws-text-primary">{member.corrections}</p>
                    </div>
                  )}
                  {member.accuracy > 0 && (
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-ws-text-secondary">Accuracy</p>
                      <p className="text-sm font-mono text-green-400">{member.accuracy}%</p>
                    </div>
                  )}
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-ws-text-secondary">Last Active</p>
                    <p className="text-sm text-ws-text-primary">{member.lastActive}</p>
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
                      onClick={() => deleteMember(member.id)}
                      className="border-white/10 text-ws-text-secondary hover:text-red-400 hover:border-red-400"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-sora">Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-ws-text-secondary">Full Name</label>
              <Input 
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="e.g., John Doe"
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <div>
              <label className="text-sm text-ws-text-secondary">Email</label>
              <Input 
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                placeholder="john@firm.co.ke"
                type="email"
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <div>
              <label className="text-sm text-ws-text-secondary">Role</label>
              <Select 
                value={newMember.role}
                onValueChange={(value: TeamMember['role']) => setNewMember({ ...newMember, role: value })}
              >
                <SelectTrigger className="bg-ws-black/50 border-white/10 text-ws-text-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-ws-black border-white/10">
                  <SelectItem value="senior_counsel">Senior Counsel</SelectItem>
                  <SelectItem value="associate">Associate</SelectItem>
                  <SelectItem value="junior_associate">Junior Associate</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={addMember}
              disabled={!newMember.name || !newMember.email}
              className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              <Mail size={16} className="mr-2" />
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
