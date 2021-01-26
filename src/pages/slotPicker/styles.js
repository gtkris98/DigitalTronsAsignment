import { Platform, Dimensions } from "react-native";
import { horizontalScale, verticalScale, moderateScale } from "../../util/fontScaling"

// let appConfig = require('../../../appConfig');
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default {
    container: {
        flex: 1,
        height: '100%',
        width: screenWidth,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: moderateScale(30),
    },
    scrollViewContainer: {
        flex: 1,
        width: screenWidth,
        // marginBottom: moderateScale(65),
        // marginTop: moderateScale(30)
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        height: moderateScale(60),
        backgroundColor: 'black',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    headerImage: {
        height: moderateScale(50),
        width: moderateScale(200)
    },
    slotContainer: {
        width: screenWidth,
        height: moderateScale(50),
        padding: moderateScale(5),
        marginTop: moderateScale(5),
        flex: 1,
        flexDirection: 'row'
    },
    slotTouchable: {
        flex: 1,
        padding: moderateScale(5),
        marginLeft: moderateScale(5),
        marginBottom: moderateScale(2),
        borderRadius: moderateScale(7),
        elevation: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    slotTimeText: {
        fontFamily: "Avenir-Roman",
        fontSize: moderateScale(12),
        letterSpacing: moderateScale(0.4),
        paddingTop: moderateScale(3)
    },
    galleryButton: {
        justifyContent: 'center',
        backgroundColor: '#2196F3',
        alignItems: 'center',
        alignSelf: "flex-end",
        height: moderateScale(30),
        width: moderateScale(100),
        marginTop: moderateScale(70),
        marginRight: moderateScale(5),
        borderRadius: moderateScale(10)
    },
}