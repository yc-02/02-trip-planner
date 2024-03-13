import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import AccountNavScreen from './AccountNavScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { RootTabParamList } from '../utils/NavigationType';
import SearchStack from './Search/SearchStack';
import AddScreen from './Add/AddScreen';



const Tab = createBottomTabNavigator<RootTabParamList>();

export default function HomeTabs() {
const {colors} = useTheme()

  return (
    <Tab.Navigator
        screenOptions={({route})=>({
            tabBarIcon:({focused,color})=>{
                let iconName:'luggage'|'assignment-add'|'travel-explore'|'menu' ; 
                if(route.name === 'Home'){
                    iconName = focused? 'luggage':'luggage'
                }else if(route.name === 'Add'){
                    iconName = focused?'assignment-add':'assignment-add'
                }else if(route.name ==='Search'){
                    iconName = focused? 'travel-explore':'travel-explore'
                }else if(route.name === 'AccountNav'){
                    iconName = focused?'menu':'menu'
                }else{
                    iconName='luggage'
                }
                return <MaterialIcons name={iconName} size={30} color={color} />
            },
            tabBarActiveTintColor:colors.primary,
            tabBarInactiveTintColor:colors.text,
            headerShown:false,
            tabBarShowLabel:false,
        })}
        
    >
        <Tab.Screen name='Home' component={HomeScreen}/>
        <Tab.Screen name='Add' component={AddScreen}/>
        <Tab.Screen name='Search' component={SearchStack}/>
        <Tab.Screen name='AccountNav' component={AccountNavScreen}/>
    </Tab.Navigator>
  )
}
