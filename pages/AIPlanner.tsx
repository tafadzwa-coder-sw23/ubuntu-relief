import React, { useState } from 'react';
import { generateResponsePlan } from '../services/geminiService';
import { AIResponsePlan } from '../types';
import { BrainCircuit, Loader2, CheckCircle2, AlertTriangle, FileText, Download } from 'lucide-react';

const AIPlanner: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AIResponsePlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!scenario.trim()) return;
    setLoading(true);
    setError(null);
    setPlan(null);

    try {
      const result = await generateResponsePlan(scenario);
      if (result) {
        setPlan(result);
      } else {
        setError("Could not generate a plan. Please check your API configuration or try a different description.");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-brand-100 rounded-full mb-4">
            <BrainCircuit className="w-8 h-8 text-brand-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">AI Crisis Strategy Generator</h1>
          <p className="mt-3 text-lg text-slate-500">
            Describe a crisis scenario in Zimbabwe (e.g., "Cholera outbreak in Chitungwiza affecting 200 families"). 
            Gemini AI will draft a comprehensive response plan for your NGO.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <label htmlFor="scenario" className="block text-sm font-medium text-slate-700 mb-2">
              Crisis Scenario Description
            </label>
            <div className="relative rounded-md shadow-sm">
              <textarea
                id="scenario"
                rows={4}
                className="form-textarea block w-full rounded-md border-slate-300 focus:ring-brand-500 focus:border-brand-500 sm:text-sm p-3 border"
                placeholder="Enter details about the location, affected population, and primary symptoms/needs..."
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={loading || !scenario.trim()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="-ml-1 mr-2 h-5 w-5" />
                    Generate Strategy
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="px-6 pb-6">
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Generation Failed</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {plan && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200 animate-fade-in">
             <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center">
                   <FileText className="mr-2 h-5 w-5 text-brand-400"/> 
                   Strategic Response Plan
                </h2>
                <button className="text-slate-300 hover:text-white flex items-center text-sm">
                   <Download className="mr-1 h-4 w-4" /> Export PDF
                </button>
             </div>
             <div className="p-6 sm:p-8 space-y-8">
                {/* Header Info */}
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.strategyName}</h3>
                   <div className="flex items-center text-sm text-slate-500">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide mr-2">
                         Draft
                      </span>
                      Generated by Gemini AI • USD Currency
                   </div>
                </div>

                {/* Grid Layout */}
                <div className="grid md:grid-cols-2 gap-8">
                   {/* Immediate Actions */}
                   <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                         <CheckCircle2 className="w-5 h-5 text-brand-500 mr-2" />
                         Immediate Actions
                      </h4>
                      <ul className="space-y-3">
                         {plan.immediateActions.map((action, idx) => (
                            <li key={idx} className="flex items-start">
                               <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border-2 border-slate-200 text-slate-500 text-xs font-medium mr-3">
                                  {idx + 1}
                               </span>
                               <span className="text-slate-600 text-sm">{action}</span>
                            </li>
                         ))}
                      </ul>
                   </div>

                   {/* Resources */}
                   <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                         <CheckCircle2 className="w-5 h-5 text-blue-500 mr-2" />
                         Required Resources
                      </h4>
                      <ul className="space-y-2 bg-slate-50 p-4 rounded-lg">
                         {plan.requiredResources.map((res, idx) => (
                            <li key={idx} className="text-sm text-slate-700 flex items-center">
                               <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                               {res}
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>

                {/* Risk & Budget */}
                <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                   <div>
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Risk Assessment</h4>
                      <p className="text-sm text-slate-600 bg-red-50 border border-red-100 p-3 rounded-md">
                         {plan.riskAssessment}
                      </p>
                   </div>
                   <div>
                      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Estimated Budget</h4>
                      <div className="text-3xl font-bold text-slate-900">
                         ${plan.estimatedBudgetUSD.toLocaleString()}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                         *Estimate based on standard regional pricing.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
