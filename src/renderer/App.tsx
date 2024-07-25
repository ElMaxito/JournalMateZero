// src/renderer/App.tsx

import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Entries from './pages/Entries';
import Insights from './pages/Insights';
import Options from './pages/Options';
import './App.css';

const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;