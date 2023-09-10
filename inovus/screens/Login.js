import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';


import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { Button, InputField, ErrorMessage } from '../components';
import { StyledContainer, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap } from './../components/styles';

const { primary, secondary, lightGrey } = Colors;

import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode='cover' source={require('./../assets/img/img1.jpeg')} />
        <PageTitle>Inovus</PageTitle>
        <SubTitle>Account Login</SubTitle>
        <View width='90%'>
        <MyTextInput
          label="Email Address"
          icon="mail"
          placeholder="someone@gmail.com"
          placeholderTextColor={lightGrey}
          autoFocus={true}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <MyTextInput
          label="Password"
          icon="lock"
          placeholder="* * * * * *"
          placeholderTextColor={lightGrey}
          secureTextEntry={hidePassword}
          hidePassword={hidePassword}
          setHidePassword={setHidePassword}
          textContentType='password'
          value={password}
          isPassword={true}
          onChangeText={text => setPassword(text)}
        />
        {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <StyledButton onPress={onLogin}>
          <ButtonText>Login</ButtonText>
        </StyledButton>
        <View style={styles.container}>
          <ExtraText style={{ padding: 10 }}>Don't have an account?</ExtraText>
          <TextLink onPress={() => navigation.navigate("Signup")}>
            <TextLinkContent>SignUp</TextLinkContent>
          </TextLink>
        </View>
        </View>
      </InnerContainer>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
  }
});

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (<View>
    <LeftIcon>
      <Octicons name={icon} size={30} color={secondary} />
    </LeftIcon>
    <StyledInputLabel>{label}</StyledInputLabel>
    <StyledTextInput {...props} />
    {isPassword && (
      <RightIcon onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={secondary} />
      </RightIcon>
    )}
  </View>);
};
