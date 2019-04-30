import Nyuko from './nyuko'

export default class Index extends Component {
  constructor(props){
    super(props)
 
  }
 
  renderScene(route, navigator) {
    var {state,actions} = this.props;
    var routeId = route.id;

    if (routeId === 'nyuko') {
      return (
        <Nyuko
        {...this.props} 
        navigator={navigator} />
        );
    }
}

     render() {
    return (
      <View style={{flex:1}}>
     <Navigator
     style={{flex: 1}}
     ref={'NAV'}
     initialRoute={{id: 'nyuko', name: 'nyuko'}}
     renderScene={this.renderScene.bind(this)}/>
        </View>
    )
}


}