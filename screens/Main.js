import {View, Text, TouchableOpacity, FlatList,Image, StyleSheet,Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import API from '../Networking/API';
const width = Dimensions.get('window').width;

export default function Main({navigation}) {
  const [listPost, setListPost] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    API.getPosts()
      .then(res => {
        setListPost(res);
      })
      .finally(() => setLoading(false));
  };

  const pressItem = id => {
    navigation.navigate('Detail', {id: id,
    image:require('../assets/gamer.png')
    });
  };

  const renderItem = ({item}) => {
    return (
      // <TouchableOpacity
      //   onPress={() => pressItem(item.id)}
      //   style={{borderWidth: 1.5, marginVertical: 5, borderRadius:10, backgroundColor:'white'}}>
      //   <Text style={{marginLeft:15, marginTop:5}}>ID: {item.id}</Text>
      //   <Text style={{marginLeft:15, marginBottom:5}}>Title: {item.title}</Text>
      // </TouchableOpacity>
      
      
      <View
              // onPress={() => navigation.navigate('Picture', { id: item.id })}
              style={{
                padding: 10,
                marginTop: 15,
                borderWidth: 1,
                marginHorizontal: 5,
                borderRadius: 20,
                borderColor: 'gray',
                backgroundColor:'white',
                // width: width-70,
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.thumbnail} source={require('../assets/gamer.png')} />
                <Text numberOfLines={3} style={{ fontSize: 17, fontWeight: 'bold', color: 'black', marginLeft:5, textTransform:'capitalize',width:width-70}}>{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => pressItem(item.id )}>
                <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 5, textTransform: 'capitalize' }}>{item.body}</Text>
                <Image style={{ width: 350, height: 300, alignSelf: 'center', marginVertical: 10 }} source={{uri:'https://images.pexels.com/photos/196652/pexels-photo-196652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}} />
              </TouchableOpacity>

              <View >
                {/* Like share */}
                <View style={styles.userCard}>
                  {/* Like  */}
                  <View style={{ flexDirection: 'row' }}>
                    <Image style={[styles.actionIcon]} source={require('../assets/color-like.png')} />
                    <Text style={{ marginLeft: 5 }}>{Math.floor(Math.random() * 100)  + 1} Likes</Text>
                  </View>

                  <View style={{ flexDirection: 'row', }}>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                      <Text> {Math.floor(Math.random() * 100) + 1} Comments</Text>
                      {/* <Image style={styles.statusIcon} source={require('../assets/Home.png')} /> */}

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text>{Math.floor(Math.random() * 100) + 1} Shares</Text>
                      {/* <Image style={styles.statusIcon} source={require('../assets/Home.png')} /> */}

                    </View>
                  </View>
                </View>


                <View style={{ marginTop: 5, marginHorizontal: 10 }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    {/* Like  */}
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPress={() => setCheckLike(!checkLike)}>
                        <Image style={[styles.actionIcon]} source={require('../assets/like.png')} />
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
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#DEE9FD'}}>
      <View>
        <View style={styles.headerInsta}>
          <Text style={styles.headerText}>Instagram</Text>
          <TouchableOpacity style={styles.logo}>
            <Image style={[styles.thumbnail, {marginRight:15}]} source={require('../assets/messenger.png')} />
            <Image style={styles.thumbnail} source={require('../assets/instagram.png')} />   
          </TouchableOpacity>
        </View>
        </View>
      <FlatList
        data={listPost}
        refreshing={loading}
        onRefresh={fetch}
        renderItem={renderItem}
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
  },
  headerInsta: {
    flexDirection: 'row',
    backgroundColor:'#b0c9f7', 
    width:width, 
    height:50,
    justifyContent:'space-between',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginLeft: 5,
  },
  logo: {
    flexDirection:'row',
    alignSelf: 'center',
    marginRight:10,
  }
})