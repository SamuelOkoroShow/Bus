import React from 'react';
import { Dimensions,ScrollView, UIManager,TouchableOpacity, StyleSheet, Text, LayoutAnimation, ListView, View } from 'react-native';
import Payload from './app/mock/payload'
import Cat from './app/mock/categories'

var categories = Cat
var payload = Payload;
var payload2 = Payload

var day = 1
var dayCounter = 0;
var {height, width} = Dimensions.get('window');

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var full_segment = 630;
var counter = 0;
var segmentComplete = true;

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
            dataSource: ds.cloneWithRows(payload),
            dataSource2: ds.cloneWithRows(payload2),
            label:'CHRONOLOGICAL',
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
        update_height:140
      })
      setTimeout(this.setState({update_height:0}), 3000);
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
  _initSelected(){
    for(var i =0; i < payload.length; i++){
      payload[i].selected = false
    }
  }

 componentDidMount(){
    this._initSelected()
    payload[4].selected = true

    this.setState({
      dataSource: ds.cloneWithRows(payload),
    })
  }

    close(data){
      day = 1;
      for(var i=0; i< payload.length; i++){
          var payid
              if(data.id == payload[i].id)
                var payid = i
                //payload.splice(payload[i].id, 1);
              //console.log(data.id)
            }
            payload.splice(payid, 1);
        this.setState({
          dataSource: ds.cloneWithRows(payload),
        })

}

