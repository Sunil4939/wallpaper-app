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
import HeadingSeeAll from './../../component/carts/headingSeeall';
import NewProductCart from './../../component/carts/newproductCart';
import BlogCart from './../../component/carts/blogcart';

const {height, width} = Dimensions.get('window');
const SkinSelfAssessment = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>How to heal wounds faster naturally</Text>
        <Image source={images.skin1} style={styles.orderdone} />
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue
        </Text>

        <Text style={styles.heading}>What is the steps for skincare</Text>
        <Text style={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla,
          mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis
          tellus. Nullam quis imperdiet augue
        </Text>

        <View style={{marginBottom: height * 0.04}}>
          {data.skinselfassesmentlist.map((item, index) => (
            <View>
              <Text style={styles.boxheading}>{item.heading}</Text>
              <Text style={styles.content}>{item.subheading}</Text>
              <Image source={item.img} style={styles.orderdone} />
            </View>
          ))}
        </View>
        <View style={{backgroundColor: '#A6F4F326'}}>
          <HeadingSeeAll heading="Skincare" seeAll />
          <FlatList
            data={data.NewProductCartdata}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <NewProductCart
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
                ratings={item.ratings}
                rate={item.rate}
                price={item.price}
                off={item.off}
                marginleft={{marginLeft: index == 0 ? width * 0.03 : 3}}
                // onPresscart
                onPressimg={() => navigation.navigate('ProductDetail')}
              />
            )}
          />
        </View>
        <View style={{marginTop: height * 0.02}}>
          <HeadingSeeAll heading="Blog" seeAll />
          <FlatList
            data={data.bloglist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <BlogCart
                blogStyle={{
                  marginHorizontal: width * 0.03,
                  marginTop: height * 0.01,
                  marginBottom: height * 0.06,
                }}
                text1={item.text1}
                text2={item.text2}
                image={item.img}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SkinSelfAssessment);
