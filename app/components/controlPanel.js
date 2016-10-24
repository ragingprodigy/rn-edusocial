import React, {Component} from "react";
import {View, ListView} from "react-native";
import EachComp from "./control_widgets/eachNav";
import Profile from "./control_widgets/userBlock";

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var eachNav = [
  {icon: "ios-home-outline", name:"Home", route:"home"},
  {icon: "logo-buffer", name:"My Courses", route:"courses"},
  {icon: "ios-book-outline", name:"Library", route:"library"},
  {icon: "ios-chatboxes-outline", name:"Chats", route:"chats"},
  {icon: "ios-people-outline", name:"Groups", route:"groups"},
  {icon: "logo-rss", name:"Blogs", route:"blogs"},
  {icon: "ios-help-buoy-outline", name:"Learning 4 Life", route:"lfl"},
  {icon: "ios-settings-outline", name:"Settings", route:"settings"},
  {icon: "ios-power-outline", name:"Logout", route:"logout"}
];

export default class Control extends Component {

  static PropTypes: Object = {
    actions: React.PropTypes.object.isRequired
  };

  constructor(props){
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(eachNav)
    };
  }

  render() {
    return (
        <View style={{ backgroundColor:'rgba(255,255,255,0.93)', flex:1 }}>
          <Profile {...this.props} />
          <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <EachComp logout={()=> this.props.logoutHandler() } icon = {rowData.icon} route = {rowData.route} {...this.props}>{rowData.name}</EachComp>} />
        </View>
    );
  }
}
