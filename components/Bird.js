import React from 'react';
import { View } from 'react-native';

function Bird({birdBottom,birdLeft}) {
    const birdWidth=50;
    const birdHeight=60;
    return (
        <View style={{
            position:'absolute',
            backgroundColor:'blue',
            width:birdWidth,
            height:60,
            bottom:birdBottom - (birdHeight/2),
            left:birdLeft - (birdWidth/2)
        }}/>
    )
}

export default Bird;
