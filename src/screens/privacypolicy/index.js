import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Button from './../../component/Button/index';

import {GetCompanyApi} from './../../redux/actions/homeActions.js';
import Loader from './../../component/modalLoading/index';
import RenderHtml from 'react-native-render-html';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

const PrivacyPolicy = ({GetCompanyApi, getcompany}) => {
  const [loading, setLoading] = useState(false);
  const {width} = useWindowDimensions();
  useEffect(() => {
    GetCompanyApi(data => setLoading(data));
  }, []);

  return (
    <View style={styles.maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Loader loading={loading} />
        <View style={styles.innercontainer}>
          <RenderHtml
            contentWidth={width}
            source={{html: getcompany?.data?.privacy_policy}}
            tagsStyles={{
              body: {
                whiteSpace: 'normal',
                color: 'gray',
              },
            }}
          />
        </View>
        {/* <Button
          children="Continue"
          mediumbtn
          btnStyle={{alignSelf: 'center', marginVertical: height * 0.04}}
        /> */}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({getcompany: state.home.getcompany});
const mapDispatchToProps = {GetCompanyApi};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
