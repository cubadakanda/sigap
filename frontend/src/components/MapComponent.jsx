import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Helper function to get marker color based on status
const getMarkerColor = (status) => {
  const s = (status || '').toLowerCase()
  switch (s) {
    case 'pending':
      return '#FBBF24' // amber/yellow
    case 'diproses':
      return '#3B82F6' // blue
    case 'selesai':
      return '#10B981' // green
    default:
      return '#6B7280' // gray
  }
}

// Create custom marker icon
const createMarkerIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="color: white; font-size: 14px; font-weight: bold;">+</span>
      </div>
    `,
    iconSize: [30, 30],
    popupAnchor: [0, -15],
  })
}

export default function MapComponent({ reports = [], onMarkerClick = null, onMapClick = null, center = [-6.9147, 107.6098], zoom = 10 }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapInstanceRef.current || !onMapClick) {
      return
    }

    const map = mapInstanceRef.current
    const handleClick = (event) => {
      onMapClick(event.latlng, map)
    }

    map.on('click', handleClick)
    return () => {
      map.off('click', handleClick)
    }
  }, [onMapClick])

  useEffect(() => {
    // Initialize map
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView(center, zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '(c) OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map
    }

    return () => {
      // Cleanup
      if (mapInstanceRef.current) {
        markersRef.current.forEach(marker => marker.remove())
        markersRef.current = []
      }
    }
  }, [center, zoom])

  useEffect(() => {
    // Update markers when reports change
    if (mapInstanceRef.current) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      reports.forEach(report => {
        // 1. Tentukan titik awal (Default: Bandung agar tidak jauh-jauh)
        let finalLat = -6.9147; 
        let finalLng = 107.6098;
        let isCoordValid = false;

        // 2. Coba baca koordinat murni
        if (report.latitude && report.longitude) {
          finalLat = parseFloat(report.latitude);
          finalLng = parseFloat(report.longitude);
          isCoordValid = true;
        } 
        // 3. Coba bongkar teks "Koordinat: -6.xxx, 107.xxx"
        else if (report.lokasi && report.lokasi.includes(',')) {
          // Kita bersihkan teks "Koordinat:" dan spasi
          const cleanedText = report.lokasi.replace(/[a-zA-Z:\s]/g, ''); 
          const parts = cleanedText.split(',');
          
          if (parts.length >= 2) {
            const pLat = parseFloat(parts[0]);
            const pLng = parseFloat(parts[1]);
            if (!isNaN(pLat) && !isNaN(pLng)) {
              finalLat = pLat;
              finalLng = pLng;
              isCoordValid = true;
            }
          }
        }

        // 4. HANYA buat marker jika koordinat valid (Mencegah marker numpuk di Jakarta)
        if (isCoordValid) {
          const color = getMarkerColor(report.status || 'Pending');
          const marker = L.marker([finalLat, finalLng], {
            icon: createMarkerIcon(color),
          });

          const popupContent = `
            <div style="width: 220px;">
              <strong style="color: ${color}; text-transform: uppercase;">${report.status || 'PENDING'}</strong><br/>
              <b>${report.jenis_gangguan || 'Gangguan'}</b><br/>
              <small>${report.lokasi}</small>
              ${(report.image_url || report.foto) ? `<img src="${report.image_url || report.foto}" style="width:100%; border-radius:5px; margin-top:8px;"/>` : ''}
            </div>
          `;

          marker.bindPopup(popupContent);
          marker.addTo(mapInstanceRef.current);
          markersRef.current.push(marker);
        }
      });
    }
  }, [reports, onMarkerClick]);

  return (
    <div 
      ref={mapRef} 
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        zIndex: 0 // Mencegah peta menutupi modal/navbar
      }}
      className="map-container"
    />
  )
}