import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { DASHBOARD_STATS, CHART_DATA } from '../constants';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Pandemic Response Overview (Zimbabwe)</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {DASHBOARD_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white overflow-hidden shadow rounded-lg px-4 py-5 sm:p-6 border-l-4 border-brand-500">
              <dt className="text-sm font-medium text-slate-500 truncate">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-semibold text-slate-900">{stat.value}</dd>
              <div className={`mt-2 flex items-center text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                <span className="font-medium">{stat.change}</span>
                <span className="ml-2 text-slate-400">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Active Cases vs Recovered Trend */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">Regional Case Distribution</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="active" name="Active Cases" fill="#f87171" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="recovered" name="Recovered" fill="#4ade80" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Resource Allocation Chart */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-slate-900 mb-4">Resource Availability Index</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="resources" stroke="#0ea5e9" fill="#e0f2fe" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              *Index 0-100 showing availability of critical supplies (PPE, O2, Food)
            </p>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
            <h3 className="text-lg leading-6 font-medium text-slate-900">Recent Ministry Alerts</h3>
          </div>
          <ul className="divide-y divide-slate-200">
            <li className="px-4 py-4 sm:px-6 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-brand-600 truncate">Vaccination Drive - Phase 4</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-slate-500">
                    Targeting rural districts in Manicaland and Masvingo.
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                  <p>Posted 2 hours ago</p>
                </div>
              </div>
            </li>
            <li className="px-4 py-4 sm:px-6 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-red-600 truncate">Localized Lockdown Warning</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Urgent
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-slate-500">
                    Increased restrictions in Kwekwe due to variant detection.
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-slate-500 sm:mt-0">
                  <p>Posted 6 hours ago</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
