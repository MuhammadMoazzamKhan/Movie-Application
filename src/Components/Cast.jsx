import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fallBackPorfileImage, image185, image342 } from '../MovieApi';

const Cast = ({ cast, navigation }) => {
  const characterName = 'John wick';
  const personName = 'Keanu Reeves'
  return (
    <View className='my-6'  >
      <Text className='text-white mx-4 mb-5'>Top Cast</Text>
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        data={cast}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Charaters item={item} characterName={characterName} personName={personName} navigation={navigation} />}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </View>
  )
}

const Charaters = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('Person', item)} className='mr-4 items-center'>
      <View className=' overflow-hidden rounded-full w-20 h-20 items-center border border-neutral-500'>
        <Image
          source={{uri: image185(item?.profile_path) || fallBackPorfileImage}}
          className=' rounded-2xl h-24 w-20 ' />
      </View>
      {item.character &&
      <Text className='text-white mt-1 text-xs'>
        {item.character.length > 10 ? item.character.slice(0, 10) + '...' : item.character}
      </Text>}
      <Text className='text-neutral-400 mt-1 text-xs'>
        {item?.original_name.length > 10 ? item?.original_name.slice(0, 10) + '...' : item?.original_name}
      </Text>
    </TouchableOpacity>
  )
}

export default Cast