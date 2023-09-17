import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useRoute } from "@react-navigation/native"

import Firebase from '../config/firebase';

import { Octicons, Ionicons, Fontisto, MaterialIcons } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, TopBar, InfoText, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, FeaturesImage, NamesInRow, AllCarsContainer, CarButton, CarImage, CarInfoContainer, CarInfoImage, RowElements, InfoBoxes, InfoTextTitle, VerticalLine, BiggerTitles, AdditionalInfoText, HorizontalLine } from './../components/styles';

import { doc, getDocs, collection } from "firebase/firestore";
import { db } from './../config/firebase'

export default function CarInfoElectric({ navigation }) {

    const route = useRoute()
    const id = route.params?.id
    const type = route.params?.type
    const brand = route.params?.brand
    const topspeed = route.params?.topspeed
    const horsepower = route.params?.horsepower
    const image = route.params?.image
    const model = route.params?.model
    const acceleration = route.params?.acceleration
    const batteryCapacity = route.params?.batteryCapacity
    const price = route.params?.price
    const seats = route.params?.seats
    const logo = route.params?.logo



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
                    <MaterialIcons  marginLeft ={70} name={"attach-money"} size={30} color={'#ffd700'}/>
                    <SectionTitles>{price}</SectionTitles>
                </RowElements>
                <CarInfoImage resizeMode='contain' source={{ uri: image }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RowElements>
                        <InfoBoxes>
                            <Octicons name={"zap"} size={30} color={secondary}/>
                            <InfoText>{topspeed}</InfoText>
                            <InfoTextTitle>   Top speed</InfoTextTitle>
                        </InfoBoxes>
                        <VerticalLine/>
                        <InfoBoxes>
                            <Ionicons name={"speedometer-outline"} size={30} color={secondary}/>
                            <InfoText>{acceleration}</InfoText>
                            <InfoTextTitle>Acceleration</InfoTextTitle>
                            <InfoTextTitle>(0-100 km/h)</InfoTextTitle>
                        </InfoBoxes>
                        <VerticalLine/>
                        <InfoBoxes>
                            <MaterialIcons name={"event-seat"} size={30} color={secondary}/>
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
                        <BiggerTitles>Battery Capacity: </BiggerTitles>
                        <AdditionalInfoText> {batteryCapacity} </AdditionalInfoText>
                    </RowElements>
                    <HorizontalLine />
                    <RowElements> 
                        <BiggerTitles>Power: </BiggerTitles>
                        <AdditionalInfoText> {horsepower} </AdditionalInfoText>
                    </RowElements>
                    <StyledButton welcome={true} onPress={() => navigation.navigate('Available', {carModel:model})}>
                        <ButtonText welcome={true}>Check Availability</ButtonText>
                    </StyledButton>
                </ScrollView>
            </CarInfoContainer>
        </StyledContainer>
    )
};