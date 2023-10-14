import React, {useState, useEffect} from 'react';
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
import {connect} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import styles from './styles';
import StepIndicator from 'react-native-step-indicator';
import {GetOrderByIdApi} from './../../redux/actions/orderAction';
const {height, width} = Dimensions.get('window');

const StepLabels = ({name, hrs}) => {
  return (
    <View style={styles.stepLabelBox}>
      <Text style={styles.steplabel}>{name}</Text>
      <Text style={styles.hrs}>{hrs}</Text>
    </View>
  );
};

const Tracking = ({getorderbyid, GetOrderByIdApi}) => {
  const customStyles = {
    stepIndicatorSize: width * 0.04,
    currentStepIndicatorSize: width * 0.04,
    separatorStrokeWidth: 3,
    // currentStepStrokeWidth: 4,
    stepStrokeCurrentColor: COLORS.green,
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: COLORS.green,
    stepStrokeUnFinishedColor: COLORS.green,
    stepIndicatorCurrentColor: COLORS.green,
    separatorFinishedColor: COLORS.green,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: COLORS.green,
    stepIndicatorUnFinishedColor: COLORS.gray60,
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: COLORS.green,
    stepIndicatorLabelFinishedColor: COLORS.green,
    stepIndicatorLabelUnFinishedColor: COLORS.gray60,
    labelColor: COLORS.gray60,
    labelSize: width * 0.034,
    labelAlign: 'flex-start',
    labelFontFamily: 'Poppins-SemiBold-600',
    currentStepLabelColor: COLORS.green,
  };

  const [loading, setLoading] = useState(false);
  const track = getorderbyid?.data?.shipment_track_activities;

  const returnList = [
    {id: 0, name: 'RETURNREQUEST'},
    {id: 1, name: 'RETURNED'},
  ];

  const labels = [
    {id: 0, name: 'ORDERED', hrs: ''},
    {id: 1, name: 'SHIPPED', hrs: track?.[0]?.location},
    {id: 2, name: 'OUT FOR DELIVERY', hrs: ''},
    {id: 3, name: 'DELIVERED', hrs: ''},
  ];

  const trackdata = labels?.findIndex(
    o => o?.name == getorderbyid?.data?.product?.[0]?.status,
  );

  const trackreturndata = returnList?.findIndex(
    o => o?.name == getorderbyid?.data?.product?.[0]?.status,
  );

  // console.log(' getorderbyid?.data?.product?.[0]?.status', trackreturndata);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View>
          {getorderbyid?.data?.product?.[0]?.status == 'RETURNREQUEST' ? (
            <View style={styles.StepIndicatorBox2}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={trackreturndata}
                labels={[
                  <View>
                    {returnList?.map((item, index) => (
                      <StepLabels name={item?.name} key={index} />
                    ))}
                  </View>,
                ]}
                stepCount={returnList?.length}
                direction="vertical"
              />
            </View>
          ) : (
            <View style={styles.StepIndicatorBox}>
              <StepIndicator
                customStyles={customStyles}
                currentPosition={trackdata}
                labels={[
                  <View>
                    {labels?.map((item, index) => (
                      <StepLabels
                        key={index}
                        name={item?.name}
                        hrs={
                          getorderbyid?.data?.product?.[0]?.status == 'SHIPPED'
                            ? item?.hrs
                            : null
                        }
                      />
                    ))}
                  </View>,
                ]}
                stepCount={labels?.length}
                direction="vertical"
              />
            </View>
          )}

          <View style={styles.borderBoard}>
            {trackdata == 0 ? <View style={styles.border}></View> : ''}
            {trackdata == 1 ? (
              <View style={[styles.border, {bottom: height * 0.23}]}></View>
            ) : (
              ''
            )}
            {trackdata == 2 ? (
              <View style={[styles.border, {bottom: height * 0.12}]}></View>
            ) : (
              ''
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({getorderbyid: state.order.getorderbyid});
const mapDispatchToProps = {GetOrderByIdApi};

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);
