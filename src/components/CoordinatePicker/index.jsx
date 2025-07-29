import { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

export default function CoordinatePicker({
  width = "100%",
  height = "400px",
  defaultPosition = [35.6892, 51.3890],
  zoom = 12,
  value,
  onChange,
  onAddressChange
}) {
  const [pos, setPos] = useState(value || defaultPosition);
  const [address, setAddress] = useState("");

  // همگام‌سازی prop value با state داخلی
  useEffect(() => {
    if (value) setPos(value);
  }, [value]);

  // reverse-geocoding با axios و کوتاه‌سازی display_name
  useEffect(() => {
    if (!pos) return;

    setAddress("در حال دریافت...");

    const controller = new AbortController();
    axios
      .get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat: pos[0],
          lon: pos[1],
          format: "jsonv2",
          "accept-language": "fa"
        },
        signal: controller.signal
      })
      .then(({ data }) => {
        // اگر display_name خالی نبود، جدا کن و آخرین تکه (کشور) رو حذف کن
        const raw = data.display_name || "";
        const parts = raw.split(",").map(p => p.trim());
        // حذف آخرین قسمت (country)
        const filtered = parts.slice(0, parts.length - 5);
        const shortName = filtered.join(", ");
        setAddress(shortName);
        onAddressChange?.(shortName);
      })
      .catch((err) => {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        setAddress("آدرس یافت نشد");
        onAddressChange?.("آدرس یافت نشد");
      });

    return () => controller.abort();
  }, [pos, onAddressChange]);

  // کلیک روی نقشه برای انتخاب مختصات
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const coords = [e.latlng.lat, e.latlng.lng];
        setPos(coords);
        onChange?.(coords);
      }
    });
    return pos ? <Marker position={pos} /> : null;
  }

  // کنترل جستجو
  function SearchControl() {
    const map = useMapEvents({});
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const control = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: false
      });
      map.addControl(control);
      map.on("geosearch/showlocation", (e) => {
        const coords = [e.location.y, e.location.x];
        setPos(coords);
        onChange?.(coords);
      });
      return () => map.removeControl(control);
    }, [map]);
    return null;
  }

  return (
    <div style={{ width, height }} className="rounded overflow-hidden">
      <MapContainer center={pos} zoom={zoom} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchControl />
        <LocationMarker />
      </MapContainer>
      <p className="mt-2 text-sm text-gray-700">
        آدرس: {address}
      </p>
    </div>
  );
}
