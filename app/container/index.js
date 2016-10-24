import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from '../reducers'
import Components from '../components/index'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)


export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar barStyle="light-content"/>
        <Provider store={store}>
          <Components />
        </Provider>
      </View>
    )
  }
}
