import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface ControlPanelProps {
  q1: number;
  setQ1: (val: number) => void;
  q2: number;
  setQ2: (val: number) => void;
  r: number;
  setR: (val: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ q1, setQ1, q2, setQ2, r, setR }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parámetros de Simulación</Text>
      
      <View style={styles.controlGroup}>
        <Text style={styles.label}>Carga q1: {q1.toFixed(1)} µC</Text>
        <Slider
          style={styles.slider}
          minimumValue={-10}
          maximumValue={10}
          step={0.1}
          value={q1}
          onValueChange={setQ1}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#d3d3d3"
        />
      </View>

      <View style={styles.controlGroup}>
        <Text style={styles.label}>Carga q2: {q2.toFixed(1)} µC</Text>
        <Slider
          style={styles.slider}
          minimumValue={-10}
          maximumValue={10}
          step={0.1}
          value={q2}
          onValueChange={setQ2}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#d3d3d3"
        />
      </View>

      <View style={styles.controlGroup}>
        <Text style={styles.label}>Distancia r: {r.toFixed(1)} m</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          step={0.1}
          value={r}
          onValueChange={setR}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#d3d3d3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  controlGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default ControlPanel;
