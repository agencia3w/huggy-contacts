import 'react-native-gesture-handler';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Rubik_400Regular, Rubik_500Medium } from '@expo-google-fonts/rubik';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/hooks/auth';

import { Routes } from './src/routes';

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_500Medium,
		Rubik_400Regular,
		Rubik_500Medium,
		IcoMoon: require('./assets/icomoon/icomoon.ttf')
	});

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeProvider>
	)
}
