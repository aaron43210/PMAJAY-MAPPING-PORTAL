import { Info, ExternalLink, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-blue-400 mb-2">About PM-AJAY</h1>
        <p className="text-gray-400">Understanding the Pradhan Mantri Anusuchit Jaati Abhyuday Yojana</p>
      </div>

      <div className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-xl p-8 border border-blue-800/50">
        <div className="flex items-start gap-4 mb-4">
          <Info size={32} className="text-blue-400 flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Pradhan Mantri Anusuchit Jaati Abhyuday Yojana</h2>
            <p className="text-gray-300 leading-relaxed">
              PM-AJAY is a comprehensive Government of India initiative designed to improve the socio-economic
              conditions of Scheduled Caste (SC) communities through integrated development programs. The scheme
              focuses on multiple dimensions of development including infrastructure, education, skill enhancement,
              and livelihood opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Program Components</h3>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">Adarsh Gram Yojana</h4>
            <p className="text-sm text-gray-300">
              Development of model villages with comprehensive infrastructure including roads, water supply,
              sanitation, electricity, and community facilities. Focuses on creating sustainable and self-reliant
              SC-majority villages.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">SC/ST Hostels</h4>
            <p className="text-sm text-gray-300">
              Construction and maintenance of hostel facilities for SC/ST students pursuing education away from
              their homes. Provides safe accommodation, nutritious meals, and conducive study environment.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">Skill Development</h4>
            <p className="text-sm text-gray-300">
              Training programs in various vocational skills, IT, and traditional crafts to enhance employability
              and entrepreneurship among SC youth. Includes certification and job placement support.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">Infrastructure Development</h4>
            <p className="text-sm text-gray-300">
              Building community centers, health clinics, schools, and other essential infrastructure in
              SC-dominated areas. Improves access to basic services and quality of life.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-2">NGO Community Projects</h4>
            <p className="text-sm text-gray-300">
              Partnership with non-governmental organizations for grassroots development initiatives including
              women empowerment, youth development, elderly care, and community mobilization programs.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Key Objectives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-white font-medium mb-1">Social Upliftment</p>
              <p className="text-sm text-gray-400">
                Enhance living standards and social dignity of SC communities
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-white font-medium mb-1">Economic Empowerment</p>
              <p className="text-sm text-gray-400">
                Create sustainable livelihood opportunities and entrepreneurship
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-white font-medium mb-1">Educational Access</p>
              <p className="text-sm text-gray-400">
                Improve access to quality education and skill development
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              4
            </div>
            <div>
              <p className="text-white font-medium mb-1">Infrastructure Development</p>
              <p className="text-sm text-gray-400">
                Build essential infrastructure in underserved areas
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Data Sources & References</h3>
        <div className="space-y-3">
          <a
            href="https://censusindia.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink size={16} />
            <span>Census of India 2011 - Population Data</span>
          </a>
          <a
            href="https://lgdirectory.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink size={16} />
            <span>Local Government Directory (LGD) Portal - Administrative Data</span>
          </a>
          <a
            href="https://socialjustice.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ExternalLink size={16} />
            <span>Ministry of Social Justice & Empowerment - Open Data</span>
          </a>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <Users size={24} />
          Implementation Framework
        </h3>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-white">Central Level:</span> Ministry of Social Justice & Empowerment
              provides policy direction, funding allocation, and monitoring oversight
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-white">State Level:</span> State governments coordinate with
              implementing agencies and ensure compliance with program guidelines
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-white">District Level:</span> District administrations oversee
              project execution, beneficiary selection, and local coordination
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-white">Village Level:</span> Gram panchayats and community
              organizations facilitate implementation and ensure community participation
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Transparency & Accountability</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          PM-AJAY is committed to transparent governance and accountability. All project details, fund allocations,
          and implementation progress are publicly available. Citizens can track project status, submit grievances,
          and provide feedback through this portal and other official channels.
        </p>
        <div className="bg-blue-900/30 border border-blue-800/50 rounded-lg p-4">
          <p className="text-sm text-blue-200">
            For queries and support, citizens can contact the Ministry of Social Justice & Empowerment helpline
            or visit the official website for detailed information about schemes and benefits.
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
        <p className="text-sm text-gray-400 mb-2">
          <span className="font-semibold text-white">Disclaimer:</span> This is a prototype portal developed for
          Smart India Hackathon 2025 demonstration purposes. While the portal uses real Indian geographic data
          (states, districts, villages) from Census 2011 and LGD Portal, the project data, agency information,
          and metrics are simulated for demonstration. This prototype showcases the technical capabilities and
          user experience of a comprehensive government mapping portal following Expertise, Authoritativeness,
          and Trustworthiness (EAT) principles.
        </p>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm font-semibold text-blue-400">Developed by Team Insightix</p>
          <p className="text-xs text-gray-500 mt-1">Smart India Hackathon 2025</p>
        </div>
      </div>
    </div>
  );
}
