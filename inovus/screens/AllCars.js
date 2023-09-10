import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, AllCarsCarName, AllCarsCarBrand } from './../components/styles';

import { doc, getDocs, collection } from "firebase/firestore";
import { db } from './../config/firebase'

export default function AllCars({ navigation }) {

  const [cars, setCars] = useState([]);

  function fetch() {
    getDocs(collection(db, "Cars")).then(docSnap => {
      let cars = [];
      docSnap.forEach((doc) => {
        cars.push({ ...doc.data(), id: doc.id })
      });
      setCars(cars);
      console.log("Document data:", cars);
    });
  };

  useEffect(() => {
    fetch();
  }, [])


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
      <InnerContainer>
        {cars.map((car, index) => (
          <AllCarsContainer>
            <CarButton onPress={() => navigation.navigate("CarInfo", { type: car.type, id: car.id, brand: car.brand, horsepower: car.horsepower, engine: car.engine, image: car.image, topspeed: car.topspeed, model:car.model })}>
              <CarImage resizeMode='contain' source={{ uri: car.image }} />
            </CarButton>
            <TopBar>
              <AllCarsCarName>{car.brand}: </AllCarsCarName>
              <AllCarsCarBrand>{car.model}</AllCarsCarBrand>
            </TopBar>
          </AllCarsContainer>
        ))}
      </InnerContainer>
    </StyledContainer>
  )
};