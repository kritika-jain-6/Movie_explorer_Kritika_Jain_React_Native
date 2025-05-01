import React from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import withNavigation from '../navigation/withHOC'; // Make sure the path is correct

const ProfileScreen = ({ navigation }) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.userContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={[styles.name, isDarkTheme ? styles.darkText : styles.lightText]}>{user.name}</Text>
          <Text style={[styles.email, isDarkTheme ? styles.darkText : styles.lightText]}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Subscription')}>
          <Text style={[styles.itemText, isDarkTheme ? styles.darkText : styles.lightText]}>Check-ins</Text>
          <Text style={[styles.itemCount, isDarkTheme ? styles.darkText : styles.lightText]}>0</Text>
        </TouchableOpacity>

        <View style={styles.item}>
          <Text style={[styles.itemText, isDarkTheme ? styles.darkText : styles.lightText]}>Favourite Cinemas</Text>
          <Text style={[styles.itemCount, isDarkTheme ? styles.darkText : styles.lightText]}>0</Text>
        </View>

        <TouchableOpacity style={styles.item} onPress={() => { /* Add notification logic */ }}>
          <Text style={[styles.itemText, isDarkTheme ? styles.darkText : styles.lightText]}>Notifications</Text>
          <Text style={[styles.itemCount, isDarkTheme ? styles.darkText : styles.lightText]}>0</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.themeToggle}>
        <Text style={[styles.itemText, isDarkTheme ? styles.darkText : styles.lightText]}>Dark Theme</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
  itemCount: {
    fontSize: 18,
    color: '#666',
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

// Wrap with navigation HOC before exporting
export default withNavigation(ProfileScreen);
