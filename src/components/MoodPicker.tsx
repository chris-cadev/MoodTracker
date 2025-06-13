import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MoodOptionType } from '../types';
import { Button } from './Button';
import { theme } from '../theme';

const moodOptions: MoodOptionType[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>How are you right now?</Text>
            <View style={styles.moodList}>
                {moodOptions.map(option => (
                    <View key={option.emoji}>
                        <Pressable
                            onPress={() => setSelectedMood(option)}
                            style={[
                                styles.moodItem,
                                option.emoji === selectedMood?.emoji
                                    ? styles.selectedMoodItem
                                    : undefined,
                            ]}
                        >
                            <Text style={styles.moodText}>{option.emoji}</Text>
                        </Pressable>
                        <Text style={styles.descriptionText}>
                            {selectedMood?.emoji === option.emoji ? option.description : ' '}
                        </Text>
                    </View>
                ))}
            </View>
            <Button title="Choose" onPress={console.log} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: theme.colorPurple,
        borderRadius: 8,
        marginHorizontal: 8,
        padding: 8,
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moodText: {
        fontSize: 24,
    },
    moodList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    moodItem: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 5,
    },
    selectedMoodItem: {
        borderWidth: 2,
        backgroundColor: theme.colorPurple,
        borderColor: theme.colorWhite,
    },
    descriptionText: {
        color: theme.colorPurple,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
    },
    questionText: {
        fontWeight: 'bold',
        fontSize: 24,
    },
});
