import { Routes, Route } from 'react-router-dom';

import LogIn from './Screens/LogIn';
import Dashboard from './Screens/Dashboard';
import './App.css';

function App() {
  return (
    <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
