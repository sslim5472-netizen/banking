import React, { useEffect, useState } from 'react';
import { Card, Button, SectionHeader } from '../components/UI';
import { supabase, isSupabaseConfigured } from '../supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wallet, TrendingUp, CreditCard, LogOut, ChevronRight, ArrowRightLeft, Receipt, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Transaction } from '../types';

const MOCK_TRANSACTIONS: Transaction[] = [
  { 
    id: 'tx_001', 
    date: 'Oct 24, 2024', 
    time: '10:42 AM',
    desc: 'Starbucks Coffee', 
    merchant: 'Starbucks #12492',
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
    amount: '-$124.50',
    category: 'Shopping',
    status: 'Completed',
    referenceNumber: 'LUM-110293488',
    paymentMethod: 'Debit Card (...4829)'
  }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const dashNav = [
    { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Transfers', path: '/dashboard/transfers', icon: <ArrowRightLeft className="w-4 h-4" /> },
    { label: 'Bill Pay', path: '/dashboard/billpay', icon: <Receipt className="w-4 h-4" /> },
    { label: 'Manage Cards', path: '/dashboard/cards', icon: <CreditCard className="w-4 h-4" /> },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading secure dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
         <div>
            <h1 className="text-3xl font-bold text-slate-900">Portal</h1>
            <p className="text-slate-500">{user?.email}</p>
         </div>
         <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
         </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
        {dashNav.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              location.pathname === item.path 
              ? 'border-emerald-600 text-emerald-600' 
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-gray-300'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 bg-slate-900 text-white shadow-xl ring-1 ring-white/10">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-slate-400 text-sm font-medium">Net Liquidity</p>
                 <h2 className="text-3xl font-bold mt-1">$24,560.00</h2>
              </div>
              <Wallet className="text-emerald-400 w-8 h-8" />
           </div>
           <div className="flex items-center text-xs text-emerald-400 bg-emerald-400/10 w-fit px-2 py-1 rounded-md font-bold">
             +2.5% MTD
           </div>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-slate-500 text-sm font-medium">Checking (...4829)</p>
                 <h2 className="text-3xl font-bold mt-1 text-slate-900">$4,250.00</h2>
              </div>
              <ShieldCheck className="text-blue-600 w-8 h-8" />
           </div>
           <button onClick={() => navigate('/dashboard/transfers')} className="text-xs font-bold text-emerald-600 hover:underline">Transfer Funds</button>
        </Card>

        <Card className="p-6">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <p className="text-slate-500 text-sm font-medium">Savings (...9921)</p>
                 <h2 className="text-3xl font-bold mt-1 text-slate-900">$20,310.00</h2>
              </div>
              <TrendingUp className="text-purple-600 w-8 h-8" />
           </div>
           <div className="text-xs text-slate-500">Interest Rate: 4.50% APY</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                <Button variant="ghost" className="text-xs font-bold text-emerald-600">Download CSV</Button>
            </div>
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Description</th>
                            <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Amount</th>
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
                                <td className="p-4 text-slate-500 text-sm whitespace-nowrap font-mono">{tx.date}</td>
                                <td className="p-4">
                                    <div className="text-slate-900 font-semibold text-sm">{tx.desc}</div>
                                    <div className="text-xs text-slate-500">{tx.category}</div>
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
                <div className="p-4 bg-gray-50 text-center">
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-700">View 30-Day History</button>
                </div>
            </Card>
        </div>

        {/* Quick Tools */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Scheduled</h3>
            <Card className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <Receipt className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Rent Payment</h4>
                        <p className="text-xs text-slate-500">Auto-pay on Nov 1</p>
                    </div>
                    <div className="ml-auto font-bold text-sm">$1,850</div>
                </div>
                <Button variant="outline" className="w-full text-xs py-2" onClick={() => navigate('/dashboard/billpay')}>
                    Manage Scheduled Payments
                </Button>
            </Card>

            <Card className="p-6 bg-emerald-600 text-white">
                <ShieldCheck className="w-8 h-8 mb-4 opacity-50" />
                <h4 className="font-bold mb-2">Security Check</h4>
                <p className="text-xs opacity-90 leading-relaxed mb-4">
                    Your account is protected by multi-factor authentication. Last login from NY, USA.
                </p>
                <Button variant="secondary" className="w-full bg-white text-emerald-600 hover:bg-slate-100 text-xs py-2">
                    Review Security Settings
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
};