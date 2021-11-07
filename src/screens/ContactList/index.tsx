import React, { useEffect, useState, useCallback } from 'react';
import {
    SafeAreaView,
    Container,
    ContainerSearch,
    ContainerHeader,
    HeaderButton,
    Title,
    TitleSection,
    Icons,
    ButtonSearch,
    Input,
    Image,
    SectionListContact,
    Text,
    FabButton,
    ButtonContact,
    TextContact
} from './styles';

import contactImg from '../../assets/contactBook.png'

import { Button } from '../../components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { api } from '../../services/api';
import { ActivityIndicator, Alert } from 'react-native';
import Iconmoon from '../../components/Iconmoon';
import { useTheme } from 'styled-components';
import UserAvatar from 'react-native-user-avatar';

import { ContactDTO } from '../../dtos/ContactDTO';
import { useAuth } from '../../hooks/auth';

export type ContactProps = ContactDTO;

export function ContactList() {
    const navigation = useNavigation();
    const theme = useTheme();
    const { signOut } = useAuth();

    const [data, setData] = useState<ContactProps[]>([]);
    const [sectionData, setSectionData] = useState<ContactProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bordered, setBordered] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [text, setText] = useState('');

    function handleSignOut() {
        signOut();
    }

    function handleAddContact() {
        navigation.navigate('ContactNew');
    }

    function handleSearch() {
        setText('');
        setShowSearch(!showSearch);
    }

    async function loadContacts() {
        try {
            setIsLoading(true);
            const url = (text === '') ? 'contacts' : `contacts?q=${text}`;
            const response = await api.get(url);

            let contact = [] as [];

            const sectionDataFormatted = response.data.map(item => {
                const letter = contact.find(c => c.title === item.name.substring(0, 1));
                
                if (!letter) {
                    contact.push({
                        title: item.name.substring(0, 1),
                        data: [item]
                    })
                }else{
                    const contactFilter = contact.filter(c => c.title === item.name.substring(0, 1))
                    contactFilter[0].data.push(item);
                }
            });

            setSectionData(contact);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os contatos!')
            console.log(error);
        }
    }

    function handleDetail(item: ContactProps) {
        navigation.navigate('ContactShow', { item })
    }

    useEffect(() => {
        loadContacts();
        return () => { }
    }, [text]);

    useFocusEffect(useCallback(() => {
        loadContacts();
    }, [text]));

    return (
        <SafeAreaView>
            <ContainerHeader border={bordered}>
                {showSearch ?
                    <ContainerSearch>
                        <ButtonSearch onPress={handleSearch}>
                            <Iconmoon name="arrow_back" size={24} color={theme.colors.mine_shaft_100} />
                        </ButtonSearch>
                        <Input
                            autoFocus
                            placeholder="Digite o termo para busca..."
                            value={text}
                            onChangeText={value => setText(value)}
                        />
                    </ContainerSearch>
                    :
                    <>
                        <Title>Contatos</Title>
                        <Icons>
                            <HeaderButton onPress={handleSearch}>
                                <Iconmoon name="search" size={24} />
                            </HeaderButton>
                            <HeaderButton onPress={handleSignOut} style={{ marginLeft: 24 }}>
                                <Iconmoon name="logout" size={24} />
                            </HeaderButton>
                        </Icons>
                    </>
                }
            </ContainerHeader>

            <Container>
                {isLoading ? <ActivityIndicator /> :
                    <>
                        {data.length === 0 ?
                            <>
                                <Image source={contactImg} />
                                <Text>Ainda não há contatos</Text>
                                <Button title="Adicionar contato" icon="add" onPress={handleAddContact} />
                            </>
                            :
                            <>
                                <SectionListContact
                                    contentContainerStyle={{paddingBottom: 30}}
                                    sections={sectionData}
                                    keyExtractor={(item) => String(item.id)}
                                    renderItem={({ item }) =>
                                        <ButtonContact underlayColor={theme.colors.mine_shaft_10} onPress={() => handleDetail(item)} activeOpacity={0.7}>
                                            <UserAvatar
                                                size={40}
                                                name={item.name}
                                                bgColor={theme.colors.persian_blue_10}
                                                textColor={theme.colors.persian_blue_800}
                                            />
                                            <TextContact>{item.name}</TextContact>
                                        </ButtonContact>
                                    }
                                    renderSectionHeader={({ section: { title } }) => (
                                        <TitleSection>{title}</TitleSection>
                                    )}
                                />
                                <FabButton activeOpacity={0.7} onPress={handleAddContact}>
                                    <Iconmoon name="add" color={theme.colors.white} size={24} />
                                </FabButton>
                            </>
                        }
                    </>
                }
            </Container>
        </SafeAreaView>
    )
}