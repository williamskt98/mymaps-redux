"use client";

type RawPlace = [string, number, number];
type RawPlaceGroup = [string, Place[]];

type Place = {
  key: string;
  name: string;
  lat: number;
  lng: number;
};

type PlaceGroup = {
    key: string;
    category: string;
    places: Place[];
}

const places: RawPlace[] = [
    ["Edley's Bar-B-Que", 36.34109426533658, -86.53344393185215],
    ["Alberto's", 36.341958471987326, -86.5136170438133],
    ["Chocolate Covered Strawberry", 36.335390260936265, -86.54387235997649],
];

const placeGroups: PlaceGroup[] = [
    {key: "bbq", category: "Barbecue", places: [{key: "edleys", name: "Edley's Bar-B-Que", lat: 36.34109426533658, lng: -86.53344393185215}]},
    {key: "fancy", category: "Fancy", places: [
        {key: "albertos", name: "Alberto's", lat: 36.341958471987326, lng: -86.5136170438133},
        {key: "chostraw", name: "Chocolate Covered Strawberry", lat: 36.335390260936265, lng: -86.54387235997649}
    ]}
]

const placeGroups_new: { [key: string]: Place[] } = {
    bbq: [
        {key: "edleys", name: "Edley's Bar-B-Que", lat: 36.34109426533658, lng: -86.53344393185215}
    ],
    fancy: [
        {key: "albertos", name: "Alberto's", lat: 36.341958471987326, lng: -86.5136170438133},
        {key: "chostraw", name: "Chocolate Covered Strawberry", lat: 36.335390260936265, lng: -86.54387235997649}
    ]
}

const addToPlaceGroup = ({ place }: { place: Place }) => {
}

const formatted_: Place[] = places.map(([name, lat, lng]) => ({
  name,
  lat,
  lng,
  key: JSON.stringify({ name, lat, lng }),
}));

export default placeGroups;