import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${({theme, disabled}) => disabled ? theme.colors.persian_blue_100 : theme.colors.persian_blue_600 };
    padding: 9px 12px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.Text`
    font-size: ${RFValue(14)}px;
    line-height: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.white};
`;