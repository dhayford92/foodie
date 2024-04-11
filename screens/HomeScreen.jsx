import { View, ScrollView, Image, Text, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import Meals from '../components/Meals'

const HomeScreen = () => {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState("Beef")
  const [meals, setMeals] = useState([])
  

  useEffect(() => {
    getCategories()

    getMealsByCategory()
  }, [activeCategory])

  const getCategories = async () => {
    try {
      const response = await fetch('https://themealdb.com/api/json/v1/1/categories.php')
      const data = await response.json()

      if (data && data.categories) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getMealsByCategory = async () => {
    try {
      const response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`)
      const data = await response.json()

      if (data && data.meals) {
        setMeals(data.meals)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14"
      >
        {/* avator and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../assets/images/avator.png')} style={{width: hp(5), height: hp(5)}} className="rounded-full" />
          <BellIcon color="gray" size={hp(3)} />
        </View>

        {/* greetings */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{fontSize: hp(1.8)}} className="font-bold text-neutral-600">Hello, Denzel!</Text>
          <View>
            <Text style={{fontSize: hp(3.5)}} className="text-gray-500">Make your own food,</Text>
            <Text style={{fontSize: hp(3.5)}} className="text-gray-500">stay <Text className="text-amber-600">healthy</Text></Text>
          </View>
        </View>

        {/* search bar */}
        <View className="mx-4 bg-gray-100 rounded-full flex-row items-center px-4 py-2">
          <TextInput
            placeholder="Search for recipes"
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            placeholderTextColor={'gray'}
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon color="gray" size={hp(2.5)} strokeWidth={3} />
          </View>
        </View>

        {/* categories */}
        <View>
          <Categories 
            categories={categories} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </View>

        {/* meals */}
        <View>
          <Meals meals={meals} categories={categories} />
        </View>

      </ScrollView>
    </View>
  )
}

export default HomeScreen