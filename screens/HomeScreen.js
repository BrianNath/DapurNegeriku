import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
// import { ref, onValue } from "firebase/database";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";


import { CardMenu } from "../components";
import { database, auth } from "../firebase";
import { FONTS, COLORS } from "../constant";


const HomeScreen = () => {
    const categories = [
        {
            id: "123",
            name: "Makanan"
        },
        {
            id: "12344",
            name: "Minuman"
        },
        {
            id: "12513",
            name: "Roti"
        },
        {
            id: "3151",
            name: "Cemilan"
        },
    ]

    const [name, setName] = useState("");
    const navigation = useNavigation();
    const users = auth.currentUser;


    var hariKe = new Date().getDay();
    const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                alert("Anda baru saja keluar");
                navigation.replace("Login");
            })
            .catch((error) => {
                alert("Maaf terjadi error");
                return navigation.replace("Login");
            });
    };

    const firebaseRef = database.ref("Users");

    firebaseRef
        .once("value", (snapshot) => {
            snapshot.forEach((v) => {
                if (v.val().email === auth.currentUser?.email) {
                    setName(v.val().username);
                }
            });
        })
        .catch((error) => {
            auth.signOut();
            alert("Maaf terjadi error");
            return navigation.replace("Login");
        });

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView style={{ marginTop: 10 }}>
                <View style={styles.header}>
                    <Text style={{ ...FONTS.bold_green, fontSize: 32 }}>Hari {hari[hariKe]}!</Text>
                    <Text style={{ ...FONTS.regular_green, fontSize: 16 }}>mau pesan apa {name}?</Text>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Text style={{ ...FONTS.regular_green, fontSize: 20 }} > Keluar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: "row" }}>

                        {categories.map((c, i) => {
                            return (
                                <TouchableOpacity style={styles.categories} key={c.id}>
                                    <Text style={{ ...FONTS.regular_white }}>{c.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                <CardMenu />
            </ScrollView>
            {/* <TouchableOpacity onPress={handleSignOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity> */}
        </SafeAreaView >
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        backgroundColor: "#79BF80",
        width: "60%",
        height: "10%",
        justifyContent: "center",
        padding: 15,
        borderRadius: 50,
        alignItems: "center",
        marginTop: 40,
    },
    buttonText: {
        ...FONTS.bold_white,
        fontSize: 20,
    },
    header: {
        // backgroundColor: "red",
        width: wp("100%"),
        paddingLeft: wp(3),
        paddingTop: wp(2)
    },
    content: {
        marginTop: wp(3),
        // backgroundColor: "grey",
    },
    categories: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        width: wp("25%"),
        height: hp(5),
        marginHorizontal: 15,
        borderRadius: 50,
        marginBottom: hp(3),
        marginTop: hp(1)
    }
});
