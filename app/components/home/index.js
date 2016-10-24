/**
 * @flow
 */
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  Text,
  View,
  TextInput
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'

import COLORS from '../../utils/values'
import API from '../../utils/urls'
import DB from '../../data'
import * as FeedTypes from './feedTypes'
import * as NewsFeed from './feedSchema'

let ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

type State = {
  datasource: ListView.DataSource,
  statusText: string,
  user: Object
};

export default class Index extends Component {
  state: State;
  setState: () => void;

  static propTypes = {
    state: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    navigator: React.PropTypes.object.isRequired,
    close: React.PropTypes.func
  };

  // Flow Annotation
  props: { state: Object, navigator: Object, actions: Object, close: func };

  constructor(props){
    super(props);

    this.state = {
      datasource: ds.cloneWithRows([]),
      statusText: "What's on your mind?",
      user: {}
    };

    DB.newsFeed.remove({
      where: {
        id: { neq: -1 }
      }
    }).then(() => {
      console.log('Rogue records removed');
      this.forceUpdate();
    });
  }

  componentDidMount() {
    this.props.actions.setNav(this.props.navigator);
    this.props.close();

    DB.newsFeed.find().then((feedsList) => {
      if (feedsList) {
        this.setState({ datasource: ds.cloneWithRows(feedsList) });
        console.log(feedsList);
      } else {
        console.log('No Feeds in DS');
      }

      var lastFeedDate = feedsList? feedsList[feedsList.length-1].date || 1 : 1;

      if (!feedsList) {
        // Make Request for NewsFeed Items
        DB.getUserAndHeaders((uH) => {
          const { user, headers } = uH;

          this.setState({ user: user });

          console.log('Fetch Newsfeed from remote');
          fetch([ API.newsFeedUrl, user.hashcode, lastFeedDate ].join('/'), { headers: headers })
              .then((r) => r.json())
              .then((feedsResponse) => {
                for (var feed:NewsFeed of feedsResponse.message) {
                  feed.id = feed._id;
                  feed._id = null;
                  DB.newsFeed.add(feed);
                }
                this.setState({ datasource: ds.cloneWithRows(feedsResponse.message) });
              });
        });
      }
    });
  }

