import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Projects from '../pages/Projects';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
