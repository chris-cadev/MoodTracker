import React, { createContext, useCallback, useContext, useState } from "react";
import { MoodOptionType, MoodOptionWithTimestamp } from "./types";

type AppContextType = {
    moodHistory: MoodOptionWithTimestamp[];
    addMood: (mood: MoodOptionType) => void;
}

const defaultValue: AppContextType = {
    moodHistory: [],
    addMood: () => undefined,
}

const AppContext = createContext<AppContextType>(defaultValue);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [moodHistory, setMoodHistory] = useState<MoodOptionWithTimestamp[]>([]);
    const addMood = useCallback((mood: MoodOptionType) => {
        setMoodHistory((current) => [...current, { mood, timestamp: Date.now() }]);
    }, [setMoodHistory]);
    return <AppContext.Provider value={{ moodHistory, addMood }}>
        {children}
    </AppContext.Provider>
}