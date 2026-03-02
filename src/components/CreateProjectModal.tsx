import { useState } from "react";
import "../styles/createProjectModal.css";

interface Props {
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCreate: (project: any) => void;
}

const CreateProjectModal = ({ onClose, onCreate }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !description) {
      setError("All fields are required");
      return;
    }

    onCreate({
      id: Date.now().toString(),
      name,
      description,
      filesCount: 0,
      jobsCount: 0,
      createdAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="create-overlay">
      <div className="create-modal">
        <h3>Create Project</h3>

        <div className="create-form">
          <input
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p className="input-error">{error}</p>}

          <div className="create-actions">
            <button
              className="create-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="create-submit"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;