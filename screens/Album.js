import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import API from '../Networking/API';
import Header from '../component/Header';
const width = Dimensions.get('window').width;

export default function Album({ route, navigation }) {
  const { id } = route?.params;
  const [album, setAlbum] = useState([]);
  const [todos, setTodos] = useState([]);
  const [check, setCheck] = useState(true)
  const [loading, setLoading] = useState(false);

  const [listTodos, setListTodos] = useState(todos)
  const [listAlbums, setListAlbums] = useState(album)
  const [checkSearch, setCheckSearch] = useState(false)
  const [checkLike, setCheckLike] = useState(false)
  const [searchText, setSearchText] = useState('')
// const [isCheck, setisCheck] = useState(false)

  useEffect(() => {
    setLoading(true)
    API.getUsersAlbums(id).then(response => {
      setAlbum(response);
    }).finally(() => setLoading(false));
    API.getUsersTodos(id).then(response => {
      setTodos(response);
    }).finally(() => setLoading(false));
    // setLoading(false)
    // API.getAlbumPhotos(id).then(response => {
    //   setAlbumPhotos(response);
    // }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!check) {
      if (searchText) {
        setListTodos(
          todos.reduce((array, item) => {
            if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
              array.push({
                id: item.id,
                title: item.title,
                completed: item.completed,

              });
            }
            return array;
          }, []),
        );
      } else {
        setListTodos(
          todos.map(item => ({
            id: item.id,
            title: item.title,
            completed: item.completed,
          })),
        );
      }
    }
    if (searchText) {
      setListAlbums(
        album.reduce((array, item) => {
          if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
            array.push({
              id: item.id,
              title: item.title,


            });
          }
          return array;
        }, []),
      );
    } else {
      setListAlbums(
        album.map(item => ({
          id: item.id,
          title: item.title,

        })),
      );
    }

  }, [searchText]);
  return (
    <View style={{ flex: 1, backgroundColor: '#DEE9FD' }}>
      <Header navigation={navigation}
        check={true}
        press={() => setCheck(!check)}
      />
      <TextInput
        placeholder={'Search'}
        style={styles.input}
        onFocus={() => setCheckSearch(true)}
        onChangeText={(text) => setSearchText(text)}
      />
      {/* <TouchableOpacity style={styles.button} onPress={() => setCheck(!check)}>
        <Text style={{ color: 'black', alignSelf: 'center', fontSize: 15, fontWeight: '800' }}>Tap this!</Text>

      </TouchableOpacity> */}
      {
        !check ? (<FlatList
          data={checkSearch ? listTodos : todos}
          refreshing={loading}
          onRefresh={() => setLoading(false)}
          renderItem={({ item }) => (
            <>
              <View
                style={{
                  marginVertical: 5,
                  // paddingHorizontal: 15,
                  padding: 15,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginHorizontal: 10
                }}>
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#b0c9f7', justifyContent: 'center' }}>
                  <Image style={styles.thumbnail} source={require('../assets/to-do-list.png')} />
                </View>
                {/*  */}
                <View style={{ flexDirection: 'column', alignSelf: 'center', width: width - 120, marginLeft: 10 }}>
                  <Text numberOfLines={3} style={{ fontSize: 15, fontWeight: 'bold' }}>Todo: {item.title}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between', width:width - 120,marginTop:7}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold',alignSelf:'center' }}>Completed: {item.completed.toString()}</Text>
                {
                  item.completed === true ? ( <Image style={{width:25,height:25,}} source={require('../assets/check.png')}/>)
                  : ( <Image style={{width:25,height:25}} source={require('../assets/close.png')}/>)
                }
               
                </View>
                 
                </View>
                
              </View>

            </>
          )}

        />) : (<FlatList
          data={checkSearch ? listAlbums : album}
          refreshing={loading}
          onRefresh={() => setLoading(false)}
          renderItem={({ item }) => (


            <View
              // onPress={() => navigation.navigate('Picture', { id: item.id })}
              style={{
                padding: 10,
                marginTop: 15,
                borderWidth: 1,
                marginHorizontal: 5,
                borderRadius: 20,
                borderColor: 'gray'
                // width: width-70,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.thumbnail} source={require('../assets/music-album.png')} />
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black', marginLeft:5 }}>{route.params.name}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Picture', { id: item.id })}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 5, textTransform: 'capitalize' }}>{item.title}</Text>
                <Image style={{ width: 300, height: 200, alignSelf: 'center', marginVertical: 10 }} source={{uri:'https://images.pexels.com/photos/4200745/pexels-photo-4200745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}} />
              </TouchableOpacity>

              <View >
                {/* Like share */}
                <View style={styles.userCard}>
                  {/* Like  */}
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={[styles.actionIcon]} source={require('../assets/color-like.png')} />
                    <Text style={{ marginLeft: 5 }}>{Math.floor(Math.random() * 20) * 100 + 1} Likes</Text>
                  </View>

                  <View style={{ flexDirection: 'row', }}>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                      <Text> {Math.floor(Math.random() * 20) * 100 + 1} Comments</Text>
                      {/* <Image style={styles.statusIcon} source={require('../assets/Home.png')} /> */}

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{Math.floor(Math.random() * 20) * 100 + 1} Shares</Text>
                      {/* <Image style={styles.statusIcon} source={require('../assets/Home.png')} /> */}

                    </View>
                  </View>
                </View>


                <View style={{ marginTop: 5, marginHorizontal: 10 }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    {/* Like  */}
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPress={() => setCheckLike(!checkLike)}>
                        <Image style={[styles.actionIcon, { tintColor: checkLike ? 'blue' : 'black' }]} source={require('../assets/like.png')} />
                      </TouchableOpacity>

                      <Text>Like</Text>
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                      <Image style={styles.actionIcon} source={require('../assets/comment.png')} />
                      <Text>Comment</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Image style={styles.actionIcon} source={require('../assets/share.png')} />
                      <Text>Share</Text>
                    </View>
                  </View>

                </View>

              </View>


              {/* <Text style={{fontSize:15, fontWeight:'bold', alignSelf:'center'}}>Album: {item.title}</Text> */}
            </View>


          )}

        />)
      }

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#b0c9f7',
    borderRadius: 50,
    paddingVertical: 10,
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 20,
    shadowRadius: 20,
    shadowOffset: { width: 20, height: 20 },
    height: 40,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 60,
    marginBottom: 20,
  },
  thumbnail: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    // paddingHorizontal: 10,
    // marginRight: 10,
  },
  container: {
    margin: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    color: '#000',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10
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