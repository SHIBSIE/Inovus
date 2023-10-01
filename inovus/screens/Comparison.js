import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from "@react-navigation/native"
import { AuthenticatedUserContext } from '../navigators/AuthenticatedUserProvider';

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, ComparisonContainer, ComparisonTitle, ComparisonSlot, InfoText, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, CarInfoContainer, CarInfoImage, RowElements, InfoBoxes, InfoTextTitle, VerticalLine, BiggerTitles, AdditionalInfoText, HorizontalLine } from './../components/styles';

import { doc, getDocs, collection, updateDoc, setDoc } from "firebase/firestore";
import { db } from './../config/firebase'
import { liked } from 'raccoon/lib/input';
import { set } from 'lodash';

export default function Comparison({ navigation }) {

  const route = useRoute()
  const { user } = useContext(AuthenticatedUserContext);
  const email = user.email;
  const id = route.params?.id1
  const image = route.params?.image1


  const [carSelected, setCarSelected] = useState(false);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <TopBar>
        <HomePageUserIcon>
          <Octicons name={"person"} size={30} color={secondary} onPress={() => navigation.navigate("Logout")} />
        </HomePageUserIcon>
        <HomePageLogo resizeMode='contain' source={require('./../assets/img/img1.jpeg')} />
      </TopBar>
      <ComparisonContainer>
        <ComparisonSlot  onPress={() => navigation.navigate("CompareChooseCar")}>
          <ComparisonTitle> Car 1: </ComparisonTitle>
          <CarImage comparison={true} resizeMode='contain' source={{ uri: image }} />
        </ComparisonSlot>
        <ComparisonSlot onPress={() => navigation.navigate("CompareChooseCar2", {id1: id, image1: image})}>
          <ComparisonTitle> Car 2: </ComparisonTitle>
            <ComparisonTitle unavailable={true}> Pick a car to compare to.</ComparisonTitle>
          <Octicons marginTop={30} marginLeft={105} name={"plus-circle"} size={30} color={secondary} />
        </ComparisonSlot>
      </ComparisonContainer>
    </StyledContainer>
  )
};