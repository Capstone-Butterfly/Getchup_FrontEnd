import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { HStack } from '@gluestack-ui/themed';

const CustomSwitch = ({ label, value, onToggle }) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const thumbTranslate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26], // Positions for thumb
  });

  const trackBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', '#2ecc71'],
  });

  const thumbBorderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#4A4A4A', '#2ecc71'],
  });

  return (
    <HStack style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>
      <TouchableOpacity onPress={onToggle} style={styles.switchWrapper}>
        <Animated.View
          style={[
            styles.track,
            {
              backgroundColor: trackBackgroundColor,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: thumbTranslate }],
              borderColor: thumbBorderColor,
            },
          ]}
        />
      </TouchableOpacity>
    </HStack>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  switchLabel: {
    fontSize: 16,
    color: '#000',
  },
  switchWrapper: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 2,
    position: 'relative',
  },
  track: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
    borderRadius: 15,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 2,
    borderWidth: 2,
  },
});

export default CustomSwitch;