import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigators/AuthenticatedUserProvider';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow } from './../components/styles';


const auth = Firebase.auth();

export default function HomePage({navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <TopBar>
        <HomePageUserIcon>
          <Octicons name={"person"} size={30} color={secondary} onPress={() => navigation.navigate("Logout")} />
        </HomePageUserIcon>
        <HomePageLogo resizeMode='contain' source={require('./../assets/img/img1.jpeg')} />
      </TopBar>
      <HomePageContainer>
        <SectionTitles>Popular Brands</SectionTitles>
        <ViewOfScroll>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <BrandButtonsContainer>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "volkswagen"})}><ButtonImage source={require('./../assets/img/volks.png')} /></BrandButton>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "toyota"})}><ButtonImage source={require('./../assets/img/toyota.jpg')} /></BrandButton>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "mercedes"})}><ButtonImage source={require('./../assets/img/mercedes.png')} /></BrandButton>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "ford"})}><ButtonImage source={require('./../assets/img/Ford.png')} /></BrandButton>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "honda"})}><ButtonImage source={require('./../assets/img/honda.png')} /></BrandButton>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "bmw"})}><ButtonImage source={require('./../assets/img/BMW.png')} /></BrandButton>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "nissan"})}><ButtonImage source={require('./../assets/img/nissan.png')} /></BrandButton>
              <BrandButton onPress={() => navigation.navigate("FilteredCars", {filteredBrand: "hyundai"})}><ButtonImage source={require('./../assets/img/hyundai.png')} /></BrandButton>
            </BrandButtonsContainer>
          </ScrollView>
        </ViewOfScroll>
        <SectionTitles>Features</SectionTitles>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FeaturesContainer>
            <FeaturesButton onPress={() => navigation.navigate("AllCars")}><FeaturesImage source={require('./../assets/img/allcars.jpg')} /></FeaturesButton>
            <FeaturesButton onPress={() => navigation.navigate("ElectricCars")}><FeaturesImage source={require('./../assets/img/electric.jpg')} /></FeaturesButton>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesName>All cars</FeaturesName>
            <FeaturesName>Electric Cars</FeaturesName>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesButton onPress={() => navigation.navigate("CompareChooseCar")}><FeaturesImage source={require('./../assets/img/compare.jpg')} /></FeaturesButton>
            <FeaturesButton onPress={() => navigation.navigate("Survey")}><FeaturesImage source={require('./../assets/img/survey.jpg')} /></FeaturesButton>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesName marginLeft ={44}>Compare</FeaturesName>
            <FeaturesName marginLeft = {78}>Survey</FeaturesName>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesButtonSingle onPress={() => navigation.navigate("Recommendation")}><FeaturesImage source={require('./../assets/img/recommended.jpg')}/></FeaturesButtonSingle>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesName marginLeft={80}>Recommended Cars</FeaturesName>
          </FeaturesContainer>
        </ScrollView>
      </HomePageContainer>
    </StyledContainer>
  );
}

