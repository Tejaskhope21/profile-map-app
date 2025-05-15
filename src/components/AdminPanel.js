import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

function AdminPanel() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({
    id: null,
    name: '',
    photo: '',
    description: '',
    address: '',
    lat: '',
    lng: '',
    contact: '',
    interests: [],
  });

  // Fetch profiles from API
  useEffect(() => {
    axios
      .get('http://localhost:3001/profiles')
      .then((response) => {
        setProfiles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load profiles');
        setLoading(false);
      });
  }, []);

  // Handle opening modal for adding a new profile
  const handleAdd = () => {
    setCurrentProfile({
      id: null,
      name: '',
      photo: '',
      description: '',
      address: '',
      lat: '',
      lng: '',
      contact: '',
      interests: [],
    });
    setShowModal(true);
  };

  // Handle opening modal for editing an existing profile
  const handleEdit = (profile) => {
    setCurrentProfile({
      ...profile,
      interests: profile.interests.join(', '),
      lat: profile.lat.toString(),
      lng: profile.lng.toString(),
    });
    setShowModal(true);
  };

  // Handle deleting a profile
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/profiles/${id}`)
      .then(() => {
        setProfiles(profiles.filter((p) => p.id !== id));
      })
      .catch((err) => {
        setError('Failed to delete profile');
      });
  };

  // Handle saving (add or update) a profile
  const handleSave = () => {
    // Validate inputs
    if (!currentProfile.name || !currentProfile.address) {
      setError('Name and address are required');
      return;
    }

    const profileData = {
      ...currentProfile,
      interests: currentProfile.interests
        ? currentProfile.interests.split(',').map((i) => i.trim())
        : [],
      lat: parseFloat(currentProfile.lat) || 0,
      lng: parseFloat(currentProfile.lng) || 0,
    };

    if (currentProfile.id) {
      // Update existing profile
      axios
        .put(`http://localhost:3001/profiles/${currentProfile.id}`, profileData)
        .then((response) => {
          setProfiles(
            profiles.map((p) =>
              p.id === currentProfile.id ? response.data : p
            )
          );
          setShowModal(false);
          setError(null);
        })
        .catch((err) => {
          setError('Failed to update profile£');
        });
    } else {
      // Add new profile
      axios
        .post('http://localhost:3001/profiles', {
          ...profileData,
          id: profiles.length + 1, // Simple ID generation (for demo)
        })
        .then((response) => {
          setProfiles([...profiles, response.data]);
          setShowModal(false);
          setError(null);
        })
        .catch((err) => {
          setError('Failed to add profile');
        });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <Container className="my-4">
      <h1>Admin Panel</h1>
      <Button variant="primary" onClick={handleAdd} className="mb-3">
        Add Profile
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.address}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(profile)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(profile.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProfile.id ? 'Edit Profile' : 'Add Profile'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentProfile.name}
                onChange={(e) =>
                  setCurrentProfile({ ...currentProfile, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                type="text"
                value={currentProfile.photo}
                onChange={(e) =>
                  setCurrentProfile({ ...currentProfile, photo: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={currentProfile.description}
                onChange={(e) =>
                  setCurrentProfile({
                    ...currentProfile,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={currentProfile.address}
                onChange={(e) =>
                  setCurrentProfile({
                    ...currentProfile,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                value={currentProfile.lat}
                onChange={(e) =>
                  setCurrentProfile({ ...currentProfile, lat: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                value={currentProfile.lng}
                onChange={(e) =>
                  setCurrentProfile({ ...currentProfile, lng: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={currentProfile.contact}
                onChange={(e) =>
                  setCurrentProfile({
                    ...currentProfile,
                    contact: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Interests (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={currentProfile.interests}
                onChange={(e) =>
                  setCurrentProfile({
                    ...currentProfile,
                    interests: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminPanel;