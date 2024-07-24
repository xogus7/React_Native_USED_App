import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList, Image, PermissionsAndroid, SafeAreaView, StyleSheet, Text,
  TouchableOpacity, View, useWindowDimensions
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";

const down_arrow_icon = require('@icons/down_arrow.png');
const current_location_icon = require('@icons/current_location.png');
const search_icon = require('@icons/bottomtab/search_empty.png');
const mappedDong =
  require('../assets/Mapped-dong.json');

const Home = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();
  const mapHeight = height - 120;
  const [currentRegion, setCurrentRegion] = useState();
  const mapRef = useRef(null);
  const itemListRef = useRef(null);
  const markersRef = useRef([]);
  const [dongName, setDongName] = useState('지역선택');
  useEffect(() => {
    initLocation();
  }, [])

  useEffect(() => {
    route.params?.address ? fetchAddress() : initLocation();
  }, [route.params]);


  const fetchAddress = () => {
    const { address } = route.params;
    setDongName(address?.dong);
    const dongData = mappedDong[`${address?.sido} ${address?.sigungu} ${address?.dong}`]
    if (dongData) {
      const { x, y } = dongData[0];
      mapRef.current?.animateToRegion({
        ...currentRegion,
        longitude: x,
        latitude: y,
      });
    } else {
      console.warn(`not found ${address.dong} Location.`)
    }
  }


  const initLocation = () => {
    if (hasLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentRegion({
            latitude,
            longitude,
            latitudeDelta: currentRegion?.latitudeDelta ?? 0.01,
            longitudeDelta: currentRegion?.longitudeDelta ?? 0.01,
          });
        });
    }
  }

  const hasLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const onPressCurrrentLocation = () => {
    if (hasLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: currentRegion?.latitudeDelta ?? 0.01,
            longitudeDelta: currentRegion?.longitudeDelta ?? 0.01,
          });
        },
        () => { },
        {},
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.RegionSelectButton}
          onPress={() => navigation.navigate('RegionSelect')}>
          <Text style={{ color: '#333', fontSize: 20, fontWeight: 'bold' }}>
            {dongName}
          </Text>
          <Image style={{ width: 32, height: 32 }} source={down_arrow_icon} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('Search', dummyData)}
            >
          <Image style={styles.searchImage} source={search_icon} />
        </TouchableOpacity>
      </View>
      <View style={{ width, height: mapHeight }}>
        {currentRegion && (
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={currentRegion}
            onRegionChange={setCurrentRegion}>
            {dummyData.map((e, i) => (
              <Marker
                ref={marker => (markersRef.current[i] = marker)}
                key={e.product.id}
                coordinate={{ longitude: e.location.x, latitude: e.location.y }}
                title={`${e.product.title}`}
                description={e.product.content}
                onPress={() => {
                  itemListRef.current?.scrollToIndex({
                    index: i,
                  });
                }}
              />
            ))}
          </MapView>
        )}
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={onPressCurrrentLocation}>
          <Image style={styles.currentLocationImage} source={current_location_icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={[styles.productCardList,
        { width: width }
        ]}
        ref={itemListRef}
        horizontal
        data={dummyData}
        keyExtractor={item => `${item.product.id}`}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        alwaysBounceHorizontal={false}
        bounces={false}
        decelerationRate={'fast'}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.productCard,
              {
                width: width - 32,
              },
            ]}
            onPress={() => navigation.navigate('Product', { item })}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <Image
                style={{ width: 140, height: 140, borderRadius: 100 }}
                source={{ uri: item.productImagesUrl[0] }}
              />
              <View style={{ flex: 1, gap: 4 }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {item.product.title}
                </Text>
                <Text
                  style={{ flex: 1, color: '#333' }}
                  ellipsizeMode="tail"
                  numberOfLines={3}>
                  {item.product.content}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Text style={{ color: '#000', fontSize: 20 }}>
                    {item.product.price.toLocaleString()}원
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length) {
            const { index, item } = viewableItems[0];
            markersRef.current[index]?.showCallout();
            mapRef.current?.animateToRegion(
              {
                ...currentRegion,
                longitude: item.location.x,
                latitude: item.location.y,
              },
              500,
            );
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  RegionSelectButton: { flexDirection: 'row', alignItems: 'center' },
  searchImage: { width: 32, height: 32 },
  currentLocationButton: {
    position: 'absolute',
    top: 32,
    right: 16,
    padding: 4,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 10,
  },
  currentLocationImage: { width: 32, height: 32 },
  productCardList: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  productCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 5
  },
});

const dummyData = [
  {
    user: {
      id: '314231',
      nickname: 'user1',
      profileImage: 'https://avatar.iran.liara.run/public'
    },
    product: {
      id: 4,
      title: '물',
      category: 'category',
      price: 10000000,
      content: '물-신선한-분명한-여름-2559064',
      createdDate: '2024-07-24T03:27:46',
      updatedDate: '2024-07-24T03:27:46',
    },
    location: {
      x: 127.134227,
      y: 37.591157,
      addressName: '경기 구리시 교문동',
      sido: '경기',
      gu: '구리시',
      dong: '교문동',
    },
    productImagesUrl: [
      'https://cdn.pixabay.com/photo/2017/07/31/17/12/water-2559064_1280.jpg',
    ],
  },
  {
    user: {
      id: '313512',
      nickname: 'user2',
      profileImage: 'https://avatar.iran.liara.run/public'
    },
    product: {
      id: 7,
      title: '쿠키',
      category: 'category',
      price: 12345,
      content: '쿠키-비스킷-과자-음식-8668140',
      createdDate: '2024-07-24T03:27:46',
      updatedDate: '2024-07-24T03:27:46',
    },
    location: {
      x: 127.133700,
      y: 37.590320,
      addressName: '경기 구리시 교문2동 ',
      sido: '경기',
      gu: '구리시',
      dong: '교문2동',
    },
    productImagesUrl: [
      'https://cdn.pixabay.com/photo/2024/04/01/06/57/cookies-8668140_1280.jpg',
    ],
  },
  {
    user: {
      id: '313512',
      nickname: 'user2',
      profileImage: 'https://avatar.iran.liara.run/public'
    },
    product: {
      id: 78,
      title: '쿠키',
      category: 'category',
      price: 12345,
      content: '쿠키-비스킷-과자-음식-8668140',
      createdDate: '2024-07-24T03:27:46',
      updatedDate: '2024-07-24T03:27:46',
    },
    location: {
      x: 127.133890,
      y: 37.590318,
      addressName: '경기 구리시 교문2동 ',
      sido: '경기',
      gu: '구리시',
      dong: '교문2동',
    },
    productImagesUrl: [
      'https://cdn.pixabay.com/photo/2024/04/01/06/57/cookies-8668140_1280.jpg',
    ],
  },
];

export default Home;