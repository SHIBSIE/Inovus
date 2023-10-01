import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRoute } from "@react-navigation/native"
import { AuthenticatedUserContext } from '../navigators/AuthenticatedUserProvider';

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, ComparisonContainer, ComparisonTitle, ComparisonSlot, InfoText, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, CarInfoContainer, CarInfoImage, RowElements, InfoBoxes, InfoTextTitle, VerticalLine, BiggerTitles, AdditionalInfoText, HorizontalLine } from '../components/styles';

import { doc, getDocs, collection, updateDoc, setDoc } from "firebase/firestore";
import { db } from '../config/firebase'
import { liked } from 'raccoon/lib/input';
import { set } from 'lodash';

export default function ComparingBoth({ navigation }) {

  const route = useRoute()
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthenticatedUserContext);
  const email = user.email;
  const id1 = route.params?.id1
  const image1 = route.params?.image1
  const id2 = route.params?.id2
  const image2 = route.params?.image2
  const [car1, setCar1] = useState([])
  const [car2, setCar2] = useState([])
  const [showIsPressed, setShowIsPressed] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    fetch({ id1 }, { id2 });
  }, [])

  function DisplayCars() {
    if (!showIsPressed){
      setShowIsPressed(true);
    }
    if (showIsPressed){
      setShowIsPressed(false);
    }
  }

  async function fetch({ id1 }, { id2 }) {
    getDocs(collection(db, "Cars")).then(docSnap => {
      let car1 = [];
      let car2 = [];
      docSnap.forEach((doc) => {
        if (doc.id == id1)
          car1.push({ ...doc.data(), id: doc.id })
        if (doc.id == id2)
          car2.push({ ...doc.data(), id: doc.id })
      });
      setCar1(car1);
      setCar2(car2);
      console.log("Document data:", car1);
      console.log("Document data:", car2);
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <ComparisonSlot onPress={() => navigation.navigate("CompareChooseCar")}>
            <ComparisonTitle> Car 1: </ComparisonTitle>
            {(!showIsPressed) && (<CarImage comparison={true} resizeMode='contain' source={{ uri: image1 }} />)}
            {(showIsPressed) && car1.map((car) => (
              <View marginLeft = {10}>
                <RowElements>
                  <BiggerTitles compare ={true}>Name: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.brand} {car.model} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Seats: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.seats} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Acceleration: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.acceleration} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Top speed: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.topspeed} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Cylinders: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.cylinders} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Power: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.horsepower} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
              </View>
            ))}
          </ComparisonSlot>
          <ComparisonSlot onPress={() => navigation.navigate("CompareChooseCar2", { id1: id1, image1: image1 })}>
          <ComparisonTitle> Car 2: </ComparisonTitle>
            {(!showIsPressed) && (<CarImage comparison={true} resizeMode='contain' source={{ uri: image2 }} />)}
            {(showIsPressed) && car2.map((car) => (
              <View marginLeft = {10}>
                <RowElements>
                  <BiggerTitles compare ={true}>Name: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.brand} {car.model} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Seats: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.seats} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Acceleration: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.acceleration} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Top speed: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.topspeed} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Cylinders: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.cylinders} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
                <RowElements>
                  <BiggerTitles compare ={true}>Power: </BiggerTitles>
                  <AdditionalInfoText compare ={true}> {car.horsepower} </AdditionalInfoText>
                </RowElements>
                <HorizontalLine compare ={true}/>
              </View>
            ))}
          </ComparisonSlot>
          <StyledButton welcome={true} onPress={DisplayCars}>
            {(!showIsPressed) && (<ButtonText welcome={true}>Show Car Info</ButtonText>)}
            {(showIsPressed) && (<ButtonText welcome={true}>Show Images</ButtonText>)}
          </StyledButton>
        </ScrollView>
      </ComparisonContainer>
    </StyledContainer>
  )
};