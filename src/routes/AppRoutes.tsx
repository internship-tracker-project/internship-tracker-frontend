import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<div>Dashboard</div>} />
        <Route path="/login" element = {<div>Login</div>} />
        <Route path="/register" element = {<div>Register</div>} />
        <Route path="/applications" element = {<div>Applications</div>} />
        <Route path="/analytics" element = {<div>Analytics</div>} />
        <Route path="*" element = {<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}