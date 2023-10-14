import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS} from './../../constants';
import {data} from './../../constants';
import styles from './styles';
import Button from './../../component/Button/index';
import {connect, useDispatch} from 'react-redux';
import {ONBOARDING} from './../../redux/types';
const {width, height} = Dimensions.get('window');

const OnboardingScreen = ({image, title, subTitle}) => {
  return (
    <View style={{width: width}}>
      <Image style={styles.image} source={image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subTitle}</Text>
    </View>
  );
};

const Onboarding = ({navigation, onboard}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != data?.OnBoardingData.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: ONBOARDING,
            payload: false,
          });
        }}
        style={{marginRight: width * 0.05}}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={data.OnBoardingData}
        renderItem={({item, index}) => (
          <OnboardingScreen
            key={index}
            image={item?.image}
            title={item.title}
            subTitle={item.subTitle}
          />
        )}
      />

      <View style={styles.dot_box}>
        {data.OnBoardingData.map((item, index) => {
          return (
            <View key={item.id}>
              <View
                style={[
                  styles.dot,
                  currentSlideIndex === item.id && {
                    backgroundColor: COLORS.black,
                    width: width * 0.09,
                  },
                ]}></View>
            </View>
          );
        })}
      </View>

      {currentSlideIndex === 3 ? (
        <Button
          children="Get Started"
          mediumbtn
          onPress={() => {
            dispatch({
              type: ONBOARDING,
              payload: false,
            });
          }}
          btnStyle={{marginBottom: height * 0.06, alignSelf: 'center'}}
        />
      ) : (
        <Button
          children="Next"
          mediumbtn
          onPress={() => goNextSlide()}
          btnStyle={{marginBottom: height * 0.06, alignSelf: 'center'}}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({onboard: state.home.onboard});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
