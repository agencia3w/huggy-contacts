import React from 'react';
import {
    SafeAreaView,
    Container,
    Text
} from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

export function Login() {
    const navigation = useNavigation();
    const { signIn, isSigning } = useAuth();

    function handleLogin() {
        signIn();
    }
    return (
        <SafeAreaView>
            <Container>
                <Text>Login</Text>
                <Button isLoading={isSigning} title="Fazer login com a Huggy" onPress={handleLogin} />
            </Container>
        </SafeAreaView>
    )
}