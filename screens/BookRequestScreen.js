import React,{Component} from 'react';
import {Text,View,KeyboardAvoidingView,TextInput, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class BookRequestScreen extends Component{
    constructor(){
     super();
     this.state={
      userId: firebase.auth().currentUser.email,
      bookName: '',
      reasonToRequest: ''
    }
}

     addRequest=(bookName,reasonToRequest)=>{
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId()
        db.collection('requested _books').add({
          "user_Id": userId,
          "book_name": bookName,
          "reason_to_request": reasonToRequest,
          "request_Id":  randomRequestId
        })
        this.setState({
            bookName: '',
            reasonToRequest: ''
        })
        return Alert.alert('Book Requested Successfully')
         }
         
    render(){
        return(
            <View style={{flex: 1}}>
                <MyHeader title='Request Book'/>
                <KeyboardAvoidingView style={styles.keyboardStyle}>
                    <TextInput
                     style={styles.formTextImput}
                     placeholder={'Enter Book Name....'}
                     onChangeText={(text)=>{
                         this.setState({
                            bookName: text
                         })
                     }}
                     value={this.state.bookName}
                    />
                    <TextInput
                     style={styles.formTextImput}
                     placeholder={'Why Do You Need The Book'}
                     multiline={true}
                     numberOfLines={8}
                     onChangeText={(text)=>{
                         this.setState({
                           reasonToRequest: text  
                         })
                     }}
                     value={this.state.reasonToRequest}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({ keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' },
 formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, },
 button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, } )