import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View,Dimensions,Text} from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';




export default function App() {


  const {width,height}=Dimensions.get('screen');
  const birdLeft=width/2;
  const [birdBottom,setBirdBottom]=useState(height/2);
  const gravity=3;
  let gameTimerId;

  const [obstaclesLeft,setObstaclesLeft]=useState(width);
  let obstaclesTimer;

  const [obstaclesLeft2,setObstaclesLeft2]=useState(width + width/2 + 25);
  let obstaclesTimer2;

let [isGameOver,setIsGameOver]=useState(false);
const [score,setScore]=useState(0);
  //bird fall

  useEffect(()=>{
    if(birdBottom>0){
      gameTimerId = setInterval(()=>{
            setBirdBottom(birdBottom=>birdBottom-gravity);
        },30);
        return ()=>{
          clearInterval(gameTimerId);
        }
    }

  },[birdBottom]);

  const jump=()=>{
    if(!isGameOver && (birdBottom<height)){
      setBirdBottom(birdBottom=>birdBottom+50);
    }
  }

  const obstacleWidth=50;
  const obstacleHeight=300;
  const gap=180;
  const [obstacleNegHeight,setObstacleNegHeight]=useState(0);
  const [obstacleNegHeight2,setObstacleNegHeight2]=useState(0);

  //start first obstacles

  useEffect(()=>{
    
      if(obstaclesLeft>-obstacleWidth){
        obstaclesTimer =  setInterval(()=>{
           setObstaclesLeft(obstaclesLeft=>obstaclesLeft-5);
          },30);
          return ()=>{
            clearInterval(obstaclesTimer);
          }
      }else{
        setObstaclesLeft(width);
        setObstacleNegHeight(-Math.random()*100);
        setScore(score=>score+1);
    }   

  },[obstaclesLeft]);

  //start second obstacles

  useEffect(()=>{
    
    if(obstaclesLeft2>-obstacleWidth){
      obstaclesTimer2 =  setInterval(()=>{
         setObstaclesLeft2(obstaclesLeft2=>obstaclesLeft2-5);
        },30);
        return ()=>{
          clearInterval(obstaclesTimer2);
        }
    }else{
      setObstaclesLeft2(width);
      setObstacleNegHeight2(-Math.random()*100);
      setScore(score=>score+1);
  }   

},[obstaclesLeft2]);


//check collisions

  useEffect(()=>{
    if (
      ((birdBottom < (obstacleNegHeight + obstacleHeight + 30) ||
      birdBottom > (obstacleNegHeight + obstacleHeight + gap -30)) &&
      (obstaclesLeft > width/2 -25 && obstaclesLeft < width/2 + 25)
      )
      || 
      ((birdBottom < (obstacleNegHeight2 + obstacleHeight + 30) ||
      birdBottom > (obstacleNegHeight2 + obstacleHeight + gap -30)) &&
      (obstaclesLeft2 > width/2 -25 && obstaclesLeft2 < width/2 + 25 )
      )
      ){
          console.log("game over");
           gameOver();
        }
  });


  const gameOver=()=>{
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimer);
    clearInterval(obstaclesTimer2);
    setIsGameOver(true);
  }
  

  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
      <Bird birdBottom={birdBottom} birdLeft={birdLeft}/>
      <Obstacles 
      color={'green'}
      obstacleWidth={obstacleWidth} 
      obstacleHeight={obstacleHeight} 
      gap={gap} 
      randomBottom={obstacleNegHeight}
      obstaclesLeft={obstaclesLeft}/>

<Obstacles 
      obstacleWidth={obstacleWidth} 
      obstacleHeight={obstacleHeight} 
      gap={gap} 
      color={'red'}
      randomBottom={obstacleNegHeight2}
      obstaclesLeft={obstaclesLeft2}/>

     {isGameOver&&<Text style={{
        position:'absolute',
        fontSize:32,
        fontWeight:'bold',
        backgroundColor:'black',
        color:'white',
        paddingHorizontal:30
        }}>Your score is: {score}</Text>}
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
