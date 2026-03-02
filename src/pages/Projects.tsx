import { useEffect, useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import ConfirmModal from "../components/ConfirmModal";
import "../styles/projects.css";

interface Project {
  id: string;
  name: string;
  description: string;
  filesCount: number;
  jobsCount: number;
  createdAt: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fake API call simulation
  useEffect(() => {
    setTimeout(() => {
      setProjects([
        {
          id: "1",
          name: "AI Processing",
          description: "Handles ML pipelines",
          filesCount: 12,
          jobsCount: 5,
          createdAt: "2026-02-25",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>Projects</h2>
        <button onClick={() => setShowCreate(true)}>+ Create Project</button>
      </div>

      {/* Loading */}
      {loading && <p className="state-text">Loading projects...</p>}

      {/* Error */}
      {error && <p className="state-text error">{error}</p>}

      {/* Empty */}
      {!loading && projects.length === 0 && (
        <p className="state-text">No projects found</p>
      )}

      {/* Project List */}
      {/* Project Table */}
      {!loading && projects.length > 0 && (
        <div className="table-wrapper">
          <table className="projects-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Files</th>
                <th>Jobs</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td className="desc-cell">{project.description}</td>
                  <td>{project.filesCount}</td>
                  <td>{project.jobsCount}</td>
                  <td>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions-cell">
                    <button className="open-btn">Open</button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteId(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showCreate && (
        <CreateProjectModal
          onClose={() => setShowCreate(false)}
          onCreate={(newProject) =>
            setProjects((prev) => [...prev, newProject])
          }
        />
      )}

      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this project?"
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default Projects;