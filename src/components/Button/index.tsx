import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import {
    Container,
    Text
} from './styles';
import Iconmoon from '../../components/Iconmoon';
import { useTheme } from 'styled-components';

type Props = TouchableOpacityProps & {
    title: string;
    icon?: string;
    isLoading?: boolean;
}

export function Button({ title, icon, isLoading = false, ...rest }: Props) {
    const theme = useTheme();

    return (
        <Container disabled={isLoading} activeOpacity={0.7} {...rest}>
            <Iconmoon name={icon} color={theme.colors.white} size={20} />
            {isLoading && <ActivityIndicator size="small" />}
            <Text>{title}</Text>
        </Container>
    )
}