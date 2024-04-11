import { View, Text, Image, Pressable } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CacheImage from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

export default function Meals({meals, categories}) {

    const navigator = useNavigation();
    
  return (
    <View className="mx-4 space-y-4">
      <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600">Recipes</Text>
      <View>
        {categories.length > 0 ? 
            <MasonryList
                data={meals}
                keyExtractor={(item) => item.idMeal}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.1}
                renderItem={({item, i}) => {
                    let isEven = i % 2 === 0;
                    return (
                        <Animated.View key={i} entering={FadeInDown.duration(600).springify().damping(12)}>
                            <Pressable 
                            onPress={() => navigator.navigate('Detail', {...item})}
                                style={{width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0}} 
                                className="flex justify-center mb-4 space-x-1">
                                <CacheImage 
                                    uri={item.strMealThumb}
                                    style={{width: '100%', height: i%3 === 0? hp(30):hp(35), borderRadius: 35}} 
                                    className="bg-black/5"
                                    sharedTransitionTag={item.strMeal}
                                />
                                <Text style={{fontSize: hp(2)}} className="font-semibold ml-2 text-neutral-600">
                                    {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
                                </Text>
                            </Pressable>
                        </Animated.View>
                    )
                }}
                numColumns={2}
            />: null
        }
      </View>

    </View>
  )
}