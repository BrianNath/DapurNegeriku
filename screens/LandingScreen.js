import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FONTS, COLORS } from "../constant";
import { useNavigation } from "@react-navigation/core";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LandingScreen = () => {
    const navigation = useNavigation();

    const [show, setShow] = useState(true);
    setTimeout(() => setShow(false), 4000);
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/logoNoBG.png")}
                style={styles.logo}
            />

            {show ? (
                <Image
                    source={require("../assets/images/loading.gif")}
                    style={{ width: wp("10.2%"), height: hp("6%"), margin: 14 }}
                />
            ) : (
                <TouchableOpacity
                    onPress={() => navigation.replace("Login")}
                    style={styles.button}
                >
                    <Text style={{ ...FONTS.regular_white }}>Get Started</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.slogan}>sit down & enjoy</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: wp("45%"),
        height: hp("35%"),
    },
    slogan: {
        ...FONTS.regular_green,
        fontSize: 15,
    },
    button: {
        backgroundColor: COLORS.primary,
        width: wp("40%"),
        padding: 10,
        borderRadius: 30,
        alignItems: "center",
        margin: 10,
    },
});

export default LandingScreen;
