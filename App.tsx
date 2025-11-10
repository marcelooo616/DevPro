import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';
import TopicPage from './pages/TopicPage';

// Simple custom scrollbar styles injected globally
const ScrollbarStyles = () => (
    <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #334155;
            border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
             background-color: #475569;
        }
    `}</style>
);

const App: React.FC = () => {
    return (
        <Router>
            <ScrollbarStyles />
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/module/:moduleId" element={<ModulePage />} />
                    <Route path="/module/:moduleId/topic/:topicId" element={<TopicPage />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
