import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { Text as TextR, View, Dimensions } from 'react-native';

class PieCharScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          selectedSlice: {
            label: '',
            value: 0,
            numeroGraficoVerde: 0,
            numeroGraficoCinza: 0,
          },
          labelWidth: 0
        }
      }
      
      async componentDidMount() {
        await new Promise(resolve => {resolve(   this.setState({numeroGraficoVerde: this.props})   )});
      }

    render() {
        var numGraficVerde = 0;
        var numGraficCinza = 0;
        const per = this.props.percentual;
        var numberPercentual = parseInt(per); 
        if(numberPercentual <= 100){
            numGraficVerde = per;
            numGraficCinza = 100 - numGraficVerde ;    
        }else{
            numGraficVerde = 100;
            numGraficCinza = 0;    
        }
        const data = [
            {
                key: 1,
                amount: numGraficCinza,
                svg: { fill: '#929292' },   // cinza
            },
            {
                key: 2,
                amount: numGraficVerde,
                svg: { fill: '#31AF43' }    // verde
            },
            // {
            //     key: 3,
            //     amount: 40,
            //     svg: { fill: '#0778B4' }    // azul
            // },
            // {
            //     key: 4,
            //     amount: 95,
            //     svg: { fill: '#d966ff' }
            // },
            // {
            //     key: 5,
            //     amount: 35,
            //     svg: { fill: '#ecb3ff' }
            // }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <View style={{height: 200, width: 200, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
                    <PieChart
                        style={{ height: 200, width: 200 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={'85%'}
                    >
                        {/* <Labels/> */}
                    </PieChart>
                    
                    <View style={{ position: 'absolute',  }}>
                        <View style={{ flexDirection: 'row',  justifyContent: 'center', }}>
                            <TextR style={{  textAlign: 'center',  fontSize: 40, color: '#15CFCA', fontWeight: 'bold', }}>  
                                {per? per: 0}
                            </TextR>                        
                            <TextR style={{  textAlign: 'center', textAlignVertical: 'bottom',  fontSize: 13, color: 'gray', marginBottom: 5, }}>  
                                %                                                           
                            </TextR>   
                        </View>  
                        <View style={{ flexDirection: 'row',  justifyContent: 'center', }}>
                            <TextR style={{  textAlign: 'center', textAlignVertical: 'bottom',  fontSize: 13, color: 'gray', }}>  
                                GOAL
                            </TextR>   
                        </View>  
                    </View>
                </View>
            </View>
        )
    }

}

export default PieCharScreen
