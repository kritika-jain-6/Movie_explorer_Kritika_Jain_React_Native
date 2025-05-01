import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {Component} from 'react';
import Card from '../component/Card';
import MovieCarousel from '../component/MovieCarousel';
import BornCard from '../component/BornCard';
import Explore from '../component/Explore';
import Footer from '../component/Footer';

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MovieCarousel />
          <Text style={styles.subHeader}>Explore What's Streaming</Text>
          <Explore />
          {/* <Card /> */}
          <Text style={styles.subHeader}>What to do</Text>
          <Card />
          <Text style={styles.subHeader}>Top Ten</Text>
          <Card />
          <Text style={styles.subHeader}>Born Today</Text>
          <BornCard />
          <Footer />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 15,
  },
  subHeader: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight:'800', 
     marginBottom: 10,
  },
});

export default Home;
