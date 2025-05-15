import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

function ProfileDetails() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/profiles/${id}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Profile not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  return (
    <Container className="my-2">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Img
              variant="top"
              src={profile.photo}
              alt={profile.name}
              style={{ objectFit: 'cover', height: '300px', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
            />
            <Card.Body>
              <Card.Title className="fs-3 text-center mb-3">{profile.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">{profile.address}</Card.Subtitle>
              <Card.Text className="mt-3">{profile.description}</Card.Text>
              <hr />
              <p><strong>Contact:</strong> <a href={`mailto:${profile.contact}`}>{profile.contact}</a></p>
              <div className="mt-3">
                <strong>Interests:</strong>
                <div className="mt-2">
                  {profile.interests?.map((interest, index) => (
                    <Badge key={index} bg="info" className="me-2 mb-2">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileDetails;
