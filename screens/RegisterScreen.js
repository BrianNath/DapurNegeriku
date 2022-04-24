import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/core";
import uuid from "react-native-uuid";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FONTS, COLORS } from "../constant";


const RegisterScreen = () => {
    const unique = uuid.v1();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true);
        if (
            name.replace(/(\r\n|\n|\r)/gm, "") &&
            phone.replace(/(\r\n|\n|\r)/gm, "") !== ""
        ) {
            set(ref(database, "Users/" + unique), {
                username: name,
                email: email,
                phoneNumber: phone,
            }).catch((error) => {
                alert("Field tidak valid");
                setPhone("");
                setName("");
                setEmail("");
                setPassword("");
            });
        }

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(setLoading(true))
            .then((userCredentials) => {
                const user = userCredentials.user;
                alert("Berhasil register");
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    alert("Email sudah ada");
                    setEmail("");
                    setPassword("");
                }

                if (error.code === "auth/invalid-email") {
                    alert("Email tidak valid");
                    setEmail("");
                    setPassword("");
                }

                if (error.code === "auth/weak-password") {
                    alert("Perbaiki password");
                    setPassword("");
                }

                setLoading(false);
            });
    };

    //Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).
    //Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).
    //Firebase: The email address is badly formatted. (auth/invalid-email).

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("Login");
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../assets/images/logoNoBG.png')} style={styles.image} />
                    <View style={styles.border}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.replace("Login")}>
                                <Text style={{ ...FONTS.regular_grey }}>Sign In</Text>
                            </TouchableOpacity>
                            <Text style={{ borderBottomWidth: 2, borderBottomColor: COLORS.primary, ...FONTS.regular_green }} >Sign Up</Text>
                        </View>
                        <View>
                            <TextInput
                                placeholder='Enter your Username'
                                value={name}
                                onChangeText={text => setName(text)}
                                style={styles.input}
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.input}
                                maxLength={13}
                                onChangeText={(text) => setPhone(text.replace(/\D/g, ""))}
                                value={phone}
                                placeholder="Phone"
                                keyboardType="numeric"
                            />
                            <TextInput
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
                            <TouchableOpacity style={styles.button}>
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={{ ...FONTS.regular_white, fontSize: 16 }} onPress={handleSignUp}>Sign Up</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signup}>
                            <Text style={{ ...FONTS.regular_grey }}>or</Text>
                            <TouchableOpacity onPress={() => navigation.replace("Login")}>
                                <Text style={{ ...FONTS.regular_green, paddingLeft: 3 }}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView >
        </View>
    );
};

export default RegisterScreen;

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
});


{/* <View style={styles.container}>
<KeyboardAvoidingView
    style={styles.inputContainer}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
>
    <TextInput
        placeholder="Username"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        maxLength={20}
    />
    <TextInput
        style={styles.input}
        maxLength={13}
        onChangeText={(text) => setPhone(text.replace(/\D/g, ""))}
        value={phone}
        placeholder="Phone"
        keyboardType="numeric"
    />
    <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
    />
    <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
    />
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
        >
            {loading ? (
                <ActivityIndicator color="green" />
            ) : (
                <Text style={styles.buttonOutlineText}>Register</Text>
            )}
        </TouchableOpacity>
        <View style={{ width: 200, alignItems: "center" }}>
            <Text>Already have an account?</Text>
            <Text
                style={styles.linkText}
                onPress={() => navigation.replace("Login")}
            >
                Login
            </Text>
        </View>
    </View>
</KeyboardAvoidingView>
</View> */}