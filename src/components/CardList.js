import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CardList(parameters) {

    //    console.log('22222222222', parametros);

    const key = parameters.props.rowNum
    const dateLow = parameters.props.dateLow;
    const qtdContracts = parameters.props.qtdContracts;
    const qtdPoints = parameters.props.qtdPoints;
    const color = parameters.props.color;

    return (
        <View key={key} style={{ flexDirection: 'row', backgroundColor: color }}>
            <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={styles.titleLabel} >
                        {dateLow}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 0.4, marginLeft: 10, justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={styles.titleLabel} >
                        {qtdContracts}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 0.3, justifyContent: 'center', }}>
                <View style={{ alignItems: 'center', marginRight: 10 }}>
                    <Text style={styles.titleLabel} >
                        {qtdPoints}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleLabel: {
        fontSize: 16,
        color: 'gray',
        fontWeight: 'bold',
    }
});
