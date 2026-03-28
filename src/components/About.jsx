/**
 * About Page Component
 * Smart Email Triage System - About page with project information
 */
function About() {
  const steps = [
    {
      icon: '📩',
      title: 'Input Email',
      description: 'User pastes or uploads emails (CSV supported)',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      shadowColor: 'shadow-purple-500/20'
    },
    {
      icon: '🧠',
      title: 'Smart Processing',
      description: 'System analyzes context using AI + logic engine',
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-500/30',
      shadowColor: 'shadow-pink-500/20'
    },
    {
      icon: '🏷',
      title: 'Classification',
      description: 'Email categorized into correct department',
      color: 'from-orange-500 to-amber-500',
      borderColor: 'border-orange-500/30',
      shadowColor: 'shadow-orange-500/20'
    },
    {
      icon: '📊',
      title: 'Results',
      description: 'Shows category, priority, confidence & explanation',
      color: 'from-emerald-500 to-green-500',
      borderColor: 'border-emerald-500/30',
      shadowColor: 'shadow-emerald-500/20'
    }
  ];

  const features = [
    { name: 'Bulk Email Upload', icon: '📁', badge: 'badge-technical' },
    { name: 'Real-time Classification', icon: '⚡', badge: 'badge-promotional' },
    { name: 'High Accuracy Engine', icon: '🎯', badge: 'badge-finance' },
    { name: 'Dashboard Analytics', icon: '📈', badge: 'badge-support' },
    { name: 'Secure Processing', icon: '🔒', badge: 'badge-spam' }
  ];

  const techStack = [
    { name: 'React', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-500 to-teal-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { name: 'AI Integration', icon: '🤖', color: 'from-purple-500 to-pink-500' }
  ];

  const team = [
    {
      name: 'Rahul Kumar',
      role: 'Frontend & AI Integration',
      avatar: '👨‍💻',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Vivek Kumar',
      role: 'Backend Development',
      avatar: '👩‍💻',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Vishal kumar',
      role: 'UI/UX Design',
      avatar: '👨‍🎨',
      color: 'from-orange-500 to-amber-500'
    },
    {
      name: 'Niranjan Kumar',
      role: 'Quality Assurance',
      avatar: '👩‍🔬',
      color: 'from-emerald-500 to-green-500'
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 relative">
        {/* Glow effect behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            About Mail-Shield
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI-powered system for intelligent email classification and prioritization
          </p>
        </div>
      </section>

      {/* About Description - Glass Card */}
      <section className="card-gradient max-w-4xl mx-auto">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What is Mail-Shield?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This system helps users automatically classify emails into categories such as Technical, Finance, HR, Spam, and Marketing using intelligent logic and AI-powered processing.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            How It Works 🔥
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Four simple steps to intelligent email classification
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`card-gradient group hover:scale-105 transition-all duration-300 hover:shadow-2xl ${step.borderColor} hover:border-opacity-50`}
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg ${step.shadowColor} group-hover:animate-pulse-slow`}>
                {step.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 text-center">{step.title}</h3>
              <p className="text-gray-400 text-center text-sm">{step.description}</p>
              
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Key Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powerful capabilities for efficient email management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-gradient group hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-2xl border border-purple-500/30 group-hover:animate-bounce-subtle">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                  <span className={`badge ${feature.badge} mt-2`}>
                    Feature
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with modern technologies
          </p>
        </div>

        <div className="card-gradient max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:animate-pulse-slow`}>
                  {tech.icon}
                </div>
                <span className="text-white font-semibold text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The talented people behind this project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="card-gradient group hover:scale-105 transition-all duration-300 hover:shadow-2xl text-center"
            >
              {/* Avatar */}
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-4xl shadow-lg group-hover:animate-float`}>
                {member.avatar}
              </div>
              
              {/* Info */}
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-gray-400 text-sm">{member.role}</p>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Line */}
      <section className="text-center py-8">
        <p className="text-2xl font-semibold gradient-text">
          Built with passion and innovation 🚀
        </p>
      </section>
    </div>
  );
}

export default About;
