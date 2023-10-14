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
import {COLORS, data, icons, images} from './../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import Button from './../../component/Button/index';
import InputBox from './../../component/InputText/index';
import DropdownComponent from './../../component/dropdown/index';

const {height, width} = Dimensions.get('window');

const gender = [
  {value: '0', label: 'Male'},
  {value: '1', label: 'Female'},
  {value: '2', label: 'Other'},
];
const Age = [
  {value: '0', label: '10'},
  {value: '1', label: '20'},
  {value: '2', label: '16'},
  {value: '3', label: '18'},
];
const PatientDetail = () => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Image source={images.drprofile} style={styles.profileimg} />

          <View style={styles.rowdrop}>
            <Image
              source={icons.dr}
              style={[
                styles.profileicons,
                {width: width * 0.05, marginLeft: width * 0.017},
              ]}
            />
            <Text style={styles.profileText}>Dr. Payal kumari.</Text>
          </View>
          <View style={styles.rowdrop}>
            <Image source={icons.time} style={styles.profileicons} />
            <Text style={styles.profileText}>15 min</Text>
          </View>
          <View style={styles.rowdrop}>
            <Image source={icons.video} style={styles.profileicons} />
            <Text style={styles.profileText}>
              Web conferencing details provided upon confirmation.
            </Text>
          </View>
          <View style={styles.rowdrop}>
            <Image source={icons.date} style={styles.profileicons} />
            <Text style={styles.profileText}>
              1:15pm - 1:30pm, Tuesday, August 29, 2023
            </Text>
          </View>
        </View>

        <View style={styles.pinkBox}>
          <Text style={styles.heading}>
            Fill up the form for show the result
          </Text>

          <InputBox label="Name" placeholder="Your Name" />
          <InputBox label="E-mail" placeholder="Your E-mail" />
          <InputBox label="Mobile no" placeholder="Your Mobile no" />

          <View style={styles.rowdrop}>
            <View style={{marginRight: width * 0.11}}>
              <Text style={styles.label}>Gender</Text>
              <DropdownComponent
                dropdownStyle={{width: width * 0.4}}
                placeholder="Gender"
                data={gender}
              />
            </View>
            <View>
              <Text style={styles.label}>Age</Text>
              <DropdownComponent
                dropdownStyle={{width: width * 0.4}}
                placeholder="Age"
                data={Age}
              />
            </View>
          </View>

          <InputBox
            placeholder="Share about your disease"
            label="Share about your disease "
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />

          <Button
            children="Submit"
            mediumbtn
            btnStyle={{marginTop: height * 0.04, marginBottom: height * 0.02}}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
