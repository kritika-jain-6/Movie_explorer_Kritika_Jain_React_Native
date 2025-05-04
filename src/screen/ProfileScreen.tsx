import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  TextInput,
  Share,
} from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';

const ProfileScreen = () => {
  const { watchlist } = useWatchlist();

  const defaultProfile = {
    name: 'Alex Mitchell',
    username: '@alexmovielover',
    bio: 'Movie enthusiast | Film critic | Always in search of the next great story',
    avatar: 'https://i.pravatar.cc/150?img=12',
    isPremium: true,
    following: 892,
    followers: '1.2K',
    stats: {
      movies: watchlist.length,
      following: 892,
      followers: '1.2K',
    },
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Watchlist');
  const [form, setForm] = useState({ name: profile.name, bio: profile.bio });

  const handleEditSave = () => {
    setProfile({ ...profile, name: form.name, bio: form.bio });
    setEditModalVisible(false);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${profile.name}'s profile on MovieMate!`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            {profile.name}
            </Text>
            {profile.isPremium &&
             <Text style={styles.premiumBadge}>Premium</Text>}
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.stats.movies}</Text>
          <Text style={styles.statLabel}>Movies</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.stats.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.stats.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('Watchlist')}>
          <Text style={[styles.tabText, selectedTab === 'Watchlist' && styles.activeTab]}>
            Watchlist
          </Text>
        </TouchableOpacity>
      </View>

      {/* Watchlist */}
      {selectedTab === 'Watchlist' && (
        watchlist.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#888' }}>Your watchlist is empty.</Text>
          </View>
        ) : (
          <FlatList
            data={watchlist}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.watchlistRow}
            contentContainerStyle={styles.watchlistContainer}
            renderItem={({ item }) => (
              <View style={styles.movieCard}>
                <Image source={{ uri: item.poster_url }} style={styles.moviePoster} />
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieRating}>⭐ {item.rating}</Text>
              </View>
            )}
          />
        )
      )}

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Bio"
              multiline
              value={form.bio}
              onChangeText={(text) => setForm({ ...form, bio: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEditSave} style={styles.saveButton}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 16, alignItems: 'center', backgroundColor: '#333' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  userInfo: { alignItems: 'center' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  premiumBadge: { fontSize: 18, color: '#e63946', fontWeight: '600' },
  username: { fontSize: 14, color: '#ccc', marginTop: 4 },
  bio: { fontSize: 12, color: '#aaa', marginTop: 4, textAlign: 'center' },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 12, color: '#ccc' },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#e63946',
    marginRight: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#1d3557',
    marginLeft: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#444',
    paddingVertical: 12,
  },
  tabText: { fontSize: 14, color: '#ccc' },
  activeTab: { color: '#FFD700', fontWeight: 'bold' },
  watchlistContainer: { paddingHorizontal: 16 },
  watchlistRow: { justifyContent: 'space-between', marginBottom: 16 },
  movieCard: { flex: 1, margin: 8, alignItems: 'center' },
  moviePoster: { width: 100, height: 150, borderRadius: 8, marginBottom: 8 },
  movieTitle: { fontSize: 12, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  movieRating: { fontSize: 12, color: '#ccc' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    color: '#fff',
    backgroundColor: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    padding: 10,
    marginRight: 10,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#1d3557',
    borderRadius: 6,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default ProfileScreen;
