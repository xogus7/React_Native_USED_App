import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const settingsIcon = require('@icons/settings.png');
const alarm = require('@icons/alarm.png');
const backArrow = require('@icons/back_arrow.png');

const BasicHeader = ({ title, component, rightButtonHide }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={backArrow} style={styles.backButton} />
            </TouchableOpacity>
            {title && <Text style={styles.headerTitle}>{title}</Text>}
            {component}
            {!rightButtonHide && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginRight: 8 }}>
                <TouchableOpacity>
                    <Image source={settingsIcon} style={{ width: 32, height: 32 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={alarm} style={{ width: 32, height: 32 }} />
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA'
    },
    backButton: {
        width: 40,
        height: 40
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000'
    },
})

export default BasicHeader;