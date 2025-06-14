import React from 'react';
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
}

export const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
    return (
        <Pressable {...rest}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
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
