import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/projectDetails.css';
import { getProject, type Project } from '../services/projectService';
import { getFiles, type File } from '../services/fileService';
import { getJobs, type Job } from '../services/jobService';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isSelectingFiles, setIsSelectingFiles] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  useEffect(() => {
    callGetProject();
    callGetFiles();
    callGetJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const callGetFiles = async () => {
    getFiles(projectId!).then((data) => {
      if (data.data.length > 0) {
        setFiles([...data.data]);
      } else {
        console.error('No files found for project ID:', projectId);
      }
    });
  };
  const callGetJobs = async () => {
    getJobs(projectId!).then((data) => {
      if (data.data.length > 0) {
        setJobs([...data.data]);
      } else {
        console.error('No Jobs found for project ID:', projectId);
      }
    });
  };

  const callGetProject = async () => {
    getProject(projectId!).then((data) => {
      if (data.data) {
        const proj: Project = data.data;
        setProject(proj);
      } else {
        console.error('No project found with ID:', projectId);
      }
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    //  setUploading(true);

    //  setTimeout(() => {
    //    const newFiles = Array.from(selectedFiles).map((file) => ({
    //      id: Date.now().toString() + file.name,
    //      name: file.name,
    //      size: `${(file.size / 1024).toFixed(2)} KB`,
    //    }));

    //    setFiles((prev) => [...prev, ...newFiles]);
    //    setUploading(false);
    //  }, 1000);
  };

  const handleCreateJob = () => {
    const newJob = {
      id: Date.now().toString(),
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };

    setJobs((prev) => [newJob, ...prev]);
  };

  const handleCreateJobClick = () => {
    if (!isSelectingFiles) {
      // Enable selection mode
      setIsSelectingFiles(true);
      return;
    }

    // If already selecting → create job
    if (selectedFiles.length === 0) {
      alert('Please select at least one file');
      return;
    }

    const newJob = {
      id: Date.now().toString(),
      status: 'Processing',
      createdAt: new Date().toISOString(),
    };

    setJobs((prev) => [newJob, ...prev]);

    // Reset
    setIsSelectingFiles(false);
    setSelectedFiles([]);
    handleCreateJob();
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-details-container">
      {/* Project Info */}
      <section className="project-info">
        <div className="project-header">
          <div>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <span>
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>

      {/* Files Section */}
      <section className="project-section">
        <div className="section-header">
          <h3>Files</h3>
          <div className="job-actions">
            {isSelectingFiles ? (
              <>
                <button
                  className="create-job-btn"
                  onClick={handleCreateJobClick}
                >
                  Confirm Zip
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => {
                    setIsSelectingFiles(false);
                    setSelectedFiles([]);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="create-job-btn" onClick={handleCreateJobClick}>
                + Create Zip
              </button>
            )}
            <label className="upload-btn">
              Upload Files
              <input type="file" multiple hidden onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        {uploading && <p className="state-text">Uploading...</p>}

        <table className="project-table">
          <thead>
            <tr>
              {isSelectingFiles && <th>Select</th>}
              <th>Name</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id}>
                {isSelectingFiles && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file._id)}
                      onChange={() => {
                        setSelectedFiles((prev) =>
                          prev.includes(file._id)
                            ? prev.filter((id) => id !== file._id)
                            : [...prev, file._id]
                        );
                      }}
                    />
                  </td>
                )}
                <td>{file.name}</td>
                <td>{file.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Jobs Section */}
      <section className="project-section">
        <h3>Jobs</h3>

        <table className="project-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <span className={`job-badge ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
