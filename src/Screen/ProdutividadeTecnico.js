import React, { Component } from 'react';
import {View, ScrollView, StyleSheet, Text, Alert, ImageBackground} from 'react-native';
import _ from 'lodash';
import { Icon, Avatar, Button } from 'react-native-elements';
import moment from 'moment';
import GraficoProdutividade from '../../components/graficosHome/GraficoProdutividade';
import SnackBarPaper from '../../components/snackBar/SnackBarPaper';
import * as Api from '../../store/api/ApiSpring';
import Loader from '../../components/loading/Loader';
import * as ActionTypes from '../../constants/ActionTypes';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { ValidarUsuario } from '../../util/ValidarAutenticacaoUser';
import { MESES } from '../../model/InformacoesFixas';

const IMAGE_FUNDO_GRAFICO = require('../../../assets/images/fundoGrafico.png');

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

export default class ProdutividadeTecnico extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAutenticado: false,
            pontos: 0,
            mediaDiaria: 0,
            restantes: 0,
            total: 0,
            percentual: 0,
            listaProdutividade: [],
            listaAnosCombo: [],            
            mesSelecionado: '1',
            anoSelecionado: '2013',            
            visible: false,
            mensagem: '',
            mensagemDetalhe: '',
            listaMesesCombo: MESES,
            listaContratos: [],
            renderSnack: 0,
            loading: false,
            primeiraCargaTela: false,
            qtdContratos: 0,            
        };
    }
    async componentDidMount() {
        try {
            const { navigation } = this.props;
            this._unsubscribe = navigation.addListener('focus', async () => {

            //╔═════════════ VERIFICANDO SE O USUARIO ESTA AUTENTICADO E TEM PERMISSAO PARA ACESSAR ESSA TELA  ════════════════════════╗
                try { 
                    this.setState({ loading: true });
                    const autenticado = await ValidarUsuario();                    
                    if(autenticado != ActionTypes.SUCESSO_NA_REQUISICAO){
                        this.props.navigation.navigate('Login');
                        this.setState({ loading: false });
                        return;
                    }else{
                        this.setState({ loading: false });
                        this.setState({ isAutenticado: true });
                    }
                } catch (error) {
                    this.setState({ loading: false });
                    console.log('Error na classe ProdutividadeTecnico metodo componentDidMount ao tentar revalidar usuario ', error);
                    this.props.navigation.navigate('Login');
                    return;
                }
            //╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

                const anoCorrente = moment().format("YYYY");                
                const mes = moment().format("MM"); 
                var sss = [];
                var numberAnoC = parseInt(anoCorrente);                
                for (let i=2014; i <= numberAnoC; i++) {
                    const s = [{
                        label: `${i}`,
                        value: `${i}`                
                    }];                    
                    sss = ([...sss, ...s]);                    
                }
                await new Promise(resolve => {resolve(   this.setState({listaAnosCombo: sss})   )});
                                
                const mesCorrente = mes.replace('0','');
                await new Promise(resolve => {resolve(   this.setState({anoSelecionado: anoCorrente})   )});
                await new Promise(resolve => {resolve(   this.setState({mesSelecionado: mesCorrente})   )});
                await this.requestProdutividadeTecnico();           
            });            
        } catch (e) {
            this.setState({ loading: false });
            console.log('Deu erro no componentDidMount da classe ProdutividadeTecnico ', e);
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    
    requestProdutividadeTecnico = async () => {
        try {            
            this.setState({ loading: true });
            const ano =  await new Promise(resolve => {resolve(   this.state.anoSelecionado   )});
            var mes =  await new Promise(resolve => {resolve(   this.state.mesSelecionado   )});

            const response = await Api.getAll(`sqlProdutividade?ano=${ano}&mes=${mes}&codPessoa=221923`, `GET`);
            console.log('reponse changeMes ************************************', response);
            await new Promise(resolve => {resolve(   this.setState({primeiraCargaTela: true})   )});
            if (response.numeroStatusResposta === ActionTypes.SUCESSO_NA_REQUISICAO) {
                const prodit = response.respostaRequisicao.data[0];

                if(prodit.listaSqlProdutividade.length === 0){
                    this.setState({pontos: 0});
                    this.setState({mediaDiaria: 0});
                    this.setState({restantes: 0});
                    this.setState({total: 0});
                    this.setState({percentual: 0});
                    this.setState({listaProdutividade: [] });                
                    this.setState({ loading: false });
    
                    Alert.alert('Periodo sem regitgro');
                    this.setState({ loading: false });
                    return;
                }

                const mediaD = Number(prodit.mediaDiaria).toFixed(1); 
                const mediaDiariaFormatado = mediaD.replace('.',',');

                this.setState({pontos: prodit.pontos});
                this.setState({mediaDiaria: mediaDiariaFormatado});
                this.setState({restantes: prodit.restantes});
                this.setState({total: prodit.total});
                this.setState({percentual: prodit.percentual});
                this.setState({listaProdutividade: prodit.listaSqlProdutividade});                
                this.setState({ loading: false });

            } else if (response.numeroStatusResposta === ActionTypes.PARAMETROS_DE_ENVIO_INCORRETOS) {
                await new Promise(resolve => { resolve(this.setState({ mensagem: 'Informações incorretas' })) });
                await new Promise(resolve => { resolve(this.setState({ mensagemDetalhe: 'Verifique os dados informados e tente novamente' })) });
                this.setState({ loading: false });
                this.alertMenssagem2();
            } else if (response.numeroStatusResposta === ActionTypes.TIME_OUT_BACK_END) {
                await new Promise(resolve => { resolve(this.setState({ mensagem: 'Sem comunicação com servidor' })) });
                await new Promise(resolve => { resolve(this.setState({ mensagemDetalhe: 'Favor tentar mais tarde' })) });
                this.setState({ loading: false });
                this.mensagemSnackBar();
            } else if (response.numeroStatusResposta === ActionTypes.SEM_CONEXAO_COM_INTERNET) {
                await new Promise(resolve => { resolve(this.setState({ mensagem: 'Sem Conexão com a Internet' })) });
                await new Promise(resolve => { resolve(this.setState({ mensagemDetalhe: 'Favor Verificar sua Conexão' })) });
                this.setState({ loading: false });
                this.mensagemSnackBar();
            } else {
                await new Promise(resolve => { resolve(this.setState({ mensagem: 'Erro não esperdo' })) });
                await new Promise(resolve => { resolve(this.setState({ mensagemDetalhe: 'Favor entrar em contato com seu gestor!' })) });
                this.setState({ loading: false });
                this.mensagemSnackBar();
            }            

        } catch (error) {
            console.log('Erro na classe ProdutividadeTecnico metodo requestProdutividadeTecnico', error);
            this.setState({ loading: false });
        }
    }

    mensagemSnackBar = () => {
        this.setState({ visible: true });
        const xxdr = this.state.renderSnack;
        this.setState({ renderSnack: xxdr + 1 });
    };

    alertMenssagem2 = () => {
        this.setState({ loading: false });
        const mensagemPrincipal = this.state.mensagem;
        const mensagemDetalhes = this.state.mensagemDetalhe;
        Alert.alert(
            mensagemPrincipal,
            mensagemDetalhes,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    };

    changeMes = async (mes) => {
        await new Promise(resolve => {resolve(   this.setState({mesSelecionado: mes})   )});

        const a =  await new Promise(resolve => {resolve(   this.state.anoSelecionado   )});        
        const xx = await new Promise(resolve => {resolve(   this.state.primeiraCargaTela   )});        
        if(!xx){            
            return;
        }else if(mes === null || a === null){
            Alert.alert('Período Inválido');            
            return;        
        }else{            
            await this.requestProdutividadeTecnico();
        }        
    }

    changeAno = async (ano) => {
        await new Promise(resolve => {resolve(   this.setState({anoSelecionado: ano})   )});
        const m =  await new Promise(resolve => {resolve(   this.state.mesSelecionado   )});
        const xx = await new Promise(resolve => {resolve(   this.state.primeiraCargaTela   )});        
        if(!xx){            
            return;
        }else if(ano === null || m === null){
            Alert.alert('Período Inválido');            
            return;        
        }else{            
            await this.requestProdutividadeTecnico();
        }
    }

    listProdutividadeRender = () => {        
        var check = false;        
        var result = null;
        result = this.state.listaProdutividade.map((item, index) => {
            check = !check;
            return (
                <View key={item.rowNum} style={{ flexDirection: 'row', backgroundColor: check? 'white': '#ECECEC'}}>
                    <View style={{ flex: 0.3, justifyContent: 'center'}}>          
                        <View style={{alignItems: 'center',  }}>
                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 16, color: 'gray',  fontWeight: 'bold', }}>
                                {item.dataBaixa}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.4,  marginLeft: 10, justifyContent: 'center'}}>
                        <View style={{alignItems: 'center',  }}>              
                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 16, color: 'gray',  fontWeight: 'bold', }} >
                                {item.qtdContratos}
                            </Text>              
                        </View>            
                    </View>                                                                          
                    <View style={{ flex: 0.3, justifyContent: 'center',  }}>                      
                        <View style={{alignItems: 'center', marginRight: 10 }}>
                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 16, color: 'gray',  fontWeight: 'bold', }} >
                                {item.qtdPontos}
                            </Text>              
                        </View>                    
                    </View>                                    
                </View>           
            )
        });
        return result;
    }


    render() {
        const { isAutenticado, renderSnack, mensagem, visible, mesSelecionado, anoSelecionado, listaMesesCombo, listaAnosCombo } = this.state;
        if (!this.state.listaContratos.length === 0 && isAutenticado) {
            return (
                <View style={styles.containerLoading}>
                    <Loader loading={this.state.loading} />
                </View>
            );
        } else {

            return (

                <View style={{ flex: 1,  marginTop: 20 }}>
                    <Loader loading={this.state.loading} />
                    <ScrollView>
                        <View style={{ marginTop: 60, alignItems: 'center', backgroundColor: 'transparent', marginHorizontal: 10, borderRadius: 10, }} >
                            <View style={{ flexDirection: 'row', }}>
                                <ImageBackground style={{ flex: 1, flexDirection: 'row', }} imageStyle={{ borderRadius: 10 }} source={IMAGE_FUNDO_GRAFICO} >
                                    <View style={{ flex: 0.2, justifyContent: 'space-around', }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 22, marginLeft: 20, color: 'white', fontWeight: 'bold', }}>
                                                {this.state.pontos}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 10, marginLeft: 20, color: 'white', }} >
                                                PONTOS
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 22, marginLeft: 20, color: 'white', fontWeight: 'bold', }}>
                                                {this.state.mediaDiaria}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 10, marginLeft: 20, color: 'white', }} >
                                                MÉDIA DIÁRIA
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.6, alignItems: 'center' }}>
                                        <View style={styles.renderCardContainerGrafico} >
                                            <GraficoProdutividade percentual={this.state.percentual}/>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.2, justifyContent: 'space-around', }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 22, marginRight: 20, color: 'white', fontWeight: 'bold', }}>
                                                {this.state.restantes}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 10, marginRight: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', }} >
                                                RESTANTES
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 22, marginRight: 20, color: 'white', fontWeight: 'bold', }}>
                                                {this.state.total}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 10, marginRight: 10, color: 'white', textAlign: 'center', textAlignVertical: 'center', }} >
                                                TOTAL
                                            </Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 30, marginTop: 5 }}>
                            <Icon name="circle" type="font-awesome" color="#31AF43" size={10} />
                            <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', fontFamily: 'sourceSansPro-Regular', fontSize: 10, color: 'gray', marginLeft: 5 }}>
                                EXECUTADOS
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 30, marginTop: 1 }}>
                            <Icon name="circle" type="font-awesome" color="#929292" size={10} />
                            <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', fontFamily: 'sourceSansPro-Regular', fontSize: 10, color: 'gray', marginLeft: 5 }}>
                                RESTANTE
                            </Text>
                        </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 0, marginHorizontal: 10 }} >
                                <View style={{ flexDirection: 'row', backgroundColor: 'transparent'}}>
                                    <View style={{ flex: 0.2, justifyContent: 'center'}}>          
                                        <View style={{alignItems: 'center',  }}>
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 17, color: 'gray',  fontWeight: 'bold', }}>
                                                {''}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.4,  marginLeft: 10, justifyContent: 'center'}}>
                                        <View style={{alignItems: 'flex-start',  }}>  
                                        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 12, color: 'gray', fontWeight: 'bold' }}>MÊS</Text>
                                            <RNPickerSelect
                                                placeholder={placeholderMes}                                                
                                                items={listaMesesCombo}
                                                onValueChange={value => { this.changeMes(value) }}
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
                                    <View style={{ flex: 0.4, justifyContent: 'center',  }}>                      
                                        <View style={{alignItems: 'flex-start', marginRight: 10 }}>
                                        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 12, color: 'gray', fontWeight: 'bold' }}>ANO</Text>
                                        <RNPickerSelect
                                                placeholder={placeholderAnos}                                                
                                                items={listaAnosCombo}
                                                onValueChange={value => { this.changeAno(value) }}
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
                        
                            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 0, marginHorizontal: 10 }} >
                                <View style={{ flexDirection: 'row', backgroundColor: '#0778B4'}}>
                                    <View style={{ flex: 0.3, justifyContent: 'center'}}>          
                                        <View style={{alignItems: 'center',  }}>
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 17, color: 'white',  fontWeight: 'bold', }}>
                                                Data
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 0.4,  marginLeft: 10, justifyContent: 'center'}}>
                                        <View style={{alignItems: 'center',  }}>              
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 17, color: 'white',  fontWeight: 'bold', }} >
                                                Contratos
                                            </Text>              
                                        </View>            
                                    </View>                                                                          
                                    <View style={{ flex: 0.3, justifyContent: 'center',  }}>                      
                                        <View style={{alignItems: 'center', marginRight: 10 }}>
                                            <Text style={{ fontFamily: 'montserrat-light', fontSize: 17, color: 'white',  fontWeight: 'bold', }} >
                                                Produção
                                            </Text>              
                                        </View>                    
                                    </View>                                    
                                </View>    
                                {this.listProdutividadeRender()}
                            </View>                                                
                    </ScrollView>
                    <SnackBarPaper key={renderSnack} title={mensagem} tintColor="blue" openSnack={visible} />                    
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    container1: {
        padding: 15,
        justifyContent: 'center',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    renderCardContainerGrafico: {
        width: 110,
        height: 110,
        borderRadius: 55, // metade da largura da imagem  
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textRota: {
        fontFamily: 'montserrat-light',
        fontSize: 18,
        marginLeft: 18,
        color: 'gray',
        fontWeight: 'bold',   // negrito.
        marginTop: 20,
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

