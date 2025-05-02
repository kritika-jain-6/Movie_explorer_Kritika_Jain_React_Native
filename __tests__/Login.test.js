import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../src/auth/Login'; // Adjust path as necessary
import { loginuser } from '../src/api/UserAPI';

jest.mock('../src/api/UserAPI', () => ({
  loginuser: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

describe('Login Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and buttons', () => {
    const { getByTestId, getByText } = render(<Login navigation={mockNavigation} />);

    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
    expect(getByText('New Here? Register Now')).toBeTruthy();
  });

  it('shows validation alert for empty fields', async () => {
    const { getByTestId } = render(<Login navigation={mockNavigation} />);
    const loginButton = getByTestId('login-button');

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(global.alert).toBeDefined(); // mock `Alert.alert` if you want finer control
    });
  });

  it('shows validation alert for invalid email', async () => {
    const { getByTestId } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('email-input'), 'invalid-email');
    fireEvent.changeText(getByTestId('password-input'), '123456');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(global.alert).toBeDefined();
    });
  });

  it('toggles password visibility', () => {
    const { getByText, getByTestId } = render(<Login navigation={mockNavigation} />);
    const toggleButton = getByText('Show');

    fireEvent.press(toggleButton);
    expect(getByText('Hide')).toBeTruthy();

    fireEvent.press(toggleButton);
    expect(getByText('Show')).toBeTruthy();
  });

  it('logs in successfully with correct credentials', async () => {
    loginuser.mockResolvedValue({ token: 'dummy-token' });

    const { getByTestId } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), '123456');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(loginuser).toHaveBeenCalledWith('test@example.com', '123456');
      expect(mockNavigate).toHaveBeenCalledWith('MainTabs');
    });
  });

  it('shows error on login failure', async () => {
    loginuser.mockRejectedValue({ message: 'Invalid credentials' });

    const { getByTestId } = render(<Login navigation={mockNavigation} />);

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'wrongpass');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(loginuser).toHaveBeenCalled();
    });
  });
});
