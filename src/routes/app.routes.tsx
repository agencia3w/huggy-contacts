import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ContactList } from '../screens/ContactList';
import { ContactNew } from '../screens/ContactNew';
import { ContactShow } from '../screens/ContactShow';
import { ContactEdit } from '../screens/ContactEdit';

const Stack = createStackNavigator();

export function AppRoutes() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="ContactList" component={ContactList} />
            <Stack.Screen name="ContactNew" component={ContactNew} />
            <Stack.Screen name="ContactShow" component={ContactShow} />
            <Stack.Screen name="ContactEdit" component={ContactEdit} />
        </Stack.Navigator>
    )
}