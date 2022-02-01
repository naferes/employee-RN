import React,{useState} from 'react';
import {StyleSheet, View, Modal, Alert, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from  'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = (props)=>{
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState("");
    const [picture, setPicture] = useState("");
    const [modal, setModal] = useState(false);
    const [position, setPosition] = useState("");
    const submitData = ()=>{
        fetch("http://192.168.1.17:3000/send-data",{
            method: "POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=> res.json())
        .then(data=> {Alert.alert('the employee added with success'); props.navigation.navigate("Home")})
        .catch(e=>console.log(e))
    }

    const pickFromGallery = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile={
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
        } else{
            Alert.alert("you need to give up permission to work");
        }
    }
    const pickFromCamera = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA);
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1,1],
                quality: 0.5
            })
            if(!data.cancelled){
                let newfile={
                    uri: data.uri,
                    type: `test/${data.uri.split(".")[1]}`,
                    name: `test.${data.uri.split(".")[1]}`
                }
                handleUpload(newfile)}
        }
        else Alert.alert("You have to give up permission to work")
    }


    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append("cloud_name", "dh0pxiuuc")

        fetch("https://api.cloudinary.com/v1_1/dh0pxiuuc/image/upload", {
            method: "post",
            body: data
        }).then(res=>res.json())
        .then(data => {setPicture(data.url); setModal(false);})
    }
    return (
        <View style={styles.root}>
            <TextInput 
            style={styles.inputStyle}
            label="Name"
            value={name}
            mode="outlined"
            onChangeText={text=>setName(text)}
            />
            <TextInput 
            style={styles.inputStyle}
            label="Email"
            value={email}
            mode="outlined"
            onChangeText={text=>setEmail(text)}
            />
            <TextInput 
            style={styles.inputStyle}
            label="Position"
            value={position}
            mode="outlined"
            onChangeText={text=>setPosition(text)}
            />
            <TextInput 
            style={styles.inputStyle}
            label="phone"
            value={phone}
            mode="outlined"
            keyboardType="number-pad"
            onChangeText={text=>setPhone(text)}
            
            />
            <TextInput 
            style={styles.inputStyle}
            label="salary"
            value={salary}
            mode="outlined"
            keyboardType="number-pad"
            onChangeText={text=>setSalary(text)}
            
            />
            <Button icon= {picture==""?"upload":"check"} style={styles.inputStyle} mode="contained" onPress={()=>setModal(true)}>
                Upload Image
            </Button>
            <Button style={styles.inputStyle} icon="content-save" mode="contained" onPress={()=>submitData()}>
                Save
            </Button>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=> setModal(false)}>
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                    <Button icon="camera" mode="contained" onPress={()=>pickFromCamera()}>Camera</Button>
                    <Button style={{backgroundColor: "blue"}} icon="image-area" mode="contained" onPress={()=>pickFromGallery()}>Gallery</Button>
                    </View>
                    <Button   onPress={()=>setModal(false)}>Cancel</Button>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:5
    },
    modalView:{
        position: 'absolute',
        bottom: 2,
        width: "100%",
        backgroundColor:"white"
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent: "space-around",
        padding:10
    }
})
const theme = {
    colors:{
        primary: "red"
    }

}

export default CreateEmployee;
