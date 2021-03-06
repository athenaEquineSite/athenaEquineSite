import styles from '../styles/Contact.module.scss';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { googleKey } from '../utils/env';

const Map = () => {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleKey,
    });
    const [selectedMarker, setSelectedMarker] = useState(false);
    
    return (
        <div className={`${styles.mapWrapper}`}>
            {isLoaded && (
                <GoogleMap 
                mapContainerStyle={{width: "100%", height: "100%"}} 
                zoom={12} 
                center={{lat: 59.656156123275935, lng: 11.323922898606517}}>
                    <Marker 
                        position={{lat: 59.656156123275935, lng: 11.323922898606517}}
                        onClick={() => setSelectedMarker(true)}
                        icon={{
                            url: '/LOGO.png',
                            scaledSize: new google.maps.Size(50, 50)
                        }}
                    />
                    {selectedMarker && (
                        <InfoWindow position={{lat: 59.656156123275935, lng: 11.323922898606517}} onCloseClick={() => setSelectedMarker(false)}>
                            <div>
                                <h3 className={`${styles.infoWindowInfo}`}>Athena Equine AS</h3>
                                <p className={`${styles.infoWindowInfo}`}>Sluppenveien 125</p>
                                <p className={`${styles.infoWindowInfo}`}>1860 Trøgstad</p>
                                <p className={`${styles.infoWindowInfo}`}>Norge</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            )}      
        </div>
    )
}

export default Map;