segment_color(seg){
        var health1,health2,health3;

        if(seg < 100){
          return "#f96062"
        }

        if(seg >= 100 && seg < 200){
          return "#fbd34e"
        }
        if(seg >= 200){
          return "#b7eb9b"
        }
}
 queue(){

  }

  deselect(){
    console.log("deselect")
    this._initSelected()
    this.setState({
      dataSource: ds.cloneWithRows(payload)
    })

  }

  _makeSelection(data){
    console.log("This function")
    this._initSelected();
    for(var i =0; i < payload.length; i++){
      if(payload[i].id == data.id){
        payload[i].selected = true
        console.log(payload[i])
      }
    }

    
    this.setState({
      dataSource : ds.cloneWithRows(payload)
    })

  }

  eachCat(name){

    if(this.state.update_height == 140){
      return(<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Sorry Nothing in Here</Text>
        <Text>Feature: Update Selected Unit</Text>
        </View>)
    }
    return(<View />)
    }

  _row(data){
    
    if(segmentComplete){
      counter = 0
    }
    counter = counter + data.duration
    segmentComplete = false
    var nextCount = 0;

    for(var i=0; i< payload.length; i++){
          var payid
              if(data.id == payload[i].id)
                if(payload[i+1] != null){
                nextCount = counter + payload[i+1].duration}
                //payload.splice(payload[i].id, 1);
              //console.log(data.id)
            }


    if(nextCount >= full_segment){
      
      segmentComplete = true;
      dayCounter++
      counter = counter + data.duration
    }

    if(dayCounter == 4){
      day++
      dayCounter = 0
    }


    if(segmentComplete){
      if(data.selected){
         return(<View><View style={{margin:5, flexDirection:'row',backgroundColor:'#333', borderRadius:5, justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity onPress = {() => this.deselect()} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color:'#eee'}}>   {data.id}  </Text>
          <Text style={{color:'#eee'}}>{data.name}</Text>
          <Text style={{color:'#fbd34e'}}>   {data.type}</Text>
          <Text style={{color:'#eee'}}>   {data.duration}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:5, backgroundColor:'#333', padding:6, width:30,height:30, alignItems:'center', justifyContent:'center'}} onPress = {() => this.close(data)}>
          <Text style={{color:"#fbd34e"}}>x</Text>
          </TouchableOpacity>
          </View>
          <View style={{width:((width*counter)/full_segment), borderBottomWidth:3, borderColor:this.segment_color(counter), height:1 }}/>
          <View style={{height:29, alignItems:'center', margin:5}}>
          <Text style={{padding:3,fontSize:11, color:'#fff', backgroundColor:"#f96062"}}>SEGMENT COMPLETE</Text>
          <Text style={{padding:3,fontSize:11, color:'#fff', backgroundColor:"#444"}}>Day:{day}</Text>
          </View>
          </View>)
      }
        return(<View><View style={{margin:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity onPress = {() => this.deselect()} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text>   {data.id}  </Text>
          <Text>{data.name}</Text>
          <Text style={{color:'#d15571'}}>   {data.type}</Text>
          <Text>   {data.duration}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#333', padding:6, width:30,height:30, alignItems:'center', justifyContent:'center'}} onPress = {() => this.close(data)}>
          <Text style={{color:"#eeff"}}>x</Text>
          </TouchableOpacity>
          </View>
          <View style={{width:((width*counter)/full_segment), borderBottomWidth:3, borderColor:this.segment_color(counter), height:1 }}/>
          <View style={{height:29, alignItems:'center', margin:5}}>
          <Text style={{padding:3,fontSize:11, color:'#fff', backgroundColor:"#f96062"}}>SEGMENT COMPLETE</Text>
          <Text style={{padding:3,fontSize:11, color:'#fff', backgroundColor:"#444"}}>Day:{day}</Text>
          </View>
          </View>)
      }

      if(data.selected){
         return(<View><View style={{margin:5, flexDirection:'row',backgroundColor:'#333', borderRadius:5, justifyContent:'space-between', alignItems:'center'}}>
          <TouchableOpacity onPress = {() => this.deselect()} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{color:'#eee'}}>   {data.id}  </Text>
          <Text style={{color:'#eee'}}>{data.name}</Text>
          <Text style={{color:'#fbd34e'}}>   {data.type}</Text>
          <Text style={{color:'#eee'}}>   {data.duration}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:5, backgroundColor:'#333', padding:6, width:30,height:30, alignItems:'center', justifyContent:'center'}} onPress = {() => this.close(data)}>
          <Text style={{color:"#fbd34e"}}>x</Text>
          </TouchableOpacity>
          </View>
          <View style={{width:((width*counter)/full_segment), borderBottomWidth:3, borderColor:this.segment_color(counter), height:1 }}/>
          </View>)
      }
    return(<View><View style={{margin:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <TouchableOpacity onPress = {() => this._makeSelection(data)} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Text>   {data.id}  </Text>
      <Text>{data.name}</Text>
      <Text style={{color:'#d15571'}}>   {data.type}</Text>
      <Text>   {data.duration}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#333', padding:6, width:30,height:30, alignItems:'center', justifyContent:'center'}} onPress = {() => this.close(data)}>
      <Text style={{color:"#eeff"}}>x</Text>
      </TouchableOpacity>
      </View>
      <View style={{width:((width*counter)/full_segment), borderBottomWidth:3, borderColor:this.segment_color(counter), height:1 }} />
      </View>) 

    
  }
  render()
  {
    return (
      <View style={styles.container}>
      <View 
      style={{height:this.state.update_height}}>
      {this.eachCat("Bro")}
      </View>
        <ListView
        bounce = {false}
        automaticallyAdjustContentInsets={false} 
        dataSource = {this.state.dataSource}
        renderRow = {(rowData) => this._row(rowData)} 
        style= {{flex:9}}
        />
        <View style={{height:50,paddingTop:10, flexDirection:'row'}}>
        <TouchableOpacity style={{borderRadius:5, margin:3, backgroundColor:'#eee', alignItems:'center', justifyContent:'center', flex:1}}>
        <Text>Updates</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.shuffle(payload)} style={{borderRadius:5, margin:3, backgroundColor:'#d15571', alignItems:'center', justifyContent:'center', flex:1}}>
        <Text style={{color:'#fff'}}>Shuffle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {() => this.powerShell(payload)} style={{borderRadius:5, margin:3, backgroundColor:'#eee', alignItems:'center', justifyContent:'center', flex:1}}>
        <Text>Restore</Text>
        </TouchableOpacity>
        <Text style={{color:'#eee', fontSize:8, top:0, backgroundColor:'#333', position:'absolute'}}>
        {this.state.label}
        </Text>
        </View>    
      </View>
    );
  }
shuffle(array) {
  day = 1;
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  this.setState({
    dataSource: ds.cloneWithRows(array),
    label:"RANDOMIZED"
  })
}


  powerShell(points){
    
 
   //console.log(powerShell)

}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:30
  },
});
