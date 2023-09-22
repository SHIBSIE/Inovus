import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { StyledContainer, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap } from '../components/styles';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';
import {firebase} from '../config/config';
import { doc, getDocs, collection,updateDoc, setDoc } from "firebase/firestore";
import { db } from './../config/firebase'
import { useRoute } from "@react-navigation/native"
//import storage from '@react-native-firebase/storage';

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

const { primary, secondary, lightGrey } = Colors;

const auth = Firebase.auth();

export default function BookingInfo({ navigation }) {
  const route = useRoute()
  const id = route.params?.id
  const [email, setEmail] = useState('');
  const [FullName, setFullName] = useState('');
  const [signupError, setSignupError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idProof, setIdProof] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(false);

  function handleSubmit() {
    uploadMedia();
    const buyerInfo = doc(db, "Buyers", id)
    setDoc(buyerInfo, {
      Name: FullName,
      Email: email,
      PhoneNumber: phoneNumber,
      IdProof: idProof
    }).then(response => {
      alert("Car has been booked")
    }).catch(error => {
      console.log(error.message)
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'))
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      setIdProof(filename);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      setUploading(false);
      Alert.alert('Photot uploaded');
      setImage(nulll);
    } catch (error) {
        console.error(error);
        setUploading(false);
    }
  };

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
            label="Phone Number"
            icon="device-mobile"
            placeholder="+961 XXXXXXXX"
            placeholderTextColor={lightGrey}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
          {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
          <StyledButton onPress={pickImage}>
            <ButtonText>Insert ID Image</ButtonText>
          </StyledButton>
          <StyledButton onPress={handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </StyledButton>
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