import { View, Text, Dimensions, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import IIcon from 'react-native-vector-icons/Ionicons'
import { styles, theme } from '../theme'
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../src/Components/MovieList';
import Loading from '../src/Components/Loading'
import { useEffect } from 'react';
import { fallBackPorfileImage, fetchPersonCreditsMovie, fetchPersonDetails, image342 } from '../src/MovieApi';
import { domiBiography } from '../src/Content';

var { width, height } = Dimensions.get('window');

const Person = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [isFavourite, toggleFavourite] = useState(false);
    const [movie, setMovie] = useState([]);
    const [personDetails, setPersonDetails] = useState([]);
    const { params: item } = useRoute();
    const gender = ['Not-confirm', 'Female', 'Male', 'Non-binary'];

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonCreditsMovie(item.id);
    }, [item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        if (data) setPersonDetails(data);
        setLoading(false);
    }
    const getPersonCreditsMovie = async id => {
        const data = await fetchPersonCreditsMovie(id);
        if (data && data.cast) setMovie(data.cast);
        setLoading(false);
    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'>
            <SafeAreaView className='z-20 w-full flex-row justify-between items-center px-4 my-3'>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className='rounded-lg p-1'>
                    <IIcon name='chevron-back' color='#efff' size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <IIcon name='heart' color={isFavourite ? 'red' : '#efff'} size={35} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Personal Details */}
            {
                loading ? <Loading /> : (
                    <View>
                        <View
                            className='flex-row justify-center'
                            style={{
                                shadowColor: "gray",
                                shadowOffset: { width: 0, height: 5 },
                                shadowRadius: 40,
                                shadowOpacity: 1,
                            }}>
                            <View className="items-center z-20 overflow-hidden rounded-full w-72 h-72 border-2 border-neutral-500"  >
                                <Image
                                    source={{ uri: image342(personDetails?.profile_path) || fallBackPorfileImage }}
                                    style={{
                                        width: width * 0.74, height: height * 0.43
                                    }}
                                />
                            </View>
                        </View>
                        <View className='mt-6'>
                            <Text className='text-white text-3xl font-bold text-center'>{personDetails?.name}</Text>
                            <Text className='text-neutral-400 font-base text-center' >{personDetails.place_of_birth}</Text>
                        </View>
                        <View className=' mx-4 mt-6 p-4  flex-row justify-between items-center rounded-full bg-neutral-700'>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Gender</Text>
                                <Text className='text-neutral-400 font-sm'>{gender[personDetails?.gender]}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Birthday</Text>
                                <Text className='text-neutral-400 font-sm'>{personDetails?.birthday || 2023 - 5 - 11}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Known for</Text>
                                <Text className='text-neutral-400 font-sm'>{personDetails?.known_for_department}</Text>
                            </View>
                            <View className=' px-2 items-center'>
                                <Text className='text-white font-semibold'>Popularity</Text>
                                <Text className='text-neutral-400 font-sm'>{personDetails?.popularity?.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View className='mt-6 mx-4 space-y-2'>
                            <Text className='text-lg text-white'>Biography</Text>
                            <Text className='text-neutral-400 tracking-wide'>
                                {personDetails?.biography?.length > 2 ? personDetails?.biography : domiBiography}
                            </Text>
                        </View>
                        {/* Person Movie */}
                        <MovieList title='Movie' hideSeeAll={true} data={movie} />
                    </View>
                )}
        </ScrollView>
    )
}

export default Person