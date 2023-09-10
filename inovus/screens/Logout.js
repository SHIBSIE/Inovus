import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigators/AuthenticatedUserProvider';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, FeaturesName, LogoutLogo, TopBar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow } from '../components/styles';

const auth = Firebase.auth();

export default function Logout({navigation}) {
    const { user } = useContext(AuthenticatedUserContext);
    const handleSignOut = async () => {
        try {
        await auth.signOut();
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <StyledContainer>
            <InnerContainer>
                <LogoutLogo size={50} resizeMode='cover' source={require('./../assets/img/logout.png')} />
                <Text>Hello {user.email} </Text>
                <Gap />
                <StyledButton onPress={handleSignOut}>
                    <ButtonText>Logout</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    );
};
