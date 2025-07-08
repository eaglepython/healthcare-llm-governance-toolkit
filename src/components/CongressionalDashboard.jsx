import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, CheckCircle, FileText, Users, Brain, Database, Settings, Download, ExternalLink, TrendingUp, Building, Globe, Calendar, DollarSign, Scale, Eye } from 'lucide-react';

const CongressionalHealthcareAIDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Q2_2025');
  const [selectedCommittee, setSelectedCommittee] = useState('HELP');

  // Realistic Congressional data scenarios
  const healthcareAISystems = [
    {
      id: 'epic_sepsis_watch',
      name: 'Epic Sepsis Watch',
      provider: 'Epic Systems',
      deployedSites: 847,
      patientsAffected: 2400000,
      riskScore: 72,
      complianceStatus: 'Compliant',
      fdaStatus: 'Class II Cleared',
      criticalIssues: 0,
      lastAudit: '2025-06-15',
      category: 'Clinical Decision Support'
    },
    {
      id: 'google_dermatology',
      name: 'Google Health Dermatology AI',
      provider: 'Google Health',
      deployedSites: 234,
      patientsAffected: 890000,
      riskScore: 85,
      complianceStatus: 'Compliant',
      fdaStatus: 'Class II Cleared',
      criticalIssues: 0,
      lastAudit: '2025-05-22',
      category: 'Diagnostic Imaging'
    },
    {
      id: 'openai_scribe',
      name: 'OpenAI Clinical Scribe',
      provider: 'OpenAI Healthcare',
      deployedSites: 1250,
      patientsAffected: 5200000,
      riskScore: 58,
      complianceStatus: 'Under Review',
      fdaStatus: 'Pending Review',
      criticalIssues: 3,
      lastAudit: '2025-07-01',
      category: 'Clinical Documentation'
    },
    {
      id: 'ibm_watson_oncology',
      name: 'IBM Watson for Oncology',
      provider: 'IBM Watson Health',
      deployedSites: 456,
      patientsAffected: 780000,
      riskScore: 45,
      complianceStatus: 'Non-Compliant',
      fdaStatus: 'Class III Under Review',
      criticalIssues: 7,
      lastAudit: '2025-04-10',
      category: 'Treatment Recommendation'
    },
    {
      id: 'anthropic_triage',
      name: 'Anthropic Emergency Triage',
      provider: 'Anthropic PBC',
      deployedSites: 89,
      patientsAffected: 340000,
      riskScore: 91,
      complianceStatus: 'Compliant',
      fdaStatus: 'Class II Cleared',
      criticalIssues: 0,
      lastAudit: '2025-06-28',
      category: 'Emergency Medicine'
    }
  ];

  const congressionalCommittees = [
    { id: 'HELP', name: 'Health, Education, Labor & Pensions', chair: 'Sen. Bernie Sanders' },
    { id: 'Energy', name: 'Energy & Commerce', chair: 'Rep. Cathy McMorris Rodgers' },
    { id: 'Science', name: 'Science, Space & Technology', chair: 'Rep. Frank Lucas' },
    { id: 'Oversight', name: 'Oversight & Accountability', chair: 'Rep. James Comer' }
  ];

  const industryTrends = {
    totalSystems: 2876,
    newDeployments: 234,
    averageRiskScore: 68,
    complianceRate: 73,
    criticalIncidents: 12,
    patientsAffected: 9600000,
    marketValue: 8900000000,
    growthRate: 34
  };

  const policyImpacts = [
    {
      id: 'hr_2847',
      title: 'HR 2847 - Healthcare AI Transparency Act',
      status: 'Committee Review',
      impactScore: 85,
      affectedSystems: 1847,
      estimatedCost: 450000000,
      implementationTime: '18 months',
      riskReduction: 23
    },
    {
      id: 's_1456',
      title: 'S 1456 - AI in Medicine Safety Standards',
      status: 'Floor Vote Pending',
      impactScore: 92,
      affectedSystems: 2340,
      estimatedCost: 680000000,
      implementationTime: '24 months',
      riskReduction: 31
    }
  ];

  const demographicAnalysis = {
    biasMetrics: {
      racial: { score: 0.12, trend: -0.03, status: 'Improving' },
      gender: { score: 0.08, trend: -0.01, status: 'Stable' },
      age: { score: 0.15, trend: +0.02, status: 'Concerning' },
      socioeconomic: { score: 0.18, trend: -0.05, status: 'Improving' }
    },
    disparities: [
      { group: 'Rural Populations', impact: 'Moderate', trend: 'Improving' },
      { group: 'Elderly Patients (75+)', impact: 'High', trend: 'Stable' },
      { group: 'Non-English Speakers', impact: 'High', trend: 'Improving' },
      { group: 'Low-Income Communities', impact: 'Moderate', trend: 'Improving' }
    ]
  };

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getComplianceColor = (status) => {
    if (status === 'Compliant') return 'text-green-600 bg-green-50';
    if (status === 'Under Review') return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Congressional Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Building size={36} />
                Congressional Healthcare AI Oversight Dashboard
              </h1>
              <p className="text-blue-100 mt-2">Real-time monitoring and governance of healthcare AI systems across the United States</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">Committee: {congressionalCommittees.find(c => c.id === selectedCommittee)?.name}</div>
              <div className="text-sm text-blue-200">Chair: {congressionalCommittees.find(c => c.id === selectedCommittee)?.chair}</div>
              <div className="text-sm text-blue-200">Report Period: {selectedTimeframe}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Executive Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Committee:</label>
              <select 
                value={selectedCommittee}
                onChange={(e) => setSelectedCommittee(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                {congressionalCommittees.map(committee => (
                  <option key={committee.id} value={committee.id}>{committee.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Report Period:</label>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="Q2_2025">Q2 2025</option>
                <option value="Q1_2025">Q1 2025</option>
                <option value="Q4_2024">Q4 2024</option>
              </select>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download size={16} />
              Generate Congressional Brief
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Executive Overview', icon: Eye },
                { id: 'systems', label: 'System Portfolio', icon: Database },
                { id: 'compliance', label: 'Compliance Status', icon: Shield },
                { id: 'demographics', label: 'Equity Analysis', icon: Users },
                { id: 'policy', label: 'Policy Impact', icon: Scale },
                { id: 'trends', label: 'Industry Trends', icon: TrendingUp }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Executive Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total AI Systems Monitored', value: industryTrends.totalSystems.toLocaleString(), icon: Database, trend: `+${industryTrends.newDeployments} this quarter` },
                { label: 'Patients Affected', value: `${(industryTrends.patientsAffected / 1000000).toFixed(1)}M`, icon: Users, trend: '+15% from last quarter' },
                { label: 'Average Risk Score', value: `${industryTrends.averageRiskScore}%`, icon: Shield, trend: '+3 points improved' },
                { label: 'Market Value', value: `$${(industryTrends.marketValue / 1000000000).toFixed(1)}B`, icon: DollarSign, trend: `+${industryTrends.growthRate}% YoY growth` }
              ].map((metric, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon size={24} className="text-blue-600" />
                    <span className="text-sm text-green-600">{metric.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Critical Alerts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500" />
                Critical Issues Requiring Congressional Attention
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-red-800">IBM Watson for Oncology - Compliance Violation</h4>
                      <p className="text-red-700 text-sm mt-1">7 critical HIPAA violations detected. 780,000 patients potentially affected.</p>
                      <p className="text-red-600 text-xs mt-2">Last audit: April 10, 2025 | Risk Score: 45% | Status: Non-Compliant</p>
                    </div>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">HIGH PRIORITY</span>
                  </div>
                </div>
                
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-yellow-800">OpenAI Clinical Scribe - FDA Review Pending</h4>
                      <p className="text-yellow-700 text-sm mt-1">3 compliance issues identified. 5.2M patients affected. FDA clearance pending.</p>
                      <p className="text-yellow-600 text-xs mt-2">Deployed at 1,250 sites | Risk Score: 58% | Status: Under Review</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">MEDIUM PRIORITY</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Congressional Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Immediate Congressional Actions Recommended</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-900">Legislative Priorities</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 mt-0.5" />
                      <span>Expedite passage of S 1456 (AI Safety Standards) to address current compliance gaps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 mt-0.5" />
                      <span>Increase FDA funding for AI device review by $150M to reduce approval backlogs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-green-500 mt-0.5" />
                      <span>Mandate quarterly compliance reporting for high-risk healthcare AI systems</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-blue-900">Oversight Activities</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Calendar size={16} className="text-blue-500 mt-0.5" />
                      <span>Schedule hearing with IBM Watson Health leadership within 30 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar size={16} className="text-blue-500 mt-0.5" />
                      <span>Request FDA briefing on OpenAI Clinical Scribe review timeline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar size={16} className="text-blue-500 mt-0.5" />
                      <span>Convene stakeholder roundtable on healthcare AI equity concerns</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Portfolio Tab */}
        {activeTab === 'systems' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Healthcare AI System Portfolio</h3>
              <p className="text-gray-600 mt-1">Comprehensive overview of monitored healthcare AI systems</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deployment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FDA Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {healthcareAISystems.map((system) => (
                    <tr key={system.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{system.name}</div>
                          <div className="text-sm text-gray-500">{system.provider}</div>
                          <div className="text-xs text-gray-400">{system.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{system.deployedSites.toLocaleString()} sites</div>
                        <div className="text-sm text-gray-500">{system.patientsAffected.toLocaleString()} patients</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(system.riskScore)}`}>
                          {system.riskScore}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(system.complianceStatus)}`}>
                          {system.complianceStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {system.fdaStatus}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {system.criticalIssues > 0 ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertTriangle size={12} className="mr-1" />
                            {system.criticalIssues} Critical
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle size={12} className="mr-1" />
                            Clean
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Demographics/Equity Tab */}
        {activeTab === 'demographics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Healthcare AI Equity Analysis</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Bias Metrics by Demographic</h4>
                  <div className="space-y-4">
                    {Object.entries(demographicAnalysis.biasMetrics).map(([category, data]) => (
                      <div key={category} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium capitalize">{category}</span>
                          <span className={`text-sm px-2 py-1 rounded ${
                            data.status === 'Improving' ? 'bg-green-100 text-green-800' :
                            data.status === 'Stable' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {data.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold">{data.score}</div>
                          <div className={`text-sm ${data.trend < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.trend > 0 ? '+' : ''}{data.trend} trend
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Healthcare Access Disparities</h4>
                  <div className="space-y-3">
                    {demographicAnalysis.disparities.map((disparity, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{disparity.group}</div>
                            <div className="text-sm text-gray-600">Impact Level: {disparity.impact}</div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            disparity.trend === 'Improving' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {disparity.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold mb-4">Congressional Action Items - Health Equity</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <h5 className="font-medium text-red-800">Immediate Action Required</h5>
                  <p className="text-sm text-red-700 mt-1">Age bias increasing across elderly patients (75+). Mandate age-inclusive AI testing protocols.</p>
                </div>
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                  <h5 className="font-medium text-yellow-800">Monitor Closely</h5>
                  <p className="text-sm text-yellow-700 mt-1">Non-English speakers still face high disparity. Continue language accessibility initiatives.</p>
                </div>
                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                  <h5 className="font-medium text-green-800">Positive Progress</h5>
                  <p className="text-sm text-green-700 mt-1">Racial and socioeconomic bias metrics improving. Current policies showing effectiveness.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policy Impact Tab */}
        {activeTab === 'policy' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Proposed Legislation Impact Analysis</h3>
              
              <div className="space-y-6">
                {policyImpacts.map((policy) => (
                  <div key={policy.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{policy.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">Status: {policy.status}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{policy.impactScore}%</div>
                        <div className="text-sm text-gray-600">Impact Score</div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-sm text-gray-600">Affected Systems</div>
                        <div className="text-lg font-semibold">{policy.affectedSystems.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-sm text-gray-600">Estimated Cost</div>
                        <div className="text-lg font-semibold">${(policy.estimatedCost / 1000000).toFixed(0)}M</div>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-sm text-gray-600">Implementation</div>
                        <div className="text-lg font-semibold">{policy.implementationTime}</div>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <div className="text-sm text-gray-600">Risk Reduction</div>
                        <div className="text-lg font-semibold text-green-600">-{policy.riskReduction}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold mb-4">Policy Recommendation Summary</h4>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700">
                  Based on current healthcare AI deployment patterns and risk assessment data, <strong>immediate passage of S 1456</strong> 
                  is recommended to address the 7 critical compliance violations currently affecting 780,000 patients. 
                  The legislation would establish mandatory safety standards reducing overall industry risk by an estimated 31%.
                </p>
                <p className="text-gray-700 mt-3">
                  Implementation costs of $680M over 24 months represent just 7.6% of the current healthcare AI market value, 
                  making this a highly cost-effective risk mitigation strategy for Congressional consideration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex flex-wrap gap-4 mt-8 p-6 bg-white rounded-lg shadow-md">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={20} />
            Download Executive Brief (PDF)
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            <FileText size={20} />
            Generate Committee Report
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            <Calendar size={20} />
            Schedule Stakeholder Hearing
          </button>
          <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            <Globe size={20} />
            Share with Committee Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongressionalHealthcareAIDashboard;
