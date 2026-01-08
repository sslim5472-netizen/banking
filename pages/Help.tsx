import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/UI';
import { Search, Lock, CreditCard, Smartphone, User, FileText, AlertTriangle, ChevronDown, ChevronUp, MessageCircle, X } from 'lucide-react';

const faqData = [
  { q: "How do I reset my password?", a: "To reset your password, click on the 'Forgot Password' link on the login page. You will need to verify your identity using your email or phone number.", cat: "Security" },
  { q: "What is my routing number?", a: "Your routing number is located at the bottom left of your checks. You can also view it in the 'Account Details' tab of your online banking dashboard.", cat: "Account" },
  { q: "How do I dispute a transaction?", a: "Navigate to the transaction in your account history, click on it, and select 'Report a Problem'. Follow the prompts to submit your dispute.", cat: "Security" },
  { q: "Where can I find my account statements?", a: "Log in to your account, go to the 'Documents' or 'Statements' section. You can view and download PDF statements for the last 7 years.", cat: "Account" },
  { q: "How do I set up travel notifications?", a: "In the mobile app, go to 'Card Management' > 'Travel Notices'. Enter your dates and destination to prevent card blocking.", cat: "Cards" },
  { q: "Can I deposit a check from my phone?", a: "Yes! Use the Mobile Deposit feature in our app. Sign the back of the check, take photos of the front and back, and enter the amount.", cat: "Mobile" },
  { q: "What are the current mortgage rates?", a: "Rates vary daily based on market conditions. Please visit our Loans page or use the Mortgage Calculator to see estimated rates.", cat: "Loans" },
  { q: "Is there a daily ATM withdrawal limit?", a: "The standard daily ATM withdrawal limit is $1,000. You can request a temporary limit increase by calling customer support.", cat: "Cards" },
  { q: "How do I enable 2-Factor Authentication?", a: "Go to Settings > Security > Two-Factor Authentication. You can choose to receive codes via SMS or an Authenticator App.", cat: "Security" },
  { q: "Are there fees for wire transfers?", a: "Incoming domestic wires are free. Outgoing domestic wires are $20. International wires vary by destination.", cat: "Payments" }
];

export const Help: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { icon: <User />, title: "Account Management", desc: "Update profile, statements" },
    { icon: <Lock />, title: "Security & Fraud", desc: "Passwords, alerts, disputes" },
    { icon: <CreditCard />, title: "Cards & Payments", desc: "Activate card, limits" },
    { icon: <Smartphone />, title: "Mobile Banking", desc: "App setup, mobile deposit" },
    { icon: <FileText />, title: "Loans & Mortgages", desc: "Payments, applications" },
    { icon: <AlertTriangle />, title: "Troubleshooting", desc: "Login issues, errors" },
  ];

  const filteredFaqs = faqData.filter(item => 
    item.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setOpenFaqIndex(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <h1 className="text-3xl md:text-4xl font-bold mb-6">How can we help you today?</h1>
           <div className="relative max-w-xl mx-auto">
             <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for answers (e.g., 'reset password', 'routing number')"
                className="w-full px-6 py-4 rounded-full text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-lg placeholder-slate-400"
             />
             {searchTerm ? (
                <button 
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-800/20 p-2 rounded-full text-white hover:bg-emerald-800/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
             ) : (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600 p-2 rounded-full text-white pointer-events-none">
                  <Search className="w-5 h-5" />
                </div>
             )}
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        
        {!searchTerm && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 animate-fadeIn">
              {categories.map((cat, i) => (
                  <Card key={i} className="p-6 hover:shadow-lg transition-shadow cursor-pointer text-center sm:text-left flex flex-col items-center sm:items-start group">
                      <div className="w-12 h-12 bg-emerald-5 rounded-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-100 transition-colors">
                          {React.cloneElement(cat.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">{cat.title}</h3>
                      <p className="text-sm text-slate-500">{cat.desc}</p>
                  </Card>
              ))}
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-12 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              {searchTerm ? `Results for "${searchTerm}"` : "Frequently Asked Questions"}
              {searchTerm && <span className="text-sm font-normal text-slate-500 ml-2">({filteredFaqs.length} found)</span>}
            </h2>
            
            <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((item, i) => (
                    <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => toggleFaq(i)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                        >
                            <span className="font-medium text-slate-900">{item.q}</span>
                            {openFaqIndex === i ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </button>
                        {openFaqIndex === i && (
                            <div className="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-gray-100 animate-fadeIn">
                                {item.a}
                                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end">
                                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded">
                                    {item.cat}
                                  </span>
                                </div>
                            </div>
                        )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <p>No answers found matching your search.</p>
                    <button onClick={clearSearch} className="text-emerald-600 font-medium hover:underline mt-2">View all topics</button>
                  </div>
                )}
            </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Can't find what you're looking for?</h3>
            <p className="text-slate-600 mb-6 max-w-xl mx-auto">
              Our support team is available 24/7 to assist you with any questions or concerns you may have regarding your account.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={() => navigate('/contact')} className="w-full sm:w-auto">Contact Support</Button>
                <Button variant="outline" onClick={() => navigate('/login')} className="bg-white w-full sm:w-auto">Log In to Message Us</Button>
            </div>
        </div>
      </div>
    </div>
  );
};