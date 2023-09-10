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
  // const handleSignOut = async () => {
  //   try {
  //     await auth.signOut();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
      <Gap />
      <Gap />
      {/* <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
        /> */}
      <HomePageContainer>
        <SectionTitles>Popular Brands</SectionTitles>
        <ViewOfScroll>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <BrandButtonsContainer>
              <BrandButton><ButtonImage source={require('./../assets/img/volks.png')} /></BrandButton>
              <BrandButton><ButtonImage source={require('./../assets/img/toyota.jpg')} /></BrandButton>
              <BrandButton><ButtonImage source={require('./../assets/img/mercedes.png')} /></BrandButton>
              <BrandButton><ButtonImage source={require('./../assets/img/Ford.png')} /></BrandButton>
              <BrandButton><ButtonImage source={require('./../assets/img/honda.png')} /></BrandButton>
              <BrandButton><ButtonImage source={require('./../assets/img/BMW.png')} /></BrandButton>
              <BrandButton><ButtonImage source={require('./../assets/img/nissan.png')} /></BrandButton>
              <BrandButton><ButtonImage source={require('./../assets/img/hyundai.png')} /></BrandButton>
            </BrandButtonsContainer>
          </ScrollView>
        </ViewOfScroll>
        <SectionTitles>Features</SectionTitles>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FeaturesContainer>
            <FeaturesButton onPress={() => navigation.navigate("AllCars")}><FeaturesImage source={require('./../assets/img/allcars.jpg')} /></FeaturesButton>
            <FeaturesButton><FeaturesImage source={require('./../assets/img/electric.jpg')} /></FeaturesButton>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesName>All cars</FeaturesName>
            <FeaturesName>Electric Cars</FeaturesName>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesButton><FeaturesImage source={require('./../assets/img/compare.jpg')} /></FeaturesButton>
            <FeaturesButton><FeaturesImage source={require('./../assets/img/survey.jpg')} /></FeaturesButton>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesName marginLeft ={48}>Compare</FeaturesName>
            <FeaturesName marginLeft = {72}>Survey</FeaturesName>
          </FeaturesContainer>

          <FeaturesContainer>
            <FeaturesButtonSingle><FeaturesImage /></FeaturesButtonSingle>
          </FeaturesContainer>
        </ScrollView>
      </HomePageContainer>
    </StyledContainer>
  );
}

