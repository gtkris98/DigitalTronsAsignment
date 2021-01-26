import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { fetchSlotById, updateSlotBookingById } from '../../util/localStorage'
import styles from './styles'
let constants = require('./constants');

// Used functional component in this screen 
const BookSlot = ({navigation, route }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const slotId = route.params.slotId;

    useEffect(() => {
        fetchSlotById(slotId).then(res => {
            if (res && res.length > 0) {
                setFirstName(res[0].booking.firstName)
                setLastName(res[0].booking.lastName)
                setPhone(res[0].booking.phone.toString())
                setIsLoading(false)
            }
        }).catch(err => {
            setIsLoading(false)
        })
    }, [])

    //Regex to check that only letters are present (used for first and last name field)
    function isLetter(s) {
        return s.match("^[a-zA-Z\(\)]+$") === null ? false : true;
    }

    //Function to validate the three field. Using Contants wherever possible to increase redability and easy editing of messages in future
    const checkForErrors = () => {
        if (firstName && lastName && phone) {
            if(isLetter(firstName) && isLetter(lastName) ){
                if (!isNaN(phone)) {
                    return true
                }
                else{
                    ToastAndroid.show(constants.ERROR_MESSAGE_PHONE, ToastAndroid.SHORT);
                }
            }
            else{
                ToastAndroid.show(constants.ERROR_MESSAGE_NAME, ToastAndroid.SHORT);
            }
        }
        else {
            ToastAndroid.show(constants.ERROR_MESSAGE_REQUIRED, ToastAndroid.SHORT);
            return false;
        }
    }

    const saveData = () => {
        if (checkForErrors()) {
            let slotJSON = { id: slotId, booking: { firstName: firstName, lastName: lastName, phone: phone } }
            updateSlotBookingById(slotJSON).then(res => {
                navigation.goBack();
                ToastAndroid.show("Details Saved Successfully", ToastAndroid.SHORT);
                // I realize that this workaround creates a warning, but I was unable to re-render the slots when going back so I wrote this workaround
                route.params.getUpdatedSlots();
            })
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Booking Details</Text>
            <TextInput
                style={styles.textInput}
                placeholder="First Name"
                text={firstName}
                onChangeText={text => setFirstName(text)}
                defaultValue={firstName}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                text={lastName}
                onChangeText={text => setLastName(text)}
                defaultValue={lastName}
            />
            <TextInput
                style={styles.textInput}
                keyboardType={"number-pad"}
                maxLength={10}
                placeholder="Phone"
                text={phone}
                onChangeText={text => setPhone(text)}
                defaultValue={phone}
            />
            <View style={styles.buttonView}>
                <TouchableOpacity style={[styles.button, { backgroundColor: constants.SECONDARY_COLOR_WHITE }]} onPress={() => navigation.goBack()}>
                    <Text style={{ color: constants.PRIMARY_COLOR_BLUE }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { backgroundColor: constants.PRIMARY_COLOR_BLUE }]} onPress={() => saveData()}>
                    <Text style={{ color: constants.SECONDARY_COLOR_WHITE }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default BookSlot;