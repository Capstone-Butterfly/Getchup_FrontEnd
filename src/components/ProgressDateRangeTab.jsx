import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import useProgressDateRangeStore from "../store/progressDateRangeStore";

const ProgressDateRangeTab = () => {
  const { activeDateRangeTab, setActiveDateRangeTab } =
    useProgressDateRangeStore();
console.log("activeDateRangeTab" +activeDateRangeTab);
  const [index, setIndex] = useState(0);
  const routes = [
    { key: "Day", title: "Day" },
    { key: "Weekly", title: "Weekly" },
    { key: "Monthly", title: "Monthly" },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    const tab = routes[newIndex].key;
    setActiveDateRangeTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {routes.map((route, idx) => (
          <TouchableOpacity
            key={route.key}
            style={[styles.tab, idx === index && styles.activeTab]}
            onPress={() => handleIndexChange(idx)}
          >
            <Text style={idx === index ? styles.activeTabText : styles.tabText}>
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#E6E6E6",
    borderRadius: 20,
    height: 50
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "green",
    borderRadius: 20,
    margin: 10
  },
  tabText: {
    color: "black",
  },
  activeTabText: {
    color: "white",
  }
});

export default ProgressDateRangeTab;