import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    Container,
    TextError,
    Form,
    FloatInput,
    Label
} from './styles';

import * as Yup from "yup";
import { Formik } from 'formik';

import { HeaderForm } from '../../components/HeaderForm';
import { api } from '../../services/api';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { ContactDTO } from '../../dtos/ContactDTO';
import { useRoute } from '@react-navigation/native';

const FormSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório.'),
    email: Yup.string().email('Digite um e-mail válido.').required('Campo obrigatório.'),
});

type ContactProps = {
    item: ContactDTO
}

export function ContactEdit() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const formRef = useRef();

    function handleSendForm() {
        formRef.current.handleSubmit();
    }

    const route = useRoute();
    const { item } = route.params as ContactProps;

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <HeaderForm title="Editar contato" isLoading={loading} onPress={handleSendForm} />
                <Container showsVerticalScrollIndicator={false}>
                    <Formik
                        initialValues={{
                            name: item.name,
                            email: item.email,
                            phone: item.phone,
                            mobile: item.mobile,
                            address: item.address,
                            district: item.district,
                            city: item.city,
                            state: item.state
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            setLoading(true);
                            console.log(values);
                            await api.put(`contacts/${item.id}`, values).then(response => {
                                console.log(response.data);
                                resetForm();
                                setLoading(false);
                                Alert.alert('Sucesso', 'O contato foi atualizado com sucesso!');
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

                                <Label>Nome</Label>
                                <FloatInput
                                    hasError={errors.name && touched.name}
                                    autoCapitalize="words"
                                    value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')}
                                />
                                {errors.name && touched.name ? (<TextError>{errors.name}</TextError>) : null}

                                <Label>Email</Label>
                                <FloatInput
                                    hasError={errors.email && touched.email}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')}
                                />
                                {errors.email && touched.email ? (<TextError>{errors.email}</TextError>) : null}

                                <Label>Telefone</Label>
                                <FloatInput
                                    keyboardType="number-pad"
                                    value={values.phone} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')}
                                />

                                <Label>Celular</Label>
                                <FloatInput
                                    keyboardType="number-pad"
                                    value={values.mobile} onChangeText={handleChange('mobile')} onBlur={handleBlur('mobile')}
                                />

                                <Label>Endereço</Label>
                                <FloatInput
                                    value={values.address} onChangeText={handleChange('address')} onBlur={handleBlur('address')}
                                />

                                <Label>Bairro</Label>
                                <FloatInput
                                    value={values.district} onChangeText={handleChange('district')} onBlur={handleBlur('district')}
                                />

                                <Label>Cidade</Label>
                                <FloatInput
                                    value={values.city} onChangeText={handleChange('city')} onBlur={handleBlur('city')}
                                />

                                <Label>Estado</Label>
                                <FloatInput
                                    value={values.state} onChangeText={handleChange('state')} onBlur={handleBlur('state')}
                                />
                            </Form>
                        )}
                    </Formik>
                </Container>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}