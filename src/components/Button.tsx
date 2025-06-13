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
    onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
    return (
        <View style={styles.container}>
            <Pressable {...rest}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </View>
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
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',
    },
});
