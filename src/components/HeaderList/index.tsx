import React, { useState } from 'react';
import {
    Container,
    ContainerSearch,
    Input,
    Title,
    Icons,
    Button,
} from './styles';
import Iconmoon from '../Iconmoon';
import { useNavigation } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

export type Props = {
    border?: boolean;
}

export function HeaderList({ border = false }: Props) {
    const navigation = useNavigation();
    const { signOut } = useAuth();
    const [showSearch, setShowSearch] = useState(true);

    function handleSearch() {
        
    }

    function handleSignOut() {
        signOut();
    }
    return (
        <Container border={border}>
            {showSearch ?
                <ContainerSearch>
                    <Button onPress={handleSearch}>
                        <Iconmoon name="arrow_back" size={24} />
                    </Button>
                    <Input
                        placeholder="Digite o termo para busca..."
                    />
                </ContainerSearch>
                :
                <>
                    <Title>Contatos</Title>
                    <Icons>
                        <Button onPress={() => { }}>
                            <Iconmoon name="search" size={24} />
                        </Button>
                        <Button onPress={handleSignOut} style={{ marginLeft: 24 }}>
                            <Iconmoon name="logout" size={24} />
                        </Button>
                    </Icons>
                </>
            }
        </Container>
    )
}