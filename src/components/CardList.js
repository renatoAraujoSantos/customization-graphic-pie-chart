import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { Icon } from 'react-native-elements';



export default function CardList(parametros) {
    
    console.log('22222222222', parametros);

    const key = parametros.props.rowNum
    
    const dataBaixa = parametros.props.dataBaixa;
    const meta = parametros.props.meta;
    const qtdContratos = parametros.props.qtdContratos;
    const qtdPontos = parametros.props.qtdPontos;
    const campoAdicionalQtdOs = parametros.props.campoAdicionalQtdOs;
    
    var check = false;    
    check = !check;
    return (
        

        // <View  style={{ flexDirection: 'row', backgroundColor: check ? 'white' : '#ECECEC' }}>
        <View key={key}  style={{ flexDirection: 'row', backgroundColor: '#ECECEC' }}>
        <View style={{ flex: 0.3, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', }}>
                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', }}>                    
                    {dataBaixa}
                </Text>
            </View>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', }}>
                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', }} >                    
                    {qtdContratos}
                </Text>
            </View>
        </View>
        <View style={{ flex: 0.3, justifyContent: 'center', }}>
            <View style={{ alignItems: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold', }} >                    
                    {qtdPontos}
                </Text>
            </View>
        </View>
    </View>

        
        // <View style={{marginTop: 5, marginBottom: 8, justifyContent: 'center', backgroundColor: cor, marginLeft: 10, marginRight: 10,  borderRadius: 10,  }} >
        //     <View style={{ justifyContent: 'center', backgroundColor: 'white',  marginLeft: 7, borderRadius: 10, }} >
        //         <View style={{ flexDirection: 'row', }}>

        //             <View style={{ flex: 0.1, justifyContent: 'center'}}>          
        //                 <View style={{alignItems: 'center',  }}>
        //                     <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 30, color: cor,  fontWeight: 'bold', }}>
        //                         {campoAdicionalQtdOs}
        //                     </Text>
        //                 </View>
        //             </View>

        //             <View style={{ flex: 0.4,  marginLeft: 10, justifyContent: 'center'}}>
        //                 <View style={{alignItems: 'flex-start',  }}>              
        //                     <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 18, color: cor,  fontWeight: 'bold', }} >
        //                         {numeroContratoUnic}
        //                     </Text>              
        //                 </View>
        //             <View style={{alignItems: 'flex-start',  }}>              
        //                 <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 9, color: 'gray',  fontWeight: 'bold', }} >
        //                     {textContrat}
        //                 </Text>              
        //             </View>            
        //             </View>  
                            
        //             <View style={{ flex: 0.4, justifyContent: 'center'}}>
        //                 <View style={{alignItems: 'flex-start', flexDirection: 'row', }}>
        //                     <Icon name="schedule" type="material" color="gray" size={20} />
        //                     <Text style={{ fontFamily: 'sourceSansPro-Regular', fontSize: 13, color: 'gray',  fontWeight: 'bold', }} >
        //                       {periodo}
        //                     </Text>              
        //                 </View>
        //             <View style={{alignItems: 'flex-start', flexDirection: 'row', }}>
        //                 <Icon name="room" type="material" color="gray" size={20} />
        //                 <Text style={{ fontFamily: 'montserrat-light', fontSize: 13, color: 'gray',  fontWeight: 'bold', }} >
        //                     {cidade}                            
        //                 </Text>              
        //             </View>            
        //             </View>  

        //             <View style={{ flex: 0.1, justifyContent: 'center',  }}>          
        //                 <View style={{alignItems: 'flex-end', marginRight: 10  }}>
        //                     <Icon name="caret-right" type="font-awesome" color="gray" size={25} />  
        //                 </View>
        //             </View>
                    
        //         </View>           
        //     </View>
        // </View>
        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
