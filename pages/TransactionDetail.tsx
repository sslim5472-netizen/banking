import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, SectionHeader } from '../components/UI';
import { ArrowLeft, CheckCircle, MapPin, Receipt, Share2, HelpCircle, FileText, Calendar, Clock, Tag, CreditCard, ShieldAlert } from 'lucide-react';
import { Transaction } from '../types';

export const TransactionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // In a real app, we'd fetch the transaction by ID here.
  // For the demo, we use the state passed through navigation or mock it.
  const transaction: Transaction | undefined = location.state?.transaction;

  if (!transaction) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Transaction Not Found</h2>
        <p className="text-slate-600 mb-8">We couldn't retrieve the details for transaction ID: {id}</p>
        <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
      </div>
    );
  }

  const isPositive = transaction.positive;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/dashboard')} 
        className="mb-8 pl-0 hover:bg-transparent hover:text-emerald-600"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Button>

      {/* Header Info */}
      <div className="text-center mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            {transaction.status}
         </div>
         <h1 className={`text-5xl font-bold tracking-tight mb-2 ${isPositive ? 'text-emerald-600' : 'text-slate-900'}`}>
            {transaction.amount}
         </h1>
         <p className="text-xl font-semibold text-slate-900">{transaction.desc}</p>
         <p className="text-slate-500 text-sm mt-1">{transaction.date} at {transaction.time}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
            <Card className="p-0 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Transaction Details</h3>
                    <span className="text-xs text-slate-500 font-mono">Ref: {transaction.referenceNumber}</span>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-y-6">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Merchant</p>
                            <p className="text-slate-900 font-medium flex items-center gap-2">
                                <Receipt className="w-4 h-4 text-slate-400" />
                                {transaction.merchant}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</p>
                            <p className="text-slate-900 font-medium flex items-center gap-2">
                                <Tag className="w-4 h-4 text-slate-400" />
                                {transaction.category}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Method</p>
                            <p className="text-slate-900 font-medium flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-slate-400" />
                                {transaction.paymentMethod}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</p>
                            <p className="text-slate-900 font-medium flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                {transaction.location || 'Point of Sale'}
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Notes</p>
                        <p className="text-sm text-slate-500 italic">No notes added to this transaction.</p>
                        <button className="text-emerald-600 text-xs font-bold mt-2 hover:underline">+ Add Note</button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Download Receipt
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Share Details
                </Button>
            </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
            <Card className="p-6 bg-slate-900 text-white border-none">
                <ShieldAlert className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Need help with this charge?</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    If you don't recognize this transaction or need to dispute the amount, our support team is available 24/7.
                </p>
                <Button 
                    variant="secondary" 
                    className="w-full text-sm"
                    onClick={() => navigate('/contact')}
                >
                    Dispute Transaction
                </Button>
            </Card>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                        <h4 className="text-sm font-bold text-blue-900">Did you know?</h4>
                        <p className="text-xs text-blue-700 mt-1">
                            Transactions can take 3-5 business days to fully settle with your merchant.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};