import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { FONTS, COLORS } from '../constant';

const Cardh = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.bfont}>Bunyamin Brian Nathan</Text>
            <Text style={styles.bfont}>Lab RPL</Text>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.bfont}>Pesanan:</Text>
                <View style={{ marginLeft: wp(2) }}>
                    <Text style={styles.sfont}>- Nasi Goreng</Text>
                    <Text style={styles.sfont}>- Nasi Goreng</Text>
                    <Text style={styles.sfont}>- Nasi Goreng</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.bfont}>Status: </Text>
                <Text style={[styles.sfont, { marginLeft: wp(2) }]}>Menunggu</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={{ ...FONTS.bold_white, fontSize: 14 }}>Batal</Text>
            </TouchableOpacity>
            <View style={styles.bottom}>
                <View style={styles.wrapper} >
                    <Text style={styles.sfont}>Senin, 13/Jan/2022</Text>
                    <Text style={styles.bfont}>Total: Rp.25,000</Text>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: wp(5),
        borderRadius: 20,
        padding: 10,
        paddingLeft: 20,

    },
    bottom: {
        borderTopWidth: 3,
        borderTopColor: COLORS.primary,
        width: "111%",
        right: wp(6),
        marginTop: hp(3),
    },
    button: {
        backgroundColor: COLORS.danger,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(20),
        left: wp(30),
        marginTop: hp(2)
    },
    bfont: {
        ...FONTS.bold_green,
        fontSize: 14
    },
    sfont: {
        ...FONTS.regular_green,
        fontSize: 14
    },
    wrapper: {
        paddingHorizontal: wp(5),
        marginTop: hp(2),
        flexDirection: "row",
        justifyContent: "space-between"
    },
})

export default Cardh;
