import React, { useCallback, useState } from 'react';
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

type MoodPickerProps = {
    onSelect: (mood: MoodOptionType) => void;
}

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
    const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
    const handleOptionSelected = useCallback(() => {
        if (selectedMood) {
            onSelect(selectedMood);
            setSelectedMood(undefined);
        }
    }, [onSelect, selectedMood]);
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>How are you right now?</Text>
            <View style={styles.moodList}>
                {moodOptions.map(option => (
                    <View key={option.emoji}>
                        <Pressable
                            onPress={() => setSelectedMood(option)}
                            style={
                                option.emoji === selectedMood?.emoji ?
                                    [styles.moodItem, styles.selectedMoodItem] :
                                    [styles.moodItem]
                            }
                        >
                            <Text style={styles.moodText}>{option.emoji}</Text>
                        </Pressable>
                        <Text style={styles.descriptionText}>
                            {selectedMood?.emoji === option.emoji ? option.description : ' '}
                        </Text>
                    </View>
                ))}
            </View>
            <Button disabled={Boolean(selectedMood)} title="Choose" onPress={handleOptionSelected} />
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
        marginHorizontal: 4,
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
        fontSize: 12,
        textAlign: 'center',
        fontFamily: theme.fontFamilyBold,
    },
    questionText: {
        fontSize: 24,
        fontFamily: theme.fontFamilyBold
    },
});
