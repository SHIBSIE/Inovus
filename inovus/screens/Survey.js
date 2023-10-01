import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useMemo,useEffect } from 'react';
import { Linking, ScrollView, View, Text,ActivityIndicator } from 'react-native';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigators/AuthenticatedUserProvider';
import RadioGroup from 'react-native-radio-buttons-group';

import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
const { primary, secondary, lightGrey } = Colors;
import { StyledContainer, InfoText, FeaturesName, TopBar, FeaturesButtonSingle, BrandButton, BrandButtonsContainer, ButtonImage, FeaturesButton, FeaturesContainer, HomePageUserIcon, HomePageLogo, NotificationsIcon, HomePageContainer, SectionTitles, ViewOfScroll, Colors, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, StyledButton, ButtonText, RightIcon, MsgBox, Line, ExtraView, ExtraText, TextLink, TextLinkContent, Gap, FeaturesImage, NamesInRow, InfoTextTitle, FeedbackBox, SurveyContainer, QuestionText, SurveyTitle } from '../components/styles';

import { doc, getDocs, collection, updateDoc, setDoc } from "firebase/firestore";
import { db } from './../config/firebase'

const auth = Firebase.auth();

export default function Survey({ navigation }) {
    const { user } = useContext(AuthenticatedUserContext);
    const [seatsId, setSeatsId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const email = user.email;
    const [surveyResult, setSurveyResult] = useState([]);
    const [engineId, setEngineId] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [userID, setUserID] = useState('');
    const [horsepowerId, setHorsepowerId] = useState("");

    const seatsButtons = useMemo(() => ([
        {
            id: '2',
            label: '2 seats',
            value: '2'
        },
        {
            id: '5',
            label: '5 seats',
            value: '5'
        },
        {
            id: '7',
            label: '7 seats',
            value: '7'
        }
    ]), []);

    const engineButtons = useMemo(() => ([
        {
            id: 'fuel',
            label: 'Fuel',
            value: 'fuel'
        },
        {
            id: 'electric',
            label: 'Electric',
            value: 'electric'
        },
        {
            id: 'hybrid',
            label: 'Hybrid',
            value: 'hybrid'
        }
    ]), []);

    const horsepowerButtons = useMemo(() => ([
        {
            id: 'large cars',
            label: 'more than 250 hp (large car)',
            value: 'large cars'
        },
        {
            id: 'small cars',
            label: '100-149 hp (small car)',
            value: 'small cars'
        },
        {
            id: 'midsize cars',
            label: '150-249 hp (midsize car)',
            value: 'midsize cars'
        },
    ]), []);

    function onHandleSubmit(surveyResult, { seatsId }, { engineId }, { horsepowerId }) {
        if (!seatsId == "" && !engineId == "" && !horsepowerId == "") {
            const newSurveyResult = [...surveyResult, seatsId, engineId, horsepowerId];
            setSurveyResult(newSurveyResult);
            console.log(newSurveyResult)
            const userProfile = doc(db, "Profiles", userID)
            updateDoc(userProfile, {
                survey: newSurveyResult,
                surveyFilled : true
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
            docSnap.forEach((doc) => {
                if (doc.data().Email == email) {
                    profiles.push({ ...doc.data(), id: doc.id })
                    setUserID(doc.id)
                }
            });
            setProfiles(profiles);
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
            </TopBar>
            <PageLogo survey={true} resizeMode='cover' source={require('./../assets/feedback.png')} />
            <SectionTitles survey={true}> Give us feedback! </SectionTitles>
            <InfoText>Your input shapes our future!</InfoText>
            <InfoText>Please share your thoughts with us.</InfoText>
            {/* <StyledButton onPress={() => Linking.openURL('https://forms.office.com/Pages/ResponsePage.aspx?id=Glu6x7ZB6UOhIG_2VK2hNwlgg3UFAkFIm-voHfmUcS5UMjg2VE9HN1Q0Mlk4MzBTTkY0MTEyV1hXNC4u')}>
                <ButtonText>Go to survey!</ButtonText>
            </StyledButton> */}
            <SurveyContainer>
                <QuestionText> Preferred number of car seats: </QuestionText>
                <RadioGroup
                    radioButtons={seatsButtons}
                    onPress={setSeatsId}
                    selectedId={seatsId}
                    layout='row'
                />
                <QuestionText> What type of engine do you prefer? </QuestionText>
                <RadioGroup
                    radioButtons={engineButtons}
                    onPress={setEngineId}
                    selectedId={engineId}
                    layout='row'
                />
                <QuestionText> How much horsepower do you prefer? </QuestionText>
                <View height={40}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <RadioGroup
                            radioButtons={horsepowerButtons}
                            onPress={setHorsepowerId}
                            selectedId={horsepowerId}
                            layout='row'
                        />
                    </ScrollView>
                </View>
                <StyledButton onPress={() => onHandleSubmit(surveyResult, { seatsId }, { engineId }, { horsepowerId })}>
                    <ButtonText>Submit</ButtonText>
                </StyledButton>
            </SurveyContainer>
        </StyledContainer>
    );
}