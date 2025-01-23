"use client";

import {
    Map,
    AdvancedMarker,
    InfoWindow,
    MapControl,
    ControlPosition
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import placeGroups from "../data/places";
import { Button } from "@heroui/button";
import MapsAPIProvider from "@/components/MapsAPIProvider/MapsAPIProvider";

export default function Groups() {
    const position = { lat: 36.34109426533658, lng: -86.53533220690348 };
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Barbecue");
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <MapsAPIProvider>
            <div style={{ height: '100vh' }}>
                <Map 
                    defaultZoom={15} 
                    defaultCenter={position} 
                    mapId={process.env.NEXT_PUBLIC_MAP_ID}
                >
                    {
                        placeGroups.map(placeGroup => {
                            if (placeGroup.category === selected) {
                                return placeGroup.places.map(point => (
                                    <AdvancedMarker position={point} key={point.key}></AdvancedMarker>
                                ))
                            }
                        })
                    }

                    { open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}><p>Hamburg</p></InfoWindow> }
                </Map>
                {isLoaded &&
                <MapControl position={ControlPosition.TOP}>
                    <div style={{ padding: '10px 0', display: 'flex', gap: '10px'}}>
                        <Button color="primary" onPress={() => setSelected("Barbecue")}>Barbecue</Button>
                        <Button color="primary" onPress={() => setSelected("Fancy")}>Fancy</Button>
                    </div>
                </MapControl>}
            </div>
        </MapsAPIProvider>
    );
}
