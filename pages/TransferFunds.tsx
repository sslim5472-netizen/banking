import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Select, SectionHeader } from '../components/UI';
import { ArrowLeft, ArrowRightLeft, Info, CheckCircle2, LayoutDashboard } from 'lucide-react';

export const TransferFunds: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fromAccount, setFromAccount] = useState('checking');
  const [toAccount, setToAccount] = useState('savings');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const accounts = [
    { label: 'Checking (...4829) - $4,250.00', value: 'checking' },
    { label: 'Savings (...9921) - $20,310.00', value: 'savings' },
    { label: 'Credit Card (...1234) - $1,200 available', value: 'credit' },
  ];

  const handleTransfer = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Transfers</h1>
           <p className="text-slate-500">Move money between your Lumina accounts instantly.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portal
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        {step === 1 && (
          <Card className="p-8 shadow-xl animate-fadeIn">
            <div className="space-y-6">
              <Select 
                label="From Account" 
                value={fromAccount} 
                onChange={(e) => setFromAccount(e.target.value)}
                options={accounts}
              />
              <div className="flex justify-center">
                 <div className="p-2 bg-slate-50 rounded-full border border-gray-200">
                    <ArrowRightLeft className="w-5 h-5 text-slate-400 rotate-90" />
                 </div>
              </div>
              <Select 
                label="To Account" 
                value={toAccount} 
                onChange={(e) => setToAccount(e.target.value)}
                options={accounts}
              />
              <Input 
                label="Transfer Amount" 
                type="number" 
                placeholder="0.00" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
              />
              
              <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                 <Info className="w-5 h-5 text-blue-600 shrink-0" />
                 <p className="text-xs text-blue-700 leading-relaxed">
                    Internal transfers between Lumina accounts are processed immediately and are always fee-free.
                 </p>
              </div>

              <Button 
                className="w-full" 
                disabled={!amount || parseFloat(amount) <= 0}
                onClick={() => setStep(2)}
              >
                Review Transfer
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 shadow-xl animate-fadeIn border-t-4 border-t-emerald-600">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Confirm Transfer</h3>
            <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-xl">
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500">From</span>
                  <span className="font-bold text-slate-900 uppercase">{fromAccount}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500">To</span>
                  <span className="font-bold text-slate-900 uppercase">{toAccount}</span>
               </div>
               <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-slate-900 font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-emerald-600">${parseFloat(amount).toLocaleString()}</span>
               </div>
            </div>
            
            <div className="flex flex-col gap-3">
               <Button onClick={handleTransfer} isLoading={isProcessing}>Confirm & Send</Button>
               <Button variant="outline" onClick={() => setStep(1)} disabled={isProcessing}>Edit Details</Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-12 text-center shadow-2xl animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Transfer Successful</h2>
            <p className="text-slate-500 mb-8">
              Your funds have been moved successfully. Your new balances will be updated across your dashboard immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
                 <LayoutDashboard className="w-4 h-4" /> Go to Portal
               </Button>
               <Button variant="outline" onClick={() => { setStep(1); setAmount(''); }}>
                 Another Transfer
               </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};