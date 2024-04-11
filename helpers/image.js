import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import { Image } from 'react-native'
import Animated from 'react-native-reanimated';

const CacheImage = (props) => {
    const [cachedSorce, setCachedSource] = useState(null)
    const { uri } = props

    useEffect(() => {
        const getCatcheImage = async () => {
            try{
                const cachedImageData = await AsyncStorage.getItem(uri)
                if(cachedImageData){
                    setCachedSource({uri: cachedImageData})
                }else{
                    const response = await fetch(uri)
                    const imageBlob = await response.blob()
                    const base64Image = await new Promise((resolver) => {
                        const reader = new FileReader()
                        reader.readAsDataURL(imageBlob)
                        reader.onloadend = () => resolver(reader.result)
                    })
                    await AsyncStorage.setItem(uri, base64Image)
                    setCachedSource({uri: base64Image})
                }
            }catch(error){
                setCachedSource({uri})
            }
        }

        getCatcheImage()
    }, [])

  return (
    <Animated.Image {...props} source={cachedSorce} />
  )
}

export default CacheImage