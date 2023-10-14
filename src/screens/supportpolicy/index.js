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

const SupportPolicy = ({GetCompanyApi, getcompany}) => {
  const [loading, setLoading] = useState(false);
  const {width} = useWindowDimensions();
  useEffect(() => {
    GetCompanyApi(data => setLoading(data));
  }, []);
  console.log('getcompany  ', getcompany?.data?.support_policy);
  return (
    <View style={styles.maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Loader loading={loading} />
        <View style={styles.innercontainer}>
          {getcompany?.data?.support_policy ? (
            <RenderHtml
              contentWidth={width}
              source={{html: getcompany?.data?.support_policy}}
              tagsStyles={{
                body: {
                  whiteSpace: 'normal',
                  color: 'gray',
                },
              }}
            />
          ) : (
            <Text style={styles.textcondition}>
              Support Policy Not Available
            </Text>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SupportPolicy);
