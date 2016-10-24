/**
 * Components Entry file
 *
 * @flow
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Navigator
} from 'react-native'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/actions'
import { connect } from 'react-redux'

import Drawer from 'react-native-drawer'
import Nav from './global_widgets/nav'
import ControlPanel from './controlPanel'
import COLORS from '../utils/values'
import DB from '../data'

// Import App Components
import Home from './home'
import Courses from './courses'
import LoginPage from './login'

var drawerRef = {
  close: () => null,
  open: () => null
};

// connect( state => ({ state: state.seven }) );

class Root extends Component {
  setState: () => void;

  static PropTypes = {
    state: React.PropTypes.object,
    actions: React.PropTypes.object
  };
  props: {
    state: Object,
    actions: Object
  };

  constructor(props){
    super(props);
    this.state = {
      showLogin: false
    };
  }

  componentDidMount() {
    drawerRef = this.refs.drawer;
  }

  componentWillMount() {
    DB.getUser((u) => {
      console.log('Signed in as ', u);
      this.setState({ showLogin: u===null || u.length === 0 });
    });
  }

  _closeControlPanel(){
    drawerRef.close()
  }
  _openControlPanel(){
    drawerRef.open()
  }

  _hideLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });

    this.forceUpdate();
  }

  renderScene(route, navigator) {
    // var {state,actions} = this.props;
    
    var routeId = route.id;

    switch (routeId) {
      case 'courses':
        return (
          <Courses
            {...this.props}
            userData ={route.userData}
            close = {() => this._closeControlPanel()}
            navigator={navigator} />
        );
      default:
        return (
          <Home
            {...this.props}
            userData ={route.userData}
            close = {() => this._closeControlPanel()}
            navigator={navigator} />
        );
    }
  }

  render() {
    // const { state, actions } = this.props;
    console.log('Called at ', new Date());

    return (
      <View style={{flex:1}}>
        <Drawer
         ref = "drawer"
         tapToClose={true}
         type="displace" // overlay / displace
         openDrawerOffset={0.2}
         panCloseMask={0.2}
         content={<ControlPanel {...this.props} onPress = {() => this._closeControlPanel()}/>}
        >
          <Nav {...this.props} pop = {() => this.refs.NAV} onPress = {() => this._openControlPanel() } style={styles.nav}  />
          <Navigator
            style={{flex: 1}}
            ref={'NAV'}
            initialRoute={{id: 'home', name: 'home'}}
            renderScene={this.renderScene.bind(this)}/>
        </Drawer>
        { this.state.showLogin ? <LoginPage {...this.props} hideForm={() => this._hideLogin() } /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: COLORS.primaryDark
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: COLORS.white
  },
  instructions: {
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 5
  }
});

export default connect(state => ({
  state: state.edusocial
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Root);
