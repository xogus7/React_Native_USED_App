import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, useWindowDimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';

import BasicHeader from '@components/BasicHeader';

const Product = ({ navigation, route }) => {
    const { width } = useWindowDimensions();
    const itemData = route.params.item;

    const renderProductImages = ({ item }) => {
        return <Image style={{ width, height: width }} source={{ uri: item }} />;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BasicHeader title={'상품 화면'}/>
            <View style={{ width, height: width }}>
                <FlatList
                    contentContainerStyle={{ width, height: width }}
                    horizontal
                    data={route.params.item.productImagesUrl}
                    renderItem={renderProductImages}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', padding: 16 }}>
                <View
                    style={{
                        paddingBottom: 8,
                        borderBottomColor: '#e2e2e2',
                        borderBottomWidth: 1,
                    }}>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Image style={{ width: 44, height: 44 }} source={{uri: itemData.user.profileImage}} />
                        <View>
                            <Text style={{ color: '#000', fontSize: 15, fontWeight: '700' }}>
                                {itemData.user.nickname}
                            </Text>
                            <Text style={{ color: '#333' }}>{itemData.location.dong}</Text>
                        </View>
                        
                    </View>
                    <Text style={{paddingTop: 8}}>{itemData.product.createdDate.split('T')[0]}</Text>
                </View>
                <View style={{ flex: 1, paddingVertical: 16, gap: 8 }}>
                    <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>
                        {itemData.product.title}
                    </Text>
                    <Text style={{ fontSize: 15, color: '#222' }}>
                        {itemData.product.content}
                    </Text>
                    
                </View>
                
                <View
                    style={{
                        paddingTop: 16,
                        borderTopColor: '#e2e2e2',
                        borderTopWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontSize: 20 }}>
                        {itemData.product.price.toLocaleString()}원
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ChatDetail', {
                                user: itemData.user,
                            });
                        }}
                        style={{
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            backgroundColor: '#5AB2FF',
                            borderRadius: 8,
                        }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>채팅하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Product;