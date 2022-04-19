import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';


const FONT = {
    color: '#79BF80',
    fontWeight: '700',
    fontSize: 16
}

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
        return () => unsubscribe();
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.inputContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignIn}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        {loading ? <ActivityIndicator color="green" /> : <Text style={styles.buttonOutlineText}>Login</Text>}
                    </TouchableOpacity>
                    <View style={{ width: 200, alignItems: "center" }}>
                        <Text>Dont hanve any account?</Text>
                        <Text style={styles.linkText} onPress={() => navigation.replace("Register")}>Register</Text>
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
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center'
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 5,
        fontSize: 16,
        color: '#79BF80'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#79BF80',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#79BF80',
        borderWidth: 1
    },
    buttonOutlineText: {
        ...FONT
    },
    buttonText: {
        ...FONT,
        color: 'white'
    },
    linkText: {
        ...FONT,
    }
})