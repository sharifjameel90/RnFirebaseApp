import React,{useState,useEffect} from 'react'
import { View, Text , StyleSheet, TextInput, SafeAreaView, Button} from 'react-native'
import auth from '@react-native-firebase/auth';
import { parseSync } from '@babel/core';
export default function App() {
  const [isuserclickedlogin, setIsUserClickedLogin] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showpassword, setShowpassword] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <Text>Please Wait</Text>;
  const SignupEvent = () => {
 
auth()
.createUserWithEmailAndPassword(email, password)
.then(() => {
  alert('User account created & signed in!');
})
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    alert('That email address is already in use!');
  }

  if (error.code === 'auth/invalid-email') {
    alert('That email address is invalid!');
  }

  alert(error);
});
  }
  const LoginEvent = () => {
 
auth()
.signInWithEmailAndPassword(email, password)
.then(() => {
  alert('signed in!');
})
.catch(error => {
  if (error.code === 'auth/email-already-in-use') {
    alert('That email address is already in use!');
  }

  if (error.code === 'auth/invalid-email') {
    alert('That email address is invalid!');
  }

  alert(error);
});
  }
  if (!user) {
    return (
      <SafeAreaView>
        {isuserclickedlogin ? (
          <View>
           <TextInput
             style={styles.input}
             onChangeText={setEmail}
             value={email}
             keyboardAppearance={'dark'}
             placeholder="Email"  
           />
         <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          keyboardAppearance={'dark'}
          secureTextEntry={showpassword}
          placeholder="Password"
        />
          <Text style={{textAlign: 'center'}} onPress={LoginEvent}>Login</Text>
          {showpassword ? (
               <Text style={{marginTop: 10,textAlign: 'center'}} onPress={() => setShowpassword(false)}>Show Password</Text>
             ) : (
               <Text style={{marginTop: 10,textAlign: 'center'}} onPress={() => setShowpassword(true)}>Hidea Password</Text>
             )}
          <Text style={{marginTop: 10,textAlign: 'center'}} onPress={() => {
            setIsUserClickedLogin(false)
            setEmail('')
            setPassword('')
            setShowpassword(true)
          }}>Don't Have An Account have account sign up</Text>
          
          </View>
        ): (
          <View>
            <TextInput
           style={styles.input}
           onChangeText={setEmail}
           value={email}
           keyboardAppearance={'dark'}
           placeholder="Email"
         />
          <TextInput
           style={styles.input}
           onChangeText={setPassword}
           keyboardAppearance={'dark'}
           secureTextEntry={showpassword}
           value={password}
           placeholder="Password"
         />
           <Text style={{textAlign: 'center'}} onPress={SignupEvent}>Sign Up</Text>
           {showpassword ? (
             <Text style={{marginTop: 10,textAlign: 'center'}} onPress={() => setShowpassword(false)}>Show Password</Text>
           ) : (
             <Text style={{marginTop: 10,textAlign: 'center'}} onPress={() => setShowpassword(true)}>Hide Password</Text>
           )}
           <Text style={{marginTop: 10,textAlign: 'center'}} onPress={() => {
             setIsUserClickedLogin(true)
             setEmail('')
             setPassword('')
             setShowpassword(true)
           }}>Already have account Login</Text>
           
          </View>
        )}
        </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20}}>Welcome: {user.email}</Text>
      <Button style={styles.button} onPress={() => {
        setEmail('')
        setPassword('')
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      }} title="Sign Out"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 12,
    borderRadius:3,
    borderColor: 'gray'
  },
})