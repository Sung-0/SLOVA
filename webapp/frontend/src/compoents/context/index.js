import { MapProvider } from "./MapContext";
import { RegionProvider } from "./RegionContext";

export const AppContextProvider = ({ children }) => {
    return (
        <MapProvider>
            <RegionProvider>
                {children}
            </RegionProvider>
        </MapProvider>
    );
};