import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign, Users, Activity } from 'lucide-react';
import { projects, states, components } from '../data/indiaData';

export default function DashboardPage() {
  const [filterComponent, setFilterComponent] = useState('');
  const [filterState, setFilterState] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesComponent = !filterComponent || project.component === filterComponent;
      const matchesState = !filterState || project.stateId === filterState;
      return matchesComponent && matchesState;
    });
  }, [filterComponent, filterState]);

  const stats = {
    totalProjects: filteredProjects.length,
    totalAllocated: filteredProjects.reduce((sum, p) => sum + p.fundsAllocated, 0),
    totalUtilized: filteredProjects.reduce((sum, p) => sum + p.fundsUtilized, 0),
    totalBeneficiaries: filteredProjects.reduce((sum, p) => sum + p.beneficiaries, 0),
    completedProjects: filteredProjects.filter(p => p.status === 'completed').length,
    ongoingProjects: filteredProjects.filter(p => p.status === 'ongoing').length,
  };

  const componentData = components.map(comp => ({
    name: comp.replace('Yojana', '').replace('Development', 'Dev.').substring(0, 20),
    count: filteredProjects.filter(p => p.component === comp).length,
  }));

  const statePerformance = states
    .map(state => {
      const stateProjects = filteredProjects.filter(p => p.stateId === state.id);
      const allocated = stateProjects.reduce((sum, p) => sum + p.fundsAllocated, 0);
      const utilized = stateProjects.reduce((sum, p) => sum + p.fundsUtilized, 0);
      return {
        name: state.name,
        allocated: allocated / 10000000,
        utilized: utilized / 10000000,
        percentage: allocated > 0 ? (utilized / allocated * 100) : 0,
      };
    })
    .filter(s => s.allocated > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);

  const utilizationRate = stats.totalAllocated > 0
    ? (stats.totalUtilized / stats.totalAllocated * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Comprehensive insights into PM-AJAY project performance</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex gap-4">
          <select
            value={filterComponent}
            onChange={(e) => setFilterComponent(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All Components</option>
            {components.map(comp => (
              <option key={comp} value={comp}>{comp}</option>
            ))}
          </select>
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-6 border border-blue-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="text-blue-400" size={24} />
            <p className="text-sm text-gray-300">Total Projects</p>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalProjects}</p>
          <p className="text-xs text-gray-400 mt-1">
            {stats.completedProjects} completed, {stats.ongoingProjects} ongoing
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-6 border border-green-700/50">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-green-400" size={24} />
            <p className="text-sm text-gray-300">Funds Allocated</p>
          </div>
          <p className="text-3xl font-bold text-white">₹{(stats.totalAllocated / 10000000).toFixed(1)}Cr</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-xl p-6 border border-emerald-700/50">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="text-emerald-400" size={24} />
            <p className="text-sm text-gray-300">Funds Utilized</p>
          </div>
          <p className="text-3xl font-bold text-white">₹{(stats.totalUtilized / 10000000).toFixed(1)}Cr</p>
          <p className="text-xs text-gray-400 mt-1">{utilizationRate}% utilization rate</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-700/50">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-purple-400" size={24} />
            <p className="text-sm text-gray-300">Beneficiaries</p>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalBeneficiaries.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Projects by Component</h3>
          <div className="space-y-3">
            {componentData.map((item, index) => {
              const maxCount = Math.max(...componentData.map(d => d.count));
              const percentage = maxCount > 0 ? (item.count / maxCount * 100) : 0;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-white font-semibold">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">Fund Utilization</h3>
          <div className="relative h-64 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#374151"
                strokeWidth="20"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="20"
                strokeDasharray={`${2 * Math.PI * 80 * parseFloat(utilizationRate) / 100} ${2 * Math.PI * 80}`}
                strokeDashoffset={2 * Math.PI * 80 / 4}
                strokeLinecap="round"
              />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="32"
                fontWeight="bold"
              >
                {utilizationRate}%
              </text>
              <text
                x="100"
                y="115"
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="12"
              >
                Utilized
              </text>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">Allocated</p>
              <p className="text-lg font-semibold text-white">₹{(stats.totalAllocated / 10000000).toFixed(1)}Cr</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Utilized</p>
              <p className="text-lg font-semibold text-white">₹{(stats.totalUtilized / 10000000).toFixed(1)}Cr</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">Top Performing States</h3>
        <div className="space-y-3">
          {statePerformance.map((state, index) => (
            <div key={index} className="bg-gray-750 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{state.name}</p>
                    <p className="text-xs text-gray-400">
                      ₹{state.utilized.toFixed(1)}Cr / ₹{state.allocated.toFixed(1)}Cr
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">{state.percentage.toFixed(0)}%</p>
                  <p className="text-xs text-gray-400">Utilization</p>
                </div>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                  style={{ width: `${state.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-xl p-6 border border-blue-800/50">
        <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
          <TrendingUp size={20} />
          AI-Generated Summary
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Analysis shows strong project implementation with {utilizationRate}% fund utilization rate across {stats.totalProjects} projects.
          {statePerformance.length > 0 && ` ${statePerformance[0].name} leads with ${statePerformance[0].percentage.toFixed(0)}% utilization,
          demonstrating effective project execution with ₹${statePerformance[0].utilized.toFixed(1)}Cr deployed.`}
          {' '}The program has reached {stats.totalBeneficiaries.toLocaleString()} beneficiaries,
          with {stats.completedProjects} projects successfully completed. Continued monitoring recommended for {stats.ongoingProjects} ongoing initiatives.
        </p>
      </div>
    </div>
  );
}
