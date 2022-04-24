import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { FONTS, COLORS } from "../../constant";
import { Cardbd } from "../../components"

const UCartscreen = () => {
  return (
    <View>
      <ScrollView>
        <View style={styles.content1}>
          <Text style={{ ...FONTS.regular_green }} >Nama Penerima: Bunyamin Brian Nathan</Text>
          <Text style={{ ...FONTS.regular_green }}>Lokasi Penerimaan: Lab RPL</Text>
          <TouchableOpacity style={styles.edit}>
            <Text style={{ ...FONTS.bold_white }}>Ubah</Text>
          </TouchableOpacity>
          <View style={styles.section1Child}>
            <Text style={{ ...FONTS.bold_green, fontSize: 18, top: 4 }}>Harga Total: Rp.25,000</Text>
          </View>
        </View>
        <Text style={{ ...FONTS.bold_green, fontSize: 16, marginHorizontal: wp(7) }}>Menu Breakdown:</Text>
        <Cardbd />
        <Cardbd />
        <Cardbd />
        <Cardbd />
        <Cardbd />
        <Cardbd />
        <Cardbd />
        <Cardbd />
        <Cardbd />
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={{ ...FONTS.bold_white, fontSize: 24 }}>Pesan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content1: {
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    margin: 15,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white"
  },
  edit: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 7,
    margin: 5
  },
  section1Child: {
    borderTopWidth: 4,
    borderTopColor: COLORS.primary,
    width: "107%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    width: wp("70%"),
    height: hp(8),
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position:'absolute',
    right: wp("15%"),
    top: hp("65%")
  }
})

export default UCartscreen;
