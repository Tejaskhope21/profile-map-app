import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProfileCard({ profile, onShowMap }) {
  const navigate = useNavigate();

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={profile.photo} alt={profile.name} />
      <Card.Body>
        <Card.Title>{profile.name}</Card.Title>
        <Card.Text>{profile.description}</Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate(`/profile/${profile.id}`)}
          className="me-2"
        >
          View Details
        </Button>
        <Button variant="success" onClick={() => onShowMap(profile)}>
          Show on Map
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
