import React, { useEffect } from 'react';
import { View, Text} from 'react-native';

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('MainTab')
        }, 1000)
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Splash</Text>
        </View>
    )
}

export default Splash;