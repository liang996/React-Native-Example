import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import homeTabData from '../../routes/homeTab';

const tabfocusedColor = '#86B404';
const tabColor = '#04B4AE';

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;
          const iconView = options.tabBarIcon({focused: isFocused});

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                paddingTop: 6,
                paddingBottom: 6,
                borderTopColor: '#EFEFEF',
                borderTopWidth: 1,
              }}>
              {iconView}
              <Text
                style={{
                  color: isFocused ? tabfocusedColor : tabColor,
                  paddingTop: 5,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const BottomTabs = createBottomTabNavigator();

class DashboardScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <BottomTabs.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
          {homeTabData.map((props, idx) => {
            //路由前判断是否登录
            // const value = AsyncStorage.getItem('token');
            // if( value === null){
            //   navigation.replace('SignIn');
            // }else{
            //   return <BottomTabs.Screen key={idx} {...props} />;
            // }
            return <BottomTabs.Screen key={idx} {...props} />;
          })}
        </BottomTabs.Navigator>
      </React.Fragment>
    );
  }
}

export default DashboardScreen;
