import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";
import { secret } from "@aws-amplify/backend";


export default function MapsAPIProvider({ children }: { children: ReactNode }) {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
            {children}
        </APIProvider>
    )
}