import React, { Component } from 'react';
import { Text, View, Image,  FlatList, TouchableOpacity, Alert, LogBox } from 'react-native';
import { moderateScale } from '../../util/fontScaling';
import styles from './styles'
import { fetchBookings, createEmptySlots } from '../../util/localStorage'
let constants = require('./constants');

//Using Class based component here and will use functional companent in the second screen for demonstrative purposes

class SlotPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeSlots: null,
            isLoading: true //In case of actual network call we can use this variable to hide/show loaders
        }
    }

    //when the UI is mounted I send a async call to check if the async storage has slot details, if not I am adding empty slots from 9am - 5pm
    getSlotsDetails = () => {

        fetchBookings().then(res => {
            if (res === null) {
                createEmptySlots().then(res => {
                    if (res) {
                        this.setState({
                            timeSlots: res,
                            isLoading: false
                        })
                    }
                })
            }
            else {
                this.setState({
                    timeSlots: res,
                    isLoading: false
                })
            }
        }).catch(err => {
            this.setState({
                isLoading: false
            })
            Alert.alert('Error', constants.ASYNC_ERROR_MESSAGE, [{text: 'Ok', onPress: () => console.log('Error Encountered'+err.toString())}])
        })
    }
    
    componentDidMount() {
        this.getSlotsDetails()
    }

    renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={require('../../../assets/logo.png')} />
            </View>
        );
    }
    //for each element of slot JSON, I am checking if there is booking details present or not and accordingly setting the color of slot
    renderTimeSlot(item, index) {
        const isBooked = item.booking === null ? false : true
        return (
            <View style={styles.slotContainer}>
                <Text style={styles.slotTimeText}>
                    {item.slot}
                </Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('BookSlot', { slotId: item.id, getUpdatedSlots: this.getSlotsDetails })} // send the id of the slot to the next screen so it knows where to save changes
                    style={[styles.slotTouchable, { backgroundColor: isBooked ? constants.SLOT_BOOKED_COLOR : constants.SLOT_AVALIABLE_COLOR }]}>

                    <Text style={[styles.slotTimeText, { color: "grey" }]}>
                        {isBooked ? "Slot Booked" : "Slot Avaliable"}
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }

    renderGalleryButton(){
        return(
            <TouchableOpacity style={styles.galleryButton} onPress={()=> this.props.navigation.navigate('Gallery')}>
                <Text style={{color: "white"}}>
                    Gallery
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                {this.renderGalleryButton()}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(5) }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.timeSlots}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item, index }) => this.renderTimeSlot(item, index)}
                    />
                </View>
            </View>
        );
    }
}

export default SlotPicker