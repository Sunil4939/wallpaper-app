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
const SelfAssessment = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.heading, {fontSize: 14, ...FONTS.sixHundred}]}>
          Take Sort Self Assessment
        </Text>
        <Text style={styles.heading}>
          Based on your concern to book your consultation with our Ayurveda
          Doctors.
        </Text>

        <View style={{marginBottom:height*.04}}>
          <FlatList
            data={data.selfassesmentlist}
            renderItem={({item, index}) => (
              <View>
                <Text style={styles.boxheading}>{item.heading}</Text>

                <View>
                  {data.selfassesmentlist.map((items, index) => (
                    <View style={styles.rowdirection}>
                      <Image source={items.img} style={styles.images} />
                      <Text numberOfLines={3} style={styles.imageheading}>
                        {items.subheading}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelfAssessment);
