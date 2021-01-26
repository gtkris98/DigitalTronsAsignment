import { Platform, Dimensions } from "react-native";
import { horizontalScale, verticalScale, moderateScale } from "../../util/fontScaling"

// let appConfig = require('../../../appConfig');
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default {
    container: {
        flex: 1,
        width: screenWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: moderateScale(30)
    },
    headerText: {
        fontFamily: "Avenir-Heavy",
        fontSize: moderateScale(20),
        letterSpacing: moderateScale(0.4),
        paddingTop: moderateScale(3)
    },
    textInput: {
        marginTop: moderateScale(20),
        width: screenWidth * 0.8,
        height: 40,
        borderColor: '#2196F3',
        borderBottomWidth: 1
    },
    buttonView: {
        width: screenWidth * 0.8,
        marginTop: moderateScale(20),
        flexDirection: 'row',
        height: moderateScale(45)
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: moderateScale(5),
        margin: moderateScale(5),
        borderRadius: moderateScale(5)

    }
}