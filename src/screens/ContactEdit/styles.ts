import styled from 'styled-components/native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import theme from '../../styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

interface FloatLabelProps {
    hasError?: boolean | undefined;
}

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

export const Container = styled.ScrollView`
    flex: 1;
    padding: 0 16px 16px 16px;
`;

export const Text = styled.Text``;

export const Label = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_medium};
    font-size: ${RFValue(12)}px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.mine_shaft_800};
    margin-left: 16px;
`;

export const TextError = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_medium};
    font-size: ${RFValue(12)}px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.alizarin_crimson_500};
    margin-left: 16px;
`;

export const Form = styled.View`
    margin-top: 16px;
`;

export const FloatInput = styled(FloatingLabelInput).attrs<FloatLabelProps>(props => ({
    containerStyles: {
        borderWidth: 2,
        padding: 16,
        backgroundColor: theme.colors.mine_shaft_10,
        borderColor: props.hasError ? theme.colors.alizarin_crimson_500 : theme.colors.mine_shaft_40,
        borderRadius: 12,
        marginBottom: 16,
    },
    customLabelStyles: {
        fontSizeBlurred: 16,
        fontSizeFocused: 12,
        colorBlurred: props.hasError ? theme.colors.alizarin_crimson_500 : theme.colors.mine_shaft_900,
        colorFocused: props.hasError ? theme.colors.alizarin_crimson_500 : theme.colors.mine_shaft_800,
        leftBlurred: 0,
        leftFocused: -4,
        topFocused: -12,
    },
    inputStyles: {
        fontSize: 16,
    }
}))``;