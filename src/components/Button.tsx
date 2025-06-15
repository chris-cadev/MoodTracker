import React from 'react';
import Reanimated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { theme } from '../theme';

interface ButtonProps extends PressableProps {
    title: string;
    disabled?: boolean;
}

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({ title, disabled, ...rest }) => {
    const buttonStyle = useAnimatedStyle(
        () => ({
            opacity: disabled ? withTiming(1, { duration: 100 }) : withTiming(0.5, { duration: 100 }),
            transform: [{ scale: disabled ? withTiming(1, { duration: 100 }) : withTiming(0.8, { duration: 100 }) }],
        }),
        [disabled],
    );
    return (
        <ReanimatedPressable {...rest} style={buttonStyle}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </ReanimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 48,
        paddingVertical: 8,
        backgroundColor: theme.colorPurple,
        borderRadius: 30,
    },
    text: {
        color: theme.colorWhite,
        fontFamily: theme.fontFamilyBold,
        fontSize: 12,
        textAlign: 'center',
    },
});
