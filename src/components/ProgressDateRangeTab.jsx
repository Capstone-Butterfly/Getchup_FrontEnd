import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import useProgressDateRangeStore from "../store/progressDateRangeStore";
import { defaultStyles } from '../styles/styles';
import { config } from '../styles/themeConfig';

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
            <Text style={[idx === index ? styles.activeTabText : styles.tabText, defaultStyles.TypographyBody]}>
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
    backgroundColor: config.tokens.colors.neutralLight,
    borderRadius: 15,
    height: 50
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: config.tokens.colors.primaryDark,
    borderRadius: 20,
    margin: 7,
  },
  tabText: {
    color: "black",
  },
  activeTabText: {
    color: config.tokens.colors.white,
  }
});

export default ProgressDateRangeTab;