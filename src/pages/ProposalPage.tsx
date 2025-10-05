import { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, FileText } from 'lucide-react';
import { states, districts, villages, agencies, components } from '../data/indiaData';

export default function ProposalPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    stateId: '',
    districtId: '',
    villageId: '',
    component: '',
    agencyId: '',
    description: '',
    fundsRequested: '',
    startDate: '',
    endDate: '',
    beneficiaries: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredDistricts = districts.filter(d => d.stateId === formData.stateId);
  const filteredVillages = villages.filter(v => v.districtId === formData.districtId);

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const steps = [
    { number: 1, title: 'Location' },
    { number: 2, title: 'Project Details' },
    { number: 3, title: 'Budget & Timeline' },
    { number: 4, title: 'Review & Submit' },
  ];

  if (submitted) {
    const state = states.find(s => s.id === formData.stateId);
    const district = districts.find(d => d.id === formData.districtId);
    const village = villages.find(v => v.id === formData.villageId);
    const agency = agencies.find(a => a.id === formData.agencyId);

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-8 border border-green-800/50 text-center">
          <CheckCircle size={64} className="mx-auto text-green-400 mb-4" />
          <h1 className="text-3xl font-bold text-green-400 mb-2">Proposal Submitted Successfully!</h1>
          <p className="text-gray-300 mb-4">Your proposal has been received and is under review</p>
          <div className="inline-block bg-gray-800 border border-gray-700 rounded-lg px-6 py-3">
            <p className="text-sm text-gray-400">Proposal ID</p>
            <p className="text-2xl font-bold text-blue-400">PMAJAY-2024-{Math.floor(Math.random() * 10000)}</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <FileText size={24} />
            Proposal Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">State</p>
                <p className="text-white font-medium">{state?.name}</p>
              </div>
              <div>
                <p className="text-gray-400">District</p>
                <p className="text-white font-medium">{district?.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Village</p>
                <p className="text-white font-medium">{village?.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Component</p>
                <p className="text-white font-medium">{formData.component}</p>
              </div>
              <div>
                <p className="text-gray-400">Implementing Agency</p>
                <p className="text-white font-medium">{agency?.name}</p>
              </div>
              <div>
                <p className="text-gray-400">Funds Requested</p>
                <p className="text-white font-medium">₹{parseInt(formData.fundsRequested).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Timeline</p>
                <p className="text-white font-medium">{formData.startDate} to {formData.endDate}</p>
              </div>
              <div>
                <p className="text-gray-400">Beneficiaries</p>
                <p className="text-white font-medium">{formData.beneficiaries} people</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Description</p>
              <p className="text-white">{formData.description}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setCurrentStep(1);
            setFormData({
              stateId: '',
              districtId: '',
              villageId: '',
              component: '',
              agencyId: '',
              description: '',
              fundsRequested: '',
              startDate: '',
              endDate: '',
              beneficiaries: '',
            });
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
        >
          Submit Another Proposal
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Submit New Proposal</h1>
        <p className="text-gray-400">Create a new PM-AJAY project proposal</p>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step.number}
                </div>
                <p className={`text-sm mt-2 ${currentStep >= step.number ? 'text-white' : 'text-gray-400'}`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="min-h-96">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Select Location</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">State *</label>
                <select
                  value={formData.stateId}
                  onChange={(e) => setFormData({ ...formData, stateId: e.target.value, districtId: '', villageId: '' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">District *</label>
                <select
                  value={formData.districtId}
                  onChange={(e) => setFormData({ ...formData, districtId: e.target.value, villageId: '' })}
                  disabled={!formData.stateId}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map(district => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Village *</label>
                <select
                  value={formData.villageId}
                  onChange={(e) => setFormData({ ...formData, villageId: e.target.value })}
                  disabled={!formData.districtId}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                >
                  <option value="">Select Village</option>
                  {filteredVillages.map(village => (
                    <option key={village.id} value={village.id}>{village.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Project Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Component *</label>
                <select
                  value={formData.component}
                  onChange={(e) => setFormData({ ...formData, component: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Component</option>
                  {components.map(comp => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Implementing Agency *</label>
                <select
                  value={formData.agencyId}
                  onChange={(e) => setFormData({ ...formData, agencyId: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select Agency</option>
                  {agencies.map(agency => (
                    <option key={agency.id} value={agency.id}>{agency.name} ({agency.type})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Describe the project objectives, activities, and expected outcomes..."
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Budget & Timeline</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Funds Requested (₹) *</label>
                <input
                  type="number"
                  value={formData.fundsRequested}
                  onChange={(e) => setFormData({ ...formData, fundsRequested: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter amount in rupees"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Expected Beneficiaries *</label>
                <input
                  type="number"
                  value={formData.beneficiaries}
                  onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Number of people who will benefit"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Review Your Proposal</h2>
              <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">State</p>
                    <p className="text-white">{states.find(s => s.id === formData.stateId)?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">District</p>
                    <p className="text-white">{districts.find(d => d.id === formData.districtId)?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Village</p>
                    <p className="text-white">{villages.find(v => v.id === formData.villageId)?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Component</p>
                    <p className="text-white">{formData.component}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Implementing Agency</p>
                    <p className="text-white">{agencies.find(a => a.id === formData.agencyId)?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Funds Requested</p>
                    <p className="text-white">₹{parseInt(formData.fundsRequested || '0').toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Timeline</p>
                    <p className="text-white">{formData.startDate} to {formData.endDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Beneficiaries</p>
                    <p className="text-white">{formData.beneficiaries}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">Description</p>
                  <p className="text-white text-sm">{formData.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
            >
              Submit Proposal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
