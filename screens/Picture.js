import { View, Text, FlatList, Image, StyleSheet, Dimensions, Modal, TouchableOpacity, Pressable , TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import API from '../Networking/API';
const width = Dimensions.get('window').width;

export default function Picture({ route, navigation }) {
  const { id } = route?.params;
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listAlbums, setListAlbums] = useState(albumPhotos);
  const [checkSearch, setCheckSearch] = useState(false)
  const [searchText, setSearchText] = useState('');
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   fetch();
  // }, []);
  useEffect(() => {
    if (searchText) {
      setListAlbums(
        albumPhotos.reduce((array, item) => {
          if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
            array.push({
              id: item.id,
              title: item.title,
              url: item.url,

            });
          }
          return array;
        }, []),
      );
    } else {
      setListAlbums(
        albumPhotos.map(item => ({
          id: item.id,
          title: item.title,
          url: item.url,
        })),
      );
    }
  }, [searchText]);
  
  const RenderImage = ({ item }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            margin: 3
          }}>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.url} source={{ uri: item.url }} />
          </TouchableOpacity>
          <Text numberOfLines={2}
            style={styles.text}> {item.title}</Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image style={{ width: 300, height: 300, borderRadius:20 }} source={{ uri: item.url }} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{item.title}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };


  useEffect(() => {
    setLoading(true)
    API.getAlbumPhotos(id).then(response => {
      setAlbumPhotos(response);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#DEE9FD',padding:0 }}>
      <Header navigation={navigation} text={'Album Pictures'} />
      <TextInput
        placeholder={'Search'}
        style={styles.input}
        onFocus={() => setCheckSearch(true)}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={checkSearch? listAlbums: albumPhotos}
        refreshing={loading}
        // horizontal={true}
        onRefresh={() => setLoading(false)}
        contentContainerStyle={{ flexDirection: 'column' }}
        renderItem={({ item }) => {
          return <RenderImage item={item} />
        }}
        numColumns={2}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  // thumbnail: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 13,
  //   paddingHorizontal: 10,
  //   marginRight: 10,
  // },
  url: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    paddingHorizontal: 10,
    color: 'white',
    position: 'absolute',
    bottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10,
    textShadowColor: 'black',
    opacity: 0.5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2, 
    marginTop:10,
  },
  buttonOpen: {
    backgroundColor: "#5d92f5",
  },
  buttonClose: {
    backgroundColor: "#5d92f5",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
    marginHorizontal:10
  }
})