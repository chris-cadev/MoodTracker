import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History: React.FC = () => {
    const { moodHistory } = useAppContext();
    return (
        <View style={styles.container}>
            {moodHistory.map((item) => (
                <MoodItemRow key={item.timestamp} item={item} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});