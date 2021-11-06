import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface FabProps{
    large?: boolean;
}

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

export const Container = styled.ScrollView`
    flex: 1;
`;

export const ContainerPadding = styled.View`
    padding: 0 16px 16px 16px;
`;

export const ContactInfo = styled.View`
    align-items: center;
    justify-content: center;
    height: 167px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.mine_shaft_30};
`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.roboto_medium};
    font-size: ${RFValue(20)}px;
    color: ${({theme}) => theme.colors.mine_shaft_900};
    margin: 16px 0 8px 0;
`;

export const Id = styled.Text`
    font-family: ${({theme}) => theme.fonts.roboto_regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.mine_shaft_400};
`;

export const Blocks = styled.View`
    height: 56px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.mine_shaft_30};
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.rubik_medium};
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.persian_blue_600};
    padding: 24px 0 16px 0;
`;

export const Label = styled.Text`
    font-family: ${({theme}) => theme.fonts.rubik_regular};
    font-size: ${RFValue(12)}px;
    color: ${({theme}) => theme.colors.mine_shaft_800};
`;

export const Text = styled.Text`
    font-family: ${({theme}) => theme.fonts.rubik_regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.mine_shaft_900};
`;

export const FabButton = styled.TouchableOpacity<FabProps>`
    flex-direction: row;
    width: ${props => props.large ? 172 : 48}px;
    height: 48px;
    border-radius: 24px;
    background-color: ${({theme}) => theme.colors.persian_blue_600};
    position: absolute;
    bottom: 28px;
    right: 16px;
    justify-content: center;
    align-items: center;
`;

export const FabButtonText = styled.Text<FabProps>`
    margin-left: 12px;
    font-family: ${({theme}) => theme.fonts.roboto_medium};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.white};
`; 
