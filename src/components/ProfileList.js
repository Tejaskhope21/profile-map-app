import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileCard from './ProfileCard';

function ProfileList({ profiles, onShowMap }) {
  return (
    <Container>
      <Row>
        {profiles.map((profile) => (
          <Col key={profile.id} xs={12} md={6} lg={4}>
            <ProfileCard profile={profile} onShowMap={onShowMap} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProfileList;