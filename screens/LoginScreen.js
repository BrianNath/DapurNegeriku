import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FONTS, COLORS } from "../constant";

const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    //Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).
    //Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).
    //Firebase: The email address is badly formatted. (auth/invalid-email).

    const handleSignIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(
                setLoading(true)
            )
            .then(userCredentials => {
                const user = userCredentials.user
                alert("Berhasil Login", user.email)
            })
            .catch(error => {
                if (error.code === '(auth/user-not-found).') {
                    alert('Email tidak terdaftar');
                    setEmail("")
                    setPassword("")
                }

                if (error.code === '(auth/wrong-password)') {
                    alert('Password salah');
                    setPassword("")
                }

                if (error.code === 'auth/invalid-email') {
                    alert('Email tidak valid');
                    setEmail("");
                    setPassword("");
                }

                setLoading(false)

            })

    }

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe;

    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../assets/images/logoNoBG.png')} style={styles.image} />
                    <View style={styles.border}>
                        <View style={styles.header}>

                            <Text style={{ borderBottomWidth: 2, borderBottomColor: COLORS.primary, ...FONTS.regular_green }}>Sign In</Text>

                            <TouchableOpacity onPress={() => navigation.replace("Register")}>
                                <Text style={{ ...FONTS.regular_grey }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            < TextInput
                                placeholder='Enter your Email Adress'
                                value={email}
                                onChangeText={text => setEmail(text)}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder='Enter your Password'
                                value={password}
                                onChangeText={text => setPassword(text)}
                                style={[styles.input, { marginBottom: hp(10) }]}
                                secureTextEntry
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: hp(4) }}>
                            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                                {loading ?
                                    <ActivityIndicator color="white" /> :
                                    <Text style={{ ...FONTS.regular_white, fontSize: 16 }}>Sign In</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signup}>
                            <Text style={{ ...FONTS.regular_grey }}>or</Text>
                            <TouchableOpacity onPress={() => navigation.replace("Register")}>
                                <Text style={{ ...FONTS.regular_green, paddingLeft: 3 }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView >
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: wp(28),
        height: hp(25),
        bottom: hp(10)
    },
    border: {
        backgroundColor: "white",
        width: wp("70%"),
        justifyContent: 'center',
        borderRadius: 20,
        padding: 10,
        bottom: hp(9)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    input: {
        margin: 20,
        borderBottomColor: COLORS.green,
        borderBottomWidth: 1,
        ...FONTS.regular_green,
        marginBottom: 0,
        paddingLeft: wp(2),
    },
    button: {
        backgroundColor: COLORS.primary,
        width: wp("40%"),
        height: hp(5),
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    signup: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})