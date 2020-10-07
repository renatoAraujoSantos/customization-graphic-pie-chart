import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import moment from 'moment';
import { MONTHS } from '../model/months';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import PieChart from '../pie-chart/PieChart'
import { Icon } from 'react-native-elements';


const IMAGE_FUNDO_GRAFICO = require('../../assets/fundoGrafico.png');

const placeholderMes = {
    label: 'Meses...',
    value: null,
    color: '#9EA0A4',
};

const placeholderAnos = {
    label: 'Anos...',
    value: null,
    color: '#9EA0A4',
};


const January = [
    {
        // data : [
        //     {rowNum: 1, dataBaixa: "22/01/2020", meta: "200", qtdContratos: 3, qtdPontos: 5},
        //     {rowNum: 2, dataBaixa: "23/01/2020", meta: "200", qtdContratos: 5, qtdPontos: 8},
        //     {rowNum: 3, dataBaixa: "24/01/2020", meta: "200", qtdContratos: 4, qtdPontos: 5},
        //     {rowNum: 4, dataBaixa: "25/01/2020", meta: "200", qtdContratos: 6, qtdPontos: 9},
        //     {rowNum: 5, dataBaixa: "27/01/2020", meta: "200", qtdContratos: 5, qtdPontos: 6},
        //     {rowNum: 6, dataBaixa: "28/01/2020", meta: "200", qtdContratos: 3, qtdPontos: 7},
        //     {rowNum: 7, dataBaixa: "29/01/2020", meta: "200", qtdContratos: 7, qtdPontos: 8}
        // ],
        rowNum: 1,
        mediaDiaria: 6.44,
        meta: 1,
        percentual: 80,
        pontos: 161,
        qtdContratos: 2,
        qtdPontos: 3,
        restantes: 39,
        total: 200,
    },
    {
        rowNum: 2,
        mediaDiaria: 9.44,
        meta: 2,
        percentual: 90,
        pontos: 161,
        qtdContratos: 2,
        qtdPontos: 3,
        restantes: 40,
        total: 200,

    }
]


