import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from "../../theme/index";

var { width, height } = Dimensions.get('window');
const Loading = () => {
    return (
        <View style={{ width, height }} className='flex-row justify-center items-center'>
            <Progress.Circle indeterminate={true} borderWidth={8} size={150} color={theme.background} />
        </View>
    )
}

export default Loading