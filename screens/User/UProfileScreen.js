import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { FONTS, COLORS } from "../../constant";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useHeaderHeight } from '@react-navigation/elements';

const UProfilescreen = () => {
    const headerHeight = useHeaderHeight();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={headerHeight + 40}>
            <ScrollView>
                <View style={styles.wrap}>
                    <Text style={styles.sfont}>Username</Text>
                    <TextInput
                        placeholder='Brian'
                        value={name}
                        onChangeText={text => setName(text)}
                        style={styles.input} />
                </View>
                <View style={[styles.wrap, { bottom: hp(4) }]}>
                    <Text style={styles.sfont}>Email</Text>
                    <TextInput
                        placeholder='Brian@gmail.com'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input} />
                </View>
                <View style={[styles.section, { bottom: hp(4) }]}>
                    <Text style={{ ...FONTS.bold_green, fontSize: 18 }}>Ganti Password</Text>
                </View>
                <View style={[styles.wrap, { bottom: hp(4) }]}>
                    <Text style={styles.sfont}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input} />
                </View>
                <View style={[styles.wrap, { bottom: hp(8) }]}>
                    <Text style={styles.sfont}>New Password</Text>
                    <TextInput
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                        style={[styles.input]} />
                </View>
                <View style={{ alignItems: 'center', bottom: hp(4) }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ ...FONTS.bold_white, fontSize: 20 }}>Ganti</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    sfont: {
        ...FONTS.regular_green,
        fontSize: 16
    },
    input: {
        height: hp(8),
        fontSize: 16,
        color: COLORS.primary,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
        bottom: hp(2),
        paddingLeft: wp(3),
    },
    wrap: {
        margin: 15,
        marginTop: hp(3)
    },
    section: {
        borderColor: COLORS.primary,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: hp(2)
    },
    button: {
        backgroundColor: COLORS.primary,
        width: wp("70%"),
        height: hp(8),
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default UProfilescreen;
