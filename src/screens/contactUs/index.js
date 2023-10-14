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
  useWindowDimensions,
} from 'react-native';
import {COLORS, data, icons, images} from './../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import Button from './../../component/Button/index';
import InputBox from './../../component/InputText/index';
import RenderHtml from 'react-native-render-html';
import {CreateContactApi} from './../../redux/actions/contactAction';
import {GetCompanyApi} from './../../redux/actions/homeActions';

import {Formik} from 'formik';
import * as yup from 'yup';

const {height, width} = Dimensions.get('window');

const ContactUs = ({
  getcompany,
  navigation,
  CreateContactApi,
  GetCompanyApi,
}) => {
  const [loading, setLoading] = useState(false);
  const {width} = useWindowDimensions();
  // const regex = 'example@email.com';
  const ContactValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .min(10, ({min}) => `mobile number must be ${min} digit`)
      .required('mobile number is Required'),
    name: yup.string().required('please enter full name'),
    company: yup.string().required('company name is Required'),
    message: yup.string().required('please enter message is Required'),
    email: yup.string()?.required('email is Required'),
  });

  const [postData, setPostData] = useState({
    company: '',
    name: '',
    email: '',
    message: '',
    phone: '',
  });
  const handleChange = (name, value) => {
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  useEffect(() => {
    GetCompanyApi();
  }, []);
  // console.log('getcompany', getcompany);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.mainheading}>Get in touch today</Text>

          <View style={{width: width * 0.92, alignSelf: 'center'}}>
            <RenderHtml
              contentWidth={width}
              source={{html: getcompany?.data?.footer_about}}
              tagsStyles={{
                body: {
                  whiteSpace: 'normal',
                  color: 'gray',
                },
              }}
            />
          </View>

          <View style={styles.rowdrop}>
            <Image source={icons.email} style={[styles.profileicons]} />
            <Text style={styles.profileText}>{getcompany?.data?.email}</Text>
          </View>
          <View style={styles.rowdrop}>
            <Image source={icons.call} style={styles.profileicons} />
            <Text style={styles.profileText}>{getcompany?.data?.phone}</Text>
          </View>
          <View style={styles.rowdrop}>
            <Image source={icons.location2} style={styles.profileicons} />
            <Text style={styles.profileText}>{getcompany?.data?.address}</Text>
          </View>
        </View>
        <Formik
          validationSchema={ContactValidationSchema}
          initialValues={postData}
          onSubmit={values => {
            CreateContactApi(values, navigation, data => setLoading(data));
            console.log('values', values);
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
                <View style={styles.inputfieldbox}>
                  <InputBox
                    redlabel
                    label="Name"
                    placeholder="Your Name"
                    value={values?.name}
                    errors={touched?.name && errors?.name}
                    onChangeText={handleChange('name')}
                    errorstyle={{marginLeft: 2}}
                  />
                  <InputBox
                    redlabel
                    label="E-mail"
                    placeholder="example@email.com"
                    keyboardType="email-address"
                    value={values?.email}
                    errors={touched?.email && errors?.email}
                    onChangeText={handleChange('email')}
                    errorstyle={{marginLeft: 2}}
                  />
                  <InputBox
                    redlabel
                    label="Phone"
                    placeholder="(414) 804 - 987"
                    maxLength={10}
                    keyboardType="numeric"
                    value={values?.phone}
                    errors={touched?.phone && errors?.phone}
                    onChangeText={handleChange('phone')}
                    errorstyle={{marginLeft: 2}}
                  />
                  <InputBox
                    redlabel
                    label="Company"
                    placeholder="Company"
                    value={values?.company}
                    errors={touched?.company && errors?.company}
                    onChangeText={handleChange('company')}
                    errorstyle={{marginLeft: 2}}
                  />

                  <InputBox
                    placeholder="Please type your message here..."
                    redlabel
                    label="Message"
                    multiline={true}
                    numberOfLines={6}
                    textAlignVertical="top"
                    value={values?.message}
                    errors={touched?.message && errors?.message}
                    onChangeText={handleChange('message')}
                    errorstyle={{marginLeft: 2}}
                  />

                  <Button
                    children="Send message"
                    roundbtn
                    load={loading}
                    btnStyle={styles.sendbtn}
                    onPress={handleSubmit}
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({getcompany: state.home.getcompany});

const mapDispatchToProps = {CreateContactApi, GetCompanyApi};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
