import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import CacheImage from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useEffect, useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import Animated, { FadeInDown } from 'react-native-reanimated';

const DetailScreen = (props) => {
  let item = props.route.params
  const [isFavorite, setIsFavorite] = useState(false)
  const [meal, setMeal] = useState({})
  const [playing, setPlaying] = useState(false);

  const navigation = useNavigation()

  const getMealsByCategory = async () => {
    try {
      const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`)
      const data = await response.json()

      if (data && data.meals[0]) {
        setMeal(data.meals[0])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMealsByCategory()
  }, [])


  const getIngradient = () => {
    let ingredients = []
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(meal[`strIngredient${i}`] + " " + meal[`strMeasure${i}`])
      }
    }
    return ingredients
  }

  const getYoutubeId = () => {
    let url = meal.strYoutube
    let id = url.split("v=")[1]
    return id
  }

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
      className="flex-1 bg-white">
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <CacheImage 
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(98), 
            height: hp(50), 
            borderRadius: 53, 
            borderBottomLeftRadius: 40, borderBottomLeftRadius: 40, marginTop: 4
          }}/>
      </View>
      {meal && (
        <Animated.View 
          entering={FadeInDown.duration(700).springify().damping(12)} 
          className="w-full absolute flex-row justify-between items-center pt-14">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white shadow-md">
            <ChevronLeftIcon color="#fbbf24" size={hp(3.5)} strokeWidth={4.5} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>setIsFavorite(!isFavorite)}
            className="p-2 rounded-full mr-5 bg-white shadow-md">
            <HeartIcon color={isFavorite ? "red": "gray"} size={hp(3.5)} strokeWidth={4.5} />
          </TouchableOpacity>
        </Animated.View>
      )}
      
      {meal && (
        <Animated.View 
          entering={FadeInDown.duration(700).springify().damping(12)}
          className="px-5 flex justify-between space-y-4 pt-8">
            {/* name section */}
            <View className="space-y-2">
              <Text style={{fontSize: hp(3)}} className="flex-1 font-bold text-neutral-700">
                {meal.strMeal}
              </Text>
              <Text style={{fontSize: hp(2)}} className="flex-1 font-medium text-neutral-500">
                {meal.strArea}
              </Text>
            </View>

            {/* misc section */}
            <View className="flex-row justify-around">
              <View className="flex rounded-full bg-amber-300 p-2">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="rounded-full bg-white flex-row justify-center items-center"
                >
                  <ClockIcon color="gray" size={hp(3)} strokeWidth={2.5} />
                </View>
                <View className="flex items-center py-2 space-y-1">
                    <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">35</Text>
                    <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">Mins</Text>
                </View>
              </View>

              <View className="flex rounded-full bg-amber-300 p-2">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="rounded-full bg-white flex-row justify-center items-center"
                >
                  <UsersIcon color="gray" size={hp(3)} strokeWidth={2.5} />
                </View>
                <View className="flex items-center py-2 space-y-1">
                    <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">03</Text>
                    <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">Servings</Text>
                </View>
              </View>

              <View className="flex rounded-full bg-amber-300 p-2">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="rounded-full bg-white flex-row justify-center items-center"
                >
                  <FireIcon color="gray" size={hp(3)} strokeWidth={2.5} />
                </View>
                <View className="flex items-center py-2 space-y-1">
                    <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">103</Text>
                    <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">Cal</Text>
                </View>
              </View>

              <View className="flex rounded-full bg-amber-300 p-2">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="rounded-full bg-white flex-row justify-center items-center"
                >
                  <Square3Stack3DIcon color="gray" size={hp(3)} strokeWidth={2.5} />
                </View>
                <View className="flex items-center py-2 space-y-1">
                    <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700"></Text>
                    <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">Easy</Text>
                </View>
              </View>
            </View>
            
            {/* ingredients section */}
            <View className="space-y-4">
              <Text style={{fontSize: hp(2.5)}} className="font-bold text-neutral-700">
                Ingredients
              </Text>

              <View className="space-y-2 ml-3">
                {getIngradient().map((ingredient, index) => (
                  <View key={index} className="flex-row space-x-4 items-center">
                    <View style={{height: hp(1.5), width: hp(1.5)}} className="bg-amber-300 rounded-full"/>
                    <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-600">
                      {ingredient}
                    </Text>
                  </View>
                ))}
              </View>
            </View>


            {/* instructions section */}
            <View className="space-y-4">
              <Text style={{fontSize: hp(2.5)}} className="font-bold text-neutral-700">
                Instructions
              </Text>

              <Text style={{fontSize: hp(1.6)}} className="text-neutral-700">
                {meal?.strInstructions}
              </Text>
            </View>


            {/* yputibe section */}
            {meal.strYoutube && (
              <View className="space-y-4">
                <Text style={{fontSize: hp(2.5)}} className="font-bold text-neutral-700">
                  Recipe Video
                </Text>

                <View>
                  <YoutubePlayer
                    height={hp(30)}
                    videoId={getYoutubeId()}
                    play={playing}
                    onChangeState={onStateChange}
                  />
                </View>
              </View>
            
            )}
        </Animated.View>
      )}
      
    </ScrollView>
  )
}

export default DetailScreen