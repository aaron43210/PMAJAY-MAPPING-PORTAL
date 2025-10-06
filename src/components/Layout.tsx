import { ReactNode, useState, useEffect } from 'react';
import { MapPin, RefreshCw, User, Building2, Shield } from 'lucide-react';
import LoginModal from './LoginModal';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState<'citizen' | 'agency' | 'admin'>('citizen');
  const [currentTime, setCurrentTime] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = (type: 'citizen' | 'agency' | 'admin') => {
    setLoginType(type);
    setLoginModalOpen(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'mapping', label: 'Mapping' },
    { id: 'map-view', label: 'Map View' },
    { id: 'proposal', label: 'Proposal' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transparency', label: 'Transparency' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'impact', label: 'Impact Metrics' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#1a1a1a] border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-4 gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <MapPin size={32} className="text-blue-500" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-blue-400">PM AJAY-MAP</h1>
                <p className="text-xs text-gray-400">Agency Mapping Portal</p>
              </div>
            </button>

            <div className="flex items-center gap-3 lg:gap-6">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <span className="hidden lg:inline">Updated:</span>
                <span className="font-mono">{currentTime}</span>
                <button
                  onClick={handleRefresh}
                  className={`flex items-center gap-1 hover:text-blue-400 transition-all ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                  disabled={isRefreshing}
                >
                  <RefreshCw size={16} />
                  <span className="hidden lg:inline">Refresh</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLoginClick('citizen')}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm text-gray-300"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">Citizen</span>
                </button>
                <button
                  onClick={() => handleLoginClick('agency')}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm text-gray-300"
                >
                  <Building2 size={16} />
                  <span className="hidden sm:inline">Agency</span>
                </button>
                <button
                  onClick={() => handleLoginClick('admin')}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-sm text-gray-300"
                >
                  <Shield size={16} />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              </div>
            </div>
          </div>

          <nav className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-2 min-w-max">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 lg:px-6 py-8">
        {children}
      </main>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        loginType={loginType}
      />
    </div>
  );
}
