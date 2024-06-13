
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    console.log("sending request to backend with email: "+email+" and pwd "+password);
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        // Save the token to AsyncStorage upon successful login
        
        await AsyncStorage.setItem('authToken', data.token);
        alert('Login successful!');
        // Navigate to another screen upon successful login
        navigation.navigate('Home');
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
        console.error('Login error:', error);
        console.error('Server response:', await response.text()); // Log the actual response
        alert('An error occurred while logging in.');
      }
      
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
