import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ListView, View } from 'react-native';
import payload from './app/mock/payload'


// Premium Ads - each premium ad should be shown 60 times a day (minimum)
// VMFresh Content - should play at least once in every 4 hours
// VM Ads (teaser video) & plugs - should come in between videos sparringly but not more than 5 times in a segment
// ConnectNigeria - should come up 30 times a day
// Sports content - for Long videos should show 6 times in 4hrs | Medium length videos whould show 10 times in 4hrs | Short videos should show 15 times in 4hrs
// Other videos can be spread around evenly

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
            dataSource: ds.cloneWithRows(payload),
            playlist:[],
            segments:[]
    }
  }

    update(data){

    }

    close(data){

    }
  _row(data){
    return(<View style={{margin:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} onPress = {() => this.update(data)}>
      <Text>   {data.id}  </Text>
      <Text>{data.name}</Text>
      <Text style={{color:'#d15571'}}>   {data.type}</Text>
      <Text>   {data.duration}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignITebackgroundColor:'#eee', padding:6, paddingTop:2, paddingBottom:2, margin:5}} onPress = {() => this.close(data)}>
      <Text>x</Text>
      </TouchableOpacity>
      </View>)
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
        bounce = {false}
        dataSource = {this.state.dataSource}
        renderRow = {(rowData) => this._row(rowData)} 
        style= {{flex:9}}
        />
        <View style={{height:70,}}>
        <TouchableOpacity style={{margin:3, bacgroundColor:'#d15571', flex:1}}></TouchableOpacity>
        </View>    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
