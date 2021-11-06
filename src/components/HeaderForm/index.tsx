import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import {
    Container,
    TitleContainer,
    Title,
    Icon,
    Button,
    ButtonTitle,
} from './styles';
import Iconmoon from '../Iconmoon';
import { useNavigation } from '@react-navigation/core';

type Props = TouchableOpacityProps & {
    title: string;
    isLoading?: boolean;
    onPress: () => void;
}

export function HeaderForm({ title, isLoading = false, onPress }: Props) {
    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    }
    return (
        <Container>
            <TitleContainer>
                <Icon onPress={handleGoBack}>
                    <Iconmoon name="close" size={24} />
                </Icon>
                <Title>{title}</Title>
            </TitleContainer>
            <Button disabled={isLoading} onPress={onPress}>
                {isLoading && <ActivityIndicator size="small" />}
                <ButtonTitle>Salvar</ButtonTitle>
            </Button>
        </Container>
    )
}