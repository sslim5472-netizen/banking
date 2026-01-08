import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, SectionHeader } from '../components/UI';
import { ArrowLeft, Lock, Unlock, CreditCard, ShieldCheck, Globe, ShoppingBag, Smartphone, ChevronRight } from 'lucide-react';

export const CardManagement: React.FC = () => {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);
  const [intlEnabled, setIntlEnabled] = useState(true);
  const [onlineEnabled, setOnlineEnabled] = useState(true);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Cards</h1>
           <p className="text-slate-500">Control your physical and virtual payment cards.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
           <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Card Visualization */}
        <div className="lg:col-span-1">
            <div className="perspective-1000 mb-8 group">
                <div className={`relative w-full h-56 rounded-[20px] transition-all duration-700 transform-style-3d shadow-2xl ${isLocked ? 'grayscale opacity-75' : ''}`}>
                    {/* Front of Card */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black text-white p-8 backface-hidden rounded-[20px] overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="flex justify-between items-start">
                            <span className="font-mono text-xl font-bold tracking-tighter">Lumina <span className="text-emerald-500">Elite</span></span>
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                <CreditCard className="w-6 h-6 text-emerald-400" />
                            </div>
                        </div>
                        <div className="mt-12">
                            <div className="text-xl font-mono tracking-[0.2em]">**** **** **** 4829</div>
                        </div>
                        <div className="mt-8 flex justify-between items-end">
                            <div>
                                <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Card Holder</div>
                                <div className="text-sm font-medium tracking-wide">ALEXANDER DUMAS</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">Expires</div>
                                <div className="text-sm font-medium">10/28</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <Card className={`p-6 flex items-center justify-between border-2 transition-all cursor-pointer ${isLocked ? 'border-red-500 bg-red-50' : 'border-emerald-500 bg-emerald-50'}`} onClick={toggleLock}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${isLocked ? 'bg-red-100' : 'bg-emerald-100'}`}>
                            {isLocked ? <Lock className="w-6 h-6 text-red-600" /> : <Unlock className="w-6 h-6 text-emerald-600" />}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">{isLocked ? 'Card is Frozen' : 'Card is Active'}</h4>
                            <p className="text-xs text-slate-500">{isLocked ? 'Tap to unlock your card' : 'Tap to freeze transactions'}</p>
                        </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative transition-colors ${isLocked ? 'bg-red-600' : 'bg-emerald-600'}`}>
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isLocked ? 'right-1' : 'left-1'}`}></div>
                    </div>
                </Card>

                <Button variant="outline" className="w-full">Order Replacement Card</Button>
            </div>
        </div>

        {/* Settings & Limits */}
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Security & Controls</h3>
            <Card className="divide-y divide-gray-100">
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">International Transactions</h4>
                            <p className="text-xs text-slate-500">Allow card use outside of your home country.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIntlEnabled(!intlEnabled)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${intlEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${intlEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                </div>
                
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-50 p-2.5 rounded-lg text-purple-600">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Online Shopping</h4>
                            <p className="text-xs text-slate-500">Allow use for e-commerce and digital payments.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setOnlineEnabled(!onlineEnabled)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${onlineEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${onlineEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                    </button>
                </div>

                <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="bg-orange-50 p-2.5 rounded-lg text-orange-600">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Contactless & Apple Pay</h4>
                            <p className="text-xs text-slate-500">Configure mobile wallet and tap-to-pay.</p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </div>
            </Card>

            <h3 className="text-xl font-bold text-slate-900">Spending Limits</h3>
            <Card className="p-8">
                <div className="space-y-8">
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-slate-700">Daily ATM Limit</span>
                            <span className="font-bold text-slate-900">$1,000.00</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[25%]"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">$250 used today</p>
                    </div>
                    
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-slate-700">Monthly Transaction Limit</span>
                            <span className="font-bold text-slate-900">$15,000.00</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[60%]"></div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2">$8,450 used this month</p>
                    </div>
                </div>
                <Button variant="outline" className="w-full mt-8 text-xs">Request Limit Increase</Button>
            </Card>
        </div>
      </div>
    </div>
  );
};