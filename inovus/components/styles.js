import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
    primary: "#ffffff",
    secondary: "#000000",
    lightGrey: "#d3d3d3",
};

const { primary, secondary } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`;
export const InnerContainer = styled.View`
    flex: 1;
    width:100%;
    align-items:center;
`;

export const ContactUsContainer = styled.View`
    flex: 1;
    width:100%;
    flex-direction:row;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const PageLogo = styled.Image`
    width: 320px;
    height: 140px;

    ${(props) => props.survey && `
        height: 250px;
        width: 205px;
        margin-left: 40px;
    `}
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
    height: 50%;
    width: 75%;
`;

export const PageTitle = styled.Text`
    font-size: 26px;
    text-align:center;
    font-weight: bold;
    color: ${secondary};
    padding: 30px;

    ${(props) => props.welcome && `
        font-size: 35px;
    `}
    ${(props) => props.compare && `
        padding: 10px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight:bold;
    color: ${secondary};

    ${(props) => props.welcome && `
    margin-bottom: 5px;
    font-weight: normal;
    `}
`;

export const StyledFormArea = styled.View`
    width = '90%';
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${primary};
    border : 2px;
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${secondary};
`;

export const StyledInputLabel = styled.Text`
    color: ${secondary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top:33px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top:33px;
    position: absolute;
    z-index: 1;
`;


export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${secondary};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 20px;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${`#008000`};
        flex-direction: row;
        justify-content: center;
    `}

    ${(props) => props.welcome == true && `
        background-color: ${primary};
        border: 2px;
        height: 50px;
        border-radius: 10px;
        padding: 12px;
    `}
    ${(props) => props.likeButton == true && `
        background-color: ${primary};
        border: 2px;
        height: 70px;
        margin-up: 15px;
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 5px;
    `}

    ${(props) => props.liked == true && `
        background-color: ${"#1e90ff"};
        border: 2px;
        height: 70px;
        margin-up: 15px;
        border-radius: 10px;
        padding: 12px;
        margin-bottom: 5px;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size:20px;
    
    ${(props) => props.google == true && `
        margin-horizontal: 25px;
    `}

    ${(props) => props.welcome == true && `
        color: ${secondary};
        font-size:15px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 2px;
    width: 100%;
    background-color: "#000000";
    margin-vertical:10px;
`;

export const ExtraView = styled.View`
    justify content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${secondary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${'#008000'};
    font-size: 15px;
`;

export const Gap = styled.View`
    padding: 20px;
`;

//HOMEPAGE: 


export const TopBar = styled.View`
    flex-direction: row;
`;

export const HomePageUserIcon = styled.TouchableOpacity`
    margin-top: 8px;
    margin-left: 10px;
`;

export const HomePageLogo = styled.Image`
    height: 40px;
    width: 100px;
    margin-left:200px;
    margin-right: 20px;
`;

export const HomePageContainer = styled.View`
    flex: 1;
    flex-direction:'column';
    margin-top: 10px;
`;

export const NotificationsIcon = styled.TouchableOpacity`
    margin-top: 10px;
`;

export const SectionTitles = styled.Text`
    font-size: 23px;
    color: ${secondary};
    font-weight: bold;

    ${(props) => props.survey == true && `
        margin-top: 10px;
    `}

    ${(props) => props.contact == true && `
        text-decoration-line: Underline;
        margin-bottom: 30px;
    `}
`;

export const ViewOfScroll = styled.View`
    height: 100px;
`;

export const BrandButtonsContainer = styled.View`
    margin-top: 25px;
    flex-direction: row;
`;

export const ButtonImage = styled.Image`
    height: 55px;
    width: 55px;
    resize-mode: contain;
`;

export const BrandButton = styled.TouchableOpacity`
    margin-right: 20px;
    border-radius: 100px;
    height: 55px;
    width: 55px;
`;

export const FeaturesContainer = styled.View`
    flex-direction:row;
`;

export const FeaturesButton = styled.TouchableOpacity`
    margin-top: 30px;
    margin-left: 20px;
    border: 2px;
    height: 200px;
    width: 140px;
    border-radius: 20px;
`;

export const FeaturesButtonSingle = styled.TouchableOpacity`
    margin-top: 30px;
    margin-left: 100px;
    border: 2px;
    height: 200px;
    width: 140px;
    border-radius: 20px;
`;

export const FeaturesImage = styled.Image`
    margin-left:10px;
    height: 200px;
    width: 120px;
    resize-mode: contain;
`;

export const FeaturesName = styled.Text`
    font-size: 20px;
    color: ${secondary};
    font-weight: bold;
    margin-left: 55px;
    margin-top: 10px;
    margin-right: 10px;

    ${(props) => props.recommended == true && `
        font-size: 18px;
        margin-left: 0px;
    `}

    ${(props) => props.contact == true && `
        margin-left: 16px;
    `}
`;

export const LogoutLogo = styled.Image`
    height: 300px;
    width: 150px;
    resize-mode:contain;
`;

// ALLCARS: 


export const AllCarsContainer = styled.View`
    width:100%;
    align-items:center;
`;

export const AllCarsCarName = styled.Text`
    font-weight: bold;
    color: ${secondary};
    font-size: 25px;
`;

export const AllCarsCarBrand = styled.Text`
    color: ${'#696969'};
    margin-top: 4px;
    font-size: 20px;
`;

export const CarButton = styled.TouchableOpacity`
    margin-top: 30px;
    border: 2px;
    height: 300px;
    width: 250px;
    border-radius: 20px;
`;

export const CarImage = styled.Image`
    margin-left:10px;
    height: 300px;
    width: 230px;
    resize-mode: contain;

    ${(props) => props.comparison == true && `
        height: 250px;
    `}
`;


//CarInfo:


export const CarInfoContainer = styled.View`
    flex: 1;
    width:100%;
    margin-top: 20px;
`;

export const CarInfoImage = styled.Image`
    margin-left:10px;
    height: 300px;
    width: 320px;
    resize-mode: contain;
`;

export const RowElements = styled.View`
    flex-direction: row;
`;

export const InfoBoxes = styled.View`
    flex-direction: column;
    align-items:center;
`;

export const InfoTextTitle = styled.Text`
    font-weight: bold;
    color: ${"#a9a9a9"}
`;

export const InfoText = styled.Text`
    font-size: 20px;
    margin-top: 10px;
    margin-left: 8px;
`;

export const VerticalLine = styled.View`
    height: 90px;
    width: 2px;
    background-color: ${'#e6e6fa'};
    margin-left: 20px;
    margin-right: 20px;

    ${(props) => props.AllCars == true && `
        margin-top: 10px;
        height: 50px;
    `}
`;

export const BiggerTitles = styled.Text`
    font-weight: bold;
    color: ${"#a9a9a9"};
    font-size:20px;
    margin-top: 20px;

    ${(props) => props.compare && `
        font-size:10px;
    `}
`;

export const HorizontalLine = styled.View`
    height: 2px;
    width: 90%;
    background-color: ${'#e6e6fa'};
    margin-top: 15px;
    ${(props) => props.compare && `
        margin-top: 5px;
    `}
`;

export const AdditionalInfoText = styled.Text`
    font-size: 20px;
    margin-top: 20px;
    margin-left: 8px;
    ${(props) => props.compare && `
        font-size: 10px;
    `}
`;

export const SearchBox = styled.TextInput`
    border : 1px;
    margin-top:10px;
    border-radius: 8px;
    padding-horizontal: 20px;
    height: 40px;
    border-color:${"#ccc"};
`;

export const AvailableContainers = styled.View`
    height:150px;
    width :90%;
    border:2px;
    border-radius: 20px;
    margin-top: 40px;
`;

export const AvailabilityTitles = styled.Text`
    margin-top: 10px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
    align-self: flex-end;
`;

export const SmallTitles = styled.Text`
    margin-top: 10px;
    font-size: 20px;
`;


export const StyledButtonBuy = styled.TouchableOpacity`
    padding: 15px;
    justify-content: center;
    align-items: center;
    margin-vertical: 20px;
    background-color: ${primary};
    border: 2px;
    height: 50px;
    border-radius: 10px;
    padding: 12px;
    margin-left:25px;
`;

export const ErrorMessageContainer = styled.View`
    margin-top: 50px;
    align-items: center;
    text-align: center;
`;


export const ErrorMessageNoCar = styled.Text`
    align-items: center;
    font-size: 20px;
    font-weight: bold;
`;

export const ComparisonContainer = styled.View`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const ComparisonSlot = styled.TouchableOpacity`
    border : 2px;
    height: 300px;
    width: 250px;
    margin-left: 20px;
    margin-vertical: 25px;
    border-radius: 20px;
`;

export const ComparisonTitle = styled.Text`
    font-weight:bold;
    font-size: 23px;
    margin-top: 10px;
    text-align:center;

    ${(props) => props.unavailable == true && `
        margin-top: 60px;
        font-size: 20px;
    `}
`;

export const TextButtonText = styled.Text`
    font-weight: bold;
    color: ${"#a9a9a9"};
    font-size:20px;
    margin-top: 20px;
`;

export const TextButton = styled.TouchableOpacity`

`;

export const SurveyContainer = styled.View`
    margin-top: 20px;
    flex: 1;
    width:100%;
`;

export const SurveyTitle = styled.Text`
    font-weight: bold;
    margin-top: 20px;
    margin-left: 40px;
    font-size: 20px;
    margin-bottom: 10px;
`;

export const QuestionText = styled.Text`
    font-weight: bold;
    font-size: 15px;
`;