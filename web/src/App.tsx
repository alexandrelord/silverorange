import { Routes, Route } from 'react-router-dom';
import { Repos } from './pages/Repos/Repos';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Repos />} />
      </Routes>
    </div>
  );
}
