import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Magnetometer } from 'expo-sensors';

// Import your logo image
import LogoImage from './assets/magnetometer.png'; // Update with your logo file path

export default function App() {
  const [magnetometerData, setMagnetometerData] = useState({});
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);
  const [isSensorActive, setIsSensorActive] = useState(false);

  useEffect(() => {
    // Check if magnetometer sensor is available
    Magnetometer.isAvailableAsync().then(result => {
      setIsSensorAvailable(result);
    });
  }, []);

  const toggleSensor = () => {
    if (isSensorActive) {
      Magnetometer.removeAllListeners();
      setIsSensorActive(false);
    } else {
      Magnetometer.setUpdateInterval(100); // Update interval in milliseconds
      const subscription = Magnetometer.addListener(result => {
        setMagnetometerData(result);
      });
      setIsSensorActive(true);
    }
  };

  const { x, y, z } = magnetometerData;

  return (
    <View style={styles.container}>
      {/* Logo and Title Section */}
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Magnetometer</Text>
      </View>

      {/* Magnetometer Data Section */}
      <View style={styles.magnetometerData}>
        <Text style={styles.text}>Magnetometer Data:</Text>
        <Text style={styles.text}>X: {x ? x.toFixed(2) : '?'}</Text>
        <Text style={styles.text}>Y: {y ? y.toFixed(2) : '?'}</Text>
        <Text style={styles.text}>Z: {z ? z.toFixed(2) : '?'}</Text>
      </View>

      {/* Sensor Control Section */}
      <View style={styles.buttonContainer}>
        <Button
          title={isSensorActive ? 'Stop Sensor' : 'Start Sensor'}
          onPress={toggleSensor}
          disabled={!isSensorAvailable}
        />
        <Text style={styles.statusText}>
          Sensor Status: {isSensorAvailable ? (isSensorActive ? 'Active' : 'Inactive') : 'Unavailable'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40, // Add padding top to create space at the top
    position: 'relative', // Position relative for absolute positioning
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'right',
    position: 'absolute', // Position absolute to overlay on the top-right corner
    top: 70, // Align to the top
    right: 145, // Align to the right
    paddingHorizontal: 20, // Add padding to the header content
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Customize title color if needed
  },
  magnetometerData: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    alignSelf: 'stretch',
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
