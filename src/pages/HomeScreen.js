import React, { useEffect } from 'react';
import { View, SafeAreaView, TextInput } from 'react-native';
import MyImageButton from './components/MyImageButton';
import Mytextinput from './components/Mytextinput';
import Mytext from './components/Mytext';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {

  // let [userName, setUserName] = useState('');
  // let [userRank, setUserRank] = useState('');
  // let auth_user = () =>{
  //   console.log(userName, userRank);
  //   if(!userName){
  //     alert("Enter the Username!");
  //     return;
  //   }
  //   if(!userRank){
  //     alert("Enter the UserRank!");
  //     return;
  //   }

  // }
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user1'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user1', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user1(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_rank VARCHAR(25))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {/* <Mytext
              Name
              />
              <Mytextinput
              placeholder = "Enter Your Name"
              onChnageText= {
                (userName) => setUserName(userName)
              }
              style = {{padding : 10}}
              />
              <Mytext
              Rank
              />
              <Mytextinput
              placeholder = "Enter Rank"
              onChnageText= {
                (userRank) => setUserRank(userRank)
              }
              style = {{padding : 10}}
              /> */}
            <MyImageButton
              title="Register User"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />

           <MyImageButton
              title="Authenticate User"
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('Update')}
            />

          {/*  <MyImageButton
              title="View User"
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="View All"
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Delete User"
              btnColor='#D1503A'
              btnIcon="user-times"
              customClick={() => navigation.navigate('Delete')}
            /> */}
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;