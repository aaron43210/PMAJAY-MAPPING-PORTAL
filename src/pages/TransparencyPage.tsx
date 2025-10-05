import { useState } from 'react';
import { Search, Send, CheckCircle } from 'lucide-react';
import { projects, states, districts, villages, agencies } from '../data/indiaData';

export default function TransparencyPage() {
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchVillage, setSearchVillage] = useState('');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [grievanceForm, setGrievanceForm] = useState({
    name: '',
    email: '',
    phone: '',
    districtId: '',
    villageId: '',
    description: '',
  });

  const searchResults = projects.filter(project => {
    const matchesDistrict = !searchDistrict || project.districtId === searchDistrict;
    const matchesVillage = !searchVillage || project.villageId === searchVillage;
    return matchesDistrict && matchesVillage;
  });

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicketId = `PMAJAY-GRIEV-${Math.floor(Math.random() * 100000)}`;
    setTicketId(newTicketId);
    setGrievanceSubmitted(true);
  };

  const impactStories = [
    {
      title: 'Skill Development Success in Yelahanka',
      description: 'Over 450 youth trained in IT skills, 80% now employed in tech sector',
      village: 'Yelahanka, Bangalore Urban',
      date: 'March 2024',
    },
    {
      title: 'Infrastructure Transformation in Kurla',
      description: 'Complete drainage and road connectivity improved quality of life for 2,500 residents',
      village: 'Kurla, Mumbai',
      date: 'February 2024',
    },
    {
      title: 'Women Empowerment in Amber',
      description: 'Self-help groups established, 350 women now self-employed in handicrafts',
      village: 'Amber, Jaipur',
      date: 'January 2024',
    },
  ];

  const filteredDistricts = districts.filter(d => d.stateId === grievanceForm.districtId || searchDistrict);
  const filteredVillages = villages.filter(v => v.districtId === (grievanceForm.districtId || searchDistrict));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Transparency Portal</h1>
        <p className="text-gray-400">Search projects and submit feedback or grievances</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Search size={24} />
            Search Projects
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">District</label>
              <select
                value={searchDistrict}
                onChange={(e) => {
                  setSearchDistrict(e.target.value);
                  setSearchVillage('');
                }}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">All Districts</option>
                {districts.map(district => (
                  <option key={district.id} value={district.id}>{district.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Village</label>
              <select
                value={searchVillage}
                onChange={(e) => setSearchVillage(e.target.value)}
                disabled={!searchDistrict}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
              >
                <option value="">All Villages</option>
                {filteredVillages.map(village => (
                  <option key={village.id} value={village.id}>{village.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Search Results ({searchResults.length} projects)
              </h3>
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map(project => {
                    const state = states.find(s => s.id === project.stateId);
                    const district = districts.find(d => d.id === project.districtId);
                    const village = villages.find(v => v.id === project.villageId);
                    const agency = agencies.find(a => a.id === project.agencyId);

                    return (
                      <div key={project.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                        <p className="text-sm font-medium text-white mb-1">{project.component}</p>
                        <p className="text-xs text-gray-400 mb-2">
                          {village?.name}, {district?.name}, {state?.name}
                        </p>
                        <p className="text-xs text-gray-400 mb-1">Agency: {agency?.name}</p>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded ${
                            project.status === 'completed' ? 'bg-green-600' :
                            project.status === 'ongoing' ? 'bg-blue-600' : 'bg-red-600'
                          } text-white`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-gray-400">
                            ₹{(project.fundsUtilized / 100000).toFixed(1)}L utilized
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  Select district to view projects
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <Send size={24} />
            Submit Grievance or Feedback
          </h2>

          {grievanceSubmitted ? (
            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-800/50 text-center">
              <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-green-400 mb-2">Grievance Submitted</h3>
              <p className="text-gray-300 mb-4">Your grievance has been recorded successfully</p>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-6 py-3 inline-block">
                <p className="text-sm text-gray-400">Ticket ID</p>
                <p className="text-xl font-bold text-blue-400">{ticketId}</p>
              </div>
              <p className="text-sm text-gray-400 mt-4">
                You will receive updates on your registered email
              </p>
              <button
                onClick={() => {
                  setGrievanceSubmitted(false);
                  setGrievanceForm({
                    name: '',
                    email: '',
                    phone: '',
                    districtId: '',
                    villageId: '',
                    description: '',
                  });
                }}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleGrievanceSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={grievanceForm.name}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={grievanceForm.email}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={grievanceForm.phone}
                    onChange={(e) => setGrievanceForm({ ...grievanceForm, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">District *</label>
                <select
                  required
                  value={grievanceForm.districtId}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, districtId: e.target.value, villageId: '' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Village</label>
                <select
                  value={grievanceForm.villageId}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, villageId: e.target.value })}
                  disabled={!grievanceForm.districtId}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  <option value="">Select Village (Optional)</option>
                  {villages.filter(v => v.districtId === grievanceForm.districtId).map(village => (
                    <option key={village.id} value={village.id}>{village.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={grievanceForm.description}
                  onChange={(e) => setGrievanceForm({ ...grievanceForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Describe your grievance or feedback..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Submit Grievance
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Community Impact Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {impactStories.map((story, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-lg p-4 border border-blue-800/50">
              <h3 className="text-lg font-semibold text-white mb-2">{story.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{story.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{story.village}</span>
                <span>{story.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
