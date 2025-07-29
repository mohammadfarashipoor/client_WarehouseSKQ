function MapLink(props,) {
    const { lat, lng,children } = props
  // لینک باز شدن در مرورگر (گوگل مپس وب)
  const webUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <a
      href={webUrl}
      target="_blank"
      rel="noopener noreferrer"
   
    >
      {children || `${lat.toFixed(5)}, ${lng.toFixed(5)}`}
    </a>
  );
}
export default MapLink