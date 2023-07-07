import { View, Text, FlatList, TextInput, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { myAxiosGetRequest } from '../../services/myAxiosRequest'
import styles from './styles'
import Wallpaper from '../../component/atoms/Images/Wallpaper'
import { COLORS } from '../../constants'


const Home = ({navigation}) => {
    const [search, setSearch] = useState('nature')
    const [data, setData] = useState(null)
    useEffect(() => {
        getData();
    }, [search])

    const getData = async () => {
        await myAxiosGetRequest(search).then(res => {
            setData(res.data.photos);
            // console.log(res.data.photos)
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
            <Text style={styles.title}>Wallpaper</Text>
            <TextInput style={styles.search} placeholder="Search here"
                onChangeText={(search) => setSearch(search)}
            />
            {data &&
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <Wallpaper source={item.src.tiny} onPress={()=> navigation.navigate('WallPaper',{source:item.src})} />
                    )}
                    horizontal={false}
                    key={item => item.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                />
            }
        </View>
    )
}

export default Home;