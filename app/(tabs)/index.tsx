import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

export default function App() {

  // STATE TRANSAKSI
  const [transaksi, setTransaksi] = useState([
    {
      id: '1',
      ket: 'Uang Saku',
      nominal: 100000,
      tipe: 'masuk'
    },
    {
      id: '2',
      ket: 'Beli Cilok',
      nominal: 10000,
      tipe: 'keluar'
    },
  ]);

  // STATE INPUT
  const [ket, setKet] = useState('');
  const [nominal, setNominal] = useState('');

  // HITUNG TOTAL SALDO
  // kalau masuk = tambah
  // kalau keluar = kurang
  const totalSaldo = transaksi.reduce((total, item) => {

    if (item.tipe === 'masuk') {
      return total + item.nominal;
    } else {
      return total - item.nominal;
    }

  }, 0);

  // FUNGSI TAMBAH TRANSAKSI
  const tambahTransaksi = (tipe) => {

    // VALIDASI INPUT
    if (ket === '' || nominal === '') {
      Alert.alert('Error', 'Input tidak boleh kosong');
      return;
    }

    // DATA BARU
    const dataBaru = {
      id: Date.now().toString(),
      ket: ket,
      nominal: parseInt(nominal),
      tipe: tipe
    };

    // TAMBAH KE ARRAY
    setTransaksi([...transaksi, dataBaru]);

    // KOSONGKAN INPUT
    setKet('');
    setNominal('');
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >

      {/* HEADER SALDO */}
      <View style={styles.header}>
        <Text style={styles.textSaldo}>
          Total Saldo
        </Text>

        <Text style={styles.saldo}>
          Rp {totalSaldo}
        </Text>
      </View>

      {/* FORM INPUT */}
      <View style={styles.form}>

        <TextInput
          placeholder="Masukkan Deskripsi"
          style={styles.input}
          value={ket}
          onChangeText={setKet}
        />

        <TextInput
          placeholder="Masukkan Nominal"
          style={styles.input}
          keyboardType="numeric"
          value={nominal}
          onChangeText={setNominal}
        />

        {/* TOMBOL */}
        <View style={styles.buttonContainer}>

          {/* PEMASUKAN */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => tambahTransaksi('masuk')}
          >
            <Text style={styles.buttonText}>
              Pemasukan
            </Text>
          </TouchableOpacity>

          {/* PENGELUARAN */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => tambahTransaksi('keluar')}
          >
            <Text style={styles.buttonText}>
              Pengeluaran
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* LIST HISTORY */}
      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (

          <View style={styles.item}>

            {/* DESKRIPSI */}
            <Text style={styles.keterangan}>
              {item.ket}
            </Text>

            {/* NOMINAL */}
            <Text
              style={[
                styles.nominal,
                {
                  color:
                    item.tipe === 'masuk'
                      ? 'green'
                      : 'red'
                }
              ]}
            >
              Rp {item.nominal}
            </Text>

          </View>
        )}
      />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: 'center'
  },

  textSaldo: {
    fontSize: 22,
    fontWeight: 'bold'
  },

  saldo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10
  },

  form: {
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10
  },

  keterangan: {
    fontSize: 16
  },

  nominal: {
    fontSize: 16,
    fontWeight: 'bold'
  }

});