import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import Mytext from './components/Mytext';

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {
  let [inputUserName, setInputUserName] = useState('');
  let [inputUserRank, setInputUserRank] = useState('');
  let AuthUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM  table_user1 where user_name=? and user_rank=?',
        [inputUserName, inputUserRank],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
               'User Authenticated Successfully !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please enter a valid input!');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
            <Mytext
            Name
            />
          <Mytextinput
            placeholder="Enter Username"
            onChangeText={
              (inputUserName) => setInputUserName(inputUserName)
            }
            style={{ padding: 10 }}
          />
          <Mytext
          Rank
          />
          <Mytextinput
            placeholder="Enter Rank"
            onChangeText={
              (inputUserRank) => setInputUserRank(inputUserRank)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Authenticate User" customClick={AuthUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;