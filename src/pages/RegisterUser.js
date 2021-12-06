import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
// import Mytext from './components/Mytext';

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userRank, setUserRank] = useState('');

  let registeruser = () => {
    console.log(userName, userRank);

    if (!userName) {
      alert('Enter Username!');
      return;
    }
    if (!userRank) {
      alert('Enter User Rank!');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user1 (user_name, user_rank) VALUES (?,?)',
        [userName, userRank],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User successfully registered !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error in trying to Register the User!!!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter your name"
                onChangeText={
                  (userName) => setUserName(userName)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter the Rank"
                onChangeText={
                  (userRank) => setUserRank(userRank)
                }
                style={{ padding: 10 }}
              />
              <Mybutton title="Save" customClick={registeruser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;