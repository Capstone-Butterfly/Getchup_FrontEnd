import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HStack } from '@gluestack-ui/themed';
import { config } from '../styles/themeConfig'; 

const ToggleSwitch = ({ label, value, onToggle }) => {
  return (
    <HStack  style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>
      <TouchableOpacity
        style={[styles.switchWrapper, value ? styles.switchWrapperActive : styles.switchWrapperInactive]}
        onPress={onToggle}
      >
        <View style={[styles.track, value ? styles.trackActive : styles.trackInactive]} />
        <View style={[styles.thumb, value ? styles.thumbActive : styles.thumbInactive]} />
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
    //borderBottomWidth: 1,
    //borderBottomColor: '#ccc',
    padding:16
  },
  switchLabel: {
    fontSize: 16,
    color: config.tokens.colors.black,
  },
  switchWrapper: {
    width: 50,
    height: 24,
    borderRadius: 15,
    justifyContent: 'center',
    position: 'relative',
  },
  switchWrapperInactive: {
    borderColor: config.tokens.colors.black,
    borderWidth: 2,
  },
  switchWrapperActive: {
    borderColor: config.tokens.colors.primaryDark,
    borderWidth: 2,
  },
  track: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
  },
  trackInactive: {
    backgroundColor: config.tokens.colors.white,
  },
  trackActive: {
    backgroundColor: config.tokens.colors.primaryDark,
  },
  thumb: {
    width: 12,
    height: 12,
    borderRadius: 12,
    position: 'absolute',
  },
  thumbInactive: {
    backgroundColor: config.tokens.colors.black,
    left: 6,
    borderColor: config.tokens.colors.black,
    borderWidth: 2,
  },
  thumbActive: {
    backgroundColor: config.tokens.colors.white,
    right: 6,
    borderColor: config.tokens.colors.white,
    borderWidth: 2,
  },
});

export default ToggleSwitch;

// import React from "react";
// import { Text, View, StyleSheet } from "react-native";
// import { Switch, HStack, Box } from "@gluestack-ui/themed";
// import useCreateTaskStore from "../store/createTaskStore";
// import { config } from '../styles/themeConfig'; // Import the theme configuration
// import { defaultStyles } from '../styles/styles'

// const ToggleSwitch = () => {
//   const { movement_reminder, setMovementReminder } = useCreateTaskStore((state) => ({
//     movement_reminder: state.movement_reminder,
//     setMovementReminder: state.setMovementReminder,
//   }));

//   const toggleSwitch = () => {
//     setMovementReminder(!movement_reminder);
//   };

//   return (
//     <View style={styles.container}>
//       <HStack style={styles.hstack}>
//           <Text style={[defaultStyles.TypographyBodyHeavy, styles.text]}>Track Movement</Text>
//           <Switch
//             size="sm"
//             isDisabled={false}
//             value={movement_reminder}
//             onToggle={toggleSwitch}
//             trackColor={{ false: config.tokens.colors.neutral, true: config.tokens.colors.primaryDark }}
//           />
//       </HStack>
//     </View>
//   );
// };

// export default ToggleSwitch;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     padding: 20,
//   },
//   hstack: {
//       alignItems: "center",
//       display: "flex",
//       justifyContent: "space-between",
//       width: "100%",
      
//   },
//   switch: {
//       flexGrow: 0,
//   },
//   text: {
//       flexGrow: 1,
//   },
// });
