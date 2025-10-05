import { MapPin, FileText, Map, BarChart3, Users, Briefcase } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      id: 'mapping',
      icon: FileText,
      iconColor: 'text-blue-500',
      title: 'Agency Mapping',
      description: 'Detailed mapping of agencies, components, and fund allocation',
      buttonText: 'View Mapping',
      buttonVariant: 'primary' as const,
    },
    {
      id: 'map-view',
      icon: MapPin,
      iconColor: 'text-blue-500',
      title: 'Interactive Map',
      description: 'Real-time projects mapped across India with OpenStreetMap',
      buttonText: 'View Map',
      buttonVariant: 'primary' as const,
    },
    {
      id: 'proposal',
      icon: Briefcase,
      iconColor: 'text-yellow-500',
      title: 'Create Proposal',
      description: 'Submit project proposals with step-by-step wizard',
      buttonText: 'Create Proposal',
      buttonVariant: 'secondary' as const,
    },
    {
      id: 'dashboard',
      icon: BarChart3,
      iconColor: 'text-blue-500',
      title: 'Dashboard',
      description: 'Interactive analytics with real-time KPIs and performance',
      buttonText: 'View Dashboard',
      buttonVariant: 'primary' as const,
    },
    {
      id: 'transparency',
      icon: Users,
      iconColor: 'text-green-500',
      title: 'Public Portal',
      description: 'Citizen transparency, grievance tracking, and community impact',
      buttonText: 'Public Portal',
      buttonVariant: 'secondary' as const,
    },
    {
      id: 'about',
      icon: Briefcase,
      iconColor: 'text-yellow-500',
      title: 'About PM-AJAY',
      description: 'Learn about components, objectives, and data sources',
      buttonText: 'Learn More',
      buttonVariant: 'secondary' as const,
    },
  ];

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="text-center space-y-6 lg:space-y-8 py-8 lg:py-16">
        <div className="flex justify-center mb-6 lg:mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <MapPin size={80} className="lg:hidden text-blue-500 relative" strokeWidth={1.5} />
            <MapPin size={120} className="hidden lg:block text-blue-500 relative" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400">
          AJAY-MAP
        </h1>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-yellow-400 px-4">
          Agency Mapping & Monitoring Portal
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
          Bringing transparency, clarity, and accountability to PM-AJAY implementation across India
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 pt-4 lg:pt-6 px-4">
          <button
            onClick={() => onNavigate('map-view')}
            className="px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-900/50 text-sm lg:text-base"
          >
            View Map
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 lg:px-8 py-3 lg:py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all text-sm lg:text-base"
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('proposal')}
            className="px-6 lg:px-8 py-3 lg:py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all text-sm lg:text-base"
          >
            Create Proposal
          </button>
          <button
            onClick={() => onNavigate('transparency')}
            className="px-6 lg:px-8 py-3 lg:py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all text-sm lg:text-base whitespace-nowrap"
          >
            Transparency Portal
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8 text-center px-4">
          Explore the Portal
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-[#1a1a1a] rounded-xl p-6 lg:p-8 border border-gray-800 hover:border-gray-700 transition-all hover:shadow-xl"
              >
                <div className="space-y-3 lg:space-y-4">
                  <div className={`p-2.5 lg:p-3 bg-gray-900 rounded-lg w-fit ${feature.iconColor}`}>
                    <Icon size={24} className="lg:w-7 lg:h-7" />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="text-sm lg:text-base text-gray-400 leading-relaxed min-h-[44px] lg:min-h-[48px]">
                    {feature.description}
                  </p>

                  <button
                    onClick={() => onNavigate(feature.id)}
                    className={`w-full py-2.5 lg:py-3 rounded-lg font-semibold transition-all text-sm lg:text-base ${
                      feature.buttonVariant === 'primary'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/30'
                        : 'bg-transparent border border-gray-700 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {feature.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
