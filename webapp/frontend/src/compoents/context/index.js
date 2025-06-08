import { MapProvider } from "./MapContext";
import { RegionProvider } from "./RegionContext";
import { LandslideProvider } from "./LandslideContext";
import { ChangeMapProvider } from "./ChangeMapContext";
import { MarkProvider } from "./MarkContext";

export const AppContextProvider = ({ children }) => {
    return (
        <MapProvider>
            <MarkProvider>
                <LandslideProvider>
                    <RegionProvider>
                        <ChangeMapProvider>
                            {children}
                        </ChangeMapProvider>
                    </RegionProvider>
                </LandslideProvider>
            </MarkProvider>
        </MapProvider>
    );
};