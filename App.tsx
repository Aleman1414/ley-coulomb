import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import ControlPanel from './components/ControlPanel';
import ForceVisualizer from './components/ForceVisualizer';
import GraphVisualizer from './components/GraphVisualizer';

export default function App() {
  const [q1, setQ1] = useState<number>(1); // Carga en microCoulombs
  const [q2, setQ2] = useState<number>(-1); // Carga en microCoulombs
  const [r, setR] = useState<number>(5); // Distancia en metros
  const [force, setForce] = useState<number>(0);

  const K = 9e9; // Constante de Coulomb

  useEffect(() => {
    // Calculo de Fuerza
    // F = k * (q1 * q2) / r^2
    // Convertir microCoulombs a Coulombs (1e-6)
    const q1C = q1 * 1e-6;
    const q2C = q2 * 1e-6;
    const f = (K * q1C * q2C) / (r * r);
    setForce(f);
  }, [q1, q2, r]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Simulador Ley de Coulomb</Text>

        <ForceVisualizer q1={q1} q2={q2} r={r} force={force} />

        <ControlPanel
          q1={q1} setQ1={setQ1}
          q2={q2} setQ2={setQ2}
          r={r} setR={setR}
        />

        <GraphVisualizer q1={q1} q2={q2} currentR={r} />

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',
  }
});
