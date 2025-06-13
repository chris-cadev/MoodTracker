import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const moodOptions = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = () => {
    return (
        <View style={styles.moodList}>
            {moodOptions.map(option => (
                <Text style={styles.moodText} key={option.emoji}>{option.emoji}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    moodText: {
        fontSize: 24,
    },
    moodList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
})