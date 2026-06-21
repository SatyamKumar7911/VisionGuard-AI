import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
