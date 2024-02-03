import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const ComingSoon = () => {
  const [slideAnim] = useState(new Animated.Value(-100)); // Initial value for translation

  useEffect(() => {
    // Moving animation
    Animated.timing(slideAnim, {
      toValue: 10, // Adjust the final value for the distance you want to move
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={{ ...styles.text, transform: [{ translateX: slideAnim }] }}>
        Coming Soon
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ComingSoon;
