import { useState, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import { projects, states, districts } from '../data/indiaData';

export default function ComparisonPage() {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [regionType, setRegionType] = useState<'state' | 'district'>('state');

  const toggleRegion = (id: string) => {
    if (selectedRegions.includes(id)) {
      setSelectedRegions(selectedRegions.filter(r => r !== id));
    } else if (selectedRegions.length < 3) {
      setSelectedRegions([...selectedRegions, id]);
    }
  };

  const comparisonData = useMemo(() => {
    return selectedRegions.map(regionId => {
      const regionProjects = regionType === 'state'
        ? projects.filter(p => p.stateId === regionId)
        : projects.filter(p => p.districtId === regionId);

      const allocated = regionProjects.reduce((sum, p) => sum + p.fundsAllocated, 0);
      const utilized = regionProjects.reduce((sum, p) => sum + p.fundsUtilized, 0);
      const completed = regionProjects.filter(p => p.status === 'completed').length;
      const ongoing = regionProjects.filter(p => p.status === 'ongoing').length;

      const regionName = regionType === 'state'
        ? states.find(s => s.id === regionId)?.name
        : districts.find(d => d.id === regionId)?.name;

      return {
        id: regionId,
        name: regionName || '',
        totalProjects: regionProjects.length,
        allocated: allocated / 10000000,
        utilized: utilized / 10000000,
        utilizationRate: allocated > 0 ? (utilized / allocated * 100) : 0,
        completed,
        ongoing,
        beneficiaries: regionProjects.reduce((sum, p) => sum + p.beneficiaries, 0),
      };
    });
  }, [selectedRegions, regionType]);

  const maxValues = {
    allocated: Math.max(...comparisonData.map(d => d.allocated), 1),
    utilized: Math.max(...comparisonData.map(d => d.utilized), 1),
    projects: Math.max(...comparisonData.map(d => d.totalProjects), 1),
    beneficiaries: Math.max(...comparisonData.map(d => d.beneficiaries), 1),
  };

  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Region Comparison</h1>
        <p className="text-gray-400">Compare performance metrics across states or districts</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setRegionType('state');
                setSelectedRegions([]);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                regionType === 'state'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Compare States
            </button>
            <button
              onClick={() => {
                setRegionType('district');
                setSelectedRegions([]);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                regionType === 'district'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Compare Districts
            </button>
          </div>
          <p className="text-sm text-gray-400">
            Select up to 3 {regionType === 'state' ? 'states' : 'districts'} to compare
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {(regionType === 'state' ? states : districts).map((region) => {
            const isSelected = selectedRegions.includes(region.id);
            const colorIndex = selectedRegions.indexOf(region.id);

            return (
              <button
                key={region.id}
                onClick={() => toggleRegion(region.id)}
                disabled={!isSelected && selectedRegions.length >= 3}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? `${colors[colorIndex]} text-white`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {region.name}
              </button>
            );
          })}
        </div>
      </div>

      {comparisonData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonData.map((data, index) => (
              <div key={data.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className={`inline-block px-3 py-1 ${colors[index]} rounded-lg text-white font-semibold mb-4`}>
                  {data.name}
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Total Projects</p>
                    <p className="text-2xl font-bold text-white">{data.totalProjects}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Funds Allocated</p>
                    <p className="text-xl font-bold text-white">₹{data.allocated.toFixed(1)}Cr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Funds Utilized</p>
                    <p className="text-xl font-bold text-white">₹{data.utilized.toFixed(1)}Cr</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Utilization Rate</p>
                    <p className="text-xl font-bold text-green-400">{data.utilizationRate.toFixed(1)}%</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">Completed</p>
                      <p className="text-lg font-semibold text-white">{data.completed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Ongoing</p>
                      <p className="text-lg font-semibold text-white">{data.ongoing}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Beneficiaries</p>
                    <p className="text-xl font-bold text-white">{data.beneficiaries.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-blue-400 mb-6">Funds Allocated vs Utilized</h3>
            <div className="space-y-6">
              {comparisonData.map((data, index) => (
                <div key={data.id}>
                  <p className="text-sm font-medium text-white mb-2">{data.name}</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Allocated</span>
                        <span>₹{data.allocated.toFixed(1)}Cr</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors[index]} opacity-50`}
                          style={{ width: `${(data.allocated / maxValues.allocated) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Utilized</span>
                        <span>₹{data.utilized.toFixed(1)}Cr</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors[index]}`}
                          style={{ width: `${(data.utilized / maxValues.allocated) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-6">Projects Completed vs Ongoing</h3>
              <div className="space-y-4">
                {comparisonData.map((data, index) => (
                  <div key={data.id}>
                    <p className="text-sm font-medium text-white mb-2">{data.name}</p>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Completed</span>
                          <span>{data.completed}</span>
                        </div>
                        <div className="h-8 bg-gray-700 rounded overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(data.completed / maxValues.projects) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Ongoing</span>
                          <span>{data.ongoing}</span>
                        </div>
                        <div className="h-8 bg-gray-700 rounded overflow-hidden">
                          <div
                            className={`h-full ${colors[index]}`}
                            style={{ width: `${(data.ongoing / maxValues.projects) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-400 mb-6">Performance Radar</h3>
              <div className="aspect-square relative">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#374151" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="#374151" strokeWidth="1" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="#374151" strokeWidth="1" />
                  <circle cx="100" cy="100" r="20" fill="none" stroke="#374151" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="20" stroke="#374151" strokeWidth="1" />
                  <line x1="100" y1="100" x2="180" y2="100" stroke="#374151" strokeWidth="1" />
                  <line x1="100" y1="100" x2="100" y2="180" stroke="#374151" strokeWidth="1" />
                  <line x1="100" y1="100" x2="20" y2="100" stroke="#374151" strokeWidth="1" />

                  <text x="100" y="15" textAnchor="middle" fill="#9ca3af" fontSize="10">Projects</text>
                  <text x="190" y="105" textAnchor="start" fill="#9ca3af" fontSize="10">Funds</text>
                  <text x="100" y="195" textAnchor="middle" fill="#9ca3af" fontSize="10">Utilization</text>
                  <text x="10" y="105" textAnchor="end" fill="#9ca3af" fontSize="10">Beneficiaries</text>

                  {comparisonData.map((data, index) => {
                    const projectsNorm = (data.totalProjects / maxValues.projects) * 80;
                    const fundsNorm = (data.allocated / maxValues.allocated) * 80;
                    const utilizationNorm = (data.utilizationRate / 100) * 80;
                    const beneficiariesNorm = (data.beneficiaries / maxValues.beneficiaries) * 80;

                    const points = [
                      `100,${100 - projectsNorm}`,
                      `${100 + fundsNorm},100`,
                      `100,${100 + utilizationNorm}`,
                      `${100 - beneficiariesNorm},100`,
                    ].join(' ');

                    const strokeColor = index === 0 ? '#3b82f6' : index === 1 ? '#22c55e' : '#a855f7';

                    return (
                      <polygon
                        key={data.id}
                        points={points}
                        fill={strokeColor}
                        fillOpacity="0.2"
                        stroke={strokeColor}
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
          <BarChart3 size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">Select regions to begin comparison</p>
        </div>
      )}
    </div>
  );
}
