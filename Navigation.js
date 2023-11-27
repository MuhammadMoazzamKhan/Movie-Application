import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import Movie from './screens/Movie';
import Person from './screens/Person';
import Search from './screens/Search';



const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName="Home" >
      <Stack.Screen options={{headerShown:false}}  name="Home"  component={Home} />
      <Stack.Screen options={{headerShown:false}}  name="Movie"  component={Movie} />
      <Stack.Screen options={{headerShown:false}}  name="Person"  component={Person} />
      <Stack.Screen options={{headerShown:false}}  name="Search"  component={Search} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;