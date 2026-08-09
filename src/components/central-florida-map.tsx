export function CentralFloridaMap() {
  return <div className="area-map">
    <iframe
      aria-label="Map of Central Florida including Orlando, Sanford, Disney area and Port Canaveral"
      loading="lazy"
      src="https://www.openstreetmap.org/export/embed.html?bbox=-81.75%2C28.25%2C-80.45%2C28.95&amp;layer=mapnik"
      title="Central Florida service area map"
    />
    <div aria-hidden="true" className="map-overlay" />
    <span aria-hidden="true" className="map-marker marker-sfb"><i /><span><strong>SFB</strong><small>Sanford Airport</small></span></span>
    <span aria-hidden="true" className="map-marker marker-mco"><i /><span><strong>MCO</strong><small>Orlando International</small></span></span>
    <span aria-hidden="true" className="map-marker marker-disney"><i /><span><strong>Resorts</strong><small>Disney &amp; area hotels</small></span></span>
    <span aria-hidden="true" className="map-marker marker-port"><i /><span><strong>Port Canaveral</strong><small>Cruise terminal</small></span></span>
    <a className="map-attribution" href="https://www.openstreetmap.org/copyright" rel="noreferrer" target="_blank">© OpenStreetMap contributors</a>
  </div>;
}
