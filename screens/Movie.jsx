import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import IIcon from 'react-native-vector-icons/Ionicons'
import { styles, theme } from '../theme'
import LinearGradient from 'react-native-linear-gradient'
import Cast from '../src/Components/Cast'
import MovieList from '../src/Components/MovieList'
import Loading from '../src/Components/Loading'
import { fallBackDomiPosterImage, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../src/MovieApi'

var { width, height } = Dimensions.get('window');

const Movie = () => {
    var movieDescription = 'Sam Brenner, Will Cooper, Ludlow Lamonsoff, and Eddie "The Fire Blaster" Plant all played classic arcade video games as teenagers. But now they have to use their skills to try to save the world from aliens. The aliens watched video feeds that they thought was a declaration of war. So they send down the classic arcade games to destroy earth. They also get help from a military specialist. They have three lives and if all three g';
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cast, setCast] = useState([]);
    const [similarMovie, setSimilarMovie] = useState([]);
    const [movie, setMovie] = useState([])
    const navigation = useNavigation();
    const { params: item } = useRoute();
    useEffect(() => {
        getMovieDetails(item?.id);
        getMovieCredits(item?.id);
        getSimilarMovies(item?.id);
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        if(data)setMovie(data);
        setLoading(false);
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if(data && data.cast)setCast(data.cast);
        setLoading(false);
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        if(data && data.results)setSimilarMovie(data.results);
        setLoading(false);
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'
        >
            <View className='w-full'>
                <SafeAreaView className='absolute z-20 w-full flex-row justify-between items-center px-4 mt-3'>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className='rounded-lg p-1'>
                        <IIcon name='chevron-back' color='#efff' size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <IIcon name='heart' color={isFavourite ? theme.background : '#efff'} size={35} />
                    </TouchableOpacity>
                </SafeAreaView>
                {loading ? <Loading /> : (
                    <View >
                        <Image
                            source={{ uri: image500(movie?.poster_path || fallBackDomiPosterImage) }}
                            style={{
                                width, height: height * 0.55
                            }}
                        />
                        <LinearGradient colors={['transparent', 'rgba(25,25,25,0.8)', 'rgba(25,25,25,1)']}
                            style={{
                                width, height: height * 0.40
                            }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className='absolute bottom-0'
                        />
                    </View>
                )}

            </View>

            {/* Movie Name */}
            {!loading && <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
                <Text className='text-white text-3xl text-center font-bold tracking-wide'>
                    {movie?.title}
                </Text>

                {/* Status , Released , Runtime */}
                {movie?.id ? (<Text className='text-center text-neutral-400 font-semibold text-base'>
                    {movie?.status} • {movie?.release_date.split('-')[0]} • {movie?.runtime} min
                </Text>) : null}

                {/* Genres */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                    {movie?.genres?.map((genre,index)=>{
                        const showDot = index+1 !== movie.genres.length
                        return(
                    <Text key={index} className='text-neutral-400 font-semibold text-base'>
                        {genre?.name}  {showDot && "•"}
                    </Text>)})}
                </View>

                <Text className='text-neutral-400 mx-4 tracking-wide '>
                    {movie?.overview}
                </Text>
            </View>}

            {/* Cast */}
            {!loading && <Cast cast={cast} navigation={navigation} />}

            {/* Similar Movie */}
            {!loading && <MovieList title='Similar Movie' data={similarMovie} hideSeeAll={true} />}
        </ScrollView>
    )
}

export default Movie