import React, { useCallback } from 'react';
import { MoodOptionWithTimestamp } from '../types';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { theme } from '../theme';
import { useAppContext } from '../App.provider';
import Reanimated, {
    Easing,
    LinearTransition,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type MoodItemRowProps = {
    item: MoodOptionWithTimestamp;
};

const MAX_PAN = 80;

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
    const { deleteMood } = useAppContext();
    const offset = useSharedValue(0);
    const handleDeletePress = useCallback(() => {
        deleteMood(item);
    }, [deleteMood, item]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const pan = Gesture.Pan()
        .onUpdate(e => {
            offset.value = Math.floor(e.translationX);
        })
        .onEnd(() => {
            const { value } = offset;
            const absOffset = Math.abs(value);
            const direction = Math.sign(value);

            if (absOffset > MAX_PAN) {
                offset.value = withTiming(direction * 2000, {}, () => {
                    runOnJS(handleDeletePress)();
                });
                return;
            }
            offset.value = withTiming(0);
        });

    return (
        <GestureDetector gesture={pan}>
            <Reanimated.View
                layout={LinearTransition.easing(Easing.ease)}
                style={[styles.moodItem, animatedStyle]}
            >
                <View style={styles.iconAndDescription}>
                    <Text style={styles.moodValue}>{item.mood.emoji}</Text>
                    <Text style={styles.moodDescription}>{item.mood.description}</Text>
                </View>
                <Text style={styles.moodDate}>
                    {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
                </Text>
                <Pressable hitSlop={16} onPress={handleDeletePress}>
                    <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
            </Reanimated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    moodValue: { textAlign: 'center', fontSize: 40, marginRight: 10 },
    moodDate: {
        textAlign: 'center',
        color: theme.colorLavender,
        fontFamily: theme.fontFamilyRegular,
    },
    moodItem: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moodDescription: {
        fontSize: 18,
        color: theme.colorPurple,
        fontFamily: theme.fontFamilyBold,
    },
    iconAndDescription: { flexDirection: 'row', alignItems: 'center' },
    deleteText: { color: theme.colorBlue, fontFamily: theme.fontFamilyLight },
});
