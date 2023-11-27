import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import Introimage from '../assets/Introimage.png'

const IntroSlider = () => {
    const slides = [{
        image:Introimage,
        text:'Free Delivery Offers',
        description:'Free delivery for new customers via credit card and other payment method'
    }]

  return (
    <View  className='flex-1'>
      <AppIntroSlider 
      data={slides}
      renderItem={({item})=><View style={styles.container} >
        <Image style={styles.image} source={item.image} />
        <Text style={styles.heading}>{item.text}</Text>
        <Text style={styles.description} >{item.description}</Text>
        </View>}
      />
    </View>
  )
}

export default IntroSlider

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    heading:{
        fontSize:40,
        fontWeight:"700",
        lineHeight:50.4,
        marginTop:"7%",
        color:'#000'
    },
    image:{
        marginTop:"-40%"
    },
    description:{
      fontWeight:'300',
      fontSize:22,
      lineHeight:25,
      textAlign:'center'
    }
})