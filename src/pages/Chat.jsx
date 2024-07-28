import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import BasicHeader from '@components/BasicHeader';

const Chat = ({ navigation }) => {
    const renderItem = ({ item }) => {
        const { image, name, newMessageCount, latestChatDate, latestMessage } = item;

        const formattingChatDateText = (date) => {
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);

            if (date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth()) {
                if (date.getDate() === today.getDate())
                    return `${today.toLocaleTimeString()}`;
                else if (date.getDate() === yesterday.getDate())
                    return '어제';
            }

            return date.toISOString().split('T')[0];
        };

        return (
            <TouchableOpacity
                style={{ padding: 16, flexDirection: 'row', gap: 16 }}
                onPress={() =>
                    navigation.navigate('ChatDetail', {
                        id: '2',
                    })
                }>
                <Image
                    style={{ width: 52, height: 52, borderRadius: 16 }}
                    source={{ uri: image }}
                />
                <View style={{ flex: 1, gap: 4 }}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ color: '#555' }}>{latestMessage}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                    <Text style={{ color: '#aaa' }}>
                        {formattingChatDateText(latestChatDate)}
                    </Text>
                    {newMessageCount > 0 && (newMessageCount > 99 ? (
                        <Text
                            style={styles.newMessageCountOver}>
                            99+
                        </Text>
                    ) : (
                        <Text
                            style={styles.newMessageCount}>
                            {newMessageCount}
                        </Text>
                    ))}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <BasicHeader title="채팅" />
            <FlatList
                contentContainerStyle={{ backgroundColor: '#fff' }}
                data={dummy_chats}
                renderItem={renderItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    newMessageCount: {
        backgroundColor: '#ff5555',
        width: 20,
        height: 20,
        borderRadius: 10,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    newMessageCountOver: {
        backgroundColor: '#ff5555',
        width: 30,
        height: 20,
        borderRadius: 10,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

const dummy_chats = [
    {
        name: 'user1',
        image: 'https://avatar.iran.liara.run/public',
        newMessageCount: 0,
        latestChatDate: new Date(),
        latestMessage: '거래 감사합니다',
    },
    {
        name: 'user2',
        image: 'https://avatar.iran.liara.run/public/',
        newMessageCount: 1,
        latestChatDate: new Date('2024-07-23'),
        latestMessage: '물건 판매 하셨나요?',
    },
    {
        name: 'user3',
        image: 'https://avatar.iran.liara.run/public/boy',
        newMessageCount: 2,
        latestChatDate: new Date('2024-07-22'),
        latestMessage: '예약 걸어두겠습니다!',
    },
    {
        name: 'user4',
        image: 'https://avatar.iran.liara.run/public/girl',
        newMessageCount: 301,
        latestChatDate: new Date('2024-07-20'),
        latestMessage: '(이모티콘)',
    },
];

export default Chat;