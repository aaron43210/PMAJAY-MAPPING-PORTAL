import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { projects, states, districts, villages, agencies, components } from '../data/indiaData';

export default function MappingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterComponent, setFilterComponent] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const state = states.find(s => s.id === project.stateId);
      const district = districts.find(d => d.id === project.districtId);
      const village = villages.find(v => v.id === project.villageId);
      const agency = agencies.find(a => a.id === project.agencyId);

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        state?.name.toLowerCase().includes(searchLower) ||
        district?.name.toLowerCase().includes(searchLower) ||
        village?.name.toLowerCase().includes(searchLower) ||
        agency?.name.toLowerCase().includes(searchLower) ||
        project.component.toLowerCase().includes(searchLower);

      const matchesComponent = !filterComponent || project.component === filterComponent;
      const matchesStatus = !filterStatus || project.status === filterStatus;

      return matchesSearch && matchesComponent && matchesStatus;
    });
  }, [searchTerm, filterComponent, filterStatus]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'ongoing': return 'bg-blue-600';
      case 'delayed': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Project Mapping</h1>
        <p className="text-gray-400">Complete list of all PM-AJAY projects across India</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by state, district, village, or agency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="delayed">Delayed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          Showing {paginatedProjects.length} of {filteredProjects.length} projects
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Component</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">State</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">District</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Village</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Implementing Agency</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Allocated</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Utilized</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {paginatedProjects.map((project) => {
                const state = states.find(s => s.id === project.stateId);
                const district = districts.find(d => d.id === project.districtId);
                const village = villages.find(v => v.id === project.villageId);
                const agency = agencies.find(a => a.id === project.agencyId);

                return (
                  <tr key={project.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-300">{project.component}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{state?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{district?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{village?.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{agency?.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">₹{(project.fundsAllocated / 100000).toFixed(1)}L</td>
                    <td className="px-4 py-3 text-sm text-gray-300">₹{(project.fundsUtilized / 100000).toFixed(1)}L</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
