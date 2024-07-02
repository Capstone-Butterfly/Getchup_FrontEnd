import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const tracks = [
  'https://butterflycapstonemusic.s3.us-east-2.amazonaws.com/acousticbreeze.mp3',
  'https://butterflycapstonemusic.s3.us-east-2.amazonaws.com/buddy.mp3',
  'https://butterflycapstonemusic.s3.us-east-2.amazonaws.com/creativeminds.mp3',
];

const MusicPlayer = forwardRef(({ onUnmount }, ref) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(Math.floor(Math.random() * tracks.length));

  useImperativeHandle(ref, () => ({
    stopMusic: async () => {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    },
  }));

  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: tracks[currentTrack] },
          { shouldPlay: false }
        );
        setSound(newSound);
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
        onUnmount && onUnmount();
      }
    };
  }, [currentTrack]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      playNextTrack();
    }
  };

  const toggleSwitch = async (value) => {
    if (sound) {
      if (value) {
        await sound.playAsync();
      } else {
        await sound.pauseAsync();
      }
      setIsPlaying(value);
    }
  };

  const playNextTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    const nextTrackIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrack(nextTrackIndex);
  };

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isPlaying ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isPlaying}
      />
      <Text>{isPlaying ? 'Playing' : 'Paused'}</Text>
      <Text>Current Track: {currentTrack + 1}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MusicPlayer;