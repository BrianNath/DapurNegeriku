import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/core";
import uuid from "react-native-uuid";

const FONTS = {
  color: "#79BF80",
  fontWeight: "700",
  fontSize: 16,
};

const unique = uuid.v1();

const RegisterScreen = () => {
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
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 5,
    fontSize: 16,
    color: "#79BF80",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#79BF80",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#79BF80",
    borderWidth: 1,
  },
  buttonOutlineText: {
    ...FONTS,
  },
  buttonText: {
    ...FONTS,
    color: "white",
  },
  linkText: {
    ...FONTS,
  },
});
