import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRoute } from "@react-navigation/native"

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, AllCarsCarName, AllCarsCarBrand, SearchBox } from './../components/styles';

import { doc, getDocs, collection } from "firebase/firestore";
import { db } from './../config/firebase';

export default function AllCars({ navigation }) {

  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const route = useRoute()
  const filteredBrand = route.params?.filteredBrand


  useEffect(() => {
    setIsLoading(true);
    fetch();
  }, [])


  async function fetch() {
    getDocs(collection(db, "Cars")).then(docSnap => {
      let cars = [];
      docSnap.forEach((doc) => {
        cars.push({ ...doc.data(), id: doc.id })
      });
      setCars(cars);
      console.log("Document data:", cars);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={secondary} />
      </View>
    );
  }

  const filterData = (item, {filteredBrand}) => {
    if (item.brand.toLowerCase().includes(filteredBrand)) {
      return (
          <AllCarsContainer>
            <CarButton onPress={() => navigation.navigate("CarInfo", { type: item.type, logo: item.logo, acceleration: item.acceleration, cylinders: item.cylinders, price: item.price, id: item.id, brand: item.brand, horsepower: item.horsepower, seats: item.seats, image: item.image, topspeed: item.topspeed, model: item.model })}>
              <CarImage resizeMode='contain' source={{ uri: item.image }} />
            </CarButton>
            <TopBar>
              <AllCarsCarName>{item.brand}: </AllCarsCarName>
              <AllCarsCarBrand>{item.model}</AllCarsCarBrand>
            </TopBar>
          </AllCarsContainer>
      )
    }
  };




  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <TopBar>
        <HomePageUserIcon>
          <Octicons name={"person"} size={30} color={secondary} onPress={() => navigation.navigate("Logout")} />
        </HomePageUserIcon>
        <HomePageLogo resizeMode='contain' source={require('./../assets/img/img1.jpeg')} />
      </TopBar>
      <SearchBox
        placeholder="Search"
        clearButtonMode='always'
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(text) => setUserInput(text)}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cars}
        renderItem={({ item }) => filterData(item,{filteredBrand})}
      />
    </StyledContainer >
  )
};