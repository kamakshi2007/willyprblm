
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class BookTransactionScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions : null,
            scanned : false,
            scannedData : "",
            buttonState : "normal",
        }
    }
 handleBarCodeScanner = async({type,data}) =>{
   this.setState({
     scanned : true,
     scannedData : data,
     buttonState : "normal"
   })
 }
 getCameraPermissions = async() =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions : status === "granted",
        buttonState : "clicked",
    })
}
  render() {
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    const hasCameraPermissions = this.state.hasCameraPermissions;
    if(buttonState==="clicked" && hasCameraPermissions){
       return(
         <BarCodeScanner
           onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanner}
           style = {StyleSheet.obsoluteFillObject}
          />
       )
    }else if (buttonState==="normal"){
      return (
        <View style={styles.container} >
          <Text>{hasCameraPermissions===true ? this.state.scannedData : "request for camera permition"} </Text>
          <TouchableOpacity 
          style = {styles.button} 
          onPress = {this.getCameraPermissions}>
              <Text>scan QR code</Text>
          </TouchableOpacity>
  
        </View>
      );
    }
    
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
      width: 200,
      height: 60,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
  },
  
});

