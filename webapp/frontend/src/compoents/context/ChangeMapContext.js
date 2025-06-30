import { createContext, useContext, useState, useMemo } from 'react';

export const ChangeMapContext = createContext();

export const useChangeMap = () => useContext(ChangeMapContext);

export const ChangeMapProvider = ({ children }) => {

    const [mapType, setMapType] = useState('BASE'); //BASE or HYBRID

    const value = useMemo(() => ({ mapType, setMapType }), [mapType]);

    return(
        <ChangeMapContext.Provider value={value}>
            {children}
        </ChangeMapContext.Provider>
    );
};