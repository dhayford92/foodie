import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import Animated, { FadeInDown } from 'react-native-reanimated';
import CacheImage from '../helpers/image';


const Categories = ({categories, activeCategory, setActiveCategory}) => {

  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {/* category */}
        {categories.map((category, index) => {
            let isActive = activeCategory === category.strCategory;
            let activeClass = isActive ? 'bg-amber-500' : 'bg-black/10';
            return (
                <TouchableOpacity 
                    key={index} 
                    className="flex items-center space-y-1"
                    onPress={() => setActiveCategory(category.strCategory)}
                >
                <View className={"rounded-full p-[6px] overflow-hidden "+activeClass}>
                    <CacheImage uri={category.strCategoryThumb} style={{width: hp(6), height: hp(6)}} className="rounded-full overflow-hidden" />
                </View>
                <Text style={{fontSize: hp(1.6)}} className="text-gray-500 text-center">{category.strCategory}</Text>
            </TouchableOpacity>
            );
        })}
      </ScrollView>
    </Animated.View>
  )
}

export default Categories