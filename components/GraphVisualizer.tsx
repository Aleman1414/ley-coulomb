import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface GraphVisualizerProps {
    q1: number;
    q2: number;
    currentR: number;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ q1, q2, currentR }) => {
    const screenWidth = Dimensions.get('window').width - 40;

    // Generar datos para la gráfica F vs r
    // r varía de 1 a 20
    const k = 9e9;
    const labels: string[] = [];
    const validData: number[] = [];

    // Puntos de muestreo
    const steps = [1, 5, 10, 15, 20];

    steps.forEach((r) => {
        labels.push(r.toString());
        const f = (k * Math.abs(q1 * 1e-6 * q2 * 1e-6)) / (r * r);
        validData.push(f);
    });

    // Asegurar que no sea NaN o Infinito (aunque con r>=1 estamos a salvo)
    const data = {
        labels: labels,
        datasets: [
            {
                data: validData.map(v => (v > 1000 ? 1000 : v)), // Cap visual para evitar escala loca si q1,q2 son grandes y r es pequeño
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Fuerza vs Distancia"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gráfica Magnitud Fuerza vs Distancia (r)</Text>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <Text style={styles.note}>Nota: La gráfica muestra la tendencia teórica 1/r².</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20
    },
    title: {
        fontWeight: '600',
        marginBottom: 5
    },
    note: {
        fontSize: 10,
        color: 'gray'
    }
});

export default GraphVisualizer;
