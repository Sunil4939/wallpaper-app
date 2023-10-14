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
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {COLORS, FONTS, SIZES, data, icons, images} from '../../constants';
import Button from '../../component/Button';
import {connect} from 'react-redux';
import NewProductCart from './../../component/carts/newproductCart';

const ResultSelfAssessment = ({navigation}) => {
  const [checked, setChecked] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
        <Text style={styles.mainheading}>Result of Sort Self Assessment</Text>
        <Text style={styles.heading}>About Patient</Text>
        <View style={styles.marginLeft}>
          <View style={styles.row}>
            <Text style={styles.patienthead}>Name :</Text>
            <Text style={styles.patientsubhead}>Pawan kumar</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.patienthead}>Email-id :</Text>
            <Text style={styles.patientsubhead}>Pawan@gmail.com</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.patienthead}>Mobile no :</Text>
            <Text style={styles.patientsubhead}>9998866412</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.patienthead}>Gender :</Text>
            <Text style={styles.patientsubhead}>Male</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.patienthead}>Age :</Text>
            <Text style={styles.patientsubhead}>20</Text>
          </View>
        </View>
        <Text style={styles.heading}>About Disease</Text>
        <Image source={images.yoga} style={styles.orderdone} />
        <Text style={styles.redtext}>PITTA</Text>
        <Text style={styles.content}>
          According to Ayurveda, each person is born with a unique, unchanging
          combination of bioenergies or doshas.These three bio-energies are
          called Vatha, Pitta, and Kapha and they govern the function of our
          bodies on a physical and emotional level and determine the body-mind
          constitution.  {'\n\n'}
          We all have one predominant dosha, yet everyone has a little of the
          other two. When the doshas are in balance, you experience good health
          whereas an imbalance leads to disease. Variations from the diet and
          lifestyle according to your body type can lead to imbalances easily.
        </Text>
        <Image source={images.drprofile} style={styles.profileimg} />

        <Button
          children="Consult Doctor"
          mediumbtn
          btnStyle={{alignSelf: 'center', marginVertical: SIZES.height * 0.02}}
        />
        <Text style={styles.mainheading}>
          I have curated a personalised Ayurvedic wellness care plan for you:
        </Text>
        <View
          style={{
            backgroundColor: '#A6F4F326',
            paddingVertical: SIZES.height * 0.02,
            marginVertical: SIZES.height * 0.02,
          }}>
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
                marginleft={{marginLeft: index == 0 ? SIZES.width * 0.02 : 3}}
              />
            )}
          />
        </View>
        <View style={styles.marginLeft}>
          <Text style={[styles.dotText, {marginVertical: SIZES.height * 0.01}]}>
            Here are some changes you can incorporate into your lifestyle
          </Text>
          <View style={styles.dotrow}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>
              Exercise first thing in the morning.
            </Text>
          </View>
          <View style={styles.dotrow}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>
              Protect yourself from wind and cold by covering yourselves well.
            </Text>
          </View>
          <View style={styles.dotrow}>
            <View style={styles.dot}></View>
            <Text style={styles.dotText}>Do not skip meals.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultSelfAssessment);
