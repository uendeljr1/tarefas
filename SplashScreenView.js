import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 1500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container} accessibilityLabel="Tela de abertura">
            <Video
                source={require('./src/video/SplashScreen.mp4')}
                style={styles.video}
                resizeMode="cover"
                isLooping={false}
                shouldPlay
                onError={(error) => {
                    console.log("Erro ao carregar vídeo:", error);
                    navigation.replace('Home');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e1e',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});