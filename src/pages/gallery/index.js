import React, { Component } from 'react';
import { View, Image, FlatList, PermissionsAndroid, Platform, ToastAndroid, ScrollView, Text } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { moderateScale } from '../../util/fontScaling';

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    async componentDidMount() {
        // ToastAndroid.show("Inside", ToastAndroid.SHORT);
        if (Platform.OS === 'android') {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permission Explanation',
                    message: 'ReactNativeForYou would like to access your photos!',
                },
            );
            if (result !== 'granted') {
                ToastAndroid.show("Access to pictures was denied", ToastAndroid.SHORT);
                this.props.navigation.goBack();
            }
        }

        CameraRoll.getPhotos({
            first: 200,
            assetType: 'Photos',
        }).then(res => {
            this.setState({ data: res.edges });
            // console.log(this.state.data)
        }).catch((error) => {
            ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
        });

    }
    renderImages(item, index) {
        const imageUri = item.node.image.uri
        return (
            <Image
                style={{
                    width: '33%',
                    height: moderateScale(200),
                }}
                source={{ uri: imageUri }}
            />
        )
    }
    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.data}
                    numColumns={3}
                    renderItem={({ item, index }) => this.renderImages(item, index)}
                />
            </View>
        );
    }
}