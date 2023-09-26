import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, RowElements, VerticalLine, FeaturesName, TopBar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, AllCarsCarName, AllCarsCarBrand, SearchBox, TextButton, TextButtonText, HorizontalLine } from './../components/styles';

import { doc, getDocs, collection } from "firebase/firestore";
import { db } from './../config/firebase';
import filter from "lodash";

export default function AllCars({ navigation }) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSale, setIsSale] = useState(false);
  const [isRent, setIsRent] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [available, setAvailable] = useState([]);
  const [forRent, setForRent] = useState([]);
  const [forSale, setForSale] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchSellers();
    fetch();
  }, [])

  function CarsForRent() {
    setIsRent(true);
    setIsSale(false);
    setAvailable([]);
  }

  function CarsForSale() {
    setIsRent(false);
    setIsSale(true);
    setAvailable([]);
  }

  function allCars() {
    setIsRent(false);
    setIsSale(false);
    setAvailable([]);
  }

  async function fetchSellers() {
    getDocs(collection(db, "Sellers")).then(docSnap => {
      let forRent = [];
      let forSale = [];
      docSnap.forEach((doc) => {
        if (doc.data().availablefor.toLowerCase().includes("sale") && doc.data().status.toLowerCase()==("available"))
          forSale.push({ model: doc.data().model })
          if (doc.data().availablefor.toLowerCase().includes("rent") && doc.data().status.toLowerCase()==("available"))
          forRent.push({ model: doc.data().model })
      });
      setForRent(forRent);
      setForSale(forSale);
      console.log("rent Data:", forRent);
      console.log("sale Data:", forSale);
      setIsLoading(false);
    });
  };

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

    else if (item.brand.toLowerCase().includes(userInput.toLowerCase()) || item.model.toLowerCase().includes(userInput.toLowerCase())) {
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
        <NotificationsIcon>
          <Octicons name={"bell"} size={30} color={secondary} onPress={() => { }} />
        </NotificationsIcon>
      </TopBar>
      {(!isRent) && (!isSale) && 
      <SearchBox 
        placeholder="Search"
        clearButtonMode='always'
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(text) => setUserInput(text)}
      />}
      <RowElements>
        <TextButton onPress={CarsForRent}>
          <TextButtonText> For Rent </TextButtonText>
        </TextButton>
        <VerticalLine AllCars={true} />
        <TextButton onPress={CarsForSale}>
          <TextButtonText> For Sale </TextButtonText>
        </TextButton>
        <VerticalLine AllCars={true} />
        <TextButton onPress={allCars}>
          <TextButtonText> All Cars </TextButtonText>
        </TextButton>
      </RowElements>
      {(!isRent) && (!isSale) && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cars}
          renderItem={({ item }) => filterData(item)}
        />
      )}
      {(!isRent) && (isSale) && (
        forSale.map(rented => {
          cars.map(car => {
            if (rented.model.includes(car.model))
              available.push(car);
          })
        })
      )}
      {(!isRent) && (isSale) && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={available}
          renderItem={({ item }) => filterData(item)}
        />
      )}
      {(isRent) && (!isSale) && (
        forRent.map(rented => {
          cars.map(car => {
            if (rented.model.includes(car.model))
              available.push(car);
          })
        })
      )}
      {(isRent) && (!isSale) && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={available}
          renderItem={({ item }) => filterData(item)}
        />
      )}
    </StyledContainer >
  )
};