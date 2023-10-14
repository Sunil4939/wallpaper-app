import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import Button from './../../component/Button/index';
import InputBox from './../../component/InputText/index';
import CheckBox from 'react-native-check-box';
import Payment from './../Payment/index';
import DropdownComponent from './../../component/dropdown/index';
import Stars from 'react-native-stars';

const {height, width} = Dimensions.get('window');
const Service = [
  {value: '0', label: 'Product'},
  {value: '1', label: 'Category'},
  {value: '2', label: 'Other'},
];
const Feedback = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isSelected, setisSelected] = useState('false');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <DropdownComponent placeholder="Service" data={Service} />
        <InputBox placeholder="Name" />
        <InputBox placeholder="Email-id" keyboardType="email-address" />
        <InputBox
          placeholder="Message"
          textAlignVertical="top"
          multiline={true}
          numberOfLines={7}
        />
        <Text style={styles.rate}>Rate Us</Text>
        <View style={{alignItems: 'center', marginVertical: height * 0.02}}>
          <Stars
            default={0}
            spacing={22}
            starSize={22}
            count={5}
            fullStar={icons.fillstar}
            emptyStar={icons.star}
          />
        </View>

        <Button
          children="Submit"
          mediumbtn
          btnStyle={{alignSelf: 'center', marginTop: height * 0.02}}
          // onPress={() => navigation.navigate('Payment')}
        />
        <Text style={styles.skip}>Skip for now</Text>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
