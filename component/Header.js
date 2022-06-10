import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
//import AntDesign from "@ant-design/icons"
//import Ionicons from "@"
//import { Icon } from "@rneui/themed";
import Icon5 from "react-native-vector-icons/FontAwesome5";


export default function ({ navigation, text, press, check = false }) {
    // const {press} = props
    return (
        <View style={styles.headerTab}>
            <TouchableOpacity style={{justifyContent:'center'}}
                onPress={() => navigation.goBack()}
            >
                <Image
                    style={styles.icon}
                    source={require('../assets/left-arrow.png')}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>{text}</Text>
            {
                check ? (
                <TouchableOpacity onPress={press}>
                   <Image style={styles.icon} source={require('../assets/burger.png')}/>
                    {/* <Text style={{alignSelf:'center', fontSize:10, fontWeight:'bold'}}>Change</Text> */}
                </TouchableOpacity>) : null
            }

            {/* <View>

        </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    headerTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#DEE9FD',
        height: 50,
        paddingVertical: 10,
        paddingLeft: 10,
    },
    headerText: {
        height: 40,
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        lineHeight: 27,
        marginRight: 20,
        fontWeight: '600',
        
    },
    icon: {
        height: 20,
        width: 20,
        backgroundColor: '#DEE9FD',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#b0c9f7',
        borderRadius: 50,
        paddingVertical: 10,
        shadowColor: "black",
        shadowOpacity: 1,
        elevation: 20,
        shadowRadius: 20,
        shadowOffset: { width: 20, height: 20 },
        height: 35,
        width: 100,
        justifyContent: 'center',
        marginRight: 10,
        paddingHorizontal: 10,
        alignSelf: 'center',
      },
})
