import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import withNavigation from '../navigation/withHOC'; // Assuming HOC is defined correctly4
import {registeruser} from '../api/UserAPI';

const {width, height} = Dimensions.get('window');

interface State {
  name: string;
  mobilenumber: string; // String to handle the input properly
  email: string;
  password: string;
  confirmPassword: string;
  securePassword: boolean;
  secureConfirmPassword: boolean;
}

class Register extends Component<{navigation: any}, State> {
  constructor(props: {navigation: any}) {
    super(props);
    this.state = {
      name: '',
      mobilenumber: '', // Initialize as empty string
      email: '',
      password: '',
      confirmPassword: '',
      securePassword: true,
      secureConfirmPassword: true,
    };
  }

  handleRegister = async () => {
    const {name, mobilenumber, email, password, confirmPassword} = this.state;

    if (!name || !mobilenumber || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please enter all the fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters long',
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match');
      return;
    }

    try {
       await registeruser(name, mobilenumber, email, password);
      Alert.alert('Success', 'Registration successful!');
      this.props.navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Error during registration', error);
      Alert.alert(
        'Registration Error',
        error.response?.data?.message || error.message,
      );
    }
  };

  togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      this.setState(prevState => ({securePassword: !prevState.securePassword}));
    } else {
      this.setState(prevState => ({
        secureConfirmPassword: !prevState.secureConfirmPassword,
      }));
    }
  };

  render() {
    const {
      name,
      mobilenumber,
      email,
      password,
      confirmPassword,
      securePassword,
      secureConfirmPassword,
    } = this.state;

    return (
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Create an Account</Text>

          {/* Name Input */}
          <TextInput
            testID="name-input"
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={'white'}
            value={name}
            onChangeText={text => this.setState({name: text})}
          />

          {/* Mobile Number Input */}
          <TextInput
            testID="mobilenumber-input"
            style={styles.input}
            placeholder="Mobile Number"
            placeholderTextColor={'white'}
            value={mobilenumber}
            onChangeText={text => this.setState({mobilenumber: text})}
            keyboardType="phone-pad" // This helps in showing the numeric keypad
          />

          {/* Email Input */}
          <TextInput
            testID="email-input"
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'white'}
            value={email}
            onChangeText={text => this.setState({email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <View>
            <TextInput
              testID="password-input"
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'white'}
              secureTextEntry={securePassword}
              value={password}
              onChangeText={text => this.setState({password: text})}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => this.togglePasswordVisibility('password')}>
              <Text style={styles.toggleText}>
                {securePassword ? 'Show ' : 'Hide '}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View>
            <TextInput
              testID="confirm-password-input"
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={'white'}
              secureTextEntry={secureConfirmPassword}
              value={confirmPassword}
              onChangeText={text => this.setState({confirmPassword: text})}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => this.togglePasswordVisibility('confirmPassword')}>
              <Text style={styles.toggleText}>
                {secureConfirmPassword ? 'Show ' : 'Hide '}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            testID="register-button"
            style={styles.button}
            onPress={this.handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default withNavigation(Register);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    height: height,
    width: width,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width * 0.8,
    height: height * 0.7,
    marginTop: height * 0.15,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    backgroundColor: '#FFD700',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#FFD700',
    textAlign: 'right',
    fontSize: 14,
    marginBottom: 10,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
