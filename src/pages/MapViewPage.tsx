import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin } from 'lucide-react';
import { projects, states, districts, villages, agencies, components } from '../data/indiaData';

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapViewPage() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [filterComponent, setFilterComponent] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);

  const filteredDistricts = useMemo(() => {
    if (!selectedState) return [];
    return districts.filter(d => d.stateId === selectedState);
  }, [selectedState]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesState = !selectedState || project.stateId === selectedState;
      const matchesDistrict = !selectedDistrict || project.districtId === selectedDistrict;
      const matchesComponent = !filterComponent || project.component === filterComponent;
      const matchesStatus = !filterStatus || project.status === filterStatus;
      return matchesState && matchesDistrict && matchesComponent && matchesStatus;
    });
  }, [selectedState, selectedDistrict, filterComponent, filterStatus]);

  const getMarkerIcon = (status: string) => {
    const colors: Record<string, string> = {
      completed: '#10b981', ongoing: '#3b82f6', delayed: '#ef4444', pending: '#6b7280',
    };
    const color = colors[status] || colors.pending;
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`)}`,
      iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -32],
    });
  };

  const handleStateChange = (stateId: string) => {
    setSelectedState(stateId);
    setSelectedDistrict('');
    if (stateId) {
      const stateDistricts = districts.filter(d => d.stateId === stateId);
      if (stateDistricts.length > 0) {
        const avgLat = stateDistricts.reduce((sum, d) => sum + d.latitude, 0) / stateDistricts.length;
        const avgLng = stateDistricts.reduce((sum, d) => sum + d.longitude, 0) / stateDistricts.length;
        setMapCenter([avgLat, avgLng]);
        setMapZoom(7);
      }
    } else {
      setMapCenter([20.5937, 78.9629]);
      setMapZoom(5);
    }
  };

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId);
    if (districtId) {
      const district = districts.find(d => d.id === districtId);
      if (district) {
        setMapCenter([district.latitude, district.longitude]);
        setMapZoom(10);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Interactive Map View</h1>
        <p className="text-gray-400">Explore PM-AJAY projects with OpenStreetMap across 100+ districts</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
            <select value={selectedState} onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option value="">All States</option>
              {states.map(state => (<option key={state.id} value={state.id}>{state.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">District</label>
            <select value={selectedDistrict} onChange={(e) => handleDistrictChange(e.target.value)} disabled={!selectedState}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 disabled:opacity-50">
              <option value="">All Districts</option>
              {filteredDistricts.map(district => (<option key={district.id} value={district.id}>{district.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Component</label>
            <select value={filterComponent} onChange={(e) => setFilterComponent(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option value="">All Components</option>
              {components.map(comp => (<option key={comp} value={comp}>{comp}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option value="">All Status</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="delayed">Delayed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="h-[600px] relative">
              <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full z-0" zoomControl={true}>
                <MapUpdater center={mapCenter} zoom={mapZoom} />
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredProjects.map((project) => {
                  const village = villages.find(v => v.id === project.villageId);
                  if (!village?.latitude || !village?.longitude) return null;
                  const district = districts.find(d => d.id === project.districtId);
                  const state = states.find(s => s.id === project.stateId);
                  const agency = agencies.find(a => a.id === project.agencyId);
                  return (
                    <Marker key={project.id} position={[village.latitude, village.longitude]} icon={getMarkerIcon(project.status)}>
                      <Popup>
                        <div className="min-w-64 text-sm">
                          <h3 className="font-bold text-base mb-2">{village.name}</h3>
                          <div className="space-y-1">
                            <p><span className="font-semibold">District:</span> {district?.name}</p>
                            <p><span className="font-semibold">State:</span> {state?.name}</p>
                            <p><span className="font-semibold">Component:</span> {project.component}</p>
                            <p><span className="font-semibold">Agency:</span> {agency?.name}</p>
                            <p><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded text-xs ${
                              project.status === 'completed' ? 'bg-green-500' : project.status === 'ongoing' ? 'bg-blue-500' :
                              project.status === 'delayed' ? 'bg-red-500' : 'bg-gray-500'} text-white`}>{project.status}</span></p>
                            <p><span className="font-semibold">Allocated:</span> ₹{(project.fundsAllocated / 100000).toFixed(1)}L</p>
                            <p><span className="font-semibold">Utilized:</span> ₹{(project.fundsUtilized / 100000).toFixed(1)}L</p>
                            <p><span className="font-semibold">Beneficiaries:</span> {project.beneficiaries.toLocaleString()}</p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
            <div className="bg-gray-750 p-4 flex items-center justify-center gap-6 text-sm border-t border-gray-700">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-green-500" /><span className="text-gray-300">Completed</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-500" /><span className="text-gray-300">Ongoing</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500" /><span className="text-gray-300">Delayed</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-gray-500" /><span className="text-gray-300">Pending</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Project Statistics</h3>
            <div className="space-y-3">
              <div><p className="text-sm text-gray-400">Total Projects</p><p className="text-2xl font-bold text-white">{filteredProjects.length}</p></div>
              <div><p className="text-sm text-gray-400">Total Allocated</p><p className="text-2xl font-bold text-white">
                ₹{(filteredProjects.reduce((sum, p) => sum + p.fundsAllocated, 0) / 10000000).toFixed(1)}Cr</p></div>
              <div><p className="text-sm text-gray-400">Total Utilized</p><p className="text-2xl font-bold text-white">
                ₹{(filteredProjects.reduce((sum, p) => sum + p.fundsUtilized, 0) / 10000000).toFixed(1)}Cr</p></div>
              <div><p className="text-sm text-gray-400">Total Beneficiaries</p><p className="text-2xl font-bold text-white">
                {filteredProjects.reduce((sum, p) => sum + p.beneficiaries, 0).toLocaleString()}</p></div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Districts Covered</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[...new Set(filteredProjects.map(p => p.districtId))].map(districtId => {
                const district = districts.find(d => d.id === districtId);
                const state = states.find(s => s.id === district?.stateId);
                const projectCount = filteredProjects.filter(p => p.districtId === districtId).length;
                return (
                  <div key={districtId} className="flex items-center justify-between p-2 bg-gray-750 rounded hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate">{district?.name}</p>
                        <p className="text-xs text-gray-400 truncate">{state?.name}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded flex-shrink-0">{projectCount}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
