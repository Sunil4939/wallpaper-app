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

const {height, width} = Dimensions.get('window');

const ResultSecond = () => {
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.heading}>Consult with doctor confirm !</Text>

          <Image source={images.congrets} style={styles.profileimg} />
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
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultSecond);
