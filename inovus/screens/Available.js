import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from "@react-navigation/native"

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, ErrorMessageContainer, ErrorMessageNoCar, StyledButtonBuy, TopBar, InfoText, Location, AllCarsCarBrand, AllCarsCarName, AvailableContainers, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, CarInfoContainer, CarInfoImage, RowElements, InfoBoxes, InfoTextTitle, VerticalLine, BiggerTitles, AdditionalInfoText, HorizontalLine, AvailabilityTitles, SmallTitles } from './../components/styles';

import { doc, getDocs, collection } from "firebase/firestore";
import { db } from './../config/firebase'

export default function Available({ navigation }) {

  const route = useRoute()
  const carModel = route.params?.carModel
  const [availableCars, setAvailableCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  let i = 0;

  useEffect(() => {
    setIsLoading(true);
    fetch();
  }, [])


  async function fetch() {
    getDocs(collection(db, "Sellers")).then(docSnap => {
      let availableCars = [];
      docSnap.forEach((doc) => {
        availableCars.push({ ...doc.data(), id: doc.id })
      });
      setAvailableCars(availableCars);
      console.log("Document data:", availableCars);
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

  let length = availableCars.length;

  const filterData = (item, { carModel }) => {
    while (i<length) {
      if (item.model.includes(carModel) && item.status == "available") {
        setIsEmpty(false);
        return (
          <AllCarsContainer>
            <AvailableContainers>
              <TopBar>
                <AvailabilityTitles>Name: </AvailabilityTitles>
                <SmallTitles>{item.name}</SmallTitles>
                <AvailabilityTitles> {item.condition} </AvailabilityTitles>
              </TopBar>
              <TopBar>
                <AvailabilityTitles>Location: </AvailabilityTitles>
                <SmallTitles>{item.location}</SmallTitles>
              </TopBar>
              <TopBar>
                <StyledButtonBuy onPress={() => navigation.navigate('Login')}>
                  <ButtonText welcome={true}>Book to Rent</ButtonText>
                </StyledButtonBuy >
                <StyledButtonBuy onPress={() => navigation.navigate('Login')}>
                  <ButtonText welcome={true}>Book to Buy</ButtonText>
                </StyledButtonBuy>
              </TopBar>
            </AvailableContainers>
          </AllCarsContainer>
        )
      }
      i++;

      if (isEmpty && i == length) {
        return (
          <ErrorMessageContainer>
            <ErrorMessageNoCar>We are sorry!</ErrorMessageNoCar>
            <ErrorMessageNoCar>This car is not available</ErrorMessageNoCar>
          </ErrorMessageContainer>
        )
      }
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={availableCars}
        renderItem={({ item }) => filterData(item, { carModel })}
      />
    </StyledContainer>
  )
};