'use client';

import MapsAPIProvider from "@/components/MapsAPIProvider/MapsAPIProvider";
import { AdvancedMarker, ControlPosition, InfoWindow, Map, MapControl, Pin, useAdvancedMarkerRef, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useReducer, useRef, useState } from "react";
import "./places.css"
import { Button } from "@heroui/button";

export default function Places() {
    const [selectedPlace, setSelectedPlace] = 
        useState<google.maps.places.PlaceResult | null>(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const placeGroups: { [key: string]: google.maps.places.PlaceResult[] } = {
        bbq: [],
        fancy: []
    }

    type GroupAction = {
        type: string;
        category: string;
        place: google.maps.places.PlaceResult | null;
    }

    const newReducer = (state: {[key: string]: google.maps.places.PlaceResult[]}, action: GroupAction) => {
        const {type, category, place} = action;

        if (!place) return state;
        
        switch(type.toLowerCase()) {
            case "add":
                state[category].push(place);
                console.log(state);
                return state;
            default:
                return state;
        }
    }

    const [groups, dispatch] = useReducer(newReducer, placeGroups);
    

    useEffect(() => {
        setIsLoaded(true);
    }, []);



    return (
        <MapsAPIProvider>
            <div style={{ height: '100vh' }}>
            <Map
                mapId={process.env.NEXT_PUBLIC_MAP_ID as string}
                defaultZoom={12}
                defaultCenter={{ lat: 36.16114350219613, lng: -86.77828049526792}}
                gestureHandling={'greedy'}
            >
                <AdvancedMarker ref={markerRef} position={null} onClick={() => setIsOpen(true)} />
                {isOpen && 
                    <InfoWindow anchor={marker} onCloseClick={() => setIsOpen(false)}>
                        <Button 
                            color="primary"
                            onPress={() => dispatch({type: "add", category: "bbq", place: selectedPlace})}
                        >
                            Add to BBQ
                        </Button>
                        <Button 
                            color="primary"
                            onPress={() => dispatch({type: "add", category: "fancy", place: selectedPlace})}
                        >
                            Add to Fancy
                        </Button>
                    </InfoWindow>
                }
                {
                    Object.keys(groups).map(category => {
                        if (category === "bbq") {
                            return (
                            groups[category].map(place => (
                                <AdvancedMarker position={place.geometry?.location} key={place.place_id}><Pin background={"blue"}/></AdvancedMarker>
                            )))
                        } else if (category === "fancy") {
                            return (
                            groups[category].map(place => (
                                <AdvancedMarker position={place.geometry?.location} key={place.place_id}><Pin background={"green"}/></AdvancedMarker>
                            )))
                        }
                        return <></>
                    })
                }
            </Map>
            {isLoaded && 
                <MapControl position={ControlPosition.TOP_CENTER}>
                    <div className="autocomplete-control">
                        <PlaceAutocomlete onPlaceSelect={setSelectedPlace} />
                    </div>
                </MapControl>
            }
            <MapHandler place={selectedPlace} marker={marker} />
            
            </div>
        </MapsAPIProvider>
    );
};

interface MapHandlerProps {
    place: google.maps.places.PlaceResult | null;
    marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place || !marker) return;

        // Fit boundary of map to bounds described in place
        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }
        // Set parker position to place result position
        marker.position = place.geometry?.location;
        if (place.geometry?.location) {
            map.setCenter(place.geometry.location)
        }
    }, [map, place, marker]);

    return null;
}

interface PlaceAutocompleteProps {
    onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomlete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
    const [placeAutocomplete, setPlaceAutocomplete] = 
        useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const places = useMapsLibrary('places');

    // When places changes, set placeAutocomplete to new place
    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['geometry', 'name', 'formatted_address']
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    // When placeAutocomplete changes, setSelectedPlace to placeAutocomplete
    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener('place_changed', () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete])

    return (
        <div className="autocomplete-container">
            <input ref={inputRef} />
        </div>
    );
};

