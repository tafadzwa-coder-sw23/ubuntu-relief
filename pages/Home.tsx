import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://picsum.photos/1920/1080?grayscale"
            alt="Community support"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">United Against</span>
            <span className="block text-brand-500">Future Pandemics</span>
          </h1>
          <p className="mt-6 max-w-lg text-xl text-slate-300">
            A centralized AI-powered platform for Zimbabwe and Africa. Connecting donors with verified NGOs to deliver aid where it's needed most, effectively and transparently.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/dashboard" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-slate-900 bg-brand-400 hover:bg-brand-500 transition">
              View Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/planner" className="inline-flex items-center px-6 py-3 border border-slate-500 text-base font-medium rounded-md text-slate-100 hover:bg-slate-800 transition">
              AI Strategy Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base font-semibold text-brand-600 uppercase tracking-wide">Technology for Good</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Smarter Response with Gemini AI
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              We leverage machine learning to predict outbreaks, optimize logistics, and draft funding proposals for local organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Real-time Mapping</h3>
              <p className="mt-2 text-slate-500">
                Visualize needs across provinces like Masvingo, Midlands, and Matabeleland with real-time data feeds.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-brand-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">AI Resource Allocation</h3>
              <p className="mt-2 text-slate-500">
                Our Gemini-powered engine suggests the most efficient distribution routes for food and PPE.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Community Verified</h3>
              <p className="mt-2 text-slate-500">
                Trust is key. We work with registered trusts in Harare and community leaders to verify all requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to make an impact?</span>
            <span className="block text-brand-200">Join the network today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/needs" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50">
                Browse Needs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
