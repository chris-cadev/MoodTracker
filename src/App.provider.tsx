import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';

const storageKey = 'mood-tracker-app';

type AppData = {
    moods: MoodOptionWithTimestamp[];
};

const getAppData = async (): Promise<AppData | null> => {
    try {
        const data = await AsyncStorage.getItem(storageKey);

        if (data) {
            return JSON.parse(data);
        }
        return null;
    } catch {
        return null;
    }
};

const setAppData = async (newData: AppData) => {
    try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
    } catch { }
};

type AppContextType = {
    moodHistory: MoodOptionWithTimestamp[];
    addMood: (mood: MoodOptionType) => void;
};

const defaultValue: AppContextType = {
    moodHistory: [],
    addMood: () => undefined,
};

const AppContext = createContext<AppContextType>(defaultValue);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const [moodHistory, setMoodHistory] = useState<MoodOptionWithTimestamp[]>([]);
    const addMood = useCallback(
        (mood: MoodOptionType) => {
            setMoodHistory(current => {
                const moods = [...current, { mood, timestamp: Date.now() }];
                setAppData({ moods });
                return moods;
            });
        },
        [setMoodHistory],
    );
    useEffect(() => {
        getAppData().then((data) => {
            if (data?.moods)
                setMoodHistory(data?.moods)
        });
    }, [setMoodHistory])
    const value = useMemo(
        () => ({ moodHistory, addMood }),
        [moodHistory, addMood],
    );
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
