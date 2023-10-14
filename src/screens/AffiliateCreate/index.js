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
import {Formik} from 'formik';
import * as yup from 'yup';
import {CreateAffiliateApi} from './../../redux/actions/affiliateAction';

const {height, width} = Dimensions.get('window');

const AffiliateCreate = ({navigation, getuser, CreateAffiliateApi}) => {
  const [loading, setLoading] = useState(false);

  const AddressValidationSchema = yup.object().shape({
    fullName: yup.string().required('please enter full name'),
    email: yup.string().required('email is Required'),
    phoneNumber: yup
      .string()
      .min(10, ({min}) => `mobile number must be ${min} digit`)
      .required('mobile number is Required'),
    whyYouWantJoinAffiliatePartener: yup
      .string()
      .required('Please Enter Reason'),
  });

  const [postData, setpostData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    userId: getuser?._id,
    whyYouWantJoinAffiliatePartener: '',
  });

  const handleChange = (name, value) => {
    setpostData({
      ...postData,
      [name]: value,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <Formik
          validationSchema={AddressValidationSchema}
          initialValues={postData}
          onSubmit={values =>
            CreateAffiliateApi(values, navigation, data => setLoading(data))
          }>
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
                  redlabel
                  label="Full Name"
                  placeholder="full Name"
                  onChangeText={handleChange('fullName')}
                  value={values?.fullName}
                  errors={touched?.fullName && errors?.fullName}
                />
                <InputBox
                  redlabel
                  label="Mobile No"
                  placeholder="Mobile no"
                  keyboardType="numeric"
                  maxLength={10}
                  value={values?.phoneNumber}
                  errors={touched?.phoneNumber && errors?.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                />
                <InputBox
                  redlabel
                  label="Email"
                  placeholder="email"
                  value={values?.email}
                  errors={touched?.email && errors?.email}
                  onChangeText={handleChange('email')}
                />
                <InputBox
                  redlabel
                  label="why You Want Join Affiliate Partner"
                  placeholder="Message"
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={values?.whyYouWantJoinAffiliatePartener}
                  errors={
                    touched?.whyYouWantJoinAffiliatePartener &&
                    errors?.whyYouWantJoinAffiliatePartener
                  }
                  onChangeText={handleChange('whyYouWantJoinAffiliatePartener')}
                />
                <Button
                  children="Add Affiliate"
                  mediumbtn
                  load={loading}
                  btnStyle={{alignSelf: 'center', marginTop: height * 0.04}}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({getuser: state.auth.getuser});

const mapDispatchToProps = {CreateAffiliateApi};

export default connect(mapStateToProps, mapDispatchToProps)(AffiliateCreate);
