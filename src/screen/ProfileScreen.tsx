import React from 'react';
import { View, Text, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import withNavigation from '../navigation/withHOC'; // Make sure the path is correct

const ProfileScreen = ({ navigation }) => {

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Subscription')}>
          <Text style={styles.itemText}>Check-ins</Text>
          <Text style={styles.itemCount}>0</Text>
        </TouchableOpacity>

        <View style={styles.item}>
          <Text style={styles.itemText}>Favourite Cinemas</Text>
          <Text style={styles.itemCount}>0</Text>
        </View>

        <TouchableOpacity style={styles.item} onPress={() => { /* Add notification logic */ }}>
          <Text style={styles.itemText}>Notifications</Text>
          <Text style={styles.itemCount}>0</Text>
        </TouchableOpacity>
      </View>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Black background for the screen
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
    color: '#FFDD00', // Yellow color for name
  },
  email: {
    fontSize: 16,
    color: '#fff', // White color for email
  },
  section: {
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#555', // Dark border for contrast
  },
  itemText: {
    fontSize: 18,
    color: '#FFDD00', // Yellow color for item text
  },
  itemCount: {
    fontSize: 18,
    color: '#fff', // White color for count
  },
 
});


// Wrap with navigation HOC before exporting
export default withNavigation(ProfileScreen);
