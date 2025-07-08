import React, { useState } from 'react';
import HealthcareLLMGovernance from './components/HealthcareLLMGovernance';
import CongressionalDashboard from './components/CongressionalDashboard';
import { Building, Shield } from 'lucide-react';

function App() {
  const [viewMode, setViewMode] = useState('toolkit'); // 'toolkit' or 'congressional'
  
  return (
    <div className="App min-h-screen">
      {/* Mode Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2 border border-gray-200">
          <button
            onClick={() => setViewMode('toolkit')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'toolkit' 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Shield size={16} />
            Healthcare Toolkit
          </button>
          <button
            onClick={() => setViewMode('congressional')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              viewMode === 'congressional' 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building size={16} />
            Congressional Demo
          </button>
        </div>
      </div>

      {/* Render appropriate component */}
      {viewMode === 'toolkit' ? (
        <HealthcareLLMGovernance />
      ) : (
        <CongressionalDashboard />
      )}
    </div>
  );
}

export default App;
