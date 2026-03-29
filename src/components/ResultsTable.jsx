import React, { useState } from 'react';
import ExplanationCard from './ExplanationCard';

/**
 * ResultsTable Component
 * Displays classification results in a table format with colored badges and explanations
 */
const ResultsTable = ({ results, title = "Classification Results" }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  if (!results || results.length === 0) {
    return null;
  }

  /**
   * Get badge class based on category
   */
  const getCategoryBadge = (category) => {
    const badges = {
      Finance: 'badge-finance',
      Technical: 'badge-technical',
      Spam: 'badge-spam',
      Support: 'badge-support',
      'Promotional / Marketing': 'badge-promotional',
    };
    return badges[category] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
  };

  /**
   * Get badge class based on priority
   */
  const getPriorityBadge = (priority) => {
    const badges = {
      High: 'badge-high',
      Medium: 'badge-medium',
      Low: 'badge-low',
    };
    return badges[priority] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
  };

  /**
   * Truncate text to specified length
   */
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  /**
   * Toggle row expansion
   */
  const toggleRowExpansion = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="card-gradient animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 md:mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30"></div>
            <div className="relative p-2.5 md:p-3 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl shadow-lg">
              <svg className="w-5 h-5 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-200">{title}</h2>
            <p className="text-gray-400 mt-0.5 md:mt-1 text-sm md:text-base">{results.length} email{results.length !== 1 ? 's' : ''} classified</p>
          </div>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-white/10 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left py-4 px-5 text-sm font-bold text-gray-300 uppercase tracking-wider">Email Content</th>
                <th className="text-left py-4 px-5 text-sm font-bold text-gray-300 uppercase tracking-wider">Category</th>
                <th className="text-left py-4 px-5 text-sm font-bold text-gray-300 uppercase tracking-wider">Priority</th>
                <th className="text-left py-4 px-5 text-sm font-bold text-gray-300 uppercase tracking-wider">Department</th>
                <th className="text-left py-4 px-5 text-sm font-bold text-gray-300 uppercase tracking-wider">Confidence</th>
                <th className="text-left py-4 px-5 text-sm font-bold text-gray-300 uppercase tracking-wider">Action</th>
                <th className="text-left py-4 px-5 text-sm font-bold text-gray-300 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {results.map((result, index) => (
                <React.Fragment key={result.id || index}>
                  <tr 
                    className="hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    onClick={() => toggleRowExpansion(index)}
                  >
                    <td className="py-4 px-5">
                      <div className="max-w-md">
                        <p className="text-sm text-gray-200 font-medium">
                          {truncateText(result.originalEmail || result.text || 'N/A')}
                        </p>
                        {result.reply && (
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                            <span className="font-semibold text-purple-400">Reply:</span> {truncateText(result.reply, 80)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`badge ${getCategoryBadge(result.category)}`}>
                        {result.category}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`badge ${getPriorityBadge(result.priority)}`}>
                        {result.priority}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="text-sm text-gray-300 font-medium">{result.department}</span>
                    </td>
                    <td className="py-4 px-5">
                      {result.confidence !== undefined ? (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                              style={{ width: `${result.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-300 min-w-[40px]">{result.confidence}%</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      {result.action ? (
                        <span className="text-sm text-gray-300 font-medium">{result.action}</span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 px-5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRowExpansion(index);
                        }}
                        className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200"
                        title={expandedRow === index ? "Hide explanation" : "Show explanation"}
                      >
                        <svg 
                          className={`w-5 h-5 transition-transform duration-200 ${expandedRow === index ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded explanation row */}
                  {expandedRow === index && result.explanation && (
                    <tr>
                      <td colSpan="7" className="p-0">
                        <div className="px-5 pb-5 animate-slide-up">
                          <ExplanationCard 
                            explanation={result.explanation}
                            category={result.category}
                            priority={result.priority}
                            confidence={result.confidence}
                            action={result.action}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {results.map((result, index) => (
          <div 
            key={result.id || index}
            className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
          >
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleRowExpansion(index)}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-200 font-medium line-clamp-2">
                    {result.originalEmail || result.text || 'N/A'}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRowExpansion(index);
                  }}
                  className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-all duration-200 flex-shrink-0"
                >
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${expandedRow === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`badge text-xs ${getCategoryBadge(result.category)}`}>
                  {result.category}
                </span>
                <span className={`badge text-xs ${getPriorityBadge(result.priority)}`}>
                  {result.priority}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Department:</span>
                  <span className="text-gray-300 ml-1">{result.department}</span>
                </div>
                {result.confidence !== undefined && (
                  <div>
                    <span className="text-gray-500">Confidence:</span>
                    <span className="text-gray-300 ml-1">{result.confidence}%</span>
                  </div>
                )}
                {result.action && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Action:</span>
                    <span className="text-gray-300 ml-1">{result.action}</span>
                  </div>
                )}
              </div>
              
              {result.reply && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-xs text-gray-400">
                    <span className="font-semibold text-purple-400">Reply:</span> {truncateText(result.reply, 100)}
                  </p>
                </div>
              )}
            </div>
            
            {/* Expanded explanation */}
            {expandedRow === index && result.explanation && (
              <div className="px-4 pb-4 animate-slide-up">
                <ExplanationCard 
                  explanation={result.explanation}
                  category={result.category}
                  priority={result.priority}
                  confidence={result.confidence}
                  action={result.action}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10">
            <p className="text-2xl md:text-3xl font-bold gradient-text">{results.length}</p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Total Emails</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/20">
            <p className="text-2xl md:text-3xl font-bold text-emerald-400">
              {results.filter(r => r.category === 'Finance').length}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Finance</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">
              {results.filter(r => r.category === 'Technical').length}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Technical</p>
          </div>
          <div className="text-center p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-xl border border-red-500/20">
            <p className="text-2xl md:text-3xl font-bold text-red-400">
              {results.filter(r => r.priority === 'High').length}
            </p>
            <p className="text-xs md:text-sm text-gray-400 mt-1">High Priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
