import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    Container,
    Text,
    TextError,
    Form,
    FloatInput
} from './styles';

import * as Yup from "yup";
import { Formik, ErrorMessage } from 'formik';

import { HeaderForm } from '../../components/HeaderForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const FormSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório.'),
    email: Yup.string().email('Digite um e-mail válido.').required('Campo obrigatório.'),
});

export function ContactNew() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    function handleSendForm() {
        formRef.current.handleSubmit();
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <HeaderForm title="Criar contato" isLoading={loading} onPress={handleSendForm} />
                <Container showsVerticalScrollIndicator={false}>
                    <Formik
                        initialValues={{ name: '', email: '', phone: '', mobile: '', address: '', district: '', city: '', state: '' }}
                        onSubmit={async (values, { resetForm }) => {
                            setLoading(true);
                            console.log(values);
                            await api.post('contacts', values).then(response => {
                                console.log(response.data);
                                resetForm();
                                setLoading(false);
                                Alert.alert('Sucesso', 'O contato foi salvo com sucesso!');
                                navigation.navigate('ContactList');
                            }).catch(error => {
                                console.log(error.response.data);
                                setLoading(false);
                                Alert.alert('Erro', 'Ocorreu um erro, tente novamente');
                            })
                        }
                        }
                        validationSchema={FormSchema}
                        innerRef={formRef}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <Form>

                                <FloatInput
                                    hasError={errors.name && touched.name}
                                    autoCapitalize="words"
                                    label="Nome" value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')}
                                />
                                {errors.name && touched.name ? (<TextError>{errors.name}</TextError>) : null}
                                <FloatInput
                                    hasError={errors.email && touched.email}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    label="E-mail" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')}
                                />
                                {errors.email && touched.email ? (<TextError>{errors.email}</TextError>) : null}
                                <FloatInput
                                    keyboardType="number-pad"
                                    label="Telefone" value={values.phone} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')}
                                />
                                <FloatInput
                                    keyboardType="number-pad"
                                    label="Celular" value={values.mobile} onChangeText={handleChange('mobile')} onBlur={handleBlur('mobile')}
                                />
                                <FloatInput
                                    label="Endereço" value={values.address} onChangeText={handleChange('address')} onBlur={handleBlur('address')}
                                />
                                <FloatInput
                                    label="Bairro" value={values.district} onChangeText={handleChange('district')} onBlur={handleBlur('district')}
                                />
                                <FloatInput
                                    label="Cidade" value={values.city} onChangeText={handleChange('city')} onBlur={handleBlur('city')}
                                />
                                <FloatInput
                                    label="Estado" value={values.state} onChangeText={handleChange('state')} onBlur={handleBlur('state')}
                                />
                            </Form>
                        )}
                    </Formik>
                </Container>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}