import React, { useState } from 'react';
import { DUMMY_NEEDS } from '../constants';
import { Need, Donation } from '../types';
import { generateNeedSummary } from '../services/geminiService';
import { Search, MapPin, Filter, HandHeart, ChevronDown, ChevronUp, User, Calendar, DollarSign, X, Building, Phone, Mail, Sparkles, Loader2 } from 'lucide-react';

const Needs: React.FC = () => {
  const [needs, setNeeds] = useState<Need[]>(DUMMY_NEEDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  
  // State for managing expanded donation history views
  const [expandedNeeds, setExpandedNeeds] = useState<Record<string, boolean>>({});
  
  // State for AI Summaries loading
  const [loadingSummaries, setLoadingSummaries] = useState<Record<string, boolean>>({});

  // State for Donation Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNeedId, setSelectedNeedId] = useState<string | null>(null);
  const [donationForm, setDonationForm] = useState({
    name: '',
    amount: '',
    anonymous: false
  });

  // State for NGO Registration Modal
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    orgName: '',
    contactPerson: '',
    email: '',
    phone: '',
    description: ''
  });

  const toggleHistory = (id: string) => {
    setExpandedNeeds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleGenerateSummary = async (needId: string) => {
    const need = needs.find(n => n.id === needId);
    if (!need) return;

    setLoadingSummaries(prev => ({ ...prev, [needId]: true }));
    const summary = await generateNeedSummary(need);
    setLoadingSummaries(prev => ({ ...prev, [needId]: false }));

    if (summary) {
      setNeeds(prevNeeds => prevNeeds.map(n => 
        n.id === needId ? { ...n, aiSummary: summary } : n
      ));
    }
  };

  const openDonateModal = (needId: string) => {
    setSelectedNeedId(needId);
    setDonationForm({ name: '', amount: '', anonymous: false });
    setIsModalOpen(true);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNeedId || !donationForm.amount) return;

    const amount = parseFloat(donationForm.amount);
    if (isNaN(amount) || amount <= 0) return;

    const newDonation: Donation = {
      id: Math.random().toString(36).substr(2, 9),
      donorName: donationForm.anonymous || !donationForm.name.trim() ? 'Anonymous' : donationForm.name,
      amount: amount,
      date: new Date().toISOString(),
      anonymous: donationForm.anonymous
    };

    setNeeds(prevNeeds => prevNeeds.map(need => {
      if (need.id === selectedNeedId) {
        return {
          ...need,
          raised: need.raised + amount,
          donations: [newDonation, ...need.donations]
        };
      }
      return need;
    }));

    setIsModalOpen(false);
    // Auto-expand the need to show the new donation
    setExpandedNeeds(prev => ({ ...prev, [selectedNeedId]: true }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Registering NGO:", registerForm);
    alert(`Thank you, ${registerForm.contactPerson}. Your application for ${registerForm.orgName} has been received and is under review.`);
    
    setIsRegisterModalOpen(false);
    // Reset form
    setRegisterForm({
        orgName: '',
        contactPerson: '',
        email: '',
        phone: '',
        description: ''
    });
  };

  const filteredNeeds = needs.filter(need => {
    const matchesSearch = need.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          need.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || need.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Needs Registry</h1>
            <p className="mt-1 text-sm text-slate-500">Verified requests from registered NGOs across Zimbabwe.</p>
          </div>
          <div className="mt-4 flex space-x-3 md:mt-0">
             <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none transition-colors"
             >
              Register an NGO
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none">
              Post a Need
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
              placeholder="Search by keyword, location (e.g. Harare)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-400" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Medical">Medical</option>
              <option value="Food">Food Security</option>
              <option value="Education">Education</option>
              <option value="Hygiene">WASH (Water, Sanitation)</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredNeeds.map((need) => (
            <div key={need.id} className="bg-white flex flex-col rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    need.category === 'Medical' ? 'bg-red-100 text-red-800' :
                    need.category === 'Food' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {need.category}
                  </span>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    need.urgency === 'High' ? 'text-red-600' : 'text-slate-500'
                  }`}>
                    {need.urgency} Priority
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-900">{need.title}</h3>
                <p className="text-sm text-brand-600 font-medium">{need.organization}</p>
                <div className="flex items-center mt-2 text-sm text-slate-500">
                  <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                  {need.location}
                </div>
                <p className="mt-3 text-sm text-slate-500 line-clamp-3">
                  {need.description}
                </p>

                {/* AI Summary Section */}
                <div className="mt-3 min-h-[40px]">
                  {need.aiSummary ? (
                    <div className="bg-brand-50 border border-brand-100 rounded-md p-3 flex items-start animate-fade-in">
                      <Sparkles className="w-4 h-4 text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-xs text-brand-800 italic leading-relaxed">{need.aiSummary}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleGenerateSummary(need.id)}
                      disabled={loadingSummaries[need.id]}
                      className="inline-flex items-center text-xs font-medium text-brand-600 hover:text-brand-700 bg-white border border-brand-200 hover:bg-brand-50 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {loadingSummaries[need.id] ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 mr-1.5" />
                          Generate AI Summary
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-slate-900">${need.raised.toLocaleString()} raised</span>
                    <span className="text-slate-500">Goal: ${need.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                      className="bg-brand-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((need.raised / need.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Recent Donations Toggle */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => toggleHistory(need.id)}
                    className="flex items-center text-sm text-slate-500 hover:text-brand-600 transition-colors w-full justify-between group"
                  >
                    <span className="flex items-center">
                       <User className="w-4 h-4 mr-2 text-slate-400 group-hover:text-brand-500" />
                       {need.donations.length} Donation{need.donations.length !== 1 && 's'}
                    </span>
                    {expandedNeeds[need.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Donation List */}
                  {expandedNeeds[need.id] && (
                    <div className="mt-3 space-y-3 bg-slate-50 p-3 rounded-md max-h-48 overflow-y-auto animate-fade-in custom-scrollbar">
                      {need.donations.length > 0 ? (
                        need.donations.map((donation) => (
                          <div key={donation.id} className="flex justify-between items-start text-sm border-b border-slate-100 last:border-0 pb-2 last:pb-0">
                            <div>
                              <p className="font-medium text-slate-800">{donation.anonymous ? 'Anonymous' : donation.donorName}</p>
                              <p className="text-xs text-slate-400 flex items-center mt-0.5">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(donation.date)}
                              </p>
                            </div>
                            <span className="font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full text-xs">
                              ${donation.amount.toLocaleString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 text-center py-2">No donations yet. Be the first!</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t border-slate-100 px-6 py-4 bg-slate-50 rounded-b-lg">
                <button 
                  onClick={() => openDonateModal(need.id)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
                >
                  <HandHeart className="w-4 h-4 mr-2" />
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredNeeds.length === 0 && (
            <div className="text-center py-12">
                <p className="text-slate-500">No needs found matching your criteria.</p>
            </div>
        )}
      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setIsModalOpen(false)} aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                    <HandHeart className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                        Donate to {needs.find(n => n.id === selectedNeedId)?.title}
                      </h3>
                      <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-slate-700">Donation Amount (USD)</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-7 pr-12 sm:text-sm border-slate-300 rounded-md py-2 border"
                            placeholder="0.00"
                            value={donationForm.amount}
                            onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 border px-3"
                          placeholder="John Doe"
                          value={donationForm.name}
                          onChange={(e) => setDonationForm({...donationForm, name: e.target.value})}
                          disabled={donationForm.anonymous}
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          id="anonymous"
                          name="anonymous"
                          type="checkbox"
                          className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded"
                          checked={donationForm.anonymous}
                          onChange={(e) => setDonationForm({...donationForm, anonymous: e.target.checked})}
                        />
                        <label htmlFor="anonymous" className="ml-2 block text-sm text-slate-900">
                          Make donation anonymous
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDonate}
                >
                  Confirm Donation
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NGO Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="register-modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" onClick={() => setIsRegisterModalOpen(false)} aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Building className="h-6 w-6 text-brand-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-slate-900" id="register-modal-title">
                        Register Your NGO
                      </h3>
                      <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-500">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <form id="ngo-register-form" onSubmit={handleRegister} className="mt-4 space-y-4">
                      
                      <div>
                        <label htmlFor="orgName" className="block text-sm font-medium text-slate-700">Organization Name</label>
                        <input
                          type="text"
                          id="orgName"
                          required
                          className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 border px-3"
                          placeholder="e.g., Hope For All Trust"
                          value={registerForm.orgName}
                          onChange={(e) => setRegisterForm({...registerForm, orgName: e.target.value})}
                        />
                      </div>

                      <div>
                        <label htmlFor="contactPerson" className="block text-sm font-medium text-slate-700">Contact Person</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                            type="text"
                            id="contactPerson"
                            required
                            className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                            placeholder="Full Name"
                            value={registerForm.contactPerson}
                            onChange={(e) => setRegisterForm({...registerForm, contactPerson: e.target.value})}
                            />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                type="email"
                                id="email"
                                required
                                className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                                placeholder="contact@org.com"
                                value={registerForm.email}
                                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                type="tel"
                                id="phone"
                                required
                                className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border"
                                placeholder="+263..."
                                value={registerForm.phone}
                                onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                                />
                            </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700">Work Description</label>
                        <textarea
                          id="description"
                          rows={3}
                          required
                          className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border-slate-300 rounded-md py-2 border px-3"
                          placeholder="Briefly describe your mission and current activities..."
                          value={registerForm.description}
                          onChange={(e) => setRegisterForm({...registerForm, description: e.target.value})}
                        />
                      </div>

                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  form="ngo-register-form"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-brand-600 text-base font-medium text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit Registration
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsRegisterModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Needs;