export default function PieChartCustomization() {

    const [years, setYears] = React.useState([]);
    const [listaMesesCombo, setListaMesesCombo] = React.useState(MONTHS);
    const [mesSelecionado, setMesSelecionado] = React.useState('1');
    const [anoSelecionado, setAnoSelecionado] = React.useState('2014');
    const [percentual, setPercentual] = React.useState(10);

    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            const currentYearSt = moment().format("YYYY");
            var ys = [];
            var currentYearNun = parseInt(currentYearSt);
            for (let i = 2014; i <= currentYearNun; i++) {
                const s = [{
                    label: `${i}`,
                    value: `${i}`
                }];
                ys = ([...ys, ...s]);
            }
            setYears(ys);            
        }
        loadResourcesAndDataAsync();
    }, []);


    const changeMes = (mes) => {
        setMesSelecionado(mes);
    }

    const changeAno = (ano) => {
        setMesSelecionado(ano);
    }

    const listRender = () => {
        var check = false;
        var result = null;
        result = January.map((item, index) => {
            check = !check;
            return (
                <View key={item.rowNum} style={{ flexDirection: 'row', backgroundColor: check ? 'white' : '#ECECEC' }}>
                    <View style={{ flex: 0.3, justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', }}>
                                {item.dataBaixa}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.4, marginLeft: 10, justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', }} >
                                {item.qtdContratos}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', }}>
                        <View style={{ alignItems: 'center', marginRight: 10 }}>
                            <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', }} >
                                {item.qtdPontos}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        });
        return result;
    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ marginTop: 60, alignItems: 'center', backgroundColor: 'transparent', marginHorizontal: 10, borderRadius: 10, flexDirection: 'row', }} >
                    <View style={{ flexDirection: 'row', }}>
                        <ImageBackground style={{ flex: 1, flexDirection: 'row', }} imageStyle={{ borderRadius: 10 }} source={IMAGE_FUNDO_GRAFICO} >
                            <View style={{ flex: 0.2, justifyContent: 'space-around', }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, marginLeft: 20, color: 'white', fontWeight: 'bold', }}>
                                        10
                                                {/* {this.state.pontos} */}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, marginLeft: 20, color: 'white', }} >
                                        POINTS
                                </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, marginLeft: 20, color: 'white', fontWeight: 'bold', }}>
                                        20
                                                {/* {this.state.mediaDiaria} */}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, marginLeft: 20, color: 'white', }} >
                                        AVERAGE
                                </Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.6, alignItems: 'center' }}>
                                <View style={styles.renderCardContainerGrafico} >
                                    <PieChart percentual={percentual} />
                                </View>
                            </View>
                            <View style={{ flex: 0.2, justifyContent: 'space-around', }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, marginRight: 20, color: 'white', fontWeight: 'bold', }}>
                                        30
                                                {/* {this.state.restantes} */}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, marginRight: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', }} >
                                        REMAINING
                                </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, marginRight: 20, color: 'white', fontWeight: 'bold', }}>
                                        22
                                                {/* {this.state.total} */}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, marginRight: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', }} >
                                        TOTAL
                                </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 0, marginHorizontal: 10 }} >
                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 17, color: 'gray', fontWeight: 'bold', }}>
                                    {''}
                                </Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.4, marginLeft: 10, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 12, color: 'gray', fontWeight: 'bold' }}>MÊS</Text>
                                <RNPickerSelect
                                    placeholder={placeholderMes}
                                    items={listaMesesCombo}
                                    onValueChange={value => { changeMes(value) }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: { top: 10, right: 12, },
                                    }}
                                    value={mesSelecionado}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColorAndroid: 'transparent' }}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 0.4, justifyContent: 'center', }}>
                            <View style={{ alignItems: 'flex-start', marginRight: 10 }}>
                                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 12, color: 'gray', fontWeight: 'bold' }}>ANO</Text>
                                <RNPickerSelect
                                    placeholder={placeholderAnos}
                                    items={years}
                                    onValueChange={value => { changeAno(value) }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: { top: 10, right: 12, },
                                    }}
                                    value={anoSelecionado}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColorAndroid: 'transparent' }}
                                />
                            </View>
                        </View>

                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 30, marginTop: 5 }}>
                    <Icon name="circle" type="font-awesome" color="#31AF43" size={10} />
                    <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', fontSize: 10, color: 'gray', marginLeft: 5 }}>
                        EXECUTED
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 30, marginTop: 1 }}>
                    <Icon name="circle" type="font-awesome" color="#929292" size={10} />
                    <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', fontSize: 10, color: 'gray', marginLeft: 5 }}>
                        REMAINING
                    </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 0, marginHorizontal: 10 }} >
                    <View style={{ flexDirection: 'row', backgroundColor: '#0778B4' }}>
                        <View style={{ flex: 0.3, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold', }}>
                                    Data
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.4, marginLeft: 10, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold', }} >
                                    Contratos
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.3, justifyContent: 'center', }}>
                            <View style={{ alignItems: 'center', marginRight: 10 }}>
                                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold', }} >
                                    Produção
                                </Text>
                            </View>
                        </View>
                    </View>
                    {listRender()}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        marginTop: 20,
    },
    renderCardContainerGrafico: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 4,
        color: '#0778B4',
        fontWeight: 'bold',
        paddingRight: 30, // para garantir que o texto nunca fique atrás do ícone
        width: 130,
        backgroundColor: 'transparent'
    },
    inputAndroid: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 8,
        color: '#0778B4',
        fontWeight: 'bold',
        paddingRight: 30, // para garantir que o texto nunca fique atrás do ícone
        width: 130,
        backgroundColor: 'transparent'
    },
});
