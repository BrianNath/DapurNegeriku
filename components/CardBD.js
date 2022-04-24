import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { FONTS, COLORS } from '../constant';

const Cardbd = () => {
    return (
        <View style={styles.card}>
            <Text style={{ ...FONTS.bold_green, fontSize: 20 }} numberOfLines={1}>12X</Text>
            <View style={{ paddingLeft: wp(2), width: wp("40%"), justifyContent: 'center', alignItems: 'center', ellipsizeMode: "end" }}>
                <Text style={styles.fonts} numberOfLines={1}>Nasi Goreng</Text>
            </View>
            <Text style={styles.fonts} numberOfLines={1}>RP.15,000</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        flexDirection: "row",
        margin: 15,
        height: hp(10),
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        borderColor: COLORS.primary,
        borderWidth: 3
    },
    fonts: {
        ...FONTS.bold_green,
        fontSize: 16,
    }
})

export default Cardbd;
