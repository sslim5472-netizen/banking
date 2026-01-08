import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, SectionHeader, Input } from '../components/UI';
import { ArrowLeft, Search, Plus, ExternalLink, Calendar, ChevronRight } from 'lucide-react';

const MOCK_BILLERS = [
  { id: '1', name: 'Verizon Wireless', category: 'Telecommunications', lastPaid: 'Sep 20, 2024', amountDue: 85.00, dueDate: 'Oct 30, 2024' },
  { id: '2', name: 'ConEd Electric', category: 'Utilities', lastPaid: 'Oct 02, 2024', amountDue: 124.50, dueDate: 'Nov 02, 2024' },
  { id: '3', name: 'State Farm', category: 'Insurance', lastPaid: 'Oct 15, 2024', amountDue: 210.00, dueDate: 'Nov 15, 2024' },
  { id: '4', name: 'Planet Fitness', category: 'Health', lastPaid: 'Oct 01, 2024', amountDue: 25.00, dueDate: 'Nov 01, 2024' },
];

export const BillPay: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Bill Pay</h1>
           <p className="text-slate-500">Manage your recurring payments and pay vendors securely.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
           </Button>
           <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Biller
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Biller List */}
        <div className="lg:col-span-2 space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input placeholder="Search billers..." className="pl-10" />
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Biller</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Last Paid</th>
                                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Amount Due</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {MOCK_BILLERS.map((biller) => (
                                <tr key={biller.id} className="hover:bg-slate-50 group">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-900">{biller.name}</div>
                                        <div className="text-xs text-slate-500 uppercase tracking-tighter">{biller.category}</div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{biller.lastPaid}</td>
                                    <td className="p-4 text-right">
                                        <div className="font-bold text-slate-900">${biller.amountDue.toFixed(2)}</div>
                                        <div className="text-[10px] text-red-500 font-bold">Due {biller.dueDate}</div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Button variant="outline" className="text-xs py-1 px-3 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                                            Pay Now
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>

        {/* Sidebar Schedule */}
        <div className="space-y-6">
            <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" /> Upcoming Schedule
                </h3>
                <div className="space-y-4">
                    <div className="relative pl-6 border-l-2 border-emerald-500 pb-4">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                        <div className="text-xs font-bold text-emerald-600">Oct 30</div>
                        <div className="text-sm font-bold text-slate-900">Verizon Wireless</div>
                        <div className="text-xs text-slate-500">$85.00 Auto-pay</div>
                    </div>
                    <div className="relative pl-6 border-l-2 border-slate-200 pb-4">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white"></div>
                        <div className="text-xs font-bold text-slate-400">Nov 01</div>
                        <div className="text-sm font-bold text-slate-900">Rent (Apartment 4B)</div>
                        <div className="text-xs text-slate-500">$1,850.00 Auto-pay</div>
                    </div>
                    <div className="relative pl-6 border-l-2 border-slate-200">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white"></div>
                        <div className="text-xs font-bold text-slate-400">Nov 02</div>
                        <div className="text-sm font-bold text-slate-900">ConEd Electric</div>
                        <div className="text-xs text-slate-500">$124.50 Manual Pay</div>
                    </div>
                </div>
            </Card>

            <Card className="p-6 bg-slate-900 text-white border-none">
                <h3 className="font-bold mb-2">Paperless Statements</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    Switch to paperless to receive your bills electronically and reduce clutter.
                </p>
                <Button variant="secondary" className="w-full text-xs py-2 bg-emerald-600">
                    Enroll in Paperless
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
};