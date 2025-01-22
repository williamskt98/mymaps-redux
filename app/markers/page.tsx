"use client";

import {
    Map,
    useMap,
    AdvancedMarker
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";
import { useEffect, useState, useRef } from "react";
import trees from "../../data/trees";
import MapsAPIProvider from "@/components/MapsAPIProvider/MapsAPIProvider";

export default function Intro() {
    return (
        <div style={{height: '100vh'}}>
            <MapsAPIProvider>
                <Map defaultCenter={{ lat: 43.64, lng: -79.41 }} defaultZoom={10} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
                    <Markers points={trees}/>
                </Map>
            </MapsAPIProvider>
        </div>
    );
}

type Point = google.maps.LatLngLiteral & { key: string };
type Props = { points: Point[] };

const Markers = ({ points }: Props) => {
    const map = useMap();
    const [ markers, setMarkers ] = useState<{ [key: string]: Marker }>({})
    const clusterer = useRef<MarkerClusterer | null>(null);

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers))
    }, [markers])

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev) => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = {...prev};
                delete newMarkers[key];
                return newMarkers;
            }
        })
    };

    console.log(markers);

    return (
        <>
            {points.map(point => (
                <AdvancedMarker position={point} key={point.key} ref={(marker) => setMarkerRef(marker, point.key)}>
                    <span style={{fontSize: '2rem'}}>🌳</span>
                </AdvancedMarker>
            ))}
        </>
    );
}