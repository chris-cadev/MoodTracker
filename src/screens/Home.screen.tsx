import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

export const Home: React.FC = () => {
    const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([])
    const handleMoodSelected = useCallback((mood: MoodOptionType) => {
        console.log({ mood });
        setMoodList((current) => [...current, { mood, timestamp: Date.now() }])
    }, [setMoodList]);
    return (
        <View style={styles.container}>
            <MoodPicker onSelect={handleMoodSelected} />
            {moodList.map((item) => (
                <Text key={item.timestamp}>
                    {item.mood.emoji} {new Date(item.timestamp).toString()}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});