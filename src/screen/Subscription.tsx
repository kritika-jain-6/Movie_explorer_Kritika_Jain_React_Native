import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlan: null,  // State to track selected plan
    };
  }

  handleSelectPlan = (plan) => {
    this.setState({ selectedPlan: plan });
  };

  render() {
    const { selectedPlan } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Choose Your Plan</Text>

        <ScrollView>
          {/* Basic Plan */}
          <TouchableOpacity
            style={[
              styles.planContainer,
              selectedPlan === 'Basic' && styles.selectedPlan,  // Add yellow color for selected plan
            ]}
            onPress={() => this.handleSelectPlan('Basic')}
          >
            <Text style={[styles.planTitle, selectedPlan === 'Basic' && styles.selectedTitle]}>Basic</Text>
            <Text style={styles.planPrice}>Rs.199/month</Text>
            <Text style={styles.planFeature}>HD Quality</Text>
            <Text style={styles.planFeature}>Watch on 1 Device</Text>
            <Text style={styles.planFeature}>Limited Content</Text>
          </TouchableOpacity>

          {/* Standard Plan */}
          <TouchableOpacity
            style={[
              styles.planContainer,
              selectedPlan === 'Standard' && styles.selectedPlan,  // Add yellow color for selected plan
            ]}
            onPress={() => this.handleSelectPlan('Standard')}
          >
            <Text style={[styles.planTitle, selectedPlan === 'Standard' && styles.selectedTitle]}>Standard</Text>
            <Text style={styles.planPrice}>Rs.499/month</Text>
            <Text style={styles.planFeature}>Full HD Quality</Text>
            <Text style={styles.planFeature}>Watch on 2 Devices</Text>
            <Text style={styles.planFeature}>Full Content Library</Text>
          </TouchableOpacity>

          {/* Premium Plan */}
          <TouchableOpacity
            style={[
              styles.planContainer,
              selectedPlan === 'Premium' && styles.selectedPlan,  // Add yellow color for selected plan
            ]}
            onPress={() => this.handleSelectPlan('Premium')}
          >
            <Text style={[styles.planTitle, selectedPlan === 'Premium' && styles.selectedTitle]}>Premium</Text>
            <Text style={styles.planPrice}>Rs.899/month</Text>
            <Text style={styles.planFeature}>4K Ultra HD</Text>
            <Text style={styles.planFeature}>Watch on 4 Devices</Text>
            <Text style={styles.planFeature}>Full Content + Exclusives</Text>
          </TouchableOpacity>

          {/* Features Comparison */}
          {/* <Text style={styles.featuresHeader}>Features Comparison</Text>
          <View style={styles.featuresTable}>
            <Text style={styles.featuresRow}>Features</Text>
            <Text style={styles.featuresRow}>Basic</Text>
            <Text style={styles.featuresRow}>Standard</Text>
            <Text style={styles.featuresRow}>Premium</Text>
            <Text style={styles.featureDetail}>Video Quality</Text>
            <Text style={styles.featureDetail}>HD</Text>
            <Text style={styles.featureDetail}>Full HD</Text>
            <Text style={styles.featureDetail}>4K Ultra HD</Text>
            <Text style={styles.featureDetail}>Devices</Text>
            <Text style={styles.featureDetail}>1</Text>
            <Text style={styles.featureDetail}>2</Text>
            <Text style={styles.featureDetail}>4</Text>
            <Text style={styles.featureDetail}>Content Library</Text>
            <Text style={styles.featureDetail}>Limited</Text>
            <Text style={styles.featureDetail}>Full</Text>
            <Text style={styles.featureDetail}>Exclusive</Text>
          </View> */}

          {/* Subscribe Button */}
          <Button title="Start Subscription" onPress={() => alert('Subscription Started!')} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  planContainer: {
    backgroundColor: '#000',  // Default black background for all plans
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',  // Yellow border for all plans
  },
  selectedPlan: {
    backgroundColor: '#FFD700',  // Highlight selected plan with yellow color
  },
  planTitle: {
    fontSize: 20,
    color: '#fff',  // Default white color for title
  },
  selectedTitle: {
    color: '#000',  // Change title color to black when selected
  },
  planPrice: {
    fontSize: 18,
    color: '#fff',
  },
  planFeature: {
    color: '#fff',
  },
  // featuresHeader: {
  //   fontSize: 20,
  //   color: '#fff',
  //   marginVertical: 10,
  // },
  // featuresTable: {
  //   backgroundColor: '#1c1c1c',
  //   borderRadius: 10,
  //   padding: 10,
  // },
  // featuresRow: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
  // featureDetail: {
  //   color: '#fff',
  // },
});

export default Subscription;
