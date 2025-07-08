import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Shield, CheckCircle, FileText, Users, Brain, Database, Download, ExternalLink } from 'lucide-react';

const HealthcareLLMGovernance = () => {
  const [activeTab, setActiveTab] = useState('assessment');
  const [assessmentData, setAssessmentData] = useState({});
  const [complianceResults, setComplianceResults] = useState(null);
  const [riskScore, setRiskScore] = useState(0);

  // Risk Assessment Framework
  const riskCategories = [
    {
      id: 'data_privacy',
      title: 'Data Privacy & Security',
      weight: 0.25,
      questions: [
        { id: 'hipaa_compliance', text: 'Is the LLM fully HIPAA compliant?', type: 'boolean', critical: true },
        { id: 'data_encryption', text: 'Is all PHI encrypted at rest and in transit?', type: 'boolean', critical: true },
        { id: 'access_controls', text: 'Are proper access controls implemented?', type: 'scale', max: 5 },
        { id: 'audit_logging', text: 'Is comprehensive audit logging enabled?', type: 'boolean' }
      ]
    },
    {
      id: 'clinical_safety',
      title: 'Clinical Safety & Efficacy',
      weight: 0.30,
      questions: [
        { id: 'fda_approval', text: 'Does the LLM have appropriate FDA clearance?', type: 'select', options: ['Yes', 'Not Required', 'Pending', 'No'] },
        { id: 'clinical_validation', text: 'Has clinical validation been performed?', type: 'boolean', critical: true },
        { id: 'error_rate', text: 'What is the documented error rate?', type: 'number', unit: '%' },
        { id: 'human_oversight', text: 'Level of required human oversight', type: 'scale', max: 5 }
      ]
    },
    {
      id: 'bias_fairness',
      title: 'Bias & Fairness',
      weight: 0.20,
      questions: [
        { id: 'demographic_testing', text: 'Has the model been tested across demographics?', type: 'boolean' },
        { id: 'bias_mitigation', text: 'Are bias mitigation strategies implemented?', type: 'scale', max: 5 },
        { id: 'fairness_metrics', text: 'Are fairness metrics regularly monitored?', type: 'boolean' },
        { id: 'diverse_training', text: 'Was training data demographically diverse?', type: 'scale', max: 5 }
      ]
    },
    {
      id: 'transparency',
      title: 'Transparency & Explainability',
      weight: 0.15,
      questions: [
        { id: 'model_documentation', text: 'Is model documentation comprehensive?', type: 'scale', max: 5 },
        { id: 'decision_explainability', text: 'Can the model explain its decisions?', type: 'boolean' },
        { id: 'training_data_documented', text: 'Is training data well documented?', type: 'scale', max: 5 },
        { id: 'version_control', text: 'Is model versioning properly managed?', type: 'boolean' }
      ]
    },
    {
      id: 'governance',
      title: 'Governance & Accountability',
      weight: 0.10,
      questions: [
        { id: 'governance_framework', text: 'Is there a formal governance framework?', type: 'boolean' },
        { id: 'incident_response', text: 'Is there an incident response plan?', type: 'boolean', critical: true },
        { id: 'regular_audits', text: 'Are regular audits conducted?', type: 'scale', max: 5 },
        { id: 'stakeholder_engagement', text: 'Level of stakeholder engagement', type: 'scale', max: 5 }
      ]
    }
  ];

  // Compliance Framework
  const complianceFrameworks = [
    {
      id: 'hipaa',
      name: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act',
      requirements: [
        'Administrative Safeguards',
        'Physical Safeguards', 
        'Technical Safeguards',
        'Business Associate Agreements',
        'Breach Notification'
      ]
    },
    {
      id: 'fda',
      name: 'FDA AI/ML Guidelines',
      description: 'FDA Software as Medical Device Guidelines',
      requirements: [
        'Predetermined Change Control Plan',
        'Algorithm Change Protocol',
        'Real-World Performance Monitoring',
        'Risk Categorization',
        'Clinical Evaluation'
      ]
    },
    {
      id: 'nist',
      name: 'NIST AI Risk Management',
      description: 'NIST AI Risk Management Framework',
      requirements: [
        'Governance and Oversight',
        'Risk Assessment',
        'Risk Management',
        'Documentation and Transparency'
      ]
    }
  ];

  // Generate recommendations function
  const generateRecommendations = useCallback((score, criticalIssues) => {
    const recommendations = [];
    
    if (criticalIssues > 0) {
      recommendations.push({
        priority: 'Critical',
        text: `Address ${criticalIssues} critical compliance issues immediately`,
        type: 'error'
      });
    }
    
    if (score < 60) {
      recommendations.push({
        priority: 'High',
        text: 'Overall governance framework needs significant improvement',
        type: 'warning'
      });
    }
    
    if (score < 80) {
      recommendations.push({
        priority: 'Medium',
        text: 'Consider implementing additional safeguards and monitoring',
        type: 'info'
      });
    }
    
    return recommendations;
  }, []);

  // Calculate risk score
  useEffect(() => {
    let totalScore = 0;
    let maxScore = 0;
    let criticalIssues = 0;

    riskCategories.forEach(category => {
      category.questions.forEach(question => {
        const answer = assessmentData[question.id];
        maxScore += category.weight * 100;

        if (answer !== undefined) {
          let questionScore = 0;
          
          switch (question.type) {
            case 'boolean':
              questionScore = answer ? 100 : 0;
              if (question.critical && !answer) criticalIssues++;
              break;
            case 'scale':
              questionScore = (answer / question.max) * 100;
              break;
            case 'select':
              questionScore = question.options.indexOf(answer) === 0 ? 100 : 
                           question.options.indexOf(answer) === 1 ? 75 : 
                           question.options.indexOf(answer) === 2 ? 50 : 0;
              break;
            case 'number':
              questionScore = Math.max(0, 100 - (answer * 10)); // Lower error rate = higher score
              break;
            default:
              questionScore = 0; // Default case for unknown question types
              break;
          }
          
          totalScore += (questionScore * category.weight);
        }
      });
    });

    const finalScore = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    setRiskScore(Math.round(finalScore));
    
    // Update compliance results
    setComplianceResults({
      score: finalScore,
      criticalIssues,
      recommendations: generateRecommendations(finalScore, criticalIssues)
    });
  }, [assessmentData, generateRecommendations]);

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return 'LOW RISK';
    if (score >= 60) return 'MEDIUM RISK';
    return 'HIGH RISK';
  };

  const handleInputChange = (questionId, value) => {
    setAssessmentData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const generateReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      riskScore,
      assessmentData,
      complianceResults,
      recommendations: complianceResults?.recommendations || []
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healthcare-llm-governance-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="text-indigo-600" size={36} />
                Healthcare LLM Governance Toolkit
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive risk assessment and compliance framework for healthcare AI systems</p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getRiskColor(riskScore)}`}>
                {riskScore}%
              </div>
              <div className={`text-sm font-semibold ${getRiskColor(riskScore)}`}>
                {getRiskLevel(riskScore)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'assessment', label: 'Risk Assessment', icon: AlertTriangle },
                { id: 'compliance', label: 'Compliance Check', icon: CheckCircle },
                { id: 'monitoring', label: 'Monitoring', icon: Brain },
                { id: 'documentation', label: 'Documentation', icon: FileText }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-indigo-500 text-indigo-600'
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

        {/* Risk Assessment Tab */}
        {activeTab === 'assessment' && (
          <div className="space-y-6">
            {riskCategories.map(category => (
              <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Database size={20} className="text-indigo-600" />
                  {category.title}
                  <span className="text-sm text-gray-500 font-normal">({Math.round(category.weight * 100)}% weight)</span>
                </h3>
                
                <div className="space-y-4">
                  {category.questions.map(question => (
                    <div key={question.id} className="border-l-4 border-gray-200 pl-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {question.text}
                        {question.critical && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {question.type === 'boolean' && (
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={question.id}
                              value="true"
                              checked={assessmentData[question.id] === true}
                              onChange={() => handleInputChange(question.id, true)}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={question.id}
                              value="false"
                              checked={assessmentData[question.id] === false}
                              onChange={() => handleInputChange(question.id, false)}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      )}
                      
                      {question.type === 'scale' && (
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="1"
                            max={question.max}
                            value={assessmentData[question.id] || 1}
                            onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>1 (Poor)</span>
                            <span className="font-medium">
                              Current: {assessmentData[question.id] || 1}
                            </span>
                            <span>{question.max} (Excellent)</span>
                          </div>
                        </div>
                      )}
                      
                      {question.type === 'select' && (
                        <select
                          value={assessmentData[question.id] || ''}
                          onChange={(e) => handleInputChange(question.id, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="">Select...</option>
                          {question.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      
                      {question.type === 'number' && (
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={assessmentData[question.id] || ''}
                          onChange={(e) => handleInputChange(question.id, parseFloat(e.target.value) || 0)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder={question.unit ? `Enter value in ${question.unit}` : 'Enter value'}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Compliance Check Tab */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Regulatory Compliance Overview</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {complianceFrameworks.map(framework => (
                  <div key={framework.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">{framework.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{framework.description}</p>
                    
                    <div className="space-y-2">
                      {framework.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle size={16} className="text-green-500" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {complianceResults && complianceResults.recommendations.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance Recommendations</h3>
                
                <div className="space-y-3">
                  {complianceResults.recommendations.map((rec, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg ${
                      rec.type === 'error' ? 'bg-red-50 border border-red-200' :
                      rec.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      <AlertTriangle size={20} className={
                        rec.type === 'error' ? 'text-red-500' :
                        rec.type === 'warning' ? 'text-yellow-500' :
                        'text-blue-500'
                      } />
                      <div>
                        <div className="font-medium">{rec.priority} Priority</div>
                        <div className="text-sm text-gray-700">{rec.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!complianceResults || complianceResults.recommendations.length === 0) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Risk Assessment</h3>
                  <p className="text-gray-600">Fill out the risk assessment to see compliance recommendations.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Continuous Monitoring Dashboard</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Model Performance', value: '94.2%', trend: '+1.2%', color: 'green' },
                { label: 'Bias Score', value: '0.15', trend: '-0.03', color: 'green' },
                { label: 'Uptime', value: '99.9%', trend: '0%', color: 'green' },
                { label: 'Privacy Incidents', value: '0', trend: '0', color: 'green' }
              ].map((metric, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">{metric.label}</div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`text-sm ${metric.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Recent Alerts</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle size={20} className="text-green-500" />
                  <span className="text-sm">All systems operational - No issues detected</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documentation Tab */}
        {activeTab === 'documentation' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Documentation & Resources</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Governance Documents</h4>
                  <div className="space-y-3">
                    {[
                      'AI Ethics Framework',
                      'Data Privacy Policy',
                      'Incident Response Plan',
                      'Audit Procedures',
                      'Stakeholder Guidelines'
                    ].map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <FileText size={20} className="text-indigo-600" />
                        <span>{doc}</span>
                        <ExternalLink size={16} className="text-gray-400 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Regulatory Resources</h4>
                  <div className="space-y-3">
                    {[
                      'HIPAA Compliance Checklist',
                      'FDA AI/ML Guidance',
                      'NIST AI Risk Framework',
                      'ONC Health IT Standards',
                      'CMS Innovation Guidelines'
                    ].map((resource, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <FileText size={20} className="text-indigo-600" />
                        <span>{resource}</span>
                        <ExternalLink size={16} className="text-gray-400 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={generateReport}
            disabled={Object.keys(assessmentData).length === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              Object.keys(assessmentData).length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <Download size={20} />
            Generate Report
          </button>
          <button 
            disabled={Object.keys(assessmentData).length === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              Object.keys(assessmentData).length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Users size={20} />
            Share Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthcareLLMGovernance;
