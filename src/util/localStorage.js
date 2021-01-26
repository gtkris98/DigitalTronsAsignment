import AsyncStorage from '@react-native-async-storage/async-storage';

const emptySlotsJSON = [
    {
        id: 1,
        slot: "09 AM",
        booking: null
    },
    {
        id: 2,
        slot: "10 AM",
        booking: null
    },
    {
        id: 3,
        slot: "11 AM",
        booking: null
    },
    {
        id: 4,
        slot: "12 PM",
        booking: null
    },
    {
        id: 5,
        slot: "01 PM",
        booking: null
    },
    {
        id: 6,
        slot: "02 PM",
        booking: null
    },
    {
        id: 7,
        slot: "03 PM",
        booking: null
    },
    {
        id: 8,
        slot: "04 PM",
        booking: null
    },
    {
        id: 9,
        slot: "05 PM",
        booking: null
    }
]
export const fetchBookings = async() => {
    try{
        const value = await AsyncStorage.getItem('slots')
        return value != null ? JSON.parse(value) : null;
    }
    catch(e){
        console.log("Error while fetching slots from AsyncStorage " + e)
        return null;
    }
}

export const createEmptySlots = async() => {
    try {
        const value = JSON.stringify(emptySlotsJSON);
        await AsyncStorage.setItem('slots', value)
        return emptySlotsJSON;
    }
    catch (error) {
        console.log("Error while storing empty slots to AsyncStorage " + error)
    }
    
}

export const fetchSlotById = async(id) => {
    try{
        const value = await AsyncStorage.getItem('slots')
        slots = JSON.parse(value);
        return slots.filter(item => item.id === id)
    }
    catch(e){
        console.log("Error while fetching slots from AsyncStorage " + e)
        return null;
    }
}

export const updateSlotBookingById = async(slotJSON) => {
    try {
        const slotsJSONString = await AsyncStorage.getItem('slots')
        slots = JSON.parse(slotsJSONString);
        slots.map(item => {if(item.id === slotJSON.id){item.booking = slotJSON.booking}})
        const value = JSON.stringify(slots);
        await AsyncStorage.setItem('slots', value)
    }
    catch (error) {
        console.log("Error while storing empty slots to AsyncStorage " + error)
    }
    
}