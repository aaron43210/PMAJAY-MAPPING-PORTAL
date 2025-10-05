import { useState } from 'react';
import { MessageCircle, X, Send, Globe } from 'lucide-react';
import { states, districts, villages, projects, agencies } from '../data/indiaData';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([{
    role: 'bot',
    content: language === 'en' ? 'Hello! I am AJAY AI Assistant. I can help you with PM-AJAY projects information.' : 'नमस्ते! मैं AJAY AI सहायक हूं।',
  }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages([...messages, { role: 'user', content: userMessage }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: 'I can help you find projects, agencies, and more!' }]);
    }, 500);
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center transition-all z-50">
          <MessageCircle size={24} className="text-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-[#262626] rounded-xl shadow-2xl border border-gray-200 dark:border-[#404040] flex flex-col z-50">
          <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-white" />
              <div><h3 className="text-white font-semibold text-sm">AJAY AI Assistant</h3></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="p-1.5 hover:bg-blue-700 dark:hover:bg-blue-600 rounded transition-colors">
                <Globe size={18} className="text-white" />
              </button>
              <button onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-blue-700 dark:hover:bg-blue-600 rounded transition-colors">
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  message.role === 'user'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-[#303030] text-gray-900 dark:text-gray-100'
                }`}>{message.content}</div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-[#404040]">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={language === 'en' ? 'Type your question...' : 'प्रश्न टाइप करें...'}
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-[#303030] border border-gray-300 dark:border-[#404040] rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={handleSend}
                className="p-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
