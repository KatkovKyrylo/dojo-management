import React from 'react';
import Select from 'react-select';
import { useCollection } from 'hooks/useCollection';
import { useFirestore } from 'hooks/useFirestore';
import { timestamp } from 'firebase/config';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';

import styles from './styles.module.css';

const defaultValues = {
  name: '',
  details: '',
  dueDate: '',
  category: '',
};

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const Create = () => {
  const navigate = useNavigate();
  const { documents } = useCollection('users');
  const { addDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();
  const [users, setUsers] = React.useState([]);

  const [formData, setFormData] = React.useState(defaultValues);
  const [assignedUsers, setAssignedUsers] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [formError, setFormError] = React.useState(null);

  const handleChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: [e.target.value] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a category');
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user');
      return;
    }

    const owner = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id,
      };
    });

    const project = {
      name: formData.name,
      details: formData.details,
      dueDate: timestamp.fromDate(new Date(formData.dueDate)),
      category,
      comments: [],
      owner,
      assignedUsersList,
    };

    await addDocument(project);

    if (!response.error) {
      navigate('/');
    }
  };

  React.useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: { ...user, id: user.id }, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className={styles.createForm}>
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name: </span>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <label>
          <span>Project details: </span>
          <textarea
            type="text"
            name="details"
            required
            onChange={handleChange}
            value={formData.details}
          />
        </label>
        <label>
          <span>Due date: </span>
          <input
            type="date"
            name="dueDate"
            required
            onChange={handleChange}
            value={formData.dueDate}
          />
        </label>
        <label>
          <span>Project category: </span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option.value)}
          />
        </label>
        <label>
          <span>Assign to: </span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <button className="btn">Add project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export { Create };
