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
import {COLORS, FONTS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';

const {height, width} = Dimensions.get('window');
const SelfAssessmentYoga = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>
          Know Your Body Type According To Ayurveda
        </Text>
        <Image source={images.yoga} style={styles.orderdone} />

        <Text style={styles.boxheading}>
          According to Ayurveda-
          <Text style={styles.content}>
            the ancient science of life, the world constitutes of five elements
            that are present in every cell, every tissue and every organ in our
            body.
          </Text>
        </Text>

        <Text style={styles.heading}>What are my Dominant elements?</Text>
        <Text style={styles.content}>
          The combination of these elements results in three doshas known as
          Vata, Kapha, and Pitta.
        </Text>
        <View
          style={[styles.row, {width: width * 0.9, marginTop: height * 0.02}]}>
          <View style={styles.smallimgbox}>
            <Image source={icons.air} style={styles.smallimg} />
            <Text style={styles.smallimgtext}>Air</Text>
            <Image source={icons.plus} style={styles.plus} />
            <Image source={icons.water2} style={styles.smallimg} />
            <Text style={styles.smallimgtext}>Ether</Text>
          </View>
          <View style={styles.smallimgbox}>
            <Image source={icons.fire} style={styles.smallimg} />
            <Text style={styles.smallimgtext}>Fire</Text>
            <Image source={icons.plus} style={styles.plus} />
            <Image source={icons.water} style={styles.smallimg} />
            <Text style={styles.smallimgtext}>water</Text>
          </View>
          <View style={styles.smallimgbox}>
            <Image source={icons.earth} style={styles.smallimg} />
            <Text style={styles.smallimgtext}>Earth</Text>
            <Image source={icons.plus} style={styles.plus} />
            <Image source={icons.water} style={styles.smallimg} />
            <Text style={styles.smallimgtext}>water</Text>
          </View>
        </View>
        <Text style={[styles.content, {marginTop: height * 0.02}]}>
          The unique combination of your doshas is called your Prakriti. The
          balance of your doshas govern your physiological, mental, and
          emotional health. Any imbalance in these is called your Vikriti.
        </Text>

        <View>
          <Text style={[styles.boxheading, {textDecorationLine: 'underline'}]}>
            Prakriti
          </Text>
          <Image
            source={images.track1}
            style={[styles.orderdone, {resizeMode: 'cover'}]}
          />
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Healthy bowel function</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Good sleep cycle</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Healthy metabolism Energy</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Emotional well-being</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Clear and healthy Skin</Text>
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.boxheading,
              {textDecorationLine: 'underline', marginTop: height * 0.05},
            ]}>
            Vikriti
          </Text>
          <Image source={images.track2} style={styles.orderdone} />
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Irregular Bowel Function</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Weight fluctuation</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Acne Excessive dryness</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Dark Spots </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Premature Ageing</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelfAssessmentYoga);
