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
  ActivityIndicator,
} from 'react-native';
import {COLORS, data, icons, images} from '../../constants';
import styles from './styles';
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import BlogCart from './../../component/carts/blogcart';
import SearchBox from './../../component/InputText/search';
import Filter from './../filter/index';
import Share from 'react-native-share';
import ImgToBase64 from 'react-native-image-base64';
import {http2} from './../../services/api';
import LoginBox from './../../component/carts/login';
import {GetAllBlogApi, GetBlogByIdApi} from '../../redux/actions/homeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const Blog = ({
  navigation,
  token,
  GetAllBlogApi,
  getallblog,
  GetBlogByIdApi,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllBlogApi(data => setLoading(data));
  }, []);
  const blogcount = getallblog?.length;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.red} />
        </View>
      ) : (
        <ScrollView
          style={styles.innercontainer}
          showsVerticalScrollIndicator={false}>
          {getallblog ? (
            <View>
              <Text style={styles.blog}>{blogcount} Blog</Text>
              {getallblog?.map((item, index) => (
                <BlogCart
                  key={index}
                  text1={item?.title}
                  text2={item?.discription}
                  image={{uri: http2 + item?.image}} //getallblog?.image
                  onPress={() =>
                    GetBlogByIdApi(item?._id, navigation, data =>
                      setLoading(data),
                    )
                  }
                />
              ))}
            </View>
          ) : (
            <View style={styles.mainbox}>
              <Image source={images.noproduct2} style={styles.imagecartempty} />
              <Text style={styles.cartempty}>No Blogs here..</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  getallblog: state.home.getallblog,
});

const mapDispatchToProps = {
  GetAllBlogApi,
  GetBlogByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
