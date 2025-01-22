"use client";

import { 
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow
} from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function Intro() {
    const position = { lat: 53.54, lng: 10 };
    const [open, setOpen] = useState(false);

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            <div style={{ height: '100vh' }}>
                <Map 
                    defaultZoom={9} 
                    defaultCenter={position} 
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                >
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                    </AdvancedMarker>

                    { open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}><p>Hamburg</p></InfoWindow> }
                </Map>
            </div>
        </APIProvider>
    );
}