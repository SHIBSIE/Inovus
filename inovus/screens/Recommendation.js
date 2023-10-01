import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';


import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { StyledContainer, FeaturesName, TopBar, ErrorMessageContainer, ErrorMessageNoCar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, AllCarsCarName, AllCarsCarBrand, SearchBox } from './../components/styles';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import { firebase } from '../config/config';
import { doc, getDocs, collection, updateDoc, addDoc } from "firebase/firestore";
import { db } from '../config/firebase'
import { useRoute } from "@react-navigation/native"
import { AuthenticatedUserContext } from '../navigators/AuthenticatedUserProvider';


const { primary, secondary, lightGrey } = Colors;

const auth = Firebase.auth();

export default function Recommendation({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const email = user.email;
  const [profiles, setProfiles] = useState([])
  const [cars, setCars] = useState([]);
  const [size, setSize] = useState([]);
  const [surveyFilled, setSurveyFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [surveySeats, setSurveySeats] = useState("");
  const [surveyEngine, setSurveyEngine] = useState("");
  const [surveyPower, setSurveyPower] = useState("");
  const [userID, setUserID] = useState('');
  const [noRecommend, setNoRecommend] = useState(true);
  const [likedCars, setLikedCars] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch({ email });
    fetchCars();
  }, [])

  async function fetchCars() {
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

  async function fetch({ email }) {
    getDocs(collection(db, "Profiles")).then(docSnap => {
      let profiles = [];
      let newLikedCars = [];
      let newSize = [];
      docSnap.forEach((doc) => {
        if (doc.data().Email == email) {
          if (doc.data().surveyFilled) {
            profiles.push({ ...doc.data(), id: doc.id })
            setSurveySeats(doc.data().survey[0])
            setSurveyEngine(doc.data().survey[1])
            setSurveyPower(doc.data().survey[2])
            setSurveyFilled(true);
            setNoRecommend(false);
          }
          else {
            profiles.push({ ...doc.data(), id: doc.id })
            const liked = doc.data().liked;
            const size = doc.data().size;
            if (liked && typeof liked === 'object') {
              Object.values(liked).forEach((carName) => {
                if (!newLikedCars.includes(carName)) {
                  newLikedCars.push(carName);
                  setNoRecommend(false);
                }
              });
            }
            if (size && typeof size === 'object') {
              Object.values(size).forEach((carName) => {
                if (!newSize.includes(carName)) {
                  newSize.push(carName);
                  setNoRecommend(false);
                }
              });
            }
            setUserID(doc.id)
          }
        }
      });
      setProfiles(profiles);
      setLikedCars(newLikedCars);
      setSize(newSize);
      setIsLoading(false);
    });
  };

  const filterData = (item, likedCars, size, surveyFilled, surveySeats, surveyEngine, surveyPower) => {
    if (surveyFilled) {
      if (surveySeats == item.seats && surveyEngine == item.type.toLowerCase()) {
        if (surveyPower == "small cars") {
          if (Number(item.horsepower.substr(0, 3)) <= 150 || Number(item.horsepower.substr(0, 3)) == "NaN") {
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
        }
        if (surveyPower == "midsize cars") {
          if (Number(item.horsepower.substr(0, 3)) > 150 && Number(item.horsepower.substr(0, 3)) <= 250) {
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
        }
        if (surveyPower == "large cars") {
          if (Number(item.horsepower.substr(0, 3)) >= 250) {
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
        }
      }
    }
    else {
      if (likedCars.includes(item.cylinders)) {
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
      if (size.includes(item.seats)) {
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
      {(noRecommend) && (
        <ErrorMessageContainer>
          <ErrorMessageNoCar> We don't have any</ErrorMessageNoCar>
          <ErrorMessageNoCar> recommendations yet!</ErrorMessageNoCar>
          <ErrorMessageNoCar> Please like some cars, or fill the</ErrorMessageNoCar>
          <ErrorMessageNoCar> survey so we can help you. </ErrorMessageNoCar>
        </ErrorMessageContainer>
      )}
      {(!noRecommend) && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cars}
          renderItem={({ item }) => filterData(item, likedCars, size, surveyFilled, surveySeats, surveyEngine, surveyPower)}
        />
      )}
    </StyledContainer>
  );
}