import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from "@react-navigation/native"
import { AuthenticatedUserContext } from '../navigators/AuthenticatedUserProvider';

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, InfoText, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, CarInfoContainer, CarInfoImage, RowElements, InfoBoxes, InfoTextTitle, VerticalLine, BiggerTitles, AdditionalInfoText, HorizontalLine } from './../components/styles';

import { doc, getDocs, collection, updateDoc, setDoc } from "firebase/firestore";
import { db } from './../config/firebase'

export default function CarInfo({ navigation }) {

    const route = useRoute()
    const { user } = useContext(AuthenticatedUserContext);
    const email = user.email;
    const [FullName, setFullName] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [likedCars, setLikedCars] = useState([]);
    const [size, setSize] = useState([]);
    const [ButtonLiked, setButtonLiked] = useState(false);
    const [userID, setUserID] = useState('');
    const type = route.params?.type
    const brand = route.params?.brand
    const topspeed = route.params?.topspeed
    const horsepower = route.params?.horsepower
    const image = route.params?.image
    const model = route.params?.model
    const acceleration = route.params?.acceleration
    const cylinders = route.params?.cylinders
    const price = route.params?.price
    const seats = route.params?.seats
    const logo = route.params?.logo


    function onHandleLike(likedCars, size, { cylinders }, {seats}) {
        if (!likedCars.includes(cylinders)) {
            const newLikedCars = [...likedCars, cylinders];
            setLikedCars(newLikedCars);
            console.log(newLikedCars)
            const availableCar = doc(db, "Profiles", userID)
            updateDoc(availableCar, {
                liked: newLikedCars
            }).catch(error => {
                console.log(error.message)
            })
        }
        if (!size.includes(seats)) {
            const newSize = [...size, seats];
            setLikedCars(newSize);
            console.log(newSize)
            const availableCar = doc(db, "Profiles", userID)
            updateDoc(availableCar, {
                size: newSize
            }).catch(error => {
                console.log(error.message)
            })
        }
    }


    useEffect(() => {
        setIsLoading(true);
        fetch({email});
    }, [])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} color={secondary} />
            </View>
        );
    }

    async function fetch( {email} ) {
        getDocs(collection(db, "Profiles")).then(docSnap => {
            let profiles = [];
            let newLikedCars = [];
            let newSize = [];
            docSnap.forEach((doc) => {
                if (doc.data().Email == email) {
                    profiles.push({ ...doc.data(), id: doc.id })
                    const liked = doc.data().liked;
                    const size = doc.data().size;
                    if (liked && typeof liked === 'object') {
                        Object.values(liked).forEach((carName) => {
                            if (!newLikedCars.includes(carName)) {
                                newLikedCars.push(carName);
                            }
                        });
                    }
                    if (size && typeof size === 'object') {
                        Object.values(size).forEach((carName) => {
                            if (!newSize.includes(carName)) {
                                newSize.push(carName);
                            }
                        });
                    }
                    setUserID(doc.id)
                }
            });
            setProfiles(profiles);
            setLikedCars(newLikedCars);
            setSize(newSize);
            console.log("Document data:", profiles);
            setIsLoading(false);
        });
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
            <CarInfoContainer>
                <RowElements>
                    <HomePageUserIcon>
                        <ButtonImage source={{ uri: logo }} />
                    </HomePageUserIcon>
                    <SectionTitles marginTop={20} marginLeft={15}>{brand} {model}</SectionTitles>
                </RowElements>
                <RowElements>
                    <MaterialIcons marginLeft={70} name={"attach-money"} size={30} color={'#ffd700'} />
                    <SectionTitles>{price}</SectionTitles>
                </RowElements>
                <CarInfoImage resizeMode='contain' source={{ uri: image }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RowElements>
                        <InfoBoxes>
                            <Octicons name={"zap"} size={30} color={secondary} />
                            <InfoText>{topspeed}</InfoText>
                            <InfoTextTitle>   Top speed</InfoTextTitle>
                        </InfoBoxes>
                        <VerticalLine />
                        <InfoBoxes>
                            <Ionicons name={"speedometer-outline"} size={30} color={secondary} />
                            <InfoText>{acceleration}</InfoText>
                            <InfoTextTitle>Acceleration</InfoTextTitle>
                            <InfoTextTitle>(0-100 km/h)</InfoTextTitle>
                        </InfoBoxes>
                        <VerticalLine />
                        <InfoBoxes>
                            <MaterialIcons name={"event-seat"} size={30} color={secondary} />
                            <InfoText>{seats}</InfoText>
                            <InfoTextTitle>Seats</InfoTextTitle>
                        </InfoBoxes>
                    </RowElements>
                    <RowElements>
                        <BiggerTitles>Car Type: </BiggerTitles>
                        <AdditionalInfoText> {type} </AdditionalInfoText>
                    </RowElements>
                    <HorizontalLine />
                    <RowElements>
                        <BiggerTitles>Cylinders: </BiggerTitles>
                        <AdditionalInfoText> {cylinders} </AdditionalInfoText>
                    </RowElements>
                    <HorizontalLine />
                    <RowElements>
                        <BiggerTitles>Power: </BiggerTitles>
                        <AdditionalInfoText> {horsepower} </AdditionalInfoText>
                    </RowElements>
                    <StyledButton likeButton={true} liked={ButtonLiked} onPress={() => onHandleLike(likedCars, size, { cylinders }, {seats})}>
                        <Octicons name={"thumbsup"} size={30} color={secondary} />
                    </StyledButton>
                    <StyledButton welcome={true} onPress={() => navigation.navigate('Available', { carModel: model })}>
                        <ButtonText welcome={true}>Check Availability</ButtonText>
                    </StyledButton>
                </ScrollView>
            </CarInfoContainer>
        </StyledContainer>
    )
};