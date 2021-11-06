import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSessions from 'expo-auth-session';
import { api } from '../services/api';

const CLIENT_ID = 'APP-422dcb82-9ec3-4775-a927-aefc8e26ecc8';
const CLIENT_SECRET = 'c243af4f-ff16-44c6-ad69-71959671e6b4';
const SCOPE = 'install_app%20read_agent_profile';
const URL_REDIRECT = 'https://auth.expo.io/@agencia3w/huggy';
const TOKEN_STORAGE = '@huggy:token';

type TokenProps = {
    access_token: string | null;
}

type AuthContextData = {
    token: TokenProps | null;
    isSigning: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: React.ReactNode
}

type AuthResponse = {
    token_type: string;
    expires_in: number;
    access_token: TokenProps | null;
    refresh_token: string;
}

type AuthorizationResponse = {
    params: {
        code?: string;
    },
    type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [isSigning, setIsSigning] = useState(true);
    const [token, setToken] = useState<TokenProps | null>(null);

    async function signIn() {
        try {
            setIsSigning(true);
            const authUrl = `https://auth.huggy.app/oauth/authorize?scope=${SCOPE}&response_type=code&redirect_uri=${URL_REDIRECT}&client_id=${CLIENT_ID}`;
            const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

            if (authSessionResponse.type === 'success') {
                const authResponse = await api.post('https://auth.huggy.app/oauth/access_token', {
                    grant_type: 'authorization_code',
                    redirect_uri: URL_REDIRECT,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    code: authSessionResponse.params.code
                });
                const { access_token } = authResponse.data as AuthResponse;

                api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                await AsyncStorage.setItem(TOKEN_STORAGE, access_token);

                setToken(access_token);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsSigning(false);
        }
    }

    async function signOut() {
        setToken(null);
        await AsyncStorage.removeItem(TOKEN_STORAGE);
    }

    useEffect(() => {
        async function loadTokenStorageData() {
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

            if (tokenStorage) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
                setToken(tokenStorage);
            }

            setIsSigning(false);
        }

        loadTokenStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{ signIn, signOut, token, isSigning }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }