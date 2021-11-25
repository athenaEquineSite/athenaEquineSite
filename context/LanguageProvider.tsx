import { createContext, useState, useContext } from 'react';

const LangContext = createContext(false);
const LangUpdateContext = createContext(null!);

export const useLang = () => {
    return useContext(LangContext);
}

export const useLangUpdate = () => {
    return useContext(LangUpdateContext);
}

export const LanguageProvider = ({children}) => {
    const [isNor, setIsNor] = useState(false);

    const langIsNor = () => {
        setIsNor(true);
    }
    const langIsEng = () => {
        setIsNor(false);
    }
    

    return (
        <LangContext.Provider value={isNor}>
            <LangUpdateContext.Provider value={{langIsNor, langIsEng}}>
                {children}
            </LangUpdateContext.Provider>
        </LangContext.Provider>
    )
}