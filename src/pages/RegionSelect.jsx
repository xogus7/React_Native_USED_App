/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BasicHeader from '@components/BasicHeader';

const administrationList = require('../assets/administrationCode.json') ;

const RegionSelect = ({ navigation }) => {
  const [selectedSido, setSelecetedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');

  const sidoList = useMemo(() => {
    return [...new Set(administrationList.map(e => e.시도명))];
  }, []);

  const sigunguList = useMemo(() => {
    return [
      ...new Set(
        administrationList
          .filter(e => e.시도명 === selectedSido && e.시군구명)
          .map(e => e.시군구명),
      ),
    ];
  }, [selectedSido]);

  const dongList = useMemo(() => {
    return [
      ...new Set(
        administrationList
          .filter(
            e =>
              e.시도명 === selectedSido &&
              e.시군구명 === selectedSigungu &&
              e.읍면동명,
          )
          .map(e => e.읍면동명),
      ),
    ];
  }, [selectedSigungu, selectedSido]);

  const handleTouchSido = (sido) => {
    setSelecetedSido(sido);
    setSelectedSigungu('');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BasicHeader title="동네 선택" />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={sidoList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.sidoButton,
                    item === selectedSido && {backgroundColor: '#4AABFF'},
                  ]}
                  onPress={() => handleTouchSido(item)}>
                  <Text
                    style={[
                      styles.text,
                      item === selectedSido && {color: '#fff'},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{flex: 1, borderRightWidth: 1, borderRightColor: '#f2f2f2'}}>
          <FlatList
            data={sigunguList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.sigungudongButton}
                  onPress={() => setSelectedSigungu(item)}>
                  <Text
                    style={[
                      styles.sigungudongText,
                      item === selectedSigungu && {color: '#4AABFF'},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={dongList}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.sigungudongButton}
                  onPress={() =>
                    navigation.navigate('Home', {
                      address: {
                        sido: selectedSido,
                        sigungu: selectedSigungu,
                        dong: item,
                      },
                    })
                  }>
                  <Text style={styles.sigungudongText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  sigungudongText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  sidoButton: {
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    padding: 8,
  },
  sigungudongButton: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    padding: 8,
    marginHorizontal: 8,
  },
});

export default RegionSelect;