import React from 'react';
import Login from '../src/auth/Login';
import { render, fireEvent } from '@testing-library/react-native';

describe('Login Component',()=>{
    it ('renders correctly',()=>{
        const {getByText}=render(<Login/>);
        expect(getByText('Welcome to Movie Explorer')).toBeTruthy();
    })
})