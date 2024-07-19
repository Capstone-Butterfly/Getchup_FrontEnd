import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import ToggleSwitch from '../../components/ToggleSwitch';

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
        // await sound.pauseAsync();
        await sound.stopAsync();
        setIsPlaying(false);
      }
    },
    unloadMusic: async () => {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
    },
    playNewTrack: async () => {
      await playNextTrack();
    },
  }));

  useEffect(() => {
    const loadSound = async () => {
      if (sound) {
        await sound.unloadAsync();
      }

      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: tracks[currentTrack] },
          { shouldPlay: isPlaying }
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
    if (status.didJustFinish && !status.isLooping) {
      playNextTrack();
    }
  };

  const toggleSwitch = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    const nextTrackIndex = Math.floor(Math.random() * tracks.length);
    setCurrentTrack(nextTrackIndex);
  };

  return (
    <View style={styles.container}>
      <ToggleSwitch
        value={isPlaying}
        onToggle={toggleSwitch}
      />
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
