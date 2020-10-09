import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import { Text as TextR, View } from 'react-native';

class PieCharScreen extends React.PureComponent {
    constructor(props) {
        super(props);
      }
      
    render() {
        var numGraficGreen = 0;
        var numGraficGrey = 0;
        const per = this.props.parameter;
        var numberPercentual = parseInt(per); 
        if(numberPercentual <= 100){
            numGraficGreen = per;
            numGraficGrey = 100 - numGraficGreen - 10 ;    
        }else{
            numGraficGreen = 100;
            numGraficGrey = 0;    
        }
        const data = [
            {
                key: 1,
                amount: numGraficGrey,
                svg: { fill: '#929292' }, 
            },
            {
                key: 2,
                amount: numGraficGreen,
                svg: { fill: '#31AF43' }  
            },
            {
                key: 3,
                amount: 10,
                svg: { fill: '#FF0000' }   
            },
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
                        <Labels/>
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
