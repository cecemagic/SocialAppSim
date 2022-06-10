import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import API from '../Networking/API';
import Header from '../component/Header';
const width = Dimensions.get('window').width;
export default function Detail({ route, navigation }) {
  const { id } = route?.params;
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.getPostComments(id).then(response => {
      setComments(response);
    });
    API.getPostDetail(id).then(response => {
      setPost(response);
    });
  }, []);

  const RenderItem = ({ item }) => {
    const [isCheck, setIsCheck] = useState(false)
  // console.log(item.id)
    return (
      <View
        style={{
          borderBottomWidth: 1,
          paddingBottom: 10,
          borderBottomColor:'lightgray',         
        }}>
        <View style={{ flexDirection: 'row', marginVertical: 10, width: width - 10 }}>
          <Image style={{ width: 30, height: 30, marginRight: 7 }} source={require('../assets/woman.png')} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 70 }}>
            {/* <Text>{item.id}</Text> */}
            <Text style={{ color: 'black', textTransform: 'capitalize', fontSize: 15, fontWeight: 'bold' }}>{item.email}</Text>
            <TouchableOpacity onPress={() => setIsCheck(!isCheck)}>
              {/* {
                !isCheck ? (<Image style={{ width: 20, height: 20 }} source={require('../assets/love.png')} />) : (<Image style={{ width: 20, height: 20 }} source={require('../assets/heart.png')} />)
              } */}
              <Image style={{ width: 20, height: 20, tintColor:isCheck? 'red' : 'gray' }} source={require('../assets/heart.png')} />
            </TouchableOpacity>


          </View>

        </View>

        <Text style={{ marginHorizontal: 10, fontSize: 14, color: 'black' }}>{item.body}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginHorizontal: 10 }}>{Math.floor(Math.random() * 24) + 1}h</Text>
          <Text style={{ marginHorizontal: 10 }}>Reply</Text>
        </View>

      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#DEE9FD', paddingHorizontal: 10, paddingVertical: 10 }}>
      <Header navigation={navigation} text={'Comments'}/>
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ width: 30, height: 30, marginRight: 7 }} source={route.params.image} />
        <Text style={{ color: 'black', textTransform: 'capitalize', width: width - 40, fontSize: 15, fontWeight: 'bold', }}> {post.title}</Text>
      </View>

      <Text style={{ marginLeft: 10, color: 'black', fontSize: 14, textTransform: 'capitalize', marginTop: 5, borderBottomWidth: 1, borderStyle: 'dashed', paddingBottom: 10, borderBottomColor: 'lightgray' }}>{post.body}</Text>
      <Text style={{ marginLeft: 10, marginTop: 5,borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: 10, }}>20h  See translation</Text>
      {/* <Text style={{ marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: 10, }}>All comment:</Text> */}
      <FlatList
        data={comments}
        renderItem={({ item }) => {
          return (<RenderItem item={item} />)
        }

        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    // paddingHorizontal: 10,
    // marginRight: 10,
  },
  actionIcon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginRight: 5,

  },
  statusIcon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginLeft: 5,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 5
  }
})