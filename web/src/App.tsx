import { Routes, Route } from 'react-router-dom';
import { Repos } from './pages/Repos/Repos';
import { Detail } from './pages/Detail/Detail';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Repos />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}
