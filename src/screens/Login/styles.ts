import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Text = styled.Text`
    font-size: ${RFValue(24)}px;
    line-height: ${RFValue(32)}px;
    font-family: ${({ theme }) => theme.fonts.roboto_regular};
    color: ${({ theme }) => theme.colors.mine_shaft_700};
    margin-bottom: 24px;
`;