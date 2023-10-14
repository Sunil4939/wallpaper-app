import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import { COLORS, data, icons, images } from './../../constants';
import styles from './styles';
import { connect } from 'react-redux';
import Loader from './../../component/modalLoading/index';
import InputBox from './../../component/InputText/index';
import { formattedDateServer } from './../../services/date';
import DropdownComponent from './../../component/dropdown/index';
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Button from './../../component/Button/index';
import { UpdateUserApi, GetuserIdApi } from './../../redux/actions/authActions';
import { Formik } from 'formik';
import * as yup from 'yup';
import { http2 } from './../../services/api';

const { height, width } = Dimensions.get('window');

const gender = [
  { value: '0', label: 'MALE' },
  { value: '1', label: 'FEMALE' },
  { value: '2', label: 'OTHER' },
];

const ProfileEdit = ({ navigation, UpdateUserApi, getuser, GetuserIdApi }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetuserIdApi(data => setLoading(data));
  }, []);

  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(images.profile2);

  const [postData, setPostData] = useState({
    image: http2 + getuser?.image || null,
    fullName: getuser?.fullName ? getuser?.fullName : null,
    dob: getuser?.dob == 'undefined' ? null : getuser?.dob,
    gender: getuser?.gender ? getuser?.gender : null,
  });
  const AddressValidationSchema = yup.object().shape({
    fullName: yup.string().required('please enter full name'),
  });

  const handleChange = (name, value) => {
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const OnSelectImage = () => {
    ImagePicker.openPicker({
      width: width * 0.8,
      height: height * 0.4,
      cropping: true,
    }).then(image => {
      setImg({
        uri: image.path,
        name: image.filename || Date.now() + '-' + image.path.slice(-10),
        type: image.mime,
      });
    });
  };
  const handleUpdate = values => {
    UpdateUserApi({ ...values, image: img?.uri ? img : null }, navigation, data =>
      setLoading(data),
    );
  };

  useEffect(() => {
    if (getuser?.image) {
      setImg({
        uri: http2 + getuser?.image,
        name: getuser?.image || Date.now() + '-' + getuser?.image,
        type: 'image/jpeg',
      });
    }
  }, [getuser]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View style={styles.innercontainer}>
        <View style={styles.profilebox}>
          <TouchableOpacity onPress={OnSelectImage} activeOpacity={0.5}>
            <Image source={img} style={styles.person} />
            <View style={styles.camerabox}>
              <Image source={icons.camera} style={styles.camera} />
            </View>
          </TouchableOpacity>
        </View>
        <Formik
          validationSchema={AddressValidationSchema}
          initialValues={postData}
          onSubmit={values => {
            handleUpdate(values);
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
                  onChangeText={handleChange('fullName')}
                  value={values?.fullName}
                  errors={touched?.fullName && errors?.fullName}
                />
                <InputBox
                  placeholder="Mobile no"
                  keyboardType="numeric"
                  maxLength={10}
                  editable={false}
                  value={`${getuser?.phoneNumber || ''}`}
                />
                <View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setOpen(true)}>
                    <InputBox
                      placeholder="DOB"
                      editable={false}
                      icon={icons.date}
                      value={values?.dob}
                    />
                  </TouchableOpacity>
                  <DatePicker
                    modal
                    title="Select date"
                    mode="date"
                    open={open}
                    date={new Date()}
                    onConfirm={d => {
                      setOpen(false);
                      setDate(formattedDateServer(d));
                      setFieldValue('dob', formattedDateServer(d));
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    theme="light"
                    textColor={COLORS.black}
                  />
                </View>

                <DropdownComponent
                  placeholder={values?.gender ? values?.gender : 'Select Gender'}
                  data={gender}
                  value={values?.gender}
                  onChange={item => {
                    setFieldValue('gender', item.label);
                  }}
                />
                <Button
                  children="Update"
                  mediumbtn
                  disabled={loading}
                  load={loading}
                  btnStyle={{ alignSelf: 'center', marginTop: height * 0.05 }}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => ({ getuser: state.auth.getuser });

const mapDispatchToProps = { UpdateUserApi, GetuserIdApi };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
