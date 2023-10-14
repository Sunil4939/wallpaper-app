import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {GetTestimonialApi} from './../../redux/actions/testimonialAction';
import Loader from './../../component/modalLoading/index';
import {connect} from 'react-redux';
import Stars from 'react-native-stars';
import {http2} from './../../services/api';
import {COLORS, data, icons, images} from '../../constants';

const {height, width} = Dimensions.get('window');

const Testimonial = ({GetTestimonialApi, getTestimonial}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetTestimonialApi(data => setLoading(data));
  }, []);

  return (                  
    <View style={styles.maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Loader loading={loading} />
        <View style={styles.innercontainer}>
          {getTestimonial?.map((item, index) => (
            <View style={styles.tectimonialBox}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.tectimonialboximg}>
                <Image
                  source={{uri: http2 + item?.image}}
                  style={styles.tectimonialimg}
                />
              </TouchableOpacity>

              <View style={styles.tectimonialBox2}>
                <Text style={styles.tectimonialtitle}>{item?.name}</Text>

                <View style={styles.star}>
                  <Stars
                    default={item?.rating}
                    count={5}
                    starSize={13}
                    spacing={5}
                    fullStar={icons.fillstar}
                    emptyStar={icons.star}
                    disabled={true}
                  />
                </View>
                <Text style={styles.tectimonialtitle2}>
                  {item?.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getTestimonial: state?.testimonial?.getTestimonial,
});
const mapDispatchToProps = {GetTestimonialApi};

export default connect(mapStateToProps, mapDispatchToProps)(Testimonial);
