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
import Button from './../../component/Button/index';

const {height, width} = Dimensions.get('window');

const WithDrawRequest = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <View style={styles.innercontainer}>
        <Text style={styles.head}>
          Enter money as much as you want to withdraw
        </Text>

        <Text style={styles.rupe}>₹20</Text>
        <View style={styles.row}>
          <Button
            children="Cancle"
            mediumbtn
            btnStyle={{
              borderWidth: 0.6,
              borderColor: COLORS.red,
              backgroundColor: COLORS.white,
            }}
            btntextStyle={{color: COLORS.red}}
          />
          <Button children="Withdraw" mediumbtn />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WithDrawRequest);



// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   View,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   StatusBar,
// } from 'react-native';
// import {COLORS, FONTS, data, icons, images} from '../../constants';
// import {connect} from 'react-redux';
// import Loader from './../../component/modalLoading/index';
// import styles from './styles';
// import StepIndicator from 'react-native-step-indicator';

// import {GetOrderByIdApi} from './../../redux/actions/orderAction';
// const {height, width} = Dimensions.get('window');
// const StepLabels = ({name, hrs}) => {
//   return (
//     <View style={styles.stepLabelBox}>
//       <Text style={styles.steplabel}>{name}</Text>
//       <Text style={styles.hrs}>{hrs}</Text>
//     </View>
//   );
// };

// const Tracking = ({GetOrderByIdApi, getorderbyid}) => {
//   const [loading, setLoading] = useState(false);
//   // console.log('shipment_track ', getorderbyid?.data?.shipment_track_activities);
//   const labels = [
//     {id: 0, name: 'Total Day', hrs: '19:00Hrs'},
//     {id: 1, name: 'Total Day', hrs: '22:00Hrs'},
//     {id: 2, name: 'Total Day', hrs: '22:00Hrs'},
//     {id: 3, name: 'Total Day', hrs: '22:00Hrs'},
//   ];
//   const customStyles = {
//     stepIndicatorSize: width * 0.04,
//     currentStepIndicatorSize: width * 0.04,
//     separatorStrokeWidth: 3,
//     // currentStepStrokeWidth: 4,
//     stepStrokeCurrentColor: COLORS.green,
//     stepStrokeWidth: 0,
//     stepStrokeFinishedColor: COLORS.green,
//     stepStrokeUnFinishedColor: COLORS.green,
//     stepIndicatorCurrentColor: COLORS.green,
//     separatorFinishedColor: COLORS.green,
//     separatorUnFinishedColor: '#aaaaaa',
//     stepIndicatorFinishedColor: COLORS.green,
//     stepIndicatorUnFinishedColor: COLORS.gray60,
//     stepIndicatorLabelFontSize: 0,
//     currentStepIndicatorLabelFontSize: 0,
//     stepIndicatorLabelCurrentColor: COLORS.green,
//     stepIndicatorLabelFinishedColor: COLORS.green,
//     stepIndicatorLabelUnFinishedColor: COLORS.gray60,
//     labelColor: COLORS.gray60,
//     labelSize: width * 0.034,
//     labelAlign: 'flex-start',
//     labelFontFamily: 'Poppins-SemiBold-600',
//     currentStepLabelColor: COLORS.green,
//   };

//   console.log('Tracking', getorderbyid?.shipment_track_activities);
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
//       <Loader loading={loading} />
//       <ScrollView
//         style={styles.innercontainer}
//         showsVerticalScrollIndicator={false}>
//         {/* <View>
//           <View style={styles.row}>
//             <View style={styles.row}>
//               <View style={styles.righticonbox}>
//                 <Image style={styles.righticon} source={icons.right} />
//               </View>
//               <View style={styles.borderheight}></View>
//             </View>
//             <View style={styles.marginleft}>
//               <View>
//                 <Text style={styles.trackheading}>
//                   Order Confirmed, Aug 16 2023
//                 </Text>
//                 <View>
//                   <Text style={styles.tracksubheading}>
//                     Your Order has been placed.
//                   </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 17th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>
//                 <View>
//                   <Text style={styles.tracksubheading}>
//                     Seller has processed your order.
//                   </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 18th Aug 2023 - 08:00AM
//                   </Text>
//                 </View>
//                 <View>
//                   <Text style={styles.tracksubheading}>
//                     Your item has been picked up by courler partner.{' '}
//                   </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 19th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={[styles.row, {marginTop: height * 0.03}]}>
//             <View style={styles.row}>
//               <View style={styles.righticonbox}>
//                 <Image style={styles.righticon} source={icons.right} />
//               </View>
//               <View style={styles.borderheight}></View>

//               <View style={styles.marginleft}>
//                 <View style={styles.row}>
//                   <Text style={styles.trackheading}>Shipped </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 17th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={styles.tracksubheading}>
//                     Ekart Logistics - FMPC98877678878
//                   </Text>
//                   <Text
//                     style={[
//                       styles.tracksubheading,
//                       {color: COLORS.gray60, marginTop: height * -0.002},
//                     ]}>
//                     Your item has been shipped.
//                   </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 17th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>
//                 <View style={{marginTop: height * 0.03}}>
//                   <Text style={styles.trackgrayheading}>
//                     Your item has been received in the hub nearest to you.
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
         
//           <View style={[styles.row, {marginTop: height * 0.03}]}>
//             <View style={styles.row}>
//               <View style={styles.righticonbox}>
//                 <Image style={styles.righticon} source={icons.right} />
//               </View>
//               <View
//                 style={[styles.borderheight, {height: height * 0.1}]}></View>
//               <View style={styles.marginleft}>
//                 <View style={styles.row}>
//                   <Text style={styles.trackheading}>Out For Delivery </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 17th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={styles.tracksubheading}>
//                     Ekart Logistics - FMPC98877678878
//                   </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 17th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={[styles.row, {marginTop: height * 0.03}]}>
//             <View style={styles.row}>
//               <View style={styles.righticonbox}>
//                 <Image style={styles.righticon} source={icons.right} />
//               </View>

//               <View style={styles.marginleft}>
//                 <View style={styles.row}>
//                   <Text style={styles.trackheading}>Delivered </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 23th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={styles.tracksubheading}>
//                     Your item has been delivered
//                   </Text>
//                   <Text style={styles.trackgrayheading}>
//                     Tue, 17th Aug 2023 - 11:00PM
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View> */}
//         {/* <View style={{height: height * 0.6}}>
//           <StepIndicator
//             customStyles={customStyles}
//             currentPosition={1}
//             labels={labels}
//             stepCount={4}
//             direction="vertical"
//           />
//         </View> */}
//         <View style={styles.StepIndicatorBox}>
//           <StepIndicator
//             customStyles={customStyles}
//             currentPosition={2}
//             labels={[
//               <View>
//                 {labels.map((item, index) => (
//                   <StepLabels name={item.name} hrs={item.hrs} />
//                 ))}
//               </View>,
//             ]}
//             // labels={labels2}
//             stepCount={4}
//             direction="vertical"
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const mapStateToProps = state => ({getorderbyid: state.order.getorderbyid});
// const mapDispatchToProps = {GetOrderByIdApi};

// export default connect(mapStateToProps, mapDispatchToProps)(Tracking);
