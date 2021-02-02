import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import colors from '../../config/colors';
import {logout} from '../../redux/actions';
import {useTheme} from '../../context/Theme';
import {useUserInformation} from '../../context/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 30,
  },
  text: {
    paddingLeft: 10,
  },
  userInformation: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  image: {
    borderRadius: 50,
    height: 200,
    width: 200,
  },
  databox: {
    paddingTop: 30,
  }
});

const Menu = ({logout}) => {
  const {mainTheme, darkModeEnabled, toggleDarkMode} = useTheme();
  const {name, email, telefono, photo} = useUserInformation();
  const {backgroundColor, textColor} = mainTheme;

  AntDesignIcon.loadFont();

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <View style={styles.userInformation}>
        {!!photo && (
          <Image
            source={{uri: photo}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <View style={styles.databox}>
          <Text style={{color: textColor}}>{name}</Text>
          <Text style={{color: textColor}}>{email}</Text>
          <Text style={{color: textColor}}>{telefono}</Text>
        </View>
      </View>
      <Switch
        trackColor={{false: colors.white, true: colors.gray}}
        thumbColor={darkModeEnabled ? colors.black : colors.white}
        ios_backgroundColor={colors.white}
        onValueChange={toggleDarkMode}
        value={darkModeEnabled}
      />
      <TouchableOpacity onPress={logout} style={styles.button}>
        <AntDesignIcon name="logout" color={textColor} size={30} />
        <Text style={[styles.text, {color: textColor}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
