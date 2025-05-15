import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapView({ profiles, selectedProfile }) {
  const [viewport, setViewport] = useState({
    latitude: selectedProfile ? selectedProfile.lat : 40.7128,
    longitude: selectedProfile ? selectedProfile.lng : -74.0060,
    zoom: 10,
    width: '100%',
    height: '500px',
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(newViewport) => setViewport(newViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {profiles.map((profile) => (
        <Marker
          key={profile.id}
          latitude={profile.lat}
          longitude={profile.lng}
        >
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setSelectedMarker(profile)}
          >
            <img
              src="https://img.icons8.com/color/48/000000/marker.png"
              alt="marker"
              style={{ width: '30px', height: '30px' }}
            />
          </button>
        </Marker>
      ))}
      {selectedMarker && (
        <Popup
          latitude={selectedMarker.lat}
          longitude={selectedMarker.lng}
          onClose={() => setSelectedMarker(null)}
          closeOnClick={false}
        >
          <div>
            <h5>{selectedMarker.name}</h5>
            <p>{selectedMarker.address}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default MapView;