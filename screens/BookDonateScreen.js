import React,{Component} from 'react';
import {Text,View,FlatList,StyleSheet,TouchableOpacity} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {ListItem} from 'react-native-elements';
import {MyHeader} from '../components/MyHeader'

export default class BookDonateScreen extends Component{
    constructor(){
        super();
        this.state={
          requestedBooksList : [],
        }
        this.requestRef = null
    }
    componentDidMount(){
        this.getRequestedBooksList();
    }
    componentWillUnmount(){
        this.requestRef();
    }
    keyExtractor=(item,index)=>index.toString();
    renderItem=({item,i})=>{
      return(
          <ListItem
           key={i}
           title={item.book_name}
           subTitle={item.reasonToRequest}
           titleStyle={{color: black,fontWeight:'bold'}}
           right={<TouchableOpacity style={styles.button}>
               <Text style={{color:'#ffff'}}>View</Text>
           </TouchableOpacity>}
           bottomDivider
          /> 
      )   
    }
    getRequestedBooksList=()=>{
       this.requestRef= db.collection("request_books")
       .onSnapshot((snapshot)=>{
         var requestedBooksList = snapshot.docs.map(document=>document.data())
         this.setState({
             requestedBooksList: requestedBooksList
         })
       }) 
    }
    
    render(){
        return(
            <View style={{flex: 1}}>
              <MyHeader title="Donate Books" />
              <View>{this.state.requestedBooksList.length===0?(
                <View style={styles.subContainer}>
                    <Text style={{fontSize: 20}}>List Of All Requested Books</Text>
                </View>  
              ):(
                 <FlatList
                   keyExtractor={this.keyExtractor}
                   data={this.state.requestedBooksList}
                   renderItem={this.renderItem}
                 /> 
              )
    }</View>               
            </View>
        )
    }
}

const styles = StyleSheet.create({ subContainer:{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' }, button:{ width:100, height:30, justifyContent:'center', alignItems:'center', backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8 } } })
