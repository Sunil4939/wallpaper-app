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
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import BlogCart from './../../component/carts/blogcart';
import SearchBox from './../../component/InputText/search';
import Filter from './../filter/index';
import Share from 'react-native-share';
import LoginBox from './../../component/carts/login';
import {GetBlogByIdApi} from '../../redux/actions/homeActions';
import {http2} from './../../services/api';

const {height, width} = Dimensions.get('window');

const BlogDetail = ({navigation, GetBlogByIdApi, getblogbyid}) => {
  const [loading, setLoading] = useState(false);
  const share = () => {
    const options = {
      message: 'hello dear',
      url: 'http://localhost:254',
      email: 'priyasahu833242@gmail.com',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  useEffect(() => {
    GetBlogByIdApi();
  }, []);

  console.log('getblogbyid', getblogbyid);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{uri: http2 + getblogbyid?.image}}
            style={styles.oneImg}
          />
          <Text style={styles.exploretitle}>{getblogbyid?.title}</Text>
          <Text style={[styles.exploretitle2, {fontSize: 13}]}>
            {getblogbyid?.subtitle}{' '}
          </Text>

          <Text style={styles.exploretitle2}>{getblogbyid?.discription} </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getblogbyid: state.home.getblogbyid,
});

const mapDispatchToProps = {
  GetBlogByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
