import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
        <Route path="/applications" element={<div>Applications</div>} />
      </Routes>
    </BrowserRouter>
  );
}