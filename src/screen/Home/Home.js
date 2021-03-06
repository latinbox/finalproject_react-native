import React, {Component, useEffect, useMemo, useState} from 'react';
import {View, Button, Text, ScrollView, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import TotalData from '../../components/Home/TotalData';
import DropdownPicker from '../../components/Commons/DropdownPicker';
import IconFeather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../config/colors';
import Loading from '../../components/Commons/Loading';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {capitalize} from '../../utils';
import {useCountryData} from '../../context/CountryHandler';
import {useTheme} from '../../context/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {backgroundColor: '#2c3e50', flex: 1},
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.white,
    marginTop: 25,
  },
  titleBtn: {
    textAlign: 'center',
    fontSize: 22,
    backgroundColor: colors.gray,
    color: colors.white,
    borderRadius: 10,
    width: 240,
    marginTop: 10,
    height: 38,
    left: 58,
  },
});

const Home = ({navigation}) => {
  const {top} = useSafeAreaInsets();
  const {
    mainTheme: {backgroundColor, textColor},
  } = useTheme();
  const {
    state: {
      country,
      isLoading,
      totalConfirmed,
      totalDeaths,
      totalRecovered,
      totalActive,
      lineChartConfirmed,
      lineChartDeaths,
      lineChartRecovered,
      lineChartActive,
    },
    backupData,
  } = useCountryData();

  useEffect(() => {
    IconFeather.loadFont();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor, paddingTop: top}]}>
      <Text style={[styles.title, {color: textColor}]}>
        {capitalize(country)}
      </Text>

      {/* <Button title="backup data" onPress={() => backupData()} /> */}

      <Loading isLoading={isLoading} color={colors.white}>
        <TotalData
          totalConfirmed={totalConfirmed}
          totalRecovered={totalRecovered}
          totalDeaths={totalDeaths}
          totalActive={totalActive}
        />
      </Loading>
      <TouchableOpacity
        color={textColor}
        onPress={() =>
          navigation.navigate('Charts', {
            lineChartConfirmed,
            lineChartRecovered,
            lineChartDeaths,
            lineChartActive,
          })
        }>
        <Text style={styles.titleBtn}>Ir a Gráficos</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
