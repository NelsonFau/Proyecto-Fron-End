import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const Mapa = () => {
  const containerStyle = {
    width: "800px",
    height: "600px",
  };

  const centroInicial = {
    lat: -34.474,
    lng: -57.848,
  }; // Ubicación en Uruguay

  const [mapa, setMapa] = useState(null);
  const [marcaDePosicion, setMarcaDePosicion] = useState(centroInicial);
  const autocompletarReferencia = useRef(null);

  const handleMapClick = (evento) => {
    const posicionClikeada = {
      lat: evento.latLng.lat(),
      lng: evento.latLng.lng(),
    };
    setMarcaDePosicion(posicionClikeada);
    console.log("Coordenadas seleccionadas:", posicionClikeada);
  };

  const onLoadAutocompletar = (autocompletar) => {
    autocompletarReferencia.current = autocompletar;
  };

  const onPlaceChanged = () => {
    if (autocompletarReferencia.current !== null) {
      const lugar = autocompletarReferencia.current.getPlace();
      if (lugar.geometry && lugar.geometry.location) {
        const ubicacion = lugar.geometry.location;
        const nuevoCentro = {
          lat: ubicacion.lat(),
          lng: ubicacion.lng(),
        };
        setMarcaDePosicion(nuevoCentro);
        if (mapa) {
          mapa.panTo(nuevoCentro);
        }
      }
    } else {
      console.log("Autocomplete no se ha cargado aún");
    }
  };

  return (
    <LoadScript 
    googleMapsApiKey='AIzaSyDsFEUklTIKL5EMw_CBS_cosUq9g_zvSm4' 
    libraries={["places"]}>
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        {/* Buscador de lugares */}
        <div className="mb-3" style={{ width: "800px" }}>
          <Autocomplete onLoad={onLoadAutocompletar} onPlaceChanged={onPlaceChanged}>
            <input type="text" placeholder="Buscar lugar..." className="form-control" />
          </Autocomplete>
        </div>

        {/* Mapa de Google */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={marcaDePosicion}
          zoom={15}
          onClick={handleMapClick}
          onLoad={(instanciaMapa) => setMapa(instanciaMapa)}
        >
          <Marker position={marcaDePosicion} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Mapa;