"use client";

import { useEffect, useRef } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

const visitedCountries = [
  "United States of America",
  "Canada",
  "South Korea",
  "Japan",
  "Puerto Rico",
  "Germany",
  "France",
  "Luxembourg",
  "El Salvador",
  "Guatemala",
];

const cities = [
  { name: "Boston", lat: 42.3601, lng: -71.0589 },
  { name: "New York City", lat: 40.7128, lng: -74.0060 },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
  { name: "Seoul", lat: 37.5665, lng: 126.9780 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "San Juan", lat: 18.4655, lng: -66.1057 },
  { name: "Berlin", lat: 52.5200, lng: 13.4050 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Luxembourg City", lat: 49.6116, lng: 6.1319 },
  { name: "San Salvador", lat: 13.6929, lng: -89.2182 },
  { name: "Guatemala City", lat: 14.6349, lng: -90.5069 },
];

export default function TravelGoogleEarth() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      setOptions({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
        libraries: ["maps", "marker"],
      });

      const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;
      // const { AdvancedMarkerElement } = (await importLibrary("marker")) as google.maps.MarkerLibrary; // For advanced markers if needed

      if (mapRef.current) {
        // Initialize the map with 3D capabilities enabled (Vector map ID required)
        // You MUST create a Map ID in Google Cloud Console with "JavaScript" -> "Vector" type
        const map = new Map(mapRef.current, {
          center: { lat: 42.3601, lng: -71.0589 },
          zoom: 12,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID", // Replace with your Vector Map ID
          tilt: 45,
          heading: 0,
          disableDefaultUI: false,
          mapTypeId: 'satellite', // Start in satellite mode
        });

        // Highlight East Boston (approximate polygon)
        const eastBostonPolygon = new google.maps.Polygon({
          paths: [
            { lat: 42.3979, lng: -71.0205 },
            { lat: 42.3962, lng: -71.0062 },
            { lat: 42.3890, lng: -70.9978 },
            { lat: 42.3811, lng: -70.9888 },
            { lat: 42.3724, lng: -70.9909 },
            { lat: 42.3651, lng: -71.0021 },
            { lat: 42.3609, lng: -71.0176 },
            { lat: 42.3636, lng: -71.0327 },
            { lat: 42.3723, lng: -71.0406 },
            { lat: 42.3848, lng: -71.0382 },
            { lat: 42.3942, lng: -71.0307 },
          ],
          strokeColor: "#10b981",
          strokeOpacity: 0.9,
          strokeWeight: 2,
          fillColor: "#10b981",
          fillOpacity: 0.2,
        });
        eastBostonPolygon.setMap(map);

        // Load Country Borders (GeoJSON)
        // We use the same source as the other globe for consistency, or standard Google Maps Data
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
          .then(res => res.json())
          .then(data => {
             map.data.addGeoJson(data);
             
             // Style the countries
             map.data.setStyle((feature: google.maps.Data.Feature) => {
               const countryName = feature.getProperty("NAME");
               const isVisited = visitedCountries.includes(countryName);
               
               return {
                 fillColor: isVisited ? "#10b981" : "transparent", // Emerald for visited
                 fillOpacity: isVisited ? 0.3 : 0,
                 strokeColor: "rgba(255, 255, 255, 0.3)",
                 strokeWeight: 1,
                 visible: true
               };
             });
          });

        // Highlight specific property (pin) using explicit coordinates
        const propertyLat = Number(process.env.NEXT_PUBLIC_PROPERTY_PIN_LAT);
        const propertyLng = Number(process.env.NEXT_PUBLIC_PROPERTY_PIN_LNG);
        const hasPropertyPin = Number.isFinite(propertyLat) && Number.isFinite(propertyLng);

        if (hasPropertyPin) {
          const location = { lat: propertyLat, lng: propertyLng };
          new google.maps.Marker({
            position: location,
            map,
            title: "175 Paris Street, East Boston",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
              fillColor: "#10b981",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });
          map.setCenter(location);
          map.setZoom(18);
          map.setTilt(67.5);
          map.setHeading(20);
        }

        // Add Markers for Cities
        cities.forEach(city => {
          new google.maps.Marker({
            position: { lat: city.lat, lng: city.lng },
            map: map,
            title: city.name,
            icon: {
               path: google.maps.SymbolPath.CIRCLE,
               scale: 5,
               fillColor: "#ffffff",
               fillOpacity: 1,
               strokeWeight: 0,
            }
          });
        });
      }
    };

    if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        initMap();
    } else {
        console.warn("GOOGLE_MAPS_API_KEY is missing. Google Earth 3D map cannot load.");
    }
    
  }, []);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
     return (
        <div className="w-full h-[650px] md:h-[750px] bg-[#000510] flex items-center justify-center text-white flex-col gap-4 p-8 text-center">
            <h2 className="text-xl font-bold">Google Maps API Key Missing</h2>
            <p className="text-zinc-400">
                To view the 3D Google Earth experience, you need to add <code className="text-emerald-400">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> 
                and <code className="text-emerald-400">NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID</code> (Vector) to your environment variables.
            </p>
        </div>
     );
  }

  return (
    <div className="relative w-full h-[650px] md:h-[750px] bg-[#000510]">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Overlay Stats (Resued design) */}
      <div className="absolute top-6 left-6 glass-card rounded-2xl p-5" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>
        <h3 className="text-base font-semibold text-white mb-3">🌍 Travel Stats (3D)</h3>
        <div className="space-y-3">
          <div>
             <span className="text-zinc-300 text-sm">Visited: </span>
             <span className="text-emerald-400 font-mono font-semibold">{visitedCountries.length} / 195</span>
          </div>
        </div>
      </div>
    </div>
  );
}
