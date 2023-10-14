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
import SkinSelfAssessment from './../selfAssessmentSkin/index';
import SelfAssessmentYoga from './../selfAssessmentYoga/index';
import ResultSelfAssessment from './../selfAssessment';
import SelfAssessment from "./../selfAssessment/index";
const {height, width} = Dimensions.get('window');



const Consultexpert = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />

      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.pinkBox}>
          <Text style={styles.text1}>Take a Short Self Assessment</Text>
          <Text style={styles.text2}>
            based on your concern to book your consultation with our Ayurveda
            Doctors.
          </Text>

          <Button
            children="Skin"
            roundbtn
            btnStyle={{marginTop: height * 0.015}}
            onPress={() => navigation.navigate('SkinSelfAssessment')}
          />
          <Button
            children="Hair"
            roundbtn
            btnStyle={{marginTop: height * 0.015}}
            onPress={() => navigation.navigate('SelfAssessment')}
          />
          <Button
            children="Wellness"
            roundbtn
            btnStyle={{marginTop: height * 0.015}}
            onPress={() => navigation.navigate('SelfAssessmentYoga')}
          />
          <Button
            children="Performance"
            roundbtn
            btnStyle={{marginTop: height * 0.015}}
            onPress={() => navigation.navigate('ResultSelfAssessment')}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Consultexpert);
