import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";

const PoliticalGlobe = () => {
  const globeRef = useRef();
  const [countries, setCountries] = useState([]);
  const [stationCounts, setStationCounts] = useState({});
  const [audioUrl, setAudioUrl] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null); // 🌟 new

  // 🌍 Load country GeoJSON
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  // 📡 Load station counts by country
  useEffect(() => {
    axios.get("https://de1.api.radio-browser.info/json/countries").then((res) => {
      const counts = {};
      for (let i = 0; i < res.data.length; i++) {
        counts[res.data[i].name] = res.data[i].stationcount;
      }
      setStationCounts(counts);
    });
  }, []);

  // 🎥 Auto-rotate
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
    }
  }, []);

  // 🔊 Play a random station from selected country
  const playRandomStation = async (countryName) => {
    try {
      const res = await axios.get(
        `https://de1.api.radio-browser.info/json/stations/bycountry/${countryName}`
      );
      const stations = res.data.filter((s) => s.url && s.codec !== "HTML");
      if (stations.length > 0) {
        const randomStation = stations[Math.floor(Math.random() * stations.length)];
        setAudioUrl(randomStation.url);
        setSelectedStation({
          name: randomStation.name,
          country: countryName,
          favicon: randomStation.favicon,
          count: stationCounts[countryName] || 0,
        });
      } else {
        alert(`No playable stations found for ${countryName}`);
      }
    } catch (err) {
      console.error("Error fetching stations:", err);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="#000"
        polygonsData={countries}
        polygonCapColor={() => "rgba(50, 150, 255, 0)"}
        polygonSideColor={() => "rgba(50, 100, 200, 0)"}
        polygonStrokeColor={() => "rgba(0,0,0,0)"}  
        polygonLabel={({ properties: d }) => {
          const countryName = d.name;
          const count = stationCounts[countryName] || 0;
          return `<b>${countryName}</b><br/>Radio Stations: ${count}`;
        }}
        onPolygonHover={(hoverD) => {
          document.body.style.cursor = hoverD ? "pointer" : "default";
        }}
        onPolygonClick={({ properties: d }) => {
          const countryName = d.name;
          playRandomStation(countryName);
        }}
      />

      {/* 🔊 Audio UI Panel */}
      {selectedStation && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "12px 16px",
            borderRadius: "12px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 1000,
            maxWidth: "90vw",
          }}
        >
          {/* Favicon */}
          {selectedStation.favicon ? (
            <img
              src={selectedStation.favicon}
              alt="station-logo"
              style={{ width: 48, height: 48, borderRadius: "50%" }}
              onError={(e) => (e.target.style.display = "none")}
            />
          ) : null}

          {/* Info */}
          <div>
            <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              {selectedStation.name}
            </div>
            <div style={{ fontSize: "0.95em" }}>
              {selectedStation.country} — {selectedStation.count} stations
            </div>
          </div>

          {/* Audio */}
          {audioUrl && (
            <audio
              controls
              autoPlay
              style={{ marginLeft: "auto", maxWidth: 200 }}
              key={audioUrl} // re-mounts when URL changes
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}
    </div>
  );
};

export default PoliticalGlobe;