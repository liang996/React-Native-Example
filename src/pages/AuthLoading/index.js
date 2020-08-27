import React from 'react';
import {
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {Flex, Loader, H3, Icon} from '@uiw/react-native';
import Global from '../../global.js';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    const {navigation, authToken} = this.props;
    if (navigation && Global) {
      Global.navigation = navigation;
    }
    authToken();
  }
  render() {
    const {token, loading, authState, children} = this.props;
    if (children && typeof children === 'function' && authState) {
      return children(token);
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../utils/img/t4.jpeg')}
          style={{flex: 1}}
        />
        <Loader
          loading={loading}
          maskColor="transtion"
          color="#9bbcdd"
          vertical
          rounded={5}
          tip={<Text style={{fontSize: 15}}>Verify login...</Text>}
        />
      </View>
    );
  }
}

export default connect(
  ({global, loading}) => ({
    token: global.token,
    authState: global.authState,
    loading: loading.effects.global.authToken,
  }),
  ({global}) => ({
    updateState: global.update,
    authToken: global.authToken,
  }),
)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9bbcdd',
  },
  header: {
    marginTop: 110,
  },
  title: {
    marginTop: 30,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
