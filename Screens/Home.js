import React,{useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList,ActivityIndicator, Alert} from 'react-native';
import {Card, FAB} from 'react-native-paper'
import { render } from 'react-dom';


const  Home = (props)=>{
    const [data, setData]  =  useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = ()=>{
        fetch("http://192.168.1.17:3000/")
            .then(res => res.json())
            .then(results=>{setData(results);setLoading(false)
            }).catch(e=>Alert.alert("something went wrong"))
    }
    useEffect(()=>{
        fetchData()
    },[])
    const renderList = (item)=>{
        return(
            <View >
                <Card style={styles.mycard} onPress={()=>props.navigation.navigate("Profile", {item})}  >
                    <View style={styles.cardview}>
                        <Image 
                        style={{width:60,height:60,borderRadius:30}}
                        source={{uri:item.picture}}
                        />
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text>{item.position}</Text>
                        </View>
                    </View>
                </Card>
                
            </View>
        );
    }

    return(
        <View style={{flex:1}}>
            
             <FlatList
            data={data}
            renderItem={({item})=>{
                return renderList(item)
            }}
            keyExtractor={item => `${item._id}`}
            refreshing={loading}
            onRefresh={()=>fetchData()}
            
            />
           
            <FAB onPress={()=>props.navigation.navigate("Create")}
                style={styles.fab}
                small={false}
                icon="plus"/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    mycard: {
        margin : 10,
        padding: 5
    },
    cardview: {
        flexDirection: 'row',
        padding: 6
    },
    text: {
        fontSize: 20
    },
    fab :{
        position: "absolute",
        margin: 10,
        right: 0,
        bottom: 0,
        backgroundColor: "#006aff"
    }
});

export default Home;
