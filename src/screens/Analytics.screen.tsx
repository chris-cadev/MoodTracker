import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../App.provider';
import { groupBy } from 'lodash';
import { PieChart } from 'react-native-gifted-charts';

function emojiToColor(emoji: string): string {
    const emojiColorMap: Record<string, string> = {
        '🧑‍💻': '#4A90E2',
        '🤔': '#F5A623',
        '😊': '#F8E71C',
        '🥳': '#50E3C2',
        '😤': '#D0021B',
    };

    return emojiColorMap[emoji] || '#888888';
}

export const Analytics: React.FC = () => {
    const { moodHistory } = useAppContext();
    const data = Object.entries(groupBy(moodHistory, 'mood.emoji')).map(
        ([label, value]) => ({
            text: `${label} ${value.length}`,
            value: value.length,
            color: emojiToColor(label),
        }),
    );
    return (
        <View style={styles.container}>
            <PieChart
                donut
                radius={150}
                innerRadius={70}
                textSize={16}
                textColor="#fff"
                fontWeight="700"
                data={data}
                showText
                showGradient
                innerCircleColor="#1e1e1e"
                centerLabelComponent={() => (
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
                        Total{'\n'}{data.reduce((a, b) => a + b.value, 0)}
                    </Text>
                )}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
});
