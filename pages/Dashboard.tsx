
import React, { useEffect, useState } from 'react';
import { Card, Button, SectionHeader } from '../components/UI';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Wallet, TrendingUp, CreditCard, LogOut, ChevronRight } from 'lucide-react';
import { Transaction } from '../types';

const MOCK_TRANSACTIONS: Transaction[] = [
  { 
    id: 'tx_001', 
    date: 'Oct 24, 2024', 
    time: '10:42 AM',
    desc: 'Starbucks Coffee', 
    merchant: 'Starbucks #12492',
    // Fix: Removed invalid 'cat' property to match the Transaction interface
    amount: '-$5.40',
    category: 'Dining',
    status: 'Completed',
    referenceNumber: 'LUM-882910442',
    paymentMethod: 'Debit Card (...4829)'
  },
  { 
    id: 'tx_002', 
    date: 'Oct 23, 2024', 
    time: '09:00 AM',
    desc: 'Payroll Deposit', 
    merchant: 'Global Tech Corp',
    // Fix: Removed invalid 'cat' property to match the Transaction interface
    amount: '+$2,450.00', 
    positive: true,
    category: 'Income',
    status: 'Completed',
    referenceNumber: 'LUM-991023411',
    paymentMethod: 'Direct Deposit'
  },
  { 
    id: 'tx_003', 
    date: 'Oct 21, 2024', 
    time: '04:15 PM',
    desc: 'Target Store', 
    merchant: 'Target T-1203',
    // Fix: Removed invalid 'cat' property to match the Transaction interface
    amount: '-$124.50',
    category: 'Shopping',
    status: 'Completed',
    referenceNumber: 'LUM-110293488',
    paymentMethod: 'Debit Card (...4829)'
  },
  { 
    id: 'tx_004', 
    date: 'Oct 20, 2024', 
    time: '11:30 AM',
    desc: 'Verizon Wireless', 
    merchant: 'Verizon Digital',
    // Fix: Removed invalid 'cat' property to match the Transaction interface
    amount: '-$85.00',
    category: 'Bills',
    status: 'Completed',
    referenceNumber: 'LUM-772910344',
    paymentMethod: 'Auto-Pay'
  }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (isSupabaseConfigured()) {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
        } else {
            const mockUserStr = localStorage.getItem('lumina_demo_user');
            if (mockUserStr) {
                setUser(JSON.parse(mockUserStr));
            } else {
                navigate('/login');
            }
        }
      } catch (e) {
        console.error("Auth check failed", e);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
    } else {
        localStorage.removeItem('lumina_demo_user');
    }
    navigate('/');
  };

  const handleTransactionClick = (tx: Transaction) => {
    navigate(`/transaction/${tx.id}`, { state: { transaction: tx } });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading secure dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
         <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500">{user?.email}</p>
         </div>
         <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="outline" onClick={() => navigate('/help')}>
                Help Center
            </Button>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
         </div>
      </div>

      {!isSupabaseConfigured() && (
        <div className="mb-8 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg text-sm">
            <h4 className="font-bold flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Demo Mode Active</h4>
            <p>You are viewing a demonstration of the dashboard. Real banking data is not currently connected.</p>
        </div>
      )}

      {/* Account Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-slate-900 text-white">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-slate-400 text-sm font-medium">Total Balance</p>
                 <h2 className="text-3xl font-bold mt-1">$24,560.00</h2>
              </div>
              <Wallet className="text-emerald-400 w-8 h-8" />
           </div>
           <div className="text-sm text-slate-400">+2.5% from last month</div>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-slate-500 text-sm font-medium">Checking (...4829)</p>
                 <h2 className="text-3xl font-bold mt-1 text-slate-900">$4,250.00</h2>
              </div>
              <CreditCard className="text-blue-600 w-8 h-8" />
           </div>
           <div className="text-sm text-emerald-600">Active</div>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-slate-500 text-sm font-medium">Savings (...9921)</p>
                 <h2 className="text-3xl font-bold mt-1 text-slate-900">$20,310.00</h2>
              </div>
              <TrendingUp className="text-purple-600 w-8 h-8" />
           </div>
           <div className="text-sm text-emerald-600">4.50% APY</div>
        </Card>
      </div>

      <SectionHeader title="Recent Activity" subtitle="Click on a transaction to view more details." />
      <Card className="overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                    <th className="p-4"></th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {MOCK_TRANSACTIONS.map((tx) => (
                    <tr 
                        key={tx.id} 
                        onClick={() => handleTransactionClick(tx)}
                        className="group hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                        <td className="p-4 text-slate-600 text-sm whitespace-nowrap">{tx.date}</td>
                        <td className="p-4">
                            <div className="text-slate-900 font-semibold text-sm">{tx.desc}</div>
                            <div className="text-xs text-slate-500">{tx.merchant}</div>
                        </td>
                        <td className="p-4">
                            <span className="px-2.5 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase text-slate-600">
                                {tx.category}
                            </span>
                        </td>
                        <td className={`p-4 text-sm font-bold text-right ${tx.positive ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {tx.amount}
                        </td>
                        <td className="p-4 text-right">
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors ml-auto" />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
         </div>
      </Card>
      
      <div className="mt-8 flex justify-center">
         <Button variant="outline" className="text-slate-600">View Full History</Button>
      </div>
    </div>
  );
};
