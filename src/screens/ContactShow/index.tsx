import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { HeaderShow } from '../../components/HeaderShow';
import UserAvatar from 'react-native-user-avatar';
import {
    SafeAreaView,
    Container,
    ContainerPadding,
    ContactInfo,
    Name,
    Id,
    Blocks,
    Title,
    Label,
    Text,
    FabButton,
    FabButtonText
} from './styles';

import { ContactDTO } from '../../dtos/ContactDTO';
import { useTheme } from 'styled-components';
import { Alert } from 'react-native';
import { api } from '../../services/api';
import Iconmoon from '../../components/Iconmoon';

type ContactProps = {
    item: ContactDTO
}

export function ContactShow() {
    const [loading, setLoading] = useState(false);
    const [fabLarge, setFabLarge] = useState(true);

    const route = useRoute();
    const { item } = route.params as ContactProps;
    const theme = useTheme();
    const navigation = useNavigation();

    function confirmDelete(id: number, name: string) {
        Alert.alert(
            'Excluir Cadastro',
            `Deseja realmente excluir o cadastro de ${name}?`,
            [
                {
                    text: 'Não',
                },
                {
                    text: 'Sim',
                    onPress: () => handleDelete(id)
                }
            ]
        )
    }

    async function handleDelete(id: number) {
        setLoading(true);
        try {
            await api.delete(`contacts/${id}`);
            Alert.alert('Sucesso', 'O contato foi excluído com sucesso!');
            navigation.navigate('ContactList');
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir o contato.');
        }
    }

    function handleEdit(item: ContactDTO) {
        navigation.navigate('ContactEdit', { item })
    }

    return (
        <SafeAreaView>
            <HeaderShow onDelete={() => confirmDelete(item.id, item.name)} isLoading={loading} />
            <Container
                showsVerticalScrollIndicator={false}
                onScroll={event => {
                    setFabLarge(event.nativeEvent.contentOffset.y > 0 ? false : true);
                }}
                scrollEventThrottle={16}
            >
                <ContactInfo>
                    <UserAvatar
                        size={64}
                        name={item.name}
                        src={item.photo}
                        bgColor={theme.colors.persian_blue_10}
                        textColor={theme.colors.persian_blue_800}
                    />
                    <Name>{item.name}</Name>
                    <Id>{item.id}</Id>
                </ContactInfo>

                <ContainerPadding>
                    <Title>Detalhes</Title>
                    <Blocks>
                        <Label>Nome</Label>
                        <Text>{item.name}</Text>
                    </Blocks>
                    <Blocks>
                        <Label>E-mail</Label>
                        <Text>{item.email}</Text>
                    </Blocks>
                    <Blocks>
                        <Label>Telefone</Label>
                        <Text>{item.phone || '-'}</Text>
                    </Blocks>
                    <Blocks>
                        <Label>Celular</Label>
                        <Text>{item.mobile || '-'}</Text>
                    </Blocks>

                    <Title>Endereço</Title>
                    <Blocks>
                        <Label>Endereço</Label>
                        <Text>{item.address || '-'}</Text>
                    </Blocks>
                    <Blocks>
                        <Label>Bairro</Label>
                        <Text>{item.district || '-'}</Text>
                    </Blocks>
                    <Blocks>
                        <Label>Cidade</Label>
                        <Text>{item.city || '-'}</Text>
                    </Blocks>
                    <Blocks>
                        <Label>Estado</Label>
                        <Text>{item.state || '-'}</Text>
                    </Blocks>
                </ContainerPadding>
            </Container>
            <FabButton large={fabLarge} activeOpacity={0.7} onPress={() => { handleEdit(item) }}>
                <Iconmoon name="edit" color={theme.colors.white} size={24} />
                {fabLarge && <FabButtonText>Editar contato</FabButtonText>}
            </FabButton>
        </SafeAreaView>
    )
}