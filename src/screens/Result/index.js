import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {COLORS, FONTS, SIZES, data, icons, images} from '../../constants';
import Button from '../../component/Button';
import {formattedDateServer} from './../../services/date';
import {connect} from 'react-redux';
import {CalenderList} from './../../component/calender/index';

const Result = ({navigation}) => {
  const [checked, setChecked] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
        <Text style={[styles.text6, {marginVertical: SIZES.height * 0.01}]}>
          Select Date
        </Text>

        <CalenderList />

        <View style={styles.modalstyle}>
          <Text style={styles.text6}>Select Time</Text>
          <FlatList
            data={data.Time}
            numColumns={4}
            renderItem={({item, index}) => (
              <View
                style={[
                  styles.modaldata,
                  {
                    backgroundColor:
                      checked == index ? COLORS.primary : COLORS.white,
                  },
                ]}>
                <TouchableOpacity onPress={() => setChecked(index)}>
                  <Text
                    style={[
                      styles.Timetext,
                      {
                        color: checked == index ? COLORS.white : COLORS.primary,
                      },
                    ]}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <Button
          children={'Continue'}
          mediumbtn
          btnStyle={{
            alignSelf: 'center',
            marginTop: SIZES.height * 0.06,
            marginBottom: SIZES.height * 0.02,
          }}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
