import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { styles } from '../theme/index'
import TrendingMovies from '../src/Components/TrendingMovies';
import { useState } from 'react';
import MovieList from '../src/Components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../src/Components/Loading'
import { useEffect } from 'react';
import { fetchUpcomingMovie, fetchTrendingMovie, fetchTopRatedMovie } from '../src/MovieApi';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovie();
    getUpComingMovie();
    getTopRatedMovie();
  }, [])

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    if (data && data.results) setTrending(data.results);
    setLoading(false)
  }

  const getUpComingMovie = async () => {
    const data = await fetchUpcomingMovie();
    if (data && data.results) setUpComing(data.results);
    setLoading(false)
  }

  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovie();
    if (data && data.results) setTopRated(data.results);
    setLoading(false)
  }

  return (
    <View className='flex-1 bg-neutral-800 '  >
      {/* Search bar and logo */}
      <SafeAreaView className='mb-3'>
        <View className='flex-row justify-between align-center mt-3 mx-4 '>
          <Icon name="align-left" size={30} color="#efff" />
          <Text className='text-white font-bold text-3xl'>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')} >
            <Icon name="search" size={30} color="#efff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? <Loading /> : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movie Carousel */}
          <TrendingMovies data={trending} />

          {/* Upcoming Movie Row */}
          <MovieList title='UpComing' data={upComing} />
          {/* Top Rated Movie Row */}
          <MovieList title='Top Rated' data={topRated} />
        </ScrollView>
      )
      }

    </View>
  )
}

export default Home
