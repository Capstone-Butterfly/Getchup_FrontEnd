import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import ToggleSwitch from '../../components/ToggleSwitch';
import useTaskStore from '../../store/taskStore';

const tracks = [
  'https://butterflycapstonemusic.s3.us-east-2.amazonaws.com/Holizna.mp3',
  'https://butterflycapstonemusic.s3.us-east-2.amazonaws.com/HoliznaB.mp3',
  'https://butterflycapstonemusic.s3.us-east-2.amazonaws.com/HoliznaC.mp3',
];

const MusicPlayer = forwardRef(({ onUnmount }, ref) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(Math.floor(Math.random() * tracks.length));
  const { isTaskWorkInProgress, setIsTaskWorkInProgress, setIsMusicEnabled, isMusicEnabled } = useTaskStore();



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
    loadNewTrack: async () => {
      await loadTrackWithoutPlaying();
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
  }, []);
  

  const onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish && !status.isLooping) {
      playNextTrack();
    }
  };

  const toggleSwitch = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else  {
        if (isTaskWorkInProgress)
          await sound.playAsync();
        setIsPlaying(true);
      }
      setIsMusicEnabled(!isMusicEnabled)
    }
  };

  const loadTrackWithoutPlaying = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: tracks[currentTrack] },
        { shouldPlay: false }
      );
      setSound(newSound);
      console.log("new sound is: ", newSound);
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setCurrentTrack((prevTrack) => (prevTrack + 1) % tracks.length);
    } catch (error) {
      console.error('Error loading track:', error);
    }
  };

  const playNextTrack = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: tracks[currentTrack] },
        { shouldPlay: true }
      );
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setIsPlaying(true);
      setCurrentTrack((prevTrack) => (prevTrack + 1) % tracks.length);
    
    } catch (error) {
      console.error('Error playing next track:', error);
    }
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


