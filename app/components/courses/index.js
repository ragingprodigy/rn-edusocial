import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListView,
  Image,
  Text,
  TitleBar,
  View,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../../utils/values'

var i = -1;
var j = -1;

var courses = [{"id":1,"course_title":"Três Pontas","date_from":"9/21/2015","date_to":"1/3/2016"},
{"id":2,"course_title":"Dongxi","date_from":"10/30/2015","date_to":"2/28/2016"},
{"id":3,"course_title":"Gaoqiao","date_from":"4/28/2016","date_to":"9/10/2016"},
{"id":4,"course_title":"Redon","date_from":"10/11/2015","date_to":"7/27/2016"},
{"id":5,"course_title":"Rzepiennik Strzyżewski","date_from":"3/16/2016","date_to":"6/27/2016"},
{"id":6,"course_title":"Tugulym","date_from":"10/9/2015","date_to":"6/21/2016"},
{"id":7,"course_title":"Dagou","date_from":"7/17/2016","date_to":"9/24/2016"},
{"id":8,"course_title":"San Rafael","date_from":"2/5/2016","date_to":"1/18/2016"},
{"id":9,"course_title":"Wólka Pełkińska","date_from":"4/25/2016","date_to":"2/14/2016"},
{"id":10,"course_title":"Presnenskiy","date_from":"2/9/2016","date_to":"3/1/2016"}]

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Index extends Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
    close: React.PropTypes.func.isRequired
  };
  
  constructor(props) {
    super(props)

    this.state = {
      datasource: ds.cloneWithRows(courses)
    }
  }
  
  componentDidMount() {
    this.props.actions.setNav(this.props.navigator);
    this.props.close();
  }

  showCourse() {
    return
  }

  singleCourse (course) {
    return(
      <TouchableOpacity style={styles.row} onPress ={() => this.showCourse()}>
      	<Icon name ={'book'} size={26} color={COLORS.icon} style={styles.icon} />
        <View style={{flex:1, flexDirection: 'column', margin: 10, marginLeft: 0 }}>
          <Text style = {styles.text}>{course.course_title}</Text>
          <Text style = {styles.subText}>{course.date_from}</Text>
        </View>
    	</TouchableOpacity>
    )
  }

  render() {
    const { state, actions } = this.props;

    return (
      <View style={{flex:1}}>
        {/* <TitleBar name = "Trips" sub = "Almost time to pack your bags" /> */}
        <ListView dataSource={this.state.datasource} renderRow={(rowData) => this.singleCourse(rowData)} horizontal={false} />
        <TouchableOpacity style={styles.fab}>
          <Icon name="edit" size={22} color="#fff"/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    width:60, borderWidth:1, borderColor:'rgba(0,0,0,0.2)', alignItems:'center', justifyContent:'center', height:60, backgroundColor:COLORS.accent, borderRadius:30, position:'absolute', bottom:20, right:20
  },
  row: {
    flexDirection:'row',
    borderBottomColor: COLORS.divider,
    borderBottomWidth: 1,
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
