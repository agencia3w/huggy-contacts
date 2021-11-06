import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
    Container,
    Icons,
    Button,
} from './styles';
import Iconmoon from '../Iconmoon';
import { useNavigation } from '@react-navigation/core';

type Props = {
    onDelete: () => void;
    isLoading?: boolean;
}

export function HeaderShow({ onDelete, isLoading = false }: Props) {
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <Icons>
                <Button onPress={handleBack}>
                    <Iconmoon name="arrow_back" size={24} />
                </Button>
                {isLoading ? <ActivityIndicator /> :
                    <Button onPress={onDelete}>
                        <Iconmoon name="delete" size={24} />
                    </Button>
                }
            </Icons>
        </Container>
    )
}