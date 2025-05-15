import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Alert, Row, Col, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import profilesData from '../data/profiles.json';
import LoadingSpinner from '../components/LoadingSpinner';

function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        const foundProfile = profilesData.find((p) => p.id === parseInt(id));
        if (!foundProfile) {
          setError('Profile not found');
        } else {
          setProfile(foundProfile);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
      }
    }, 1000);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Img
              variant="top"
              src={profile.photo}
              alt={profile.name}
              style={{
                objectFit: 'cover',
                height: '300px',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
              }}
            />
            <Card.Body>
              <Card.Title className="fs-3 text-center mb-3">{profile.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted text-center">
                {profile.address}
              </Card.Subtitle>
              <Card.Text className="mt-3">{profile.description}</Card.Text>
              <ListGroup variant="flush" className="mt-3">
                <ListGroup.Item>
                  <strong>Contact:</strong> <a href={`mailto:${profile.contact}`}>{profile.contact}</a>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Interests:</strong>
                  <div className="mt-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} bg="primary" className="me-2 mb-2">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
