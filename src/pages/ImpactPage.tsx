import { useState } from 'react';
import { TrendingUp, Users, Target, Award } from 'lucide-react';
import { projects, villages, components, states } from '../data/indiaData';

export default function ImpactPage() {
  const [filterComponent, setFilterComponent] = useState('');

  const filteredProjects = filterComponent
    ? projects.filter(p => p.component === filterComponent)
    : projects;

  const metrics = {
    villagesCovered: new Set(filteredProjects.map(p => p.villageId)).size,
    totalBeneficiaries: filteredProjects.reduce((sum, p) => sum + p.beneficiaries, 0),
    utilizationRate: (() => {
      const allocated = filteredProjects.reduce((sum, p) => sum + p.fundsAllocated, 0);
      const utilized = filteredProjects.reduce((sum, p) => sum + p.fundsUtilized, 0);
      return allocated > 0 ? (utilized / allocated * 100) : 0;
    })(),
    completedProjects: filteredProjects.filter(p => p.status === 'completed').length,
  };

  const componentMetrics = components.map(comp => {
    const compProjects = projects.filter(p => p.component === comp);
    const completed = compProjects.filter(p => p.status === 'completed').length;
    const beneficiaries = compProjects.reduce((sum, p) => sum + p.beneficiaries, 0);
    const invested = compProjects.reduce((sum, p) => sum + p.fundsUtilized, 0);

    return {
      name: comp,
      completed,
      beneficiaries,
      invested: invested / 10000000,
    };
  });

  const stateImpact = states
    .map(state => {
      const stateProjects = filteredProjects.filter(p => p.stateId === state.id);
      const completed = stateProjects.filter(p => p.status === 'completed').length;
      const total = stateProjects.length;
      const beneficiaries = stateProjects.reduce((sum, p) => sum + p.beneficiaries, 0);

      return {
        name: state.name,
        completionRate: total > 0 ? (completed / total * 100) : 0,
        beneficiaries,
        projects: total,
      };
    })
    .filter(s => s.projects > 0)
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Impact Metrics</h1>
        <p className="text-gray-400">Social and developmental impact assessment of PM-AJAY initiatives</p>
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-6 border border-blue-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-blue-400" size={28} />
            <p className="text-sm text-gray-300 font-medium">Villages Covered</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{metrics.villagesCovered}</p>
          <p className="text-xs text-gray-400">Across {filterComponent || 'all components'}</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-6 border border-green-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-green-400" size={28} />
            <p className="text-sm text-gray-300 font-medium">SC Population Benefited</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{metrics.totalBeneficiaries.toLocaleString()}</p>
          <p className="text-xs text-gray-400">Direct beneficiaries</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-700/50">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-purple-400" size={28} />
            <p className="text-sm text-gray-300 font-medium">Fund Utilization</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{metrics.utilizationRate.toFixed(0)}%</p>
          <p className="text-xs text-gray-400">Efficient deployment</p>
        </div>

        <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 rounded-xl p-6 border border-orange-700/50">
          <div className="flex items-center gap-3 mb-3">
            <Award className="text-orange-400" size={28} />
            <p className="text-sm text-gray-300 font-medium">Projects Completed</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{metrics.completedProjects}</p>
          <p className="text-xs text-gray-400">Successfully delivered</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-blue-400 mb-6">Impact by Component</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Component</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Completed Projects</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Beneficiaries</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Investment</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Impact Visualization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {componentMetrics.map((metric, index) => {
                const maxBeneficiaries = Math.max(...componentMetrics.map(m => m.beneficiaries));
                const percentage = maxBeneficiaries > 0 ? (metric.beneficiaries / maxBeneficiaries * 100) : 0;

                return (
                  <tr key={index} className="hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3 text-sm text-white">{metric.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-block px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                        {metric.completed}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-white font-medium">
                      {metric.beneficiaries.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-white font-medium">
                      ₹{metric.invested.toFixed(1)}Cr
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-blue-400 mb-6">State-wise Completion Rate</h3>
          <div className="space-y-4">
            {stateImpact.map((state, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white font-medium">{state.name}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-400">{state.completionRate.toFixed(0)}%</span>
                    <span className="text-xs text-gray-400 ml-2">({state.projects} projects)</span>
                  </div>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400"
                    style={{ width: `${state.completionRate}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  {state.beneficiaries.toLocaleString()} beneficiaries impacted
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-blue-400 mb-6">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Average Project Completion Time</span>
                <span className="text-xl font-bold text-white">14 months</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-3/4" />
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Average Cost Per Beneficiary</span>
                <span className="text-xl font-bold text-white">₹6,200</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-2/3" />
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Agency Performance Score</span>
                <span className="text-xl font-bold text-white">8.4/10</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-5/6" />
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Community Satisfaction Rate</span>
                <span className="text-xl font-bold text-white">87%</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500" style={{ width: '87%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-xl p-6 border border-blue-800/50">
        <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
          <TrendingUp size={20} />
          AI-Generated Impact Summary
        </h3>
        <p className="text-gray-300 leading-relaxed">
          {filterComponent ? (
            <>
              Analysis of {filterComponent} shows significant social impact with {metrics.totalBeneficiaries.toLocaleString()}
              direct beneficiaries across {metrics.villagesCovered} villages. The program demonstrates {metrics.utilizationRate.toFixed(0)}%
              fund utilization efficiency, with {metrics.completedProjects} projects successfully completed.
              {stateImpact.length > 0 && ` ${stateImpact[0].name} leads in completion rate at ${stateImpact[0].completionRate.toFixed(0)}%,
              serving as a model for replication.`} Continued focus on timely implementation and beneficiary feedback mechanisms
              recommended for sustained impact.
            </>
          ) : (
            <>
              Comprehensive analysis across all PM-AJAY components reveals substantial developmental impact, reaching {metrics.totalBeneficiaries.toLocaleString()}
              SC community members across {metrics.villagesCovered} villages. The initiative demonstrates strong execution with {metrics.utilizationRate.toFixed(0)}%
              fund utilization and {metrics.completedProjects} completed projects. Multi-dimensional interventions in skill development,
              infrastructure, and education are creating sustainable livelihood opportunities. State-level performance shows {stateImpact[0]?.name}
              achieving {stateImpact[0]?.completionRate.toFixed(0)}% completion rate, indicating effective implementation frameworks.
              Scaling successful models and addressing regional disparities remains priority for maximizing program impact.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
