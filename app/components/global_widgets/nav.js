import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../utils/values";

export default class Nav extends Component {
  static propTypes = {
    state: React.PropTypes.object.isRequired,
    onPress: React.PropTypes.func.isRequired
  };
  
  constructor(props) {
    super(props);
  }

  menu() {
    if(this.props.state.navProps.type == "menu"){
      this.props.onPress();
    } else if(this.props.state.navProps.type == "pop"){
      this.props.state.navigator.replace({id:'courses'});
    }
  }
  render() {
    return (
      <TouchableOpacity onPress ={() => this.menu()}>
        <View style= {styles.navBar}>
          <Icon color={this.props.state.navStyle.color} name={this.props.state.navProps.icon} size={26} />
          <Text style={styles.pageTitle}>{this.props.state.navTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDark
  },
  pageTitle: {
    alignSelf:'center',
    marginLeft:10,
    fontWeight:'600',
    color:COLORS.white,
    fontSize:20
  }
});
