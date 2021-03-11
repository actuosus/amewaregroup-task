import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";

interface MapProps {}

const Map = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAds04PD5ogZv5x0pd6rG5lXi8Bh0TtH5o&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props: MapProps) => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  );
});

export default Map;
