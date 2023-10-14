import React, {useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import TabNavigator from '../BottomTabNavigator';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import styles from './styles';
import {COLORS, icons} from '../../constants';
import BottomTab from './../BottomTabNavigator/index';
import AddAddress from './../../screens/addAddress/index';
import Payment from './../../screens/Payment/index';
import Favorite from './../../screens/favorite/index';
import ProfileEdit from './../../screens/editProfile/index';
import DeliveryAddress from './../../screens/addressDelivery/index';
import Affiliate from './../../screens/affiliate/index';
import PaymentHistory from './../../screens/paymentHistory/index';
import WithDrawRequest from './../../screens/withdrawrequest/index';
import Notification from './../../screens/notification/index';
import OfferList from './../../screens/offerlist/index';
import AllReview from './../../screens/Review/index';
import Feedback from './../../screens/feedback/index';
import Consultexpert from './../../screens/consultayurvedexpert';
import Result from './../../screens/Result/index';
import PatientDetail from './../../screens/patientDetail/index';
import ResultSecond from './../../screens/result2Second/index';
import Order from './../../screens/order/index';
import AffiliateSystem from './../../screens/affiliateSystem/index';
import ContactUs from './../../screens/contactUs/index';
import SelfAssessment from './../../screens/selfAssessment/index';
import SkinSelfAssessment from './../../screens/selfAssessmentSkin/index';
import SelfAssessmentYoga from './../../screens/selfAssessmentYoga/index';
import ResultSelfAssessment from './../../screens/resultselfassessment/index';
import Filter from './../../screens/filter/index';
import ProductDetail from './../../screens/productDetail/index';
import PrivacyPolicy from './../../screens/privacypolicy/index';
import TermCondition from './../../screens/termcondition/index';
import SupportPolicy from './../../screens/supportpolicy/index';
import ReturnPolicy from './../../screens/returnpolicy/index';
import Search from './../../screens/search/index';
import Tracking from './../../screens/tracking/index';
import BlogDetail from './../../screens/blogDetail/index';
import OrderBuy from './../../screens/buynow/index';
import OrderConfirm from './../../screens/orderConfirm/index';
import OrderHistory from './../../screens/orderHistory/index';
import Testimonial from './../../screens/testimonial/index';
import Product from './../../screens/BodyCare/index';
import AffiliateCreate from './../../screens/AffiliateCreate/index';

const Stack = createStackNavigator();

const StackNavigator = ({navigation, route}) => {
  const showeditbtn = route?.params?.showeditbtn;
  console.log('showeditbtn', showeditbtn);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: styles.headerTitle,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: styles.headerstyle,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTab"
        component={BottomTab}
      />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{
          title: 'Add Address',
        }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="DeliveryAddress"
        component={DeliveryAddress}
        options={{
          title: 'Delivery Address',
        }}
      />
      <Stack.Screen
        options={{
          title: 'Payment History',
        }}
        name="PaymentHistory"
        component={PaymentHistory}
      />
      <Stack.Screen
        name="WithDrawRequest"
        component={WithDrawRequest}
        options={{
          title: 'Withdraw Request',
        }}
      />
      <Stack.Screen
        name="OfferList"
        component={OfferList}
        options={{
          title: 'Offer',
        }}
      />
      <Stack.Screen
        name="AllReview"
        component={AllReview}
        options={{
          title: 'All Review',
        }}
      />
      <Stack.Screen
        name="Consultexpert"
        component={Consultexpert}
        options={{
          title: 'Consult Ayurveda Expert',
        }}
      />
      <Stack.Screen
        name="PatientDetail"
        component={PatientDetail}
        options={{
          title: 'Patient Detail',
        }}
      />
      <Stack.Screen
        options={{
          title: 'Result',
        }}
        name="ResultSecond"
        component={ResultSecond}
      />
      <Stack.Screen
        options={{
          title: 'Affiliate System',
        }}
        name="AffiliateSystem"
        component={AffiliateSystem}
      />
      <Stack.Screen
        options={{
          title: 'Contact Us',
        }}
        name="ContactUs"
        component={ContactUs}
      />
      <Stack.Screen
        options={{
          title: 'Self Assessment',
        }}
        name="SelfAssessment"
        component={SelfAssessment}
      />
      <Stack.Screen
        options={{
          title: 'Take Self Assessment',
        }}
        name="SkinSelfAssessment"
        component={SkinSelfAssessment}
      />
      <Stack.Screen
        options={{
          title: 'Take Self Assessment',
        }}
        name="SelfAssessmentYoga"
        component={SelfAssessmentYoga}
      />
      <Stack.Screen
        options={{
          title: 'Order List',
        }}
        name="Order"
        component={Order}
      />
      <Stack.Screen
        options={{
          title: 'Result',
        }}
        name="ResultSelfAssessment"
        component={ResultSelfAssessment}
      />
      <Stack.Screen
        options={{
          title: 'Product Detail',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <Stack.Screen
        options={{
          title: 'Privacy Policy',
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <Stack.Screen
        options={{
          title: 'Term Condition',
        }}
        name="TermCondition"
        component={TermCondition}
      />
      <Stack.Screen
        options={{
          title: 'Support Policy',
        }}
        name="SupportPolicy"
        component={SupportPolicy}
      />
      <Stack.Screen
        options={{
          title: 'Return Policy',
        }}
        name="ReturnPolicy"
        component={ReturnPolicy}
      />
      <Stack.Screen
        options={{
          title: 'Order Buy',
        }}
        name="OrderBuy"
        component={OrderBuy}
      />
      <Stack.Screen
        name="OrderConfirm"
        component={OrderConfirm}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          title: 'Order History',
        }}
      />
      <Stack.Screen
        name="BlogDetail"
        component={BlogDetail}
        options={{
          title: 'Blog Detail',
        }}
      />

      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{
          title: 'Favourite',
        }}
      />
      <Stack.Screen
        name="AffiliateCreate"
        component={AffiliateCreate}
        options={{
          title: 'Add Affiliate',
        }}
      />
      <Stack.Screen name="Testimonial" component={Testimonial} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Tracking" component={Tracking} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Affiliate" component={Affiliate} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
