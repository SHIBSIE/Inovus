import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, AllCarsCarName, AllCarsCarBrand, SearchBox } from '../components/styles';

import { doc, getDocs, collection } from "firebase/firestore";
import { db } from '../config/firebase';
import filter from "lodash";

export default function CompareChooseCar({ navigation }) {

  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

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

  const filterData = (item) => {
    if (userInput === "") {
      return (
          <AllCarsContainer>
            <CarButton onPress={() => navigation.navigate("Comparison", {id1: item.id, image1: item.image})}>
              <CarImage resizeMode='contain' source={{ uri: item.image }} />
            </CarButton>
            <TopBar>
              <AllCarsCarName>{item.brand}: </AllCarsCarName>
              <AllCarsCarBrand>{item.model}</AllCarsCarBrand>
            </TopBar>
          </AllCarsContainer>
      )
    }

    else if (item.brand.toLowerCase().includes(userInput.toLowerCase()) || item.model.toLowerCase().includes(userInput.toLowerCase())) {
      return (
          <AllCarsContainer>
            <CarButton onPress={() => navigation.navigate("Comparison", { type: item.type, logo: item.logo, acceleration: item.acceleration, cylinders: item.cylinders, price: item.price, id: item.id, brand: item.brand, horsepower: item.horsepower, seats: item.seats, image: item.image, topspeed: item.topspeed, model: item.model })}>
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
        <NotificationsIcon>
          <Octicons name={"bell"} size={30} color={secondary} onPress={() => { }} />
        </NotificationsIcon>
      </TopBar>
      <PageTitle compare={true}> Pick a Car to Compare </PageTitle>
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
        renderItem={({ item }) => filterData(item)}
      />
    </StyledContainer >
  )
};