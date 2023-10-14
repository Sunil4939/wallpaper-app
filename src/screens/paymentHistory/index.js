import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, data, SIZES, images, icons} from '../../constants';
import styles from './styles';
import Loader from './../../component/modalLoading/index';

const Payment = ({keyvalue, date, amount, paymentmethod}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.number}>{keyvalue}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.pymt_name}>{paymentmethod}</Text>
      <Text style={styles.rupee}>₹{amount}</Text>
    </View>
  );
};
const PaymentHistory = () => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Loader loading={loading} />
      <ScrollView
        style={styles.innercontainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.pymtbox}>
          <View>
            <Text style={styles.pymthist}>Payment History</Text>
          </View>
          <View style={styles.heshrow}>
            <Text style={styles.hesh}>#</Text>
            <Text style={styles.heshdate}>Date</Text>
            <Text style={styles.heshpymt_name}>Payment Method</Text>
            <Text style={styles.heshrupee}>Amount</Text>
          </View>

          {data.pymenthistory.map((item, index) => (
            <Payment
              keyvalue={item.keyvalue}
              date={item.date}
              amount={item.amount}
              paymentmethod={item.paymentmethod}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default PaymentHistory;
