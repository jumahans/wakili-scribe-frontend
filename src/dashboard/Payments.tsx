import { useState } from 'react';
import { 
  Plus, 
  History, 
  Wallet,
  Smartphone,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 15000,
    description: 'Top-up via M-PESA',
    date: '2024-03-15 10:30',
    status: 'completed',
    reference: 'MPESA123456',
  },
  {
    id: '2',
    type: 'debit',
    amount: 1000,
    description: 'Intelligence Analysis - E123/2024',
    date: '2024-03-14 14:22',
    status: 'completed',
    reference: 'TXN789012',
  },
  {
    id: '3',
    type: 'debit',
    amount: 500,
    description: 'Standard PDF - C456/2024',
    date: '2024-03-13 09:15',
    status: 'completed',
    reference: 'TXN789011',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Standard PDF',
    price: 500,
    description: 'Clean transcript with speaker labels',
    features: ['Verbatim text', 'Speaker labels', 'Timestamps', 'PDF export'],
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    price: 1000,
    description: 'Full AI analysis with contradictions',
    features: ['Everything in Standard', 'Contradiction report', 'Cross-exam prompts', 'Audio links'],
  },
];

export default function Payments() {
  const [balance, setBalance] = useState(45000);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = () => {
    setIsProcessing(true);
    // Simulate M-PESA STK Push
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: 'credit',
        amount: parseInt(topUpAmount),
        description: 'Top-up via M-PESA',
        date: new Date().toLocaleString(),
        status: 'completed',
        reference: `MPESA${Math.floor(Math.random() * 1000000)}`,
      };
      setTransactions([newTransaction, ...transactions]);
      setBalance(balance + parseInt(topUpAmount));
      setIsProcessing(false);
      setShowTopUpDialog(false);
      setTopUpAmount('');
    }, 2000);
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={14} className="text-green-400" />;
      case 'pending':
        return <Clock size={14} className="text-yellow-400" />;
      case 'failed':
        return <AlertCircle size={14} className="text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-sora font-bold text-ws-text-primary">Payments</h1>
        <p className="text-ws-text-secondary">Manage credits and view transaction history</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-ws-coral/20 to-ws-coral/5 border-ws-coral/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-ws-text-secondary mb-1">Available Credits</p>
              <p className="text-4xl font-bold text-ws-text-primary">
                KES {balance.toLocaleString()}
              </p>
              <p className="text-xs text-ws-text-secondary mt-2">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-ws-coral/20 flex items-center justify-center">
              <Wallet size={32} className="text-ws-coral" />
            </div>
          </div>
          <div className="mt-6">
            <Button 
              onClick={() => setShowTopUpDialog(true)}
              className="bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              <Plus size={18} className="mr-2" />
              Top Up
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="plans">
        <TabsList className="bg-ws-black/50 border border-white/10">
          <TabsTrigger value="plans" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            Pricing Plans
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-ws-coral data-[state=active]:text-white">
            Transaction History
          </TabsTrigger>
        </TabsList>

        {/* Pricing Plans */}
        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className="bg-ws-black/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-ws-text-primary">{plan.name}</h3>
                      <p className="text-sm text-ws-text-secondary">{plan.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-ws-coral">KES {plan.price}</p>
                      <p className="text-xs text-ws-text-secondary">per session</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-ws-text-secondary">
                        <CheckCircle size={14} className="text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white">
                    Purchase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Subscription Plans */}
          <Card className="bg-ws-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-ws-text-primary">Firm Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-ws-text-primary mb-1">Solo Advocate</p>
                  <p className="text-2xl font-bold text-ws-coral mb-2">KES 15,000</p>
                  <p className="text-xs text-ws-text-secondary mb-3">per month</p>
                  <ul className="space-y-1 text-xs text-ws-text-secondary">
                    <li>• 40 PDFs included</li>
                    <li>• Basic Analysis</li>
                    <li>• 1 user</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-ws-coral/10 border border-ws-coral/30">
                  <p className="text-sm font-medium text-ws-text-primary mb-1">Boutique Firm</p>
                  <p className="text-2xl font-bold text-ws-coral mb-2">KES 45,000</p>
                  <p className="text-xs text-ws-text-secondary mb-3">per month</p>
                  <ul className="space-y-1 text-xs text-ws-text-secondary">
                    <li>• Unlimited PDFs</li>
                    <li>• 20 Intelligence Reports</li>
                    <li>• 3 concurrent users</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-sm font-medium text-ws-text-primary mb-1">Enterprise</p>
                  <p className="text-2xl font-bold text-ws-coral mb-2">KES 120,000</p>
                  <p className="text-xs text-ws-text-secondary mb-3">per month</p>
                  <ul className="space-y-1 text-xs text-ws-text-secondary">
                    <li>• Unlimited everything</li>
                    <li>• Priority GPU processing</li>
                    <li>• Custom dictionary</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction History */}
        <TabsContent value="history">
          <Card className="bg-ws-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg text-ws-text-primary flex items-center gap-2">
                <History size={18} className="text-ws-coral" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div 
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        {tx.type === 'credit' ? (
                          <ArrowDownLeft size={18} className="text-green-400" />
                        ) : (
                          <ArrowUpRight size={18} className="text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-ws-text-primary">{tx.description}</p>
                        <p className="text-xs text-ws-text-secondary">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-mono ${
                        tx.type === 'credit' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {tx.type === 'credit' ? '+' : '-'} KES {tx.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-end gap-1">
                        {getStatusIcon(tx.status)}
                        <span className="text-xs text-ws-text-secondary capitalize">{tx.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top Up Dialog */}
      <Dialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog}>
        <DialogContent className="bg-ws-black border-white/10 text-ws-text-primary">
          <DialogHeader>
            <DialogTitle className="text-xl font-sora flex items-center gap-2">
              <Smartphone size={20} className="text-ws-coral" />
              Top Up via M-PESA
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-ws-text-secondary">Phone Number</label>
              <Input 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="2547XX XXX XXX"
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <div>
              <label className="text-sm text-ws-text-secondary">Amount (KES)</label>
              <Input 
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                placeholder="Enter amount"
                type="number"
                className="bg-ws-black/50 border-white/10 text-ws-text-primary"
              />
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-xs text-ws-text-secondary">
                You will receive an M-PESA STK push on your phone. 
                Enter your PIN to complete the transaction.
              </p>
            </div>
            <Button 
              onClick={handleTopUp}
              disabled={!phoneNumber || !topUpAmount || isProcessing}
              className="w-full bg-ws-coral hover:bg-ws-coral/90 text-white"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>Request STK Push</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
