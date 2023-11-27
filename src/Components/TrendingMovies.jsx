import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../MovieApi';

var {height,width} = Dimensions.get('window');

const TrendingMovies = ({data}) => {
  const navigation = useNavigation();
  const handleClick = (item)=>{
    navigation.push('Movie',item)
  }
  return (
    <View >
      <Text className=' text-white text-xl mb-5  mx-2'>Trending Movies</Text>
      <Carousel 
      data={data}
      renderItem={({item})=> <MovieCard item={item} handleClick={()=>handleClick(item)} />}
      firstItem={1}
      inactiveSlideOpacity={0.6}   
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display:'flex',alignItems:'center'}}
      />
    </View>
  )
}

const MovieCard = ({item,handleClick})=>{
  return(
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image 
      className='rounded-xl'
      source={{uri: image500(item.poster_path)}}
      style={{
        width:width*0.6,
        height:height*0.4
      }}
      />
    </TouchableWithoutFeedback>
  )
}

export default TrendingMovies