  static feedItem(feed: NewsFeed) : Component {
    // return(
    //   <Image source={images[i]} resizeMode="stretch" style={styles.itemImage}>
    //     <View style={{justifyContent:'center', alignItems:'center', flex: 1, backgroundColor:'rgba(0,0,0,.35)'}}>
    //       <Text style={{backgroundColor:'rgba(0,0,0,0)', color:COLORS.white, fontSize:30, fontWeight:'700'}}>{val.actor_title}</Text>
    //       <Text style={{backgroundColor:'rgba(0,0,0,0)', color:COLORS.white,fontSize:14, fontWeight:'600'}}>{val.description}</Text>
    //     </View>
    //   </Image>
    // );
    switch (feed.tag) {
      case FeedTypes.STATUS_UPDATE:
        console.log('Returning for ', FeedTypes.STATUS_UPDATE);
        return (
          <TouchableOpacity style={styles.feedItem} onPress={() => null }>
            <View style={styles.feedRow}>
              <Image source ={{ uri : "https://source.unsplash.com/category/technology/60x60" }} resizeMode="contain" style={styles.feedImage} />
              <View style={styles.feedBox}>
                <View style={styles.feedTitle}>
                  <Text style={styles.feedTitleText}>{feed.actor_title}</Text>
                  <Text style={styles.feedTime}>{moment(feed.date).fromNow(true)}</Text>
                </View>
                <Text style={styles.feedDescription}>{feed.description}</Text>
                <View>
                  <TouchableOpacity style={styles.likeButton}>
                    <Icon name="favorite-border" size={16} color={COLORS.gray} />
                    <Text style={{color: COLORS.gray}}>{feed.likes.length}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      case FeedTypes.PROFILE_UPDATE:

        break;
      default:
        console.log('Returning for ', FeedTypes.OTHERS);
        return (
          <TouchableOpacity style={styles.feedItem} onPress={() => null }>
            <View style={styles.feedRow}>
              <Image source ={{ uri : "https://source.unsplash.com/category/technology/60x60" }} resizeMode="contain" style={styles.feedImage} />
              <View style={styles.feedBox}>
                <View style={styles.feedTitle}>
                  <Text style={styles.feedTitleText}>{feed.actor_title}</Text>
                  <Text style={styles.feedTime}>{moment(feed.date).fromNow(true)}</Text>
                </View>
                <Text style={styles.feedDescription}>
                  {feed.description.replace('[[y]]', feed.receiver_title).replace('[[x]]', feed.actor_title)}{feed.description.replace('[[y]]', feed.receiver_title).replace('[[x]]', feed.actor_title)}{feed.description.replace('[[y]]', feed.receiver_title).replace('[[x]]', feed.actor_title)}{feed.description.replace('[[y]]', feed.receiver_title).replace('[[x]]', feed.actor_title)}
                </Text>
                <View>
                  <TouchableOpacity style={styles.likeButton}>
                    <Icon name="favorite-border" size={16} color={COLORS.gray} />
                    <Text style={{color: COLORS.gray}}>{feed.likes.length}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
    }
  }

  updateStatusText(text) {
    this.setState({ statusText: text });
  }

  render() {
    // const { state, actions } = this.props;

    return (
      <View style={{flex:1}}>
        <View style={{flexDirection:'row', padding:5, backgroundColor: COLORS.white }}>
          <Image source ={{uri : this.props.state.userDeets.image}} resizeMode="contain" style={{margin:5, width:40, height:40, borderRadius:20}} />
          <View style ={{justifyContent:'center', margin:5, flex: 1}}>
            <TextInput numberOfLines={4} multiline={true} style={{ flex: 1, fontSize: 16 }} onChangeText={(text) => this.updateStatusText(text)} value={this.state.statusText} />
          </View>
          <TouchableOpacity style={styles.btnStatus}>
            <Icon name="send" size={18} color="#fff"/>
          </TouchableOpacity>
        </View>
        <View style={styles.announcementCard}>
          <Text style={styles.announcementTitle}>Notice of General meeting</Text>
          <Text style={styles.announcementBody}>There would be a general meeting on the 31st of October, 2016 at the Main Auditorium of the Primary Sciences College. Please be punctual</Text>
          <View style={styles.container2} />
          <Text style={styles.announcementMeta}>Announcer: Dr. John Ekpe</Text>
        </View>
        <ListView
            enableEmptySections={true}
            dataSource = {this.state.datasource} renderRow={(rowData) => Index.feedItem(rowData)} horizontal = {false} />
        {/*<TouchableOpacity style={{width:60, borderWidth:1, borderColor:'rgba(0,0,0,0.2)', alignItems:'center', justifyContent:'center', height:60, backgroundColor:COLORS.accent, borderRadius:30, position:'absolute', bottom:20, right:20}}>
          <Icon name="search" size={22} color="#fff"/>
        </TouchableOpacity>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    flex: 1
  },
  feedRow: {
    flexDirection: 'row',
    flex: 1
  },
  feedImage: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  feedBox: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column'
  },
  feedTitle: {
    flexDirection: 'row'
  },
  feedTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.blackText,
    flex: 9
  },
  feedTime: {
    flex: 3,
    color: COLORS.gray,
    fontWeight: '100',
    fontSize: 12,
    textAlign: 'right'
  },
  feedDescription: {
    paddingTop: 5,
    paddingBottom: 5,
    color: COLORS.blackText,
    fontWeight: '100',
    fontSize: 14
  },
  likeButton: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  itemImage: {
    flex: 1, height:220, margin:5, backgroundColor: COLORS.red
  },
  announcementCard: {
    padding: 15,
    marginTop: 5,
    backgroundColor: COLORS.accentDark,
    flexDirection: 'column'
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.white
  },
  announcementBody: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5
  },
  announcementMeta: {
    color: COLORS.white,
    fontSize: 10,
    textAlign: 'right',
    marginTop: 5
  },
  btnStatus: {
    width:40, margin: 5, alignItems:'center', justifyContent:'center', height:40, backgroundColor:COLORS.primaryDark, borderRadius:20
  },
  scroll: {
    flex:1,
    backgroundColor: COLORS.gray
  },
  container: {
    backgroundColor: COLORS.gray,
    height:300
  },
  container2: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider
  },
  title:{
    fontWeight:'400',
    fontSize:20,
    color:COLORS.blackText,
    margin:20,
    marginBottom:15
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  main: {
    fontSize: 25,
    textAlign: 'left',
    color:COLORS.white,
    fontWeight:'600',
    width:300,
    margin: 10,
    marginLeft:20,
    marginTop:30
  },
  instructions: {
    textAlign: 'center',
    color:COLORS.white,
    marginBottom: 5
  }
});
