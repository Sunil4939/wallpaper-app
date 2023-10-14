import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
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
import {
  CreateAddressApi,
  GetPincodeApi,
  AddressUpdateApi,
} from './../../redux/actions/addressAction';
import {Formik} from 'formik';
import * as yup from 'yup';
import { RNToasty } from 'react-native-toasty';

const {height, width} = Dimensions.get('window');

const AddAddress = ({
  navigation,
  CreateAddressApi,
  GetPincodeApi,
  getpincode,
  AddressUpdateApi,
  route,
}) => {
  const address = route?.params?.item; //address data get
  const showeditbtn = route?.params?.showeditbtn; //edit btn show
  const [loading, setLoading] = useState(false);
  const [isSelected, setisSelected] = useState(false);

  navigation?.setOptions({
    title: address ? 'Edit Address' : 'Add Address',
  });

  const AddressValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, ({min}) => `name must be at least ${min} characters`)
      .required('please enter full name'),
    mobile: yup
      .string()
      .min(10, ({min}) => `mobile number must be ${min} digit`)
      .required('mobile number is Required'),
    houseNumber: yup.string().required('houseNumber is Required'),
    area: yup
      .string()
      .min(6, ({min}) => `Area must be ${min} Character`)
      .required('Please enter area'),
    landmark: yup
      .string()
      .min(6, ({min}) => `landmark must be ${min} Character`)
      .required('landmark is Required'),
    pincode: yup.string().length(6).required('please enter pinCode'),
  });

  const [pincodeData, setPincodeData] = useState({
    cityName: getpincode?.cityName || address?.cityName || '',
    stateName: getpincode?.stateName || address?.stateName || '',
  });

  const [postData, setpostData] = useState({
    name: address?.name || '',
    mobile: address?.mobile ? `${address?.mobile}` : '',
    houseNumber: address?.houseNumber || '',
    pincode: address?.pincode ? `${address?.pincode}` : '',
    landmark: address?.landmark || '',
    area: address?.area || '',
  });

  const handleChange = (name, value) => {
    setpostData({
      ...postData,
      [name]: value,
    });
  };

  const handleCheck = values => {
    console.log('address  postData', values, pincodeData);
    if (pincodeData?.stateName && pincodeData?.cityName) {
      showeditbtn == true
      ? AddressUpdateApi(address?._id, values, navigation, data =>
          setLoading(data),
        )
      : CreateAddressApi(values, navigation, data => setLoading(data));
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <Formik
          validationSchema={AddressValidationSchema}
          initialValues={postData}
          onSubmit={values => {
            handleCheck(values);
          }}>
          {({
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
            isValid,
          }) => {
            return (
              <>
                <InputBox
                  placeholder="Your name"
                  onChangeText={handleChange('name')}
                  value={values?.name}
                  errors={touched?.name && errors?.name}
                />
                <InputBox
                  placeholder="Mobile no"
                  keyboardType="numeric"
                  maxLength={10}
                  value={values?.mobile}
                  errors={touched?.mobile && errors?.mobile}
                  onChangeText={handleChange('mobile')}
                />
                <InputBox
                  placeholder="house number"
                  value={values?.houseNumber}
                  errors={touched?.houseNumber && errors?.houseNumber}
                  onChangeText={handleChange('houseNumber')}
                />
                <InputBox
                  placeholder="landmark/ village"
                  onChangeText={handleChange('landmark')}
                  value={values?.landmark}
                  errors={touched?.landmark && errors?.landmark}
                />
                <InputBox
                  placeholder="Area"
                  onChangeText={handleChange('area')}
                  value={values?.area}
                  errors={touched?.area && errors?.area}
                />
                <InputBox
                  onChangeText={pincode => {
                    setFieldValue('pincode', pincode);
                    if (pincode?.length == 6) {
                      GetPincodeApi(pincode, (res) => {
                        setPincodeData({
                          cityName: res?.cityName || '',
                          stateName: res?.stateName || '',
                        })
                        // setFieldValue('city', res?.cityName)
                        // setFieldValue('state', res?.stateName)
                      });
                      // console.log('res', res);
                    }
                  }}
                  value={values?.pincode}
                  placeholder="Pincode"
                  keyboardType="numeric"
                  maxLength={6}
                  errors={touched?.pincode && errors?.pincode}
                />
                {!getpincode?.pincode && values?.pincode?.length == 6 ? (
                  <Text style={styles.error}>Pincode Must be Correct</Text>
                ) : null}

                <InputBox
                  value={values?.pincode?.length == 6 ? pincodeData?.cityName : ''}
                  // value={values.city}
                  placeholder="city"
                  editable={false}
                />

                <InputBox
                  value={values?.pincode?.length == 6 ? pincodeData?.stateName : ''}
                  placeholder="state"
                  editable={false}
                />

                <CheckBox
                  isChecked={isSelected}
                  onClick={() => setisSelected(!isSelected)}
                  checkedCheckBoxColor={COLORS.primary}
                  uncheckedCheckBoxColor={COLORS.gray50}
                  rightTextView={
                    <Text style={styles.checktext}>
                      Make this is my default address.
                    </Text>
                  }
                  style={{marginLeft: width * 0.01}}
                />

                {showeditbtn == true ? (
                  <Button
                    children="Edit address"
                    mediumbtn
                    btnStyle={{alignSelf: 'center', marginTop: height * 0.04}}
                    onPress={handleSubmit}
                  />
                ) : (
                  <Button
                    children="Add address"
                    mediumbtn
                    btnStyle={{alignSelf: 'center', marginTop: height * 0.04}}
                    onPress={handleSubmit}
                  />
                )}
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  getpincode: state?.address?.getpincode,
});

const mapDispatchToProps = {
  CreateAddressApi,
  GetPincodeApi,
  AddressUpdateApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
