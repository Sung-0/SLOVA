import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [selectedSido, setSelectedSido] = useState(null);

    return (
        <SearchContext.Provider value={{
            selectedUnit, setSelectedUnit,
            selectedSido, setSelectedSido
        }}>
            {children}
        </SearchContext.Provider>
    );
};