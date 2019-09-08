import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  ScroolView,
} from 'react-native';

export default class ModalAddPizzas extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {
      viewGeralModal,
      viewDentroDoModal,
      viewTextoAviso,
      textoAviso,
      tituloAviso,
      toAbrirModal,
      toFecharModal,
      textFecharModal,
      textAbrirModal,
    } = styles;
    return (
      <View style={viewGeralModal}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={viewDentroDoModal}>
            <View style={viewTextoAviso}>
              <Text style={tituloAviso}>ADICIONE UMA PIZZA</Text>

              <Text style={textoAviso}>
                Ao se cadastrar como prestador de serviços você estará
                automaticamente cadastrado como tomador de serviços
              </Text>

              <TouchableHighlight
                underlayColor={'#FF4500'}
                style={toFecharModal}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <Text style={textFecharModal}>Fechar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          underlayColor={'#FF4500'}
          style={toAbrirModal}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={textAbrirModal}>+</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewGeralModal: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toAbrirModal: {
    borderColor: '#27408B',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#fafafa',
  },
  textAbrirModal: {
    marginHorizontal: 12,
    marginVertical: 0,
    color: '#27408B',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
  viewDentroDoModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toFecharModal: {
    borderColor: '#f00',
    borderWidth: 3,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  viewTextoAviso: {
    //backgroundColor: 'rgba(255,255,255, 0.93)',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255,000,000,0.9)',
    borderWidth: 6,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  textFecharModal: {
    color: '#f00',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'FiraCode-Bold',
    fontSize: 20,
  },
  tituloAviso: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },
  textoAviso: {
    color: '#1f33c9',
    margin: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
