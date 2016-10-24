/**
 * Created by oladapo on 13/10/2016.
 * @flow
 */
'use strict';

import React, { Component, PropTypes } from 'react'
import {
    StyleSheet,
    TouchableHighlight,
    // TouchableOpacity,
    ActivityIndicator,
    Text
} from 'react-native'

import COLORS from '../../utils/values'
import API from '../../utils/urls'
import * as Animatable from 'react-native-animatable'
import t from 'tcomb-form-native'

import DB from '../../data'

var Form = t.form.Form;
type State = { animating: boolean; };

// here we are: define your domain model
var Person = t.struct({
  username: t.String,
  password: t.String
});

var options = {
  fields: {
    password: {
      secureTextEntry: true,
      error: 'Please enter your password',
      placeholder: '********'
    },
    username: {
      error: 'Please enter your email address',
      label: 'Your Student Email Address',
      placeholder: 'your_name@school.edu.ng'
    }
  }
};

var values: {
  username: 'dapo@softcom.ng',
  password: 'password'
};

export default class LoginView extends Component {

  state: State;
  _loginForm: Form;
  _rootView: Animatable.View;

  setState: () => void;

  props: {
    hideForm: () => void,
  };

  static PropTypes = {
    hideForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this._loginForm = {};
    this.state = {
      animating: false
    };
  }

  _onPress () {
    var value = this._loginForm.getValue();
    if (value) { // if validation fails, value will be null

      this.setState({ animating: true });
      console.log('Doing Login');

      fetch(API.loginUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password
        })
      })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === true && responseData.new === false) {
          // Exchange Key for Token
          console.log('Exchange Key for Token');
          fetch(API.tokenUrl, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              key: responseData.key
            })
          }).then((response) => response.json()).then((tokenResponse) => {
            this.setState({animating: false});

            console.log('Token Response', tokenResponse);
            
            responseData.token = tokenResponse.message;
            DB.user.add(responseData).then(() => this._hideForm(responseData));
          }).done();
        } else {
          this.setState({animating: false});
        }
      })
      .catch((e) => {
        console.log('request Error', e);
        this.setState({ animating: false });
      })
      .done();
    }
  }

  _hideForm(data: Object) {
    this._rootView.slideOutDown(200);
    setTimeout(() => this.props.hideForm(data), 200);
  }

  render() {
    return (
      <Animatable.View ref={(v) => this._rootView = v } animation="slideInUp" style={ [styles.loginView] }>

        <Form ref={(f) => this._loginForm = f } type={Person} options={options} />

        <TouchableHighlight style={styles.button} onPress={this._onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>

        {/* <TouchableOpacity onPress={() => this._hideForm() }>
          <Text style={styles.formTitle}>Please Login</Text>
        </TouchableOpacity> */}

        <ActivityIndicator
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large"
        />

      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  loginView: {
    padding: 30,
    flex: 1, justifyContent:'center', backgroundColor: COLORS.accent, position:'absolute',
    top:0, right:0, left: 0, bottom: 0
  },
  formTitle: {
    color: COLORS.white,
    fontSize: 32
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    color: COLORS.white
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});