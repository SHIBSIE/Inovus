import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { StyledContainer, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap } from '../components/styles';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import {firebase} from '../config/config';
import { doc, getDocs, collection,updateDoc, addDoc } from "firebase/firestore";
import { db } from './../config/firebase'
import { useRoute } from "@react-navigation/native"

const { primary, secondary, lightGrey } = Colors;

const auth = Firebase.auth();

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FullName, setFullName] = useState('');
  const [signupError, setSignupError] = useState('');
  const [likedCars, setlikedCars] = useState([]);
  const [hidePassword, setHidePassword] = useState(true);


  const onHandleSignup = async () => {
    try {
      if (email !== '' && password !== '' && FullName !== '') {
        await auth.createUserWithEmailAndPassword(email, password, FullName);
      }
    } catch (error) {
      setSignupError(error.message);
    }
    const profileInfo = addDoc(collection(db, "Profiles"), {
      Name: FullName,
      Email: email,
      liked: likedCars
  });
}


  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode='cover' source={require('./../assets/img/img1.jpeg')} />
        <PageTitle>Inovus</PageTitle>
        <SubTitle>Account Sign Up</SubTitle>
        <View width='90%'>
          <MyTextInput
            label="Full Name"
            icon="person"
            placeholder="Richard Barnes"
            placeholderTextColor={lightGrey}
            autoFocus={true}
            value={FullName}
            onChangeText={text => setFullName(text)}
          />

          <MyTextInput
            label="Email Address"
            icon="mail"
            placeholder="someone@gmail.com"
            placeholderTextColor={lightGrey}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <MyTextInput
            label="Password"
            icon="lock"
            placeholder="* * * * * *"
            placeholderTextColor={lightGrey}
            textContentType='password'
            rightIcon={RightIcon}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={hidePassword}
            isPassword={true}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />
          {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
          <StyledButton onPress={onHandleSignup}>
            <ButtonText>Sign Up</ButtonText>
          </StyledButton>
          <View style={styles.container}>
            <ExtraText style={{ padding: 10 }}>Already have an account?</ExtraText>
            <TextLink onPress={() => navigation.navigate("Login")}>
              <TextLinkContent>Login</TextLinkContent>
            </TextLink>
          </View>
        </View>
      </InnerContainer>
    </StyledContainer>
  );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, showDatePicker, isDate, ...props }) => {
  return (<View>
    <LeftIcon>
      <Octicons name={icon} size={30} color={secondary} />
    </LeftIcon>
    <StyledInputLabel>{label}</StyledInputLabel>
    {!isDate && <StyledTextInput {...props} />}
    {isDate && (
      <TouchableOpacity onPress={showDatePicker}>
        <StyledTextInput {...props} />
      </TouchableOpacity>
    )}
    {isPassword && (
      <RightIcon onPress={() => setHidePassword(!hidePassword)}>
        <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={secondary} />
      </RightIcon>
    )}
  </View>);
};

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
  }
});