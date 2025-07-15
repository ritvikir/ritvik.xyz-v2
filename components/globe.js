import { useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import { feature } from "topojson-client";
import * as THREE from "three";

const travelLocations = [
  {
    name: "san diego, ca",
    lat: 33.084980,
    lng: -117.243339,
    date: "aug 2019 - now",
    details: "local recs: the taco stand, torrey pines gliderport, best pizza & brew in encinitas",

  },
  {
    name: "los angeles, ca",
    lat: 34.0522,
    lng: -118.2437,
    date: "sep 2024 - june 2025",
    details: "finished my freshman year of college at ucla. favorites: enzo's pizzeria, bplate, saffron and rose ice cream",
  },
  {
    name: "san francisco / bay area",
    lat: 37.7749,
    lng: -122.4194,
    date: "frequently",
    details: "favorites: zareens, unit 3 at uc berkeley, fremont",

  },
  {
    name: "chicago, il",
    lat: 41.8781,
    lng: -87.6298,
    date: "march 2025",
    details: "spontaneous trip with two friends. booked $50 roundtrip tickets on spirit airlines (lax-ord)",
  },
  {
    name: "boston, ma",
    lat: 42.3601,
    lng: -71.0589,
    date: "april 2024",
  },
  {
    name: "seattle, wa",
    lat: 47.6062,
    lng: -122.3321,
    date: "november 2024",
    details: "visited a few friends from the university of washington",
  },
  {
    name: "orlando, fl",
    lat: 28.5383,
    lng: -81.3792,
    date: "june 2023",
    details: "attended 1517 summit at cocoa beach. first time travelling alone",

  },
  {
    name: "new delhi, agra, and jaipur",
    lat: 28.6139,
    lng: 77.209,
    date: "july 2024",
  },
  {
    name: "hyderabad, india",
    lat: 17.385,
    lng: 78.4867,
    date: "july 2024",
    details: "home base in india",
  },
  {
    name: "london, uk",
    lat: 51.5074,
    lng: -0.1278,
    date: "aug 2024",
    details: "starting point of my 1 month europe solo backpacking trip. first time staying in a hostel",
  },
  {
    name: "paris, france",
    lat: 48.8566,
    lng: 2.3522,
    date: "aug 2024",
    details: "part of my 1 month europe solo backpacking trip",
  },
  {
    name: "barcelona, spain",
    lat: 41.3851,
    lng: 2.1734,
    date: "aug 2024",
    details: "check out the bunkers viewpoint",

  },
  {
    name: "lyon, france",
    lat: 45.764,
    lng: 4.8357,
    date: "sep 2024",
    details: "part of my 1 month europe solo backpacking trip",

  },
  {
    name: "amsterdam, netherlands",
    lat: 52.3676,
    lng: 4.9041,
    date: "sep 2024",
    details: "delicious surinamese food",
  },
  {
    name: "brussels, belgium",
    lat: 50.8503,
    lng: 4.3517,
    date: "sep 2024",
    details: "ask for a mitraillette at a kebab shop",

  },
  {
    name: "munich, germany",
    lat: 48.1351,
    lng: 11.582,
    date: "sep 2024",
    details: "watched surfers at the eisbachwelle. took a day trip to the neuschwanstein castle",
  },
  {
    name: "prague, czech republic",
    lat: 50.0755,
    lng: 14.4378,
    date: "sep 2024",
    details: "part of my 1 month europe solo backpacking trip",
  },
  {
    name: "vienna, austria",
    lat: 48.2082,
    lng: 16.3738,
    date: "sep 2024",
    details: "tried wienerschnitzel. part of my 1 month europe solo backpacking trip",

  },
  {
    name: "bratislava, slovakia",
    lat: 48.1486,
    lng: 17.1077,
    date: "sep 2024",
    details: "very affordable accomodation and food. hostels around 10 euros/night",

  },
  {
    name: "budapest, hungary",
    lat: 47.4979,
    lng: 19.0402,
    date: "sep 2024",
    details: "tried hungarian lángos. ending point of my 1 month europe solo backpacking trip",
  },
  {
    name: "bangkok, thailand",
    lat: 13.7563,
    lng: 100.5018,
    date: "july 2024",
  },
  {
    name: "phuket, thailand",
    lat: 7.8804,
    lng: 98.3923,
    date: "july 2024",
  },
  {
    name: "pittsburgh, pa",
    lat: 40.4406,
    lng: -79.9959,
    date: "april 2024",
    details: "toured carnegie mellon's school of computer science after being admitted. great program but wasn't the right fit for me!",
  },
  {
    name: "atlanta, ga",
    lat: 33.7490,
    lng: -84.3880,
    date: "feb 2024",
    details: "attended georgia tech's gold carpet day",
  },
  {
    name: "cincinnati, oh",
    lat: 39.1031,
    lng: -84.5120,
    date: "aug 2006 - aug 2019",
    details: "my spawn point",
  },
  {
    name: "cabot, vt",
    lat: 44.4281,
    lng: -72.0667,
    date: "aug 2019 - aug 2020",
    details: "hack club's outernet",
  },
  {
    name: "tijuana, mexico",
    lat: 32.393053,
    lng: -116.927363,
    date: "may 2024",
    details: "built houses as part of a service trip in mexico",
  },

];

export default function Map() {
  const globeEl = useRef(null);
  const [geoPolygons, setGeoPolygons] = useState({ features: [] });
  const [globeWidth, setGlobeWidth] = useState(0);
  const [globeHeight, setGlobeHeight] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadCountries = fetch("/countries-110m.json")
      .then((res) => res.json())
      .then((data) => feature(data, data.objects.countries));

    const loadUSStates = fetch("/states-10m.json")
      .then((res) => res.json())
      .then((data) => feature(data, data.objects.states));

    Promise.all([loadCountries, loadUSStates]).then(
      ([countriesGeo, statesGeo]) => {
        setGeoPolygons({
          type: "FeatureCollection",
          features: [...countriesGeo.features, ...statesGeo.features],
        });
      }
    );
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setGlobeWidth(containerRef.current.offsetWidth);
        setGlobeHeight(containerRef.current.offsetHeight);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Function to create custom HTML/SVG markers
  const htmlElement = (d) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="3" fill="#f87171" class="blur-[1.5px] animate-pulse" />
      </svg>
    `;
    el.style.pointerEvents = "auto"; // Allow mouse events
    el.style.cursor = "pointer";
    el.title = d.name; // Tooltip on hover

    // Add click handler
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      setSelectedLocation(d);
    });

    return el;
  };

  return (
    <section>
      <div
        ref={containerRef}
        className="h-96 w-full border border-gray-100 rounded-lg overflow-hidden bg-gray-50 relative"
        onClick={() => setSelectedLocation(null)}
      >
        {globeWidth > 0 && globeHeight > 0 && (
          <Globe
            ref={globeEl}
            width={globeWidth}
            height={globeHeight}
            globeImageUrl={null} // No texture for hollow effect
            backgroundColor="#ffffff" // Set canvas background to white
            // Use an opaque white material for the globe to hide back polygons
            globeMaterial={
              new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: false,
              })
            }
            polygonsData={geoPolygons.features} // Use combined GeoJSON features
            // Set polygon colors to match the globe material, making them effectively invisible
            polygonCapColor={() => "rgba(255, 255, 255, 1)"} // Opaque white fill for countries
            polygonSideColor={() => "rgba(255, 255, 255, 1)"} // Opaque white side for countries
            polygonStrokeColor={() => "#d1d5db"} // Gray outline for both countries and states
            atmosphereColor={null} // Remove atmosphere color
            atmosphereAltitude={0} // Remove atmosphere altitude
            htmlElementsData={travelLocations} // Use htmlElementsData for custom markers
            htmlElement={htmlElement} // Function to render custom HTML/SVG markers
            htmlAltitude={0.01} // Position HTML elements slightly above the globe surface
            enablePointerInteraction={true}
            onGlobeReady={() => {
              if (globeEl.current) {
                globeEl.current.pointOfView(
                  { lat: 39, lng: -100, altitude: 1.15 },
                  0
                );
              }
            }}
          />
        )}

        {/* Location Tooltip */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-3 w-56 z-10">
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="font-semibold text-white text-sm">
                {selectedLocation.name}
              </h3>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-xs text-gray-300">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {selectedLocation.date}
              </div>
              {selectedLocation.details && (
                <div className="flex items-start text-xs text-gray-300">
                  <span>{selectedLocation.details}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-300 mt-2 mb-10">
        drag to rotate • scroll to zoom • click markers to learn more
      </p>
    </section>
  );
}
