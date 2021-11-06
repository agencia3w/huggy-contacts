import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { ContactProps } from '.';

type Props = {
    border?: boolean;
}

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerHeader = styled.View<Props>`
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

export const ButtonSearch = styled.TouchableOpacity``;

export const Input = styled.TextInput``;

export const Icons = styled.View`
    flex-direction: row;
`;

export const HeaderButton = styled.TouchableOpacity``;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_medium};
    font-size: ${RFValue(20)}px;
    line-height: 28px;
    color: ${({ theme }) => theme.colors.mine_shaft_900};
`;

export const Image = styled.Image`
    width: 200px;
    height: 200px;
    margin-bottom: 16px;
`;

export const Text = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_regular};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.mine_shaft_100};
    margin-bottom: 24px;
`;

export const List = styled(
    FlatList as new () => FlatList<ContactProps>
).attrs({
    showsVerticalScrollIndicator: false,
})`
    width: 100%
`;

export const ButtonContact = styled(RectButton)`
    width: 100%;
    height: 56px;
    flex-direction: row;
    align-items: center;
    padding-left: 50px;
`;

export const TextContact = styled.Text`
    font-family: ${({ theme }) => theme.fonts.roboto_regular};
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.mine_shaft_900};
    margin-left: 16px;
`;

export const FabButton = styled.TouchableOpacity`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: ${({theme}) => theme.colors.persian_blue_600};
    position: absolute;
    bottom: 28px;
    right: 16px;
    justify-content: center;
    align-items: center;
`;