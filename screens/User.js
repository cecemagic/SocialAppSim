import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import API from '../Networking/API';
import Header from '../component/Header';
const width = Dimensions.get('window').width;

export default function User({ navigation }) {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [listuserSearch, setListUsersSearch] = useState(listUsers);
  const [checkSearch, setCheckSearch] = useState(false)

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    API.getUsers()
      .then(res => {
        setListUsers(res);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchText) {
      setListUsersSearch(
        listUsers.reduce((array, item) => {
          if (item.name.toLowerCase().includes(searchText.toLowerCase()) || item.username.toLowerCase().includes(searchText.toLowerCase())) {
            array.push({
              id: item.id,
              name: item.name,
              username: item.username,

            });
          }
          return array;
        }, []),
      );
    } else {
      setListUsersSearch(
        listUsers.map(item => ({
          id: item.id,
          name: item.name,
          username: item.username,
        })),
      );
    }
  }, [searchText]);

  

  const renderItem = ({ item }) => {
    const pressItem = id => {
      navigation.navigate('Album', { id: id,
      name: item.name});
    };
    return (
      <View

        style={styles.userBox}>
        <TouchableOpacity onPress={() => pressItem(item.id)}>
          <Image style={styles.userIcon} source={require('../assets/user.png')} />
        </TouchableOpacity>

        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.userText} onPress={() => pressItem(item.id)}>Name: {item.name}</Text>
          {/* <Text style={{fontWeight:'bold',fontSize:15}}>Username: {item.username}</Text> */}
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ backgroundColor: '#216efc', borderRadius: 20, width: 100, height: 30, justifyContent: 'center', marginTop: 5 }}>
              <Text style={{ alignSelf: 'center', color:'black' }}> Add </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#b0c9f7', borderRadius: 20, width: 100, height: 30, justifyContent: 'center', marginTop: 5, marginLeft: 5 }}>
              <Text style={{ alignSelf: 'center', color:'black' }}> Remove </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#DEE9FD' }}>
      <Header navigation={navigation} text={'User'} />
      <TextInput
        placeholder={'Search'}
        style={styles.input}
        // value={searchText}
        onFocus={() => setCheckSearch(true)}
        onChangeText={(text) => setSearchText(text)}
      />
      {/* <Search /> */}
      <FlatList
        data={!checkSearch ? listUsers : listuserSearch}
        refreshing={loading}
        onRefresh={fetch}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userBox: {
    marginBottom: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    flexDirection: 'row'
  },
  userIcon: {
    borderRadius: 25,
    marginRight: 10,
    width: 50,
    height: 50
  },
  userText: {
    fontSize: 17,
    fontWeight: 'bold',
color:'black'
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
    marginHorizontal: 10
  }
});