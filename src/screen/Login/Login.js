import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../config/colors';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {login as loginAction} from '../../redux/actions';
import OverlaySpinner from 'react-native-loading-spinner-overlay';
import {
  isLoginValidSelector,
  loginLoadingSelector,
} from '../../redux/selectors/loginSelector';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#307ecc',
    flex: 1,
  },
  header: {
    height: 200,
    justifyContent: 'flex-end',
  },
  login: {
    margin: 40,
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
  },
  textInputContainer: {
    height: 80,
    marginTop: 30,
    marginLeft: 45,
    marginRight: 45,
    padding: 10,
    marginBottom: 40,
    margin: 10,
  },
  inputStyle: {
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    color: colors.white,
  },
  textInput: {
    fontSize: 35,
    marginVertical: 10,
    paddingLeft: 10,
    color: colors.white,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 18,
  },
  buttonStyle: {
    backgroundColor: colors.green,
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
  },
});

const Login = ({loginIsValid, loading, loginIn}) => {
  const [user, updateUser] = useState('');
  const [password, updatePassword] = useState('');
  const insets = useSafeAreaInsets();
  AntDesignIcon.loadFont();

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <OverlaySpinner visible={loading} color={colors.white} size="large" />
      <View style={[styles.header, {paddingTop: insets.top}]}>
        <Text style={styles.login}>COVID 19 </Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Usuario"
          value={user}
          autoCapitalize="none"
          onChangeText={(text) => updateUser(text)}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="*******"
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => updatePassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.textInputContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => loginIn({user, password})}>
          <Text style={styles.buttonTextStyle}>
            LOGIN
            <AntDesignIcon name="arrowright" color={colors.white} size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => ({
  loginIsValid: isLoginValidSelector(state),
  loading: loginLoadingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  loginIn: ({user, password}) => dispatch(loginAction({user, password})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
