import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { FONTS, COLORS } from "../constant";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Cardmenu = () => {

    const foods = [
        {
            name: "Nasi Goreng",
            price: 15000,
            desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere vero odio veritatis!",
            image: "nasiGoreng.jpg"
        }
    ]
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/nasiGoreng.jpg')} />
            <View style={styles.description}>
                <Text style={{ ...FONTS.bold_green, fontSize: 18 }} numberOfLines={1}>Nasi Goreng</Text>
                <Text style={{ ...FONTS.regular_green, fontSize: 14 }} numberOfLines={1}>Rp.15,000</Text>
                <Text style={{ ...FONTS.regular_grey, fontSize: 12 }} numberOfLines={3}>Ket: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere vero odio veritatis!</Text>
            </View>
            <TouchableOpacity style={styles.order}>
                <Text style={{ ...FONTS.bold_white }}>Pesan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: wp(2),
        flexDirection: "row",
        borderRadius: 15,
        height: hp(20),
    },
    image: {
        width: wp(30),
        height: hp(20),
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    description: {
        width: wp("50%"),
        marginLeft: 5
    },
    order: {
        backgroundColor: COLORS.primary,
        height: hp(5),
        width: wp(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        right: wp(8),
        top: hp(1),

    }
})

export default Cardmenu;
