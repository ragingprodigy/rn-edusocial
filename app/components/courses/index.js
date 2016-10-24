/**
 * @flow
 */

import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, ListView, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DB from "../../data";
import * as Course from "./courseSchema";
import COLORS from "../../utils/values";

var courses = [];

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Index extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    close: React.PropTypes.func.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = { datasource: ds.cloneWithRows(courses) };
  }
  
  componentDidMount() {
    this.props.actions.setNav(this.props.navigator);
    this.props.actions.changeNavTitle({ title: 'Courses' });
    
    this.props.close();
    
    DB.getUser((u) => {
      let user = u[0].message;
      this.setState({ datasource: ds.cloneWithRows(user.courses) });
    });
  }

  showCourse() {
    return;
  }

  /**
   * Course List Row
   */
  singleCourse(course: Course): Component {
    return(
      <TouchableOpacity style={styles.row} onPress ={() => this.showCourse()}>
        <Icon name ={'book'} size={26} color={COLORS.icon} style={styles.icon} />
        <View style={{flex:1, flexDirection: 'column', margin: 10, marginLeft: 0 }}>
          <Text style = {styles.text}>{course.course_title}</Text>
          <Text style = {styles.subText}>{course.course_code}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    // const { state, actions } = this.props;

    return (
      <View style={{flex:1}}>
        {/* <TitleBar name = "Trips" sub = "Almost time to pack your bags" /> */}
        <ListView enableEmptySections={true} dataSource={this.state.datasource} renderRow={(rowData) => this.singleCourse(rowData)} horizontal={false} />
        <TouchableOpacity style={styles.fab}>
          <Icon name="edit" size={22} color="#fff"/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    width:50, borderWidth:1, borderColor:'rgba(0,0,0,0.2)', alignItems:'center', justifyContent:'center', height:50, backgroundColor:COLORS.accent, borderRadius:30, position:'absolute', bottom:20, right:20
  },
  row: {
    flexDirection:'row',
    borderBottomColor: COLORS.divider,
    borderBottomWidth: 1
  },
  logoutRow: {
    backgroundColor: COLORS.red
  },
  text: {
    marginTop: 4,
    fontSize:16,
    fontWeight:'500'
  },
  subText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '200'
  },
  whiteColor: {
    color: COLORS.white
  },
  icon: {
    margin:20
  }
});
