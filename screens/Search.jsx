import { View, Text, ScrollView, TextInput, TouchableOpacity, SafeAreaView, FlatList, Touchable, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import React, { useCallback, useState } from 'react';
import AIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Loading from '../src/Components/Loading'
import debounce from 'lodash.debounce';
import { fallBackDomiPosterImage, image185, searchMovies } from '../src/MovieApi';

var { width, height } = Dimensions.get('window');

const Search = () => {
    const navigation = useNavigation();
    const [movieResult, setMovieResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = async value => {
        try {
            if (value && value.length > 2) {
                setLoading(true)
                const data = await searchMovies({
                    query: value,
                    include_adult: 'true',
                    language: 'en-US',
                    page: '1'
                })
                if(data && data.results)setMovieResult(data.results);
                setLoading(false)
            }
            } catch (error) {
                console.log('error--->', error)
                setLoading(false);
            }
        }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
        return (
            <SafeAreaView className='flex-1 bg-neutral-900'>
                <View className='mx-4 mb-3 flex-row justify-between rounded-full border border-neutral-500  mt-3'>
                    <TextInput
                        onChangeText={handleTextDebounce}
                        placeholder='Search Movie'
                        placeholderTextColor={'lightgray'}
                        className='py-1 pl-6 flex-1 text-white font-semibold text-base'
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} className='p-1 rounded-full bg-neutral-500 m-1'>
                        <AIcon name='close' color='#efff' size={25} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className="space-y-3">
                    {loading ?
                        <Loading /> :
                        movieResult ? (<View>
                            <Text className='text-white font-semibold ml-1'>Result ({movieResult?.length})</Text>
                            <FlatList
                                horizontal={false}
                                data={movieResult}
                                numColumns={2}
                                contentContainerStyle={{ marginVertical: 10 }}
                                keyExtractor={(item, index) => index}
                                renderItem={({ item }) => <MovieResultList item={item} navigation={navigation} />}
                            /></View>) : (<View>
                                <Image source={require('../src/assets/movieTime.png')}
                                    className='w-96 h-96' />
                            </View>)
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }

    const MovieResultList = ({ item, name, navigation }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.push('Movie', item)}>
                <View className='my-2 mr-5' >
                    <Image source={{uri:image185(item?.poster_path)||fallBackDomiPosterImage}}
                        style={{ width: width * 0.44, height: height * 0.3 }}
                        className='rounded-2xl' />
                    <Text className='text-neutral-300 font-medium ml-1 my-1'>{item?.title?.length > 22 ? item?.title?.slice(0, 22) : item?.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    export default Search