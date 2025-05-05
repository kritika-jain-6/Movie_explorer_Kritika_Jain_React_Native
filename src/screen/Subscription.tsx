import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Subscription extends Component {
  state = {
    selectedPlan: null,
    scaleAnim: new Animated.Value(1),
    buttonAnim: new Animated.Value(1),
  };

  handleSelectPlan = plan => {
    Animated.sequence([
      Animated.timing(this.state.scaleAnim, {
        toValue: 0.97,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(this.state.scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
    this.setState({selectedPlan: plan});
  };

  handleStartTrial = () => {
    const {selectedPlan} = this.state;
    if (selectedPlan) {
      this.props.navigation.navigate('Login', {selectedPlan});
    } else {
      alert('Please select a plan');
    }
  };

  renderPlan = (name, price, features, isPopular = false, iconUrl) => {
    const {selectedPlan, scaleAnim} = this.state;
    const isSelected = selectedPlan === name;

    return (
      <Animated.View
        style={[
          {transform: [{scale: isSelected ? scaleAnim : 1}]},
          isSelected && styles.glow,
        ]}>
        <TouchableOpacity
          style={[styles.planContainer, isSelected && styles.selectedPlan]}
          onPress={() => this.handleSelectPlan(name)}>
          {isPopular && (
            <View style={styles.tagContainer}>
              <Image
                source={{uri: 'https://img.icons8.com/fluency/24/star.png'}}
                style={[styles.tagIcon, {tintColor: '#fff'}]}
              />
              <Text style={styles.tag}>MOST POPULAR</Text>
            </View>
          )}
          <View style={styles.planHeader}>
            <View style={styles.titleRow}>
              <Image
                source={{uri: iconUrl}}
                style={[styles.planIcon, {tintColor: '#fff'}]}
              />
              <Text style={styles.planTitle}>{name}</Text>
            </View>
            <Text style={styles.planPrice}>{price}</Text>
          </View>
          {features.map((feature, index) => (
            <View style={styles.featureRow} key={index}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/561/561127.png',
                }}
                style={styles.icon}
              />
              <Text style={styles.planFeature}>{feature}</Text>
            </View>
          ))}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    return (
      <ImageBackground
        source={{uri: 'https://wallpaperaccess.com/full/3295836.jpg'}}
        style={styles.background}
        resizeMode="cover">
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', '#0d0d1a']}
          style={styles.overlay}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}>
            <Animated.Text style={styles.header}>
              Choose Your Plan
            </Animated.Text>
            <Text style={styles.subheader}>
              Unlimited entertainment awaits!
            </Text>

            {this.renderPlan(
              'Basic',
              '$9.99/mo',
              [
                'HD streaming',
                'Watch on 1 device',
                'Ad-free viewing',
                'Download available',
              ],
              false,
              'https://img.icons8.com/fluency/48/video.png',
            )}
            {this.renderPlan(
              'Premium',
              '$14.99/mo',
              [
                '4K Ultra HD',
                'Watch on 2 devices',
                'Ad-free viewing',
                'Downloads available',
                'Exclusive premieres',
              ],
              true,
              'https://img.icons8.com/fluency/48/clapperboard.png',
            )}
            {this.renderPlan(
              'Family',
              '$19.99/mo',
              [
                '4K Ultra HD',
                'Watch on 4 devices',
                'Ad-free viewing',
                'Downloads available',
                'Family sharing',
                'Kids profiles',
              ],
              false,
              'https://img.icons8.com/fluency/48/family.png',
            )}

            <TouchableWithoutFeedback
              onPressIn={() =>
                Animated.spring(this.state.buttonAnim, {
                  toValue: 0.95,
                  useNativeDriver: true,
                }).start()
              }
              onPressOut={() =>
                Animated.spring(this.state.buttonAnim, {
                  toValue: 1,
                  friction: 3,
                  useNativeDriver: true,
                }).start()
              }
              onPress={this.handleStartTrial}>
              <Animated.View
                style={[
                  styles.startButton,
                  {transform: [{scale: this.state.buttonAnim}]},
                ]}>
                <Text style={styles.buttonText}>Start Free Trial</Text>
              </Animated.View>
            </TouchableWithoutFeedback>

            <Text style={styles.termsText}>Cancel anytime</Text>
            <Text style={styles.termsText}>Terms & Conditions apply</Text>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  content: {
    paddingBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 20,
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: '#1c1c2e',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333',
    padding: 18,
    marginBottom: 20,
  },
  selectedPlan: {
    borderColor: '#FFD700',
    backgroundColor: '#2a2a3d',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  tag: {
    backgroundColor: '#FFD700',
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  planPrice: {
    fontSize: 16,
    color: '#ccc',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
  },
  planFeature: {
    fontSize: 14,
    color: '#ccc',
    marginLeft: 8,
  },
  startButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  glow: {
    shadowColor: '#FFD700',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default Subscription;
