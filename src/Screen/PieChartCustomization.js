import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import moment from 'moment';
import { MONTHS, JANUARY, placeholderM, placeholderY } from '../components/model/MonthsAndYears';
import RNPickerSelect from 'react-native-picker-select';
import PieChart from '../components/pie-chart/PieChart'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CardList from '../components/CardList'

export default function PieChartCustomization() {

    const [years, setYears] = React.useState([]);    
    const [listMonths, setListMonths] = React.useState(MONTHS);
    const [selectedMonth, setSelectedMonth] = React.useState('1');
    const [selectedYear, setSelectedYear] = React.useState('2014');
    const [percentage, setPercentage] = React.useState(60);

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


    const changeM = (m) => {
        setSelectedMonth(m);
        //insert your action here
    }

    const changeY = (y) => {
        setSelectedYear(y);
        //insert your action here
    }

    const listRender = () => {
        var result = null;
        result = JANUARY.map((item, index) => {
            return (
                <CardList props={item} key={item.rowNum} />
            )
        });
        return result;
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ marginTop: 80, alignItems: 'center', backgroundColor: 'transparent', marginHorizontal: 10, borderRadius: 10, flexDirection: 'row', }} >
                    <View style={{ flexDirection: 'row', }}>
                        <ImageBackground style={{ flex: 1, flexDirection: 'row', }} imageStyle={{ borderRadius: 10 }} source={require('../../assets/fundoGrafico.png')} >
                            <View style={{ flex: 0.2, justifyContent: 'space-around', }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.subtitleLeft}>
                                        10
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, marginLeft: 20, color: 'white', }} >
                                        POINTS
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.subtitleLeft}>
                                        20
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
                                    <PieChart parameter={percentage} />
                                </View>
                            </View>
                            <View style={{ flex: 0.2, justifyContent: 'space-around', }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 22, marginRight: 20, color: 'white', fontWeight: 'bold', }}>
                                        30
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

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 30, marginTop: 25 }}>                    
                    <FontAwesome name="circle" size={10} color="#31AF43" />
                    <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', fontSize: 10, color: 'gray', marginLeft: 5 }}>
                        EXECUTED
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 30, marginTop: 1 }}>                    
                    <FontAwesome name="circle" size={10} color="#929292" />
                    <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', fontSize: 10, color: 'gray', marginLeft: 5 }}>
                        REMAINING
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 30, marginTop: 1 }}>                                        
                    <FontAwesome name="circle" size={10} color="#FF0000" />
                    <Text style={{ textAlign: 'center', textAlignVertical: 'bottom', fontSize: 10, color: 'gray', marginLeft: 5 }}>
                        CANCELED
                    </Text>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 0, marginHorizontal: 10, marginTop: 40 }} >
                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
                        <View style={{ flex: 0.6, marginLeft: 30, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'flex-start', }}>
                                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 12, color: 'gray', fontWeight: 'bold' }}>MONTHS</Text>
                                <RNPickerSelect
                                    placeholder={placeholderM}
                                    items={listMonths}
                                    onValueChange={value => { changeM(value) }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: { top: 10, right: 12, },
                                    }}
                                    value={selectedMonth}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColorAndroid: 'transparent' }}
                                    Icon={() => {
                                        return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 0.4, justifyContent: 'center', }}>
                            <View style={{ alignItems: 'flex-start', marginRight: 10 }}>
                                <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 12, color: 'gray', fontWeight: 'bold' }}>YEARS</Text>
                                <RNPickerSelect
                                    placeholder={placeholderY}
                                    items={years}
                                    onValueChange={value => { changeY(value) }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: { top: 10, right: 12, },
                                    }}
                                    value={selectedYear}
                                    useNativeAndroidPickerStyle={false}
                                    textInputProps={{ underlineColorAndroid: 'transparent' }}
                                    Icon={() => {
                                        return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 0, marginHorizontal: 10, marginTop: 20 }} >
                    <View style={{ flexDirection: 'row', backgroundColor: '#0778B4' }}>
                        <View style={{ flex: 0.3, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold', }}>
                                    Date
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.4, marginLeft: 10, justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold', }} >
                                    Contracts
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.3, justifyContent: 'center', }}>
                            <View style={{ alignItems: 'center', marginRight: 10 }}>
                                <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold', }} >
                                    Production
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
    subtitleLeft: {
        fontSize: 22, 
        marginLeft: 20, 
        color: 'white', 
        fontWeight: 'bold'
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 4,
        color: '#0778B4',
        fontWeight: 'bold',
        paddingRight: 30, // para garantir que o texto nunca fique atrás do ícone
        width: 130,        
    },
    inputAndroid: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 8,
        color: '#0778B4',
        fontWeight: 'bold',
        paddingRight: 30, // para garantir que o texto nunca fique atrás do ícone
        width: 130,        
    },
});
