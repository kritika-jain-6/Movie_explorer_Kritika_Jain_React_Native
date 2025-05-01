import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { getMovieDetails } from '../api/MovieAPI';
const { width } = Dimensions.get('window');


const streamingServices = [
  {
    id: '1',
    name: 'Amazon',
    imageUrl:
      'https://i.pinimg.com/736x/71/11/60/711160f952a7ae4056a046703dde8908.jpg',
  },
  {
    id: '2',
    name: 'Netflix',
    imageUrl:
      'https://i.pinimg.com/474x/12/d0/45/12d04587f205ba8accecb35de93f790b.jpg',
  },
  {
    id: '3',
    name: 'HBO',
    imageUrl:
      'https://i.pinimg.com/736x/65/6f/57/656f579e0027ddcdeda39869184a8664.jpg',
  },
  {
    id: '4',
    name: 'Hulu',
    imageUrl:
      'https://i.pinimg.com/736x/44/c2/0d/44c20dbcfd17438347f347bfca5d589d.jpg',
  },
];

type StreamingService = {
  id: string;
  name: string;
  imageUrl: string;
};

type Movie={
  id:string;
  title:string;
  streaming_platform:string;
  poster_url:string;
}

const StreamingServiceItem = ({
  service,
  selectedId,
  onSelect,
}: {
  service: StreamingService;
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  const isSelected = selectedId === service.id;

  return (
    <TouchableOpacity onPress={() => onSelect(service.id)}>
      <View
        style={[
          styles.streamingItem,
          isSelected && styles.streamingItemSelected,
        ]}
      >
        <Image
          source={{ uri: service.imageUrl }}
          style={styles.streamingImage}
          resizeMode="cover"
        />
        <Text
          style={[styles.serviceName, isSelected && styles.serviceNameSelected]}
        >
          {service.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Explore = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [movies,setMovies]=useState<Movie[]>([]);
  const [filteredmovies,setFilteredmovies]=useState<Movie[]>([]);

  useEffect(()=>{
    const fetchMovies=async()=>{
      try{
        const movieData=await getMovieDetails();
        setMovies(movieData.movies);
      }catch(err:any){
        console.error('Error fetching movies',err.message)
      }
    };
    fetchMovies();
  },[]);

  useEffect(() => {
    if (selectedPlatform) {
      const platformName = streamingServices.find(
        (service) => service.id === selectedPlatform
      )?.name;
      const filtered = movies.filter((movie) => movie.streaming_platform === platformName);
      setFilteredmovies(filtered);
    } else {
      setFilteredmovies(movies); // Show all movies if no platform is selected
    }
  }, [selectedPlatform, movies]);

  return (
    <View style={styles.container}>
      <FlatList
        data={streamingServices}
        renderItem={({ item }) => (
          <StreamingServiceItem
            service={item}
            selectedId={selectedPlatform}
            onSelect={setSelectedPlatform}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.streamingList}
      />

<FlatList
        data={filteredmovies}
        renderItem={({ item }) => (
          <View style={styles.movieItem}>
            <Image
              source={{ uri: item.poster_url }}
              style={styles.moviePoster}
              resizeMode="cover"
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  
  },
  header: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  streamingList: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  streamingItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  streamingItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
    paddingBottom: 4,
  },
  streamingImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  serviceName: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 6,
  },
  serviceNameSelected: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  movieList: {
    paddingHorizontal: 10,
  },
  movieItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  moviePoster: {
    width: width * 0.4,
    height: width * 0.6,
    borderRadius: 8,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default Explore;
