import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Line, Defs, Marker, Polygon, G, Text as SvgText } from 'react-native-svg';

interface ForceVisualizerProps {
    q1: number;
    q2: number;
    r: number;
    force: number;
}

const ForceVisualizer: React.FC<ForceVisualizerProps> = ({ q1, q2, r, force }) => {
    const width = Dimensions.get('window').width - 40;
    const height = 200;
    const centerX = width / 2;
    const centerY = height / 2;

    // Escalar la distancia visual
    // r va de 1 a 20. Mapeamos a pixeles.
    // Visualmente queremos que se vea la separación.
    // Rango visual: 50px a 250px de separación total?
    const maxVisualSeparation = width - 100;
    const minVisualSeparation = 60;

    // Normalizar r entre 1 y 20
    const normalizedR = (r - 1) / (20 - 1);
    const separation = minVisualSeparation + normalizedR * (maxVisualSeparation - minVisualSeparation);

    const x1 = centerX - separation / 2;
    const x2 = centerX + separation / 2;

    // Determinar color basado en signo
    const color1 = q1 > 0 ? '#FF4136' : '#0074D9'; // Rojo positivo, Azul negativo
    const color2 = q2 > 0 ? '#FF4136' : '#0074D9';

    // Fuerza:
    // Si F > 0 (repulsión), flechas apuntan hacia afuera
    // Si F < 0 (atracción), flechas apuntan hacia adentro
    // La magnitud de la flecha podría escalar con log(abs(F)) para que no sea infinita

    const repulsion = force > 0;
    const arrowLength = 40; // Tamaño fijo para indicar dirección, la magnitud es texto

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Visualización de Cargas y Fuerzas</Text>
            <Svg height={height} width={width}>
                <Defs>
                    <Marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                    >
                        <Polygon points="0 0, 10 5, 0 10" fill="black" />
                    </Marker>
                </Defs>

                {/* Carga 1 */}
                <Circle cx={x1} cy={centerY} r="20" fill={color1} />
                <SvgText x={x1} y={centerY + 5} fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">q1</SvgText>

                {/* Carga 2 */}
                <Circle cx={x2} cy={centerY} r="20" fill={color2} />
                <SvgText x={x2} y={centerY + 5} fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">q2</SvgText>

                {/* Línea de distancia (opcional, o cota) */}
                <Line x1={x1} y1={centerY + 30} x2={x2} y2={centerY + 30} stroke="gray" strokeDasharray="4, 4" />
                <SvgText x={centerX} y={centerY + 45} fill="gray" fontSize="10" textAnchor="middle">d = {r}m</SvgText>

                {/* Vectores de Fuerza */}
                {/* Fuerza en q1 */}
                {repulsion ? (
                    // Flecha hacia la izquierda desde x1
                    <Line
                        x1={x1 - 25} y1={centerY}
                        x2={x1 - 25 - arrowLength} y2={centerY}
                        stroke="black"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                    />
                ) : (
                    // Flecha hacia la derecha desde x1
                    <Line
                        x1={x1 + 25} y1={centerY}
                        x2={x1 + 25 + arrowLength} y2={centerY}
                        stroke="black"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                    />
                )}

                {/* Fuerza en q2 */}
                {repulsion ? (
                    // Flecha hacia la derecha desde x2
                    <Line
                        x2={x2 + 25 + arrowLength} y2={centerY}
                        x1={x2 + 25} y1={centerY}
                        stroke="black"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                    />
                ) : (
                    // Flecha hacia la izquierda desde x2
                    <Line
                        x2={x2 - 25 - arrowLength} y2={centerY}
                        x1={x2 - 25} y1={centerY}
                        stroke="black"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                    />
                )}
            </Svg>
            <Text style={styles.forceText}>
                Fuerza: {force.toExponential(2)} N
                {repulsion ? ' (Repulsión)' : ' (Atracción)'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    forceText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForceVisualizer;
