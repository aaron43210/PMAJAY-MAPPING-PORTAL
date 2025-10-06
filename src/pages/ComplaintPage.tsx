import { useState } from 'react';
import { AlertCircle, CheckCircle, FileText, Send } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { states } from '../data/indiaData';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function ComplaintPage() {
  const [formData, setFormData] = useState({
    citizenName: '',
    citizenEmail: '',
    citizenPhone: '',
    state: '',
    district: '',
    complaintType: '',
    projectRelated: false,
    projectName: '',
    subject: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const complaintTypes = [
    'Fund Misappropriation',
    'Project Delay',
    'Poor Quality Work',
    'Corruption',
    'Lack of Transparency',
    'Discrimination',
    'Incomplete Project',
    'Non-Receipt of Benefits',
    'Other',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateTicketId = () => {
    return `PMAJAY-COMP-${Math.floor(10000 + Math.random() * 90000)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const newTicketId = generateTicketId();

      const { error } = await supabase
        .from('complaints')
        .insert({
          ticket_id: newTicketId,
          citizen_name: formData.citizenName,
          citizen_email: formData.citizenEmail,
          citizen_phone: formData.citizenPhone,
          state: formData.state,
          district: formData.district,
          complaint_type: formData.complaintType,
          project_related: formData.projectRelated,
          project_name: formData.projectName || null,
          subject: formData.subject,
          description: formData.description,
          status: 'pending',
          priority: 'medium',
        });

      if (error) throw error;

      setTicketId(newTicketId);
      setSubmitStatus('success');
      setFormData({
        citizenName: '',
        citizenEmail: '',
        citizenPhone: '',
        state: '',
        district: '',
        complaintType: '',
        projectRelated: false,
        projectName: '',
        subject: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit complaint. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">File a Complaint</h1>
        <p className="text-gray-400">Report issues or concerns related to PM-AJAY projects and implementation</p>
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-900/20 border border-green-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <CheckCircle size={24} className="text-green-500 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Complaint Submitted Successfully!</h3>
              <p className="text-gray-300 mb-3">
                Your complaint has been registered. Please save your ticket ID for future reference.
              </p>
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-green-700">
                <p className="text-sm text-gray-400 mb-1">Your Ticket ID:</p>
                <p className="text-2xl font-bold text-green-400">{ticketId}</p>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                You will receive updates on your complaint via email at <span className="text-blue-400">{formData.citizenEmail}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Submission Failed</h3>
              <p className="text-gray-300">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="citizenName"
              value={formData.citizenName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="citizenEmail"
              value={formData.citizenEmail}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="citizenPhone"
              value={formData.citizenPhone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              District <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter district name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Complaint Type <span className="text-red-500">*</span>
            </label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Type</option>
              {complaintTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="projectRelated"
            checked={formData.projectRelated}
            onChange={handleInputChange}
            className="w-5 h-5 rounded border-gray-700 bg-[#0a0a0a] text-blue-600 focus:ring-2 focus:ring-blue-500"
            id="projectRelated"
          />
          <label htmlFor="projectRelated" className="text-sm text-gray-300 cursor-pointer">
            This complaint is related to a specific project
          </label>
        </div>

        {formData.projectRelated && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project name or ID"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief summary of your complaint"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Provide detailed information about your complaint..."
          />
          <p className="text-xs text-gray-500 mt-2">
            Please include relevant details such as dates, names, and specific incidents
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FileText size={16} />
            <span>All fields marked with * are required</span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Submit Complaint</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-3">Important Information</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Your complaint will be reviewed within 48 hours</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>You will receive email updates on the status of your complaint</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Keep your ticket ID safe for tracking purposes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>For urgent matters, you can also contact the helpline: 1800-XXX-XXXX</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
