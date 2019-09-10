import React, {Component} from 'react';
import {
  View,
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import {getRankingList} from '../../actions/RankingActions';

import {connect} from 'react-redux';

import TouchableScale from 'react-native-touchable-scale';

import LinearGradient from 'react-native-linear-gradient';

import {ListItem} from 'react-native-elements';

renderItem = ({item}) => (
  <ListItem
    Component={TouchableScale}
    friction={90}
    tension={100}
    activeScale={0.95}
    linearGradientProps={{
      colors: ['#27408B', '#FF4500'],
    }}
    ViewComponent={LinearGradient}
    style={{margin: 5}}
    ///leftAvatar={{rounded: true, source: {uri: `${objeto.state.foto.uri}`}}}
    title={item.nome}
    titleStyle={{color: 'white', fontWeight: 'bold'}}
    subtitleStyle={{color: 'white'}}
    rightTitle={`${item.pizzas} pizzas`}
    rightTitleStyle={{color: 'white', fontWeight: 'bold'}}
    //chevron={{color: 'white'}}
  />
);

export class UserInfo extends Component {
  static navigationOptions = {
    title: 'Ranking',
  };
  constructor(props) {
    super(props);

    this.props.getRankingList();
  }

  render() {
    const {textRanking, viewTextRanking, view} = styles;
    return (
      <View style={view}>
        <View style={viewTextRanking}>
          <Text style={textRanking}>Ranking</Text>
        </View>
        <FlatList
          data={this.props.clientes}
          renderItem={item => renderItem(item, this)}
        />
      </View>
    );
  }
}

styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  viewTextRanking: {
    margin: 10,
    alignItems: 'center',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
  textRanking: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4500',
  },
});

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    clientes: state.rank.clientes,
  };
};

const UserInfoConnection = connect(
  mapStateToProps,
  {getRankingList},
)(UserInfo);

export default UserInfoConnection;
/*
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  viewListaRanking: {
    flex: 7,
  },
  textRanking: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  flat: {
    flex: 1,
  },
  viewTitulo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/
