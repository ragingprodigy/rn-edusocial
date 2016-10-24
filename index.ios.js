/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
const _XHR = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

XMLHttpRequest = _XHR;

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import EduSocial from './app/container'

class EduSocial_RN extends Component {
  render() {
    return (
      <EduSocial />
    );
  }
}

AppRegistry.registerComponent('EduSocial_RN', () => EduSocial_RN);
