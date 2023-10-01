import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from "@react-navigation/native"

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, ErrorMessageContainer, ErrorMessageNoCar, StyledButtonBuy, TopBar, InfoText, Location, AllCarsCarBrand, AllCarsCarName, AvailableContainers, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, CarInfoContainer, CarInfoImage, RowElements, InfoBoxes, InfoTextTitle, VerticalLine, BiggerTitles, AdditionalInfoText, HorizontalLine, AvailabilityTitles, SmallTitles } from '../components/styles';

import { doc, getDocs, collection, updateDoc } from "firebase/firestore";
import { db } from '../config/firebase'

export default function CarBooked({ navigation }) {

  const route = useRoute()
  const id = route.params?.id


  function handleUpdate() {
    const availableCar = doc(db, "Sellers", id)
    updateDoc(availableCar, {
      status: "not available"
    }).then(response => {
      alert("Car has been booked")
    }).catch(error => {
      console.log(error.message)
    })
  }

  useEffect(() => {
    handleUpdate();
  }, [])

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <TopBar>
        <HomePageUserIcon>
          <Octicons name={"person"} size={30} color={secondary} onPress={() => navigation.navigate("Logout")} />
        </HomePageUserIcon>
        <HomePageLogo resizeMode='contain' source={require('./../assets/img/img1.jpeg')} />
      </TopBar>
      <ErrorMessageContainer>
        <ErrorMessageNoCar>The car has been booked.</ErrorMessageNoCar>
        <ErrorMessageNoCar>You can visit the dealer to pick up your car.</ErrorMessageNoCar>
      </ErrorMessageContainer>
    </StyledContainer>
  )
};