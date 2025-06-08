import { createContext, useContext, useState } from 'react';

export const ChangeMapContext = createContext();

export const useChangeMap = () => useContext(ChangeMapContext);

export const ChangeMapProvider = ({ children }) => {
    const [mapType, setMapType] = useState('BASE'); //BASE or HYBRID

    return(
        <ChangeMapContext.Provider value={{ mapType, setMapType}}>
            {children}
        </ChangeMapContext.Provider>
    );
};