import React from "react";
import { StatusBar } from 'expo-status-bar';


import { Octicons, Ionicons } from '@expo/vector-icons';

import { StyledContainer, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, WelcomeContainer } from './../components/styles';
import { StyleSheet, View } from 'react-native';

//Colors:
const { primary, secondary, lightGrey } = Colors;

const Welcome = ({navigation}) => {

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <WelcomeContainer>
        <PageLogo resizeMode='cover' source={require('./../assets/img/img1.jpeg')} />
        <Gap></Gap>
        <PageTitle>Welcome to Inovus</PageTitle>
        <Gap></Gap>
        <View width='90%'>
          <StyledButton welcome={true} onPress={() => navigation.navigate('Login')}>
            <ButtonText welcome={true}>Login</ButtonText>
          </StyledButton>
          <StyledButton welcome={true} onPress={() => navigation.navigate('Signup')}>
            <ButtonText welcome={true}>SignUp</ButtonText>
          </StyledButton>
        </View>
      </WelcomeContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (<View>
    <LeftIcon>
      <Octicons name={icon} size={30} color={secondary} />
    </LeftIcon>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextInput {...props} />
    {isPassword && (
      <RightIcon onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={primary} />
      </RightIcon>
    )}
  </View>);
};

export default Welcome;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  }
});