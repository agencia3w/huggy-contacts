import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.mine_shaft_30};
`;

export const TitleContainer = styled.View`
    flex-direction: row;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.roboto_medium};
    font-size: ${RFValue(20)}px;
    line-height: 28px;
    color: ${({theme}) => theme.colors.mine_shaft_900};
`;

export const Icon = styled.TouchableOpacity`
    margin-right: 32px;
`;

export const Button = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${({theme, disabled}) => disabled ? theme.colors.persian_blue_100 : theme.colors.persian_blue_600 };
    padding: 9px 12px;
    border-radius: 8px;
`;

export const ButtonTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.roboto_medium};
    font-size: ${RFValue(14)}px;
    line-height: 18px;
    color: ${({theme}) => theme.colors.white};
`;
