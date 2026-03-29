/**
 * ExplanationCard Component
 * Displays AI classification explanation in a clean, modern card format
 */
const ExplanationCard = ({ explanation, category, priority, confidence, action }) => {
  if (!explanation) return null;

  /**
   * Get color scheme based on category
   */
  const getCategoryColors = () => {
    const colors = {
      Finance: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        icon: 'text-emerald-400',
        badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
      },
      Technical: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        icon: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
      },
      Spam: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        icon: 'text-red-400',
        badge: 'bg-red-500/20 text-red-400 border border-red-500/30'
      },
      Support: {
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        icon: 'text-amber-400',
        badge: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
      },
      'Promotional / Marketing': {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        icon: 'text-purple-400',
        badge: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
      }
    };
    return colors[category] || colors.Support;
  };

  /**
   * Get priority color scheme
   */
  const getPriorityColors = () => {
    const colors = {
      High: 'bg-red-500/20 text-red-400 border border-red-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
      Low: 'bg-green-500/20 text-green-400 border border-green-500/30'
    };
    return colors[priority] || colors.Low;
  };

  const categoryColors = getCategoryColors();

  return (
    <div className={`card-gradient animate-fade-in ${categoryColors.bg} ${categoryColors.border} border-2`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`p-3 rounded-xl ${categoryColors.bg} ${categoryColors.border} border`}>
          <svg className={`w-7 h-7 ${categoryColors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-200">AI Classification Explanation</h2>
          <p className="text-sm text-gray-400 mt-1">Understanding why this classification was made</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-5">
        <span className={`badge ${categoryColors.badge}`}>
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {category}
        </span>
        <span className={`badge ${getPriorityColors()}`}>
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {priority} Priority
        </span>
        {confidence !== undefined && (
          <span className="badge bg-gray-500/20 text-gray-400 border border-gray-500/30">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {confidence}% Confidence
          </span>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Why this classification?</h3>
            <p className="text-gray-400 leading-relaxed">{explanation}</p>
          </div>
        </div>
      </div>

      {/* Suggested Action */}
      {action && (
        <div className="mt-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-5 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Suggested Action</h3>
              <p className="text-gray-400 leading-relaxed">{action}</p>
            </div>
          </div>
        </div>
      )}

      {/* Keywords breakdown */}
      <div className="mt-5 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 backdrop-blur-sm">
        <h3 className="text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          How it works
        </h3>
        <p className="text-sm text-purple-200 leading-relaxed">
          The AI analyzes your email content for specific keywords and patterns. It looks for category-specific terms 
          (like "invoice" for Finance or "bug" for Technical) and priority indicators (like "urgent" or "asap") 
          to determine the most appropriate classification and routing.
        </p>
      </div>
    </div>
  );
};

export default ExplanationCard;
