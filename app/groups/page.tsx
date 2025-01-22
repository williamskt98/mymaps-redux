"use client";

import {
    Map,
    AdvancedMarker,
    InfoWindow
} from "@vis.gl/react-google-maps";
import { useState } from "react";
import placeGroups from "../../data/places";
import "./groups.css";
import { Button } from "@heroui/button";
import MapsAPIProvider from "@/components/MapsAPIProvider/MapsAPIProvider";

export default function Groups() {
    const position = { lat: 36.34109426533658, lng: -86.53533220690348 };
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Barbecue");

    return (
        <MapsAPIProvider>
            <div style={{ height: '90vh' }}>
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
                            /*if (placeGroup.category === selected) {
                                placeGroup.places.map(point => (
                                    <AdvancedMarker position={point} key={point.key}></AdvancedMarker>
                                ))
                            }*/
                        })
                        /*places.map(point => (
                            <AdvancedMarker position={point} key={point.key}></AdvancedMarker>
                        ))*/
                    }

                    { open && <InfoWindow position={position} onCloseClick={() => setOpen(false)}><p>Hamburg</p></InfoWindow> }
                </Map>
            </div>
            <div className="">
                <Button color="primary" onPress={() => setSelected("Barbecue")}>Barbecue</Button>
                <Button color="primary" onPress={() => setSelected("Fancy")}>Fancy</Button>
            </div>
        </MapsAPIProvider>
    );
}