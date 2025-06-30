import { MapProvider } from "./MapContext";
import { RegionProvider } from "./RegionContext";
import { LandslideProvider } from "./LandslideContext";
import { ChangeMapProvider } from "./ChangeMapContext";
import { MarkProvider } from "./MarkContext";
import { SidebarProvider } from "./SidebarContext";
import { SearchProvider } from "./SearchContext";

export const AppContextProvider = ({ children }) => {
    return (
        <MapProvider>
            <MarkProvider>
                <SidebarProvider>
                    <LandslideProvider>
                        <RegionProvider>
                            <ChangeMapProvider>
                                <SearchProvider>
                                    {children}
                                </SearchProvider>
                            </ChangeMapProvider>
                        </RegionProvider>
                    </LandslideProvider>
                </SidebarProvider>
            </MarkProvider>
        </MapProvider>
    );
};