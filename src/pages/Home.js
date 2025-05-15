import React, { useState, useEffect } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import ProfileList from '../components/ProfileList';
import MapView from '../components/MapView';
import SearchFilter from '../components/SearchFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import profilesData from '../data/profiles.json';

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      try {
        setProfiles(profilesData);
        setFilteredProfiles(profilesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profiles');
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  const handleShowMap = (profile) => {
    setSelectedProfile(profile);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <Container className="my-4">
      <h1>Profile Explorer</h1>
      <SearchFilter onSearch={handleSearch} />
      <ProfileList profiles={filteredProfiles} onShowMap={handleShowMap} />
      {selectedProfile && <MapView profiles={filteredProfiles} selectedProfile={selectedProfile} />}
    </Container>
  );
}

export default Home;