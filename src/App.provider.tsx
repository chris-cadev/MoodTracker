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
    deleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const defaultValue: AppContextType = {
    moodHistory: [],
    addMood: () => undefined,
    deleteMood: () => undefined,
};

const AppContext = createContext<AppContextType>(defaultValue);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const [moodHistory, setMoodHistory] = useState<MoodOptionWithTimestamp[]>([]);
    const handleAddMood = useCallback(
        (mood: MoodOptionType) => {
            setMoodHistory(current => {
                const moods = [...current, { mood, timestamp: Date.now() }];
                setAppData({ moods });
                return moods;
            });
        },
        [setMoodHistory],
    );
    const handleDeleteMood = useCallback(
        (mood: MoodOptionWithTimestamp) => {
            setMoodHistory(current => {
                const moods = current.filter(item => item.timestamp !== mood.timestamp);
                setAppData({ moods });
                return moods;
            });
        },
        [setMoodHistory],
    );
    useEffect(() => {
        getAppData().then(data => {
            if (data?.moods) setMoodHistory(data?.moods);
        });
    }, [setMoodHistory]);
    const value = useMemo(
        () => ({
            moodHistory,
            addMood: handleAddMood,
            deleteMood: handleDeleteMood,
        }),
        [moodHistory, handleAddMood, handleDeleteMood],
    );
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
