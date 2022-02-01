import React from 'react';
import {StyleSheet, Text, View, Image, Linking, Platform, Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import {Title, Card, Button} from 'react-native-paper'
import {MaterialIcons, Entypo} from '@expo/vector-icons'

const Profile = (props)=>{
    const {_id, name, picture, phone, salary, email, position,} = props.route.params.item;

    const deleteEmployee = ()=>{
        fetch("http://192.168.1.17:3000/delete",{
            method:"post",
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id:_id
            })
        })
        .then(res=>{Alert.alert(`${name} has been deleted`); props.navigation.navigate("Home")})
        
        .catch(e=>Alert.alert("something went wrong"))
    }

    const openDial=()=>{
        if(Platform.OS === "android")
            {Linking.openURL(`tel:${phone}`)}
        else {Linking.openURL(`telprompt:${phone}`)}
    }
    return (
        <View style={styles.root}>
            <LinearGradient 
            colors={["#0033ff", "#6bc1ff"]}
            style={{height: "20%"}}
            />
            <View style={{alignItems:"center"}}>
                <Image
                style={{width:140, height:140,borderRadius:140/2,marginTop:-50}}
                source={{uri:picture}} />


            </View>
            <View style={{alignItems:"center", margin:15}}>
                <Title>{name}</Title>
                <Text style={{fontSize: 15}}>{position}</Text>
            </View>
            <Card style={styles.mycard} onPress={()=> Linking.openURL(`mailto:${email}`)}>
                <View style={styles.cardcontent}>
                    <MaterialIcons name="email" size={32} color="#006aff"/>
                    <Text style={styles.mytext}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={()=> openDial()}>
                <View style={styles.cardcontent}>
                    <Entypo name="phone" size={32} color="#006aff"/>
                    <Text style={styles.mytext}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} >
                <View style={styles.cardcontent}>
                    <MaterialIcons name="attach-money" size={32} color="#006aff"/>
                    <Text style={styles.mytext}>`${salary}$`</Text>
                </View>
            </Card>
            <View style={{flexDirection:"row", justifyContent:"space-around", padding:5}}>
                <Button icon="account-edit"
                mode="contained" onPress={()=>console.log('pressed')}>Edit</Button>
                <Button icon="delete"
                mode="contained" onPress={()=>deleteEmployee()}>Fire</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    mycard:{
        margin: 3
    },
    cardcontent:{
        flexDirection:"row",
        padding: 8
    },
    mytext:{
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    }
})

export default Profile;
