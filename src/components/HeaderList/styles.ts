import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Props } from '.';

export const Container = styled.View<Props>`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    border-bottom-width: ${props => props.border ? 1 : 0}px;
    border-bottom-color: ${({ theme }) => theme.colors.mine_shaft_30};
`;

export const ContainerSearch = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    height: 28px;
`;

export const Input = styled.TextInput``;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_medium};
    font-size: ${RFValue(20)}px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.mine_shaft_900};
`;

export const Icons = styled.View`
    flex-direction: row;
`;

export const Button = styled.TouchableOpacity`

`;
