import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import withNavigation from "../navigation/withHOC";
import { loginuser } from "../api/UserAPI";

const { width, height } = Dimensions.get("window");

interface State {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  errorMessage: string;
}

class Login extends Component<{ navigation: any }, State> {
  constructor(props: { navigation: any }) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
      errorMessage: "",
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;

    if (!email || !password) {
      const msg = "Please enter all the fields";
      this.setState({ errorMessage: msg });
      Alert.alert("Validation Error", msg);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const msg = "Please enter a valid email address";
      this.setState({ errorMessage: msg });
      Alert.alert("Validation Error", msg);
      return;
    }

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long";
      this.setState({ errorMessage: msg });
      Alert.alert("Validation Error", msg);
      return;
    }

    this.setState({ loading: true, errorMessage: "" });

    try {
      const response = await loginuser(email, password);
      const token = response.token;

      if (token) {
        await AsyncStorage.setItem("authToken", token);
        Alert.alert("Success", "Logged in!");
        this.props.navigation.navigate("MainTabs");
      } else {
        const msg = "Token not received. Please try again";
        this.setState({ errorMessage: msg });
        Alert.alert("Login Error", msg);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Login failed";
      this.setState({ errorMessage: msg });
      Alert.alert("Login Error", msg);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, showPassword, loading, errorMessage } = this.state;

    return (
      <ImageBackground source={require("../assets/background.jpg")} style={styles.background}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Welcome to Movie Explorer</Text>

            {errorMessage ? <Text style={styles.errorText} testID="error-message">{errorMessage}</Text> : null}

            <TextInput
              testID="email-input"
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={(text) => this.setState({ email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              accessibilityLabel="Email Input"
            />

            <View>
              <TextInput
                testID="password-input"
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                value={password}
                onChangeText={(text) => this.setState({ password: text })}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={this.handleLogin}
                accessibilityLabel="Password Input"
              />
              <TouchableOpacity
                onPress={() => this.setState({ showPassword: !showPassword })}
                style={styles.showPasswordButton}
              >
                <Text style={styles.showPasswordText}>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              testID="login-button"
              style={styles.button}
              onPress={this.handleLogin}
              disabled={loading}
              accessibilityLabel="Login Button"
            >
              {loading ? (
                <ActivityIndicator color="black" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
              <Text style={styles.registerText}>New Here? Register Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

export { Login }; // For testing
export default withNavigation(Login); // For app usage

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    height: height,
    width: width,
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    width: width * 0.8,
    height: height * 0.55,
    marginTop: height * 0.2,
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#fff",
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  showPasswordText: {
    color: "#FFD700",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FFD700",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    color: "#FFD700",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 10,
  },
});
