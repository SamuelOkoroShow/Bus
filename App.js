import React from 'react';
import { Dimensions, UIManager,TouchableOpacity, StyleSheet, Text, LayoutAnimation, ListView, View } from 'react-native';
import Payload from './app/mock/payload'
var payload = Payload;

var {height, width} = Dimensions.get('window');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var full_segment = 330;
export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
            dataSource: ds.cloneWithRows(payload),
            playlist:[],
            segments:[],
            update_height:0
    }
  }

  componentDidUpdate(){
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  display(){
     
    this.setState({
       dataSource: ds.cloneWithRows(payload)
    })
  }

    update(data){
      this.setState({
        update_height:80
      })
    }

    uniques(arr){
  if (arr.length === 0) return arr;
  arr = arr.sort(function (a, b) { return a*1 - b*1; });
  var ret = [arr[0]];
  for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
    if (arr[i-1] !== arr[i]) {
      ret.push(arr[i]);
    }
  }
  return ret;
}



    close(data){
      
      for(var i=0; i< payload.length; i++){
          var payid
              if(data.id == payload[i].id)
                var payid = i
                //payload.splice(payload[i].id, 1);
              //console.log(data.id)
            }
            console.log(payid)
            payload.splice(payid, 1);
        this.setState({
          dataSource: ds.cloneWithRows(payload),
        })

}

hp_segment(){
        var health1,health2,health3;
        health1 = "#f96062"
        health2 = "#fbd34e"
        health3 = "#b7eb9b"
}


  _row(data){
    return(<View><View style={{margin:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} onPress = {() => this.update(data)}>
      <Text>   {data.id}  </Text>
      <Text>{data.name}</Text>
      <Text style={{color:'#d15571'}}>   {data.type}</Text>
      <Text>   {data.duration}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#333', padding:6, width:30,height:30, alignItems:'center', justifyContent:'center'}} onPress = {() => this.close(data)}>
      <Text style={{color:"#eeff"}}>x</Text>
      </TouchableOpacity>
      </View>
      <View style={{width:width, borderBottomWidth:1,height:3 }}>
      <View />
      </View>
      </View>)
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{height:this.state.update_height, marginTop:30}}></View>
        <ListView
        bounce = {false}

        dataSource = {this.state.dataSource}
        renderRow = {(rowData) => this._row(rowData)} 
        style= {{flex:9}}
        />
        <View style={{height:50,paddingTop:10, flexDirection:'row'}}>
        <TouchableOpacity style={{borderRadius:5, margin:3, backgroundColor:'#eee', alignItems:'center', justifyContent:'center', flex:1}}>
        <Text>Uniques</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.sort_descending(payload)} style={{borderRadius:5, margin:3, backgroundColor:'#d15571', alignItems:'center', justifyContent:'center', flex:1}}>
        <Text style={{color:'#fff'}}>Decending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.sort_ascending(payload)} style={{borderRadius:5, margin:3, backgroundColor:'#eee', alignItems:'center', justifyContent:'center', flex:1}}>
        <Text>Ascending</Text>
        </TouchableOpacity>
        <Text style={{color:'#eee', fontSize:8, top:0, backgroundColor:'#333', position:'absolute'}}>
        CHRONOLOGICAL
        </Text>
        </View>    
      </View>
    );
  }

  sort_ascending(points){
points.sort(function(a, b){
  a.id - b.id
});
  
  this.setState({
    dataSource: ds.cloneWithRows(points)
  })
  }

  sort_descending(points){
points.sort(function(a, b){
  b.id - a.id
});
  
  this.setState({
    dataSource: ds.cloneWithRows(points)
  })
  }
  oso(){

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
