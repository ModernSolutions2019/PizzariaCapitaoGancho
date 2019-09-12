import React, {Components} from 'react';

import {View} from 'react-native';

import {connect} from 'react-redux';

import {adicionarPrestador} from '../../components/adicionarPrestador/index';

export const TornarPrestador extends Components {
	<View>
		<adicionarPrestador />
	</View>
}

const mapStateToProps = {

}

const connectionTornarPrestador = connect({
	mapStateToProps,
	{},
}(TornarPrestador)

export default connectionTornarPrestador;
