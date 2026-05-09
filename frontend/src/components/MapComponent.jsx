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

export default function MapComponent({ reports = [], onMarkerClick = null, onMapClick = null, center = [-6.2088, 106.8456], zoom = 12 }) {
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
      // Remove existing markers
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []

      // Add new markers
      reports.forEach(report => {
        // Fallback untuk membaca data DB (antisipasi nama kolom)
        const lat = parseFloat(report.latitude || report.lat) || -6.2088
        const lng = parseFloat(report.longitude || report.lng) || 106.8456
        
        const kategori = report.jenis_gangguan || report.kategori || 'Laporan Masuk'
        const pelapor = report.pelapor_nama || report.nama || 'Warga'
        const imageUrl = report.image_url || report.foto
        const deskripsi = report.deskripsi || report.lokasi || 'Tidak ada deskripsi'
        const statusReport = report.status || 'Pending'

        const color = getMarkerColor(statusReport)
        const marker = L.marker([lat, lng], {
          icon: createMarkerIcon(color),
        })

        // Add popup with report info
        const popupContent = `
          <div style="width: 250px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="margin-bottom: 8px;">
              <span style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                ${statusReport}
              </span>
            </div>
            <div style="margin-bottom: 6px;">
              <strong>${kategori}</strong>
            </div>
            <div style="margin-bottom: 6px; font-size: 13px; color: #666;">
              <strong>Pelapor:</strong> ${pelapor}
            </div>
            <div style="margin-bottom: 6px; font-size: 13px; color: #666;">
              <strong>Deskripsi:</strong> ${deskripsi}
            </div>
            <div style="margin-bottom: 6px; font-size: 12px; color: #999;">
              <strong>ID:</strong> #${report.id}
            </div>
            ${imageUrl ? `<div style="margin-top: 8px;">
              <img src="${imageUrl}" style="width: 100%; border-radius: 4px; max-height: 150px; object-fit: cover; border: 1px solid #eee;" alt="Bukti Lapangan" />
            </div>` : ''}
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 280,
          maxHeight: 300,
        })

        marker.addTo(mapInstanceRef.current)
        markersRef.current.push(marker)

        // Handle marker click
        marker.on('click', () => {
          if (onMarkerClick) {
            onMarkerClick(report)
          }
        })
      })
    }
  }, [reports, onMarkerClick])

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