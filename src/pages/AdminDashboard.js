import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import profilesData from '../data/profiles.json';
import LoadingSpinner from '../components/LoadingSpinner';

function AdminDashboard() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    setTimeout(() => {
      setProfiles(profilesData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAdd = () => {
    setCurrentProfile({
      id: profiles.length + 1,
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

  const handleEdit = (profile) => {
    setCurrentProfile({ ...profile, interests: profile.interests.join(', ') });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setProfiles(profiles.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    const updatedProfile = {
      ...currentProfile,
      interests: currentProfile.interests.split(',').map((i) => i.trim()),
      lat: parseFloat(currentProfile.lat),
      lng: parseFloat(currentProfile.lng),
    };

    if (currentProfile.id) {
      setProfiles(
        profiles.map((p) => (p.id === currentProfile.id ? updatedProfile : p))
      );
    } else {
      setProfiles([...profiles, updatedProfile]);
    }
    setShowModal(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="my-4">
      <h1>Admin Dashboard</h1>
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

export default AdminDashboard;