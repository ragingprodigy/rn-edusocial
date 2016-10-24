import React, {Component} from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../../utils/values";

export default class EachNav extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  onRoute() {
    this.props.state.navigator.replace({id:this.props.route})
  }

  render() {
    return(
      <TouchableOpacity style={[styles.row, this.props.route=='logout' && styles.logoutRow]} onPress ={() => this.onRoute()}>
        <Icon name ={this.props.icon} size={26} color={COLORS.icon} style={[styles.icon, this.props.route=='logout' && styles.whiteColor]} />
        <Text style = {[styles.text, this.props.route=='logout' && styles.whiteColor]}>{this.props.children.toUpperCase()}</Text>
      </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    borderBottomColor: COLORS.divider,
    borderBottomWidth: 1
  },
  logoutRow: {
    backgroundColor: COLORS.red
  },
  text: {
    fontSize:18,
    fontWeight:'300',
    marginTop:15,
    marginBottom: 15,
    marginRight: 20,
    marginLeft: 20
  },
  whiteColor: {
    color: COLORS.white
  },
  icon: {
    marginTop:15,
    marginBottom: 15,
    marginRight: 20,
    marginLeft: 40
  }
});
