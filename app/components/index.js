/**
 * Components Entry file
 *
 * @flow
 */
import React, {Component} from "react";
import {StyleSheet, View, Navigator} from "react-native";
import {bindActionCreators} from "redux";
import * as actions from "../actions/actions";
import {connect} from "react-redux";
import Drawer from "react-native-drawer";
import Nav from "./global_widgets/nav";
import ControlPanel from "./controlPanel";
import COLORS from "../utils/values";
import Popup from "react-native-popup";
import DB from "../data";
import Home from "./home";
import Courses from "./courses";
import LoginPage from "./login";

// Import App Components

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
      let showLogin = u===null || u.length === 0;
      if (!showLogin) { this.props.actions.login(); }
      // this.setState({ showLogin: showLogin });
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

  _logoutHandler() {
    this.popup.confirm({
      title: 'Sign Out!',
      content: ['Are you sure?'],
      ok: {
        text: 'YES, SIGN OUT',
        style: {
          color: 'red'
        },
        callback: () => {
          this._closeControlPanel();

          DB.user.remove({}).then(() => {
            this.props.actions.logout();
          });
        }
      },
      cancel: {
        text: 'NO',
        style: {
          color: 'green'
        },
        callback: () => this._closeControlPanel()
      }
    });
  }

  render() {
    // const { state, actions } = this.props;

    return (
      <View style={{flex:1}}>
        <Drawer
         ref = "drawer"
         tapToClose={true}
         type="displace" // overlay / displace
         openDrawerOffset={0.2}
         panCloseMask={0.2}
         content={<ControlPanel {...this.props} logoutHandler = {() => this._logoutHandler() } onPress = {() => this._closeControlPanel()}/>}
        >
          <Nav {...this.props} pop = {() => this.refs.NAV} onPress = {() => this._openControlPanel() } style={styles.nav}  />
          <Navigator
            style={{flex: 1}}
            ref={'NAV'}
            initialRoute={{id: 'home', name: 'home'}}
            renderScene={this.renderScene.bind(this)}/>
        </Drawer>
        {/** Popup component */}
        <Popup ref={popup => this.popup = popup } isOverlay={true} />
        {/** or <Popup ref={popup => this.popup = popup } isOverlay={false} isOverlayClickClose={false}/> */}

        { !this.props.state.loggedIn ? <LoginPage {...this.props} hideForm={() => this._hideLogin() } /> : null }
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
