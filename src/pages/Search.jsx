import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import BasicHeader from '@components/BasicHeader';


const Search = ({ navigation, route }) => {
  const [query, setQuery] = useState('');
  const itemList = route.params;
  const { width } = useWindowDimensions();
  const columns = 3;
  const imageSize = width / columns - 21;

  const searchedItemList = itemList.filter(e => e.product.title.includes(query));

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Product', {item})}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 8,
          borderRadius: 8,
        }}>
        <View style={{}}>
          <Image
            style={{ width: imageSize, height:  imageSize + 50, borderRadius: 8}}
            source={{uri: item.productImagesUrl[0]}}
          />
          <View style={{}}>
            <Text style={{color: '#111', fontSize: 16}}>
              {item.product.title}
            </Text>
            <Text style={{color: '#111', fontWeight: 'bold'}}>
              {item.product.price.toLocaleString()}원
            </Text>
            <Text style={{color: '#999'}}>
              {item.location.dong}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BasicHeader component={
        <TextInput
        placeholder="검색어를 입력해주세요."
        style={{
          flex: 1,
          marginLeft: 16,
          paddingHorizontal: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#eeeeee',
          color: 'black',
        }}
        onChangeText={setQuery}
        />
      } 
      rightButtonHide={true}/>
      
      <FlatList
        style={{paddingHorizontal: 8}}
        data={searchedItemList}
        renderItem={renderItem}
        numColumns={columns}
      />
    </SafeAreaView>
  );
};

export default Search;