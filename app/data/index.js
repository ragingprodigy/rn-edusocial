/**
 * Created by oladapo on 14/10/2016.
 * @flow
 */
'use strict';

import Store from 'react-native-store';

type Model = Store.model;

export default class DB {
  static user: Model = Store.model('user');
  static newsFeed: Model = Store.model('newsFeed');
  
  /**
   * Extract request headers from the DataStore
   * @param callback
   */
  static requestHeaders( callback: func ) {

    DB.user.find().then((u) => {
      let headers = {
        'token': u[0].token,
        'school-hashcode': u[0].message.school_hashcode
      };

      return callback(headers);
    });
  }
  
  /**
   * Fetch the User record from the DataStore
   * @param callback function
   */
  static getUser( callback: func ) {
    DB.user.find().then((u) => {
      return callback(u);
    });
  }
  
  /**
   * Fetch the User record from the DataStore
   * @param callback function
   */
  static getUserAndHeaders( callback: func ) {
    DB.user.find().then((u) => {
      if (u==null) { return {}; }
      
      return callback({
        user: u[0].message,
        headers: {
          'token': u[0].token,
          'school-hashcode': u[0].message.school_hashcode
        }
      });
    });
  }
}