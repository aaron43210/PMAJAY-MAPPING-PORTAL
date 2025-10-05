import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AIChatbot from './components/AIChatbot';
import HomePage from './pages/HomePage';
import MappingPage from './pages/MappingPage';
import MapViewPage from './pages/MapViewPage';
import ProposalPage from './pages/ProposalPage';
import DashboardPage from './pages/DashboardPage';
import TransparencyPage from './pages/TransparencyPage';
import ComparisonPage from './pages/ComparisonPage';
import ImpactPage from './pages/ImpactPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'mapping':
        return <MappingPage />;
      case 'map-view':
        return <MapViewPage />;
      case 'proposal':
        return <ProposalPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'transparency':
        return <TransparencyPage />;
      case 'comparison':
        return <ComparisonPage />;
      case 'impact':
        return <ImpactPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <AIChatbot />
    </>
  );
}

export default App;
