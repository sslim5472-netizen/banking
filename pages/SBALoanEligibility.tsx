import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, Select, SectionHeader } from '../components/UI';
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, Building2, Printer, Save, ArrowRight } from 'lucide-react';

export const SBALoanEligibility: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [isChecking, setIsChecking] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: '',
    yearsInBusiness: '',
    creditScore: '',
    annualRevenue: '',
    loanAmount: '',
    bankruptcy: 'no',
    defaultHistory: 'no',
    useOfFunds: 'expansion',
    existingDebt: 'no'
  });

  const [result, setResult] = useState<{
    status: 'eligible' | 'ineligible' | 'review';
    message: string;
    factors: string[];
  }>({ status: 'review', message: '', factors: [] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);

    // Simulate API/Logic processing
    setTimeout(() => {
      const years = parseInt(formData.yearsInBusiness) || 0;
      const score = parseInt(formData.creditScore) || 0;
      const revenue = parseInt(formData.annualRevenue) || 0;
      const amount = parseInt(formData.loanAmount) || 0;
      
      const factors = [];
      let status: 'eligible' | 'ineligible' | 'review' = 'eligible';

      // Basic SBA 7(a) simulation logic
      if (formData.defaultHistory === 'yes') {
        status = 'ineligible';
        factors.push('History of government loan default makes you ineligible.');
      }
      
      if (formData.bankruptcy === 'yes') {
        status = 'review';
        factors.push('Recent bankruptcy history requires manual underwriter review.');
      }

      if (score < 640) {
        status = 'ineligible';
        factors.push('Credit score is below the typical SBA threshold (640+).');
      } else if (score < 680) {
        if (status !== 'ineligible') status = 'review';
        factors.push('Credit score is in a conditional range (640-679).');
      }

      if (years < 2) {
         if (status !== 'ineligible') status = 'review';
         factors.push('Business is less than 2 years old (Startup financing is limited).');
      }

      if (amount > revenue * 1.5) {
        if (status !== 'ineligible') status = 'review';
        factors.push('Requested loan amount exceeds 1.5x annual revenue.');
      }

      let message = '';
      if (status === 'eligible') {
        message = "Congratulations! Your business profile meets our standard criteria for SBA 7(a) financing.";
      } else if (status === 'review') {
        message = "You show potential for qualification, but your application requires a closer look by our lending specialists.";
      } else {
        message = "Based on the information provided, we may not be able to offer an SBA loan at this time, but other financing options may be available.";
      }

      setResult({ status, message, factors });
      setStep('result');
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Button variant="ghost" onClick={() => navigate('/loans')} className="mb-8 pl-0 hover:bg-transparent hover:text-emerald-600">
         <ArrowLeft className="w-4 h-4 mr-2" /> Back to Loans
      </Button>

      {step === 'form' ? (
        <div className="animate-fadeIn">
          <SectionHeader 
            title="SBA Loan Eligibility Check" 
            subtitle="Determine your preliminary eligibility for government-backed financing in just a few minutes." 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
               <Card className="p-6 bg-slate-900 text-white border-none shadow-xl">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                     <Building2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">SBA 7(a) Advantages</h3>
                  <ul className="space-y-4 text-sm text-slate-300 mt-4">
                    <li className="flex items-start gap-3">
                       <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                       <span><strong>Low Down Payments:</strong> Conserve your working capital.</span>
                    </li>
                    <li className="flex items-start gap-3">
                       <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                       <span><strong>Long Terms:</strong> Up to 10 years for working capital, 25 for real estate.</span>
                    </li>
                    <li className="flex items-start gap-3">
                       <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                       <span><strong>Competitive Rates:</strong> Rates are regulated by the SBA.</span>
                    </li>
                  </ul>
               </Card>
               <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 text-xs leading-relaxed">
                  <strong>Disclosure:</strong> This tool provides a preliminary assessment only. Final approval is subject to full underwriting, credit approval, and SBA guidelines.
               </div>
            </div>

            {/* Form */}
            <Card className="lg:col-span-2 p-8 shadow-lg">
              <form onSubmit={checkEligibility} className="space-y-8">
                 <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Business Profile</h4>
                    <div className="space-y-6">
                        <Input 
                            name="businessName" 
                            label="Business Name (Optional)" 
                            placeholder="e.g. Acme Corp" 
                            value={formData.businessName} 
                            onChange={handleChange} 
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select 
                                name="yearsInBusiness"
                                label="Time in Business"
                                value={formData.yearsInBusiness}
                                onChange={handleChange}
                                required
                                options={[
                                    { value: '', label: 'Select...' },
                                    { value: '0', label: 'Less than 1 year' },
                                    { value: '1', label: '1 - 2 years' },
                                    { value: '3', label: '2 - 5 years' },
                                    { value: '6', label: '5+ years' }
                                ]}
                            />
                            <Select 
                                name="creditScore"
                                label="Owner's Credit Score"
                                value={formData.creditScore}
                                onChange={handleChange}
                                required
                                options={[
                                    { value: '', label: 'Select...' },
                                    { value: '720', label: 'Excellent (720+)' },
                                    { value: '680', label: 'Good (680 - 719)' },
                                    { value: '640', label: 'Fair (640 - 679)' },
                                    { value: '600', label: 'Below 640' }
                                ]}
                            />
                        </div>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Financials & Usage</h4>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input 
                                name="annualRevenue" 
                                label="Annual Revenue" 
                                type="number" 
                                placeholder="e.g. 500000" 
                                value={formData.annualRevenue} 
                                onChange={handleChange} 
                                required
                            />
                            <Input 
                                name="loanAmount" 
                                label="Requested Loan Amount" 
                                type="number" 
                                placeholder="e.g. 150000" 
                                value={formData.loanAmount} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        <Select 
                            name="useOfFunds"
                            label="Primary Use of Funds"
                            value={formData.useOfFunds}
                            onChange={handleChange}
                            options={[
                                { value: 'expansion', label: 'Business Expansion' },
                                { value: 'working_capital', label: 'Working Capital' },
                                { value: 'equipment', label: 'Equipment Purchase' },
                                { value: 'real_estate', label: 'Commercial Real Estate' },
                                { value: 'refinance', label: 'Refinance Debt' }
                            ]}
                        />
                    </div>
                 </div>

                 <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 border-b pb-2">Eligibility Questions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select 
                            name="defaultHistory"
                            label="Prior Government Loan Default?"
                            value={formData.defaultHistory}
                            onChange={handleChange}
                            options={[
                                { value: 'no', label: 'No' },
                                { value: 'yes', label: 'Yes' }
                            ]}
                        />
                        <Select 
                            name="bankruptcy"
                            label="Past Bankruptcy?"
                            value={formData.bankruptcy}
                            onChange={handleChange}
                            options={[
                                { value: 'no', label: 'No' },
                                { value: 'yes', label: 'Yes' }
                            ]}
                        />
                    </div>
                 </div>

                 <div className="pt-4">
                    <Button type="submit" className="w-full py-3 sm:py-4 text-base sm:text-lg" isLoading={isChecking}>
                        Check Eligibility Now
                    </Button>
                    <p className="text-xs text-center text-slate-400 mt-4">
                        By clicking "Check Eligibility Now", you agree to our Terms of Service. This action will not impact your credit score.
                    </p>
                 </div>
              </form>
            </Card>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn max-w-3xl mx-auto">
          <Card className={`overflow-hidden border-t-8 ${
             result.status === 'eligible' ? 'border-t-emerald-500' : 
             result.status === 'ineligible' ? 'border-t-red-500' : 
             'border-t-yellow-500'
          }`}>
             <div className="p-10 text-center bg-white">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ${
                    result.status === 'eligible' ? 'bg-emerald-50' : 
                    result.status === 'ineligible' ? 'bg-red-50' : 
                    'bg-yellow-50'
                }`}>
                    {result.status === 'eligible' && <CheckCircle className="w-12 h-12 text-emerald-600" />}
                    {result.status === 'ineligible' && <XCircle className="w-12 h-12 text-red-600" />}
                    {result.status === 'review' && <AlertCircle className="w-12 h-12 text-yellow-600" />}
                </div>
                
                <h2 className={`text-3xl font-bold mb-4 ${
                     result.status === 'eligible' ? 'text-emerald-700' : 
                     result.status === 'ineligible' ? 'text-red-700' : 
                     'text-yellow-700'
                }`}>
                    {result.status === 'eligible' ? 'Pre-Qualified' : 
                     result.status === 'ineligible' ? 'Not Eligible' : 
                     'Manual Review Needed'}
                </h2>
                <p className="text-slate-600 text-lg max-w-lg mx-auto leading-relaxed">{result.message}</p>
             </div>

             <div className="bg-gray-50 p-8 border-t border-gray-100">
                {result.factors.length > 0 && (
                   <div className="mb-8">
                      <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wide">Analysis Factors</h4>
                      <ul className="space-y-3">
                         {result.factors.map((factor, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                               <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                   result.status === 'eligible' ? 'bg-emerald-400' : 'bg-slate-400'
                               }`}></div>
                               {factor}
                            </li>
                         ))}
                      </ul>
                   </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button variant="outline" onClick={() => { setStep('form'); setIsChecking(false); }} className="flex-1 w-full sm:w-auto">
                      Check Another
                   </Button>
                   
                   {result.status !== 'ineligible' ? (
                       <Button onClick={() => navigate('/open-account')} className="flex-1 w-full sm:w-auto shadow-lg shadow-emerald-200">
                          Start Application <ArrowRight className="ml-2 w-4 h-4" />
                       </Button>
                   ) : (
                       <Button onClick={() => navigate('/contact')} className="flex-1 w-full sm:w-auto">
                          Talk to an Advisor
                       </Button>
                   )}
                </div>
                
                <div className="mt-8 flex justify-center gap-6 text-sm text-slate-400">
                    <button className="flex items-center hover:text-slate-600 gap-2"><Printer className="w-4 h-4" /> Print Results</button>
                    <button className="flex items-center hover:text-slate-600 gap-2"><Save className="w-4 h-4" /> Save Quote</button>
                </div>
             </div>
          </Card>
        </div>
      )}
    </div>
  );
};