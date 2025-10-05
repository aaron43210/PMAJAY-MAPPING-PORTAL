import { X, Target } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  loginType: 'citizen' | 'agency' | 'admin';
}

export default function LoginModal({ isOpen, onClose, loginType }: LoginModalProps) {
  if (!isOpen) return null;

  const titles = {
    citizen: 'Citizen Login',
    agency: 'Agency Login',
    admin: 'Admin Login',
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full p-8 relative border border-gray-800 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-400" />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-800 rounded-lg">
              <Target size={24} className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-white">{titles[loginType]}</h2>
          </div>

          <p className="text-gray-400 text-lg">
            This is a demonstration portal for Smart India Hackathon 2025
          </p>

          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-700/30 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <Target size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
              <h3 className="text-xl font-semibold text-yellow-500">Demo Access Mode</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              All features are accessible without authentication for demonstration purposes.
              No login credentials required.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-900/50"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
