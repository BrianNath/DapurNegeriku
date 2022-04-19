import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { database, auth } from "../firebase";
import { ref, onValue } from "firebase/database";
import { FONTS } from "../constant";

const HomeScreen = () => {
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
    <View style={styles.container}>
      <Text>Hari {hari[hariKe]}!</Text>
      <Text>Halo {name}</Text>
      <Text>mau pesan apa?</Text>
      <Text>Email: {users.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
