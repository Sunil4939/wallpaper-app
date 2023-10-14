import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Clipboard,
} from 'react-native';
import {COLORS, FONTS, data, SIZES, images, icons} from '../../constants';
import styles from './styles';
import Loader from './../../component/modalLoading/index';
import Button from './../../component/Button/index';
// import Clipboard from '@react-native-clipboard/clipboard';
import Filter from './../filter/index';

const Payment = ({keyvalue, user, amount, orderid}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.number}>{keyvalue}</Text>
      <Text style={styles.date}>{user}</Text>
      <Text style={styles.rupee}>₹{amount}</Text>
      <Text style={styles.pymt_name}>{orderid}</Text>
    </View>
  );
};
const AffiliateSystem = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(
    'https://www.wellmee.in/Product/product_details/4545/activated-charcoal-bath-soap-with-coconut-olive-oil-no-chemical-no-anima....',
  );

  const copyToClipboard = () => {
    Clipboard.setString(copiedText);
    console.log('copiedText copy', copiedText);
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  //   console.log('copiedText  get', copiedText);
  // };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.pymtbox}>
          <View style={styles.urlbox}>
            <Text style={styles.url}>{copiedText} </Text>
          </View>
          <Button
            children="Copy url"
            mediumbtn
            btnStyle={styles.btncopy}
            onPress={() => copyToClipboard()}
          />
        </View>
        <View style={styles.pymtbox}>
          <View style={styles.row}>
            <Text style={styles.box2system}>Affiliate System</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
              <Image source={icons.filter} style={styles.filter} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.numberbox}>
              <Text style={styles.numbersystem}>05</Text>
              <Text style={styles.numbertext}>No of click</Text>
            </View>
            <View style={styles.numberbox}>
              <Text style={styles.numbersystem}>05</Text>
              <Text style={styles.numbertext}>No of click</Text>
            </View>
            <View style={styles.numberbox}>
              <Text style={styles.numbersystem}>05</Text>
              <Text style={styles.numbertext}>No of click</Text>
            </View>
          </View>
        </View>
        <View style={styles.pymtbox}>
          <View>
            <Text style={styles.pymthist}>Affiliate Earning History</Text>
          </View>
          <View style={styles.heshrow}>
            <Text style={styles.hesh}>#</Text>
            <Text style={styles.heshdate}>Referral User</Text>
            <Text style={styles.heshrupee}>Amount</Text>
            <Text style={styles.heshpymt_name}>Order Id</Text>
          </View>

          {data.affiliateearning.map((item, index) => (
            <Payment
              keyvalue={item.keyvalue}
              user={item.user}
              amount={item.amount}
              orderid={item.orderid}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default AffiliateSystem;
