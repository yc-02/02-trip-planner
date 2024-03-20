import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
export type renderIconType={
    name:string
    iconName:string
    icon:number
    iconColor:string
}




const iconComponents= [MaterialIcons,FontAwesome6,MaterialCommunityIcons]     
export const ActivityIcons=({name,iconName,icon,iconColor}:{
    name:string|null,
    iconName:any,
    icon:number,
    iconColor:string,
    })=>{
    const IconComponent = iconComponents[icon]
    const {colors}=useTheme()
        return(
            <View style={{alignItems:'center'}}>
                <IconComponent name={iconName} size={24} color={iconColor} />
                {name!=null && <Text numberOfLines={3} style={{color:colors.text}}>{name}</Text>}
            </View>
        )
    }
    
export const PressableActivityIcons = ({name,iconName,icon,handlePressIcon,iconColor}:{
    name:string|null,
    iconName:any,
    icon:number,
    iconColor:string,
    handlePressIcon:(iconName: string, icon: number,iconColor:string,) => void
    })=>{
    return(
        <Pressable onPress={()=>handlePressIcon(iconName,icon,iconColor,)}>
            <ActivityIcons name={name} iconName={iconName} icon={icon} iconColor={iconColor} />
        </Pressable>
    )
}



export const Transportation = [
    {name:'Departure', iconName:'flight-takeoff', icon:0, iconColor:'darkslategrey'},
    {name:'Arrival', iconName:'flight-land', icon:0, iconColor:'darkslategrey'},
    {name:'Car Rental', iconName:'car-rental', icon:0, iconColor:'darkslategrey'},
    {name:'Driving', iconName:'directions-car', icon:0, iconColor:'darkslategrey'},
    {name:'Lodging', iconName:'local-hotel', icon:0, iconColor:'darkslategrey'},
    {name:'Camping', iconName:'campground', icon:1, iconColor:'darkslategrey'},
    {name:'Parking', iconName:'local-parking', icon:0, iconColor:'darkslategrey'},
    {name:'Train', iconName:'directions-train', icon:0, iconColor:'darkslategrey'},
    {name:'Ferry', iconName:'directions-ferry', icon:0, iconColor:'darkslategrey'},
]
export const Indoor =[
    { name: 'Attraction', iconName: 'local-see', icon: 0 ,iconColor:'#b8860b'},
    { name: 'Cooking Class', iconName: 'chef-hat', icon: 2 ,iconColor:'#b8860b' },
    { name: 'Festival', iconName: 'festival', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Landmark', iconName: 'landmark', icon: 1 ,iconColor:'#b8860b' },
    { name: 'Library', iconName: 'local-library', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Local Event', iconName: 'event', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Museum', iconName: 'museum', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Shopping', iconName: 'local-mall', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Spa', iconName: 'spa', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Sporting Events', iconName: 'stadium', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Theater', iconName: 'theaters', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Theme Park', iconName: 'attractions', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Wellness', iconName: 'self-improvement', icon: 0 ,iconColor:'#b8860b' },
    { name: 'Yoga', iconName: 'yoga', icon: 2 ,iconColor:'#b8860b' }
]

export const Outdoor=[

    { name: 'Birding', iconName: 'bird', icon: 2, iconColor:'darkolivegreen' },
    { name: 'Biking', iconName: 'person-biking', icon: 1, iconColor:'darkolivegreen' },
    { name: 'Botanic Garden', iconName: 'leaf', icon: 1, iconColor:'darkolivegreen' },
    { name: 'Golf', iconName: 'golf-course', icon: 0, iconColor:'darkolivegreen' },
    { name: 'Hiking', iconName: 'hiking', icon: 0, iconColor:'darkolivegreen' },
    { name: 'Leaf Peeping ', iconName: 'leaf-maple', icon: 2, iconColor:'darkolivegreen' },
    { name: 'National Park', iconName: 'terrain', icon: 0, iconColor:'darkolivegreen' },
    { name: 'Park', iconName: 'forest', icon: 0, iconColor:'darkolivegreen' },
    { name: 'Paragliding', iconName: 'paragliding', icon: 0, iconColor:'darkolivegreen' },
    { name: 'Running', iconName: 'person-running', icon: 1, iconColor:'darkolivegreen' },
    { name: 'Tennis', iconName: 'sports-tennis', icon: 0, iconColor:'darkolivegreen' },
    { name: 'Walking', iconName: 'person-walking', icon: 1, iconColor:'darkolivegreen' },
    { name: 'Wildlife', iconName: 'goat', icon: 0, iconColor:'darkolivegreen' }
]
export const Water=[
    { name: 'Beach', iconName: 'beach', icon: 2, iconColor:'lightseagreen' },
    { name: 'Kayaking', iconName: 'kayaking', icon: 0, iconColor:'lightseagreen' },
    { name: 'Sailing', iconName: 'sailing', icon: 0, iconColor:'lightseagreen' },
    { name: 'Scuba Diving', iconName: 'scuba-diving', icon: 0, iconColor:'lightseagreen' },
    { name: 'Snorkeling', iconName: 'diving-snorkel', icon: 2, iconColor:'lightseagreen' },
    { name: 'Surfing', iconName: 'surfing', icon: 0, iconColor:'lightseagreen' },
    { name: 'Swimming', iconName: 'person-swimming', icon: 1, iconColor:'lightseagreen' },
    { name: 'Water Skiing', iconName: 'ski-water', icon: 2, iconColor:'lightseagreen' }
]
export const Winter=[

    { name: 'Skiing', iconName: 'person-skiing', icon: 1, iconColor:'royalblue' },
    { name: 'Sledding', iconName: 'sledding', icon: 0, iconColor:'royalblue'  },
    { name: 'snowboarding', iconName: 'snowboarding', icon: 0, iconColor:'royalblue'  }
]
        
export const Food=[
    { name: 'Bar', iconName: 'local-bar', icon: 0, iconColor:'darkmagenta' },
    { name: 'Brunch', iconName: 'brunch-dining', icon: 0, iconColor:'darkmagenta'  },
    { name: 'Cafe', iconName: 'local-cafe', icon: 0, iconColor:'darkmagenta'  },
    { name: 'Cat Cafe', iconName: 'cat', icon: 1, iconColor:'darkmagenta'  },
    { name: 'Dining', iconName: 'local-dining', icon: 0, iconColor:'darkmagenta'  },
    { name: 'Nightlife', iconName: 'nightlife', icon: 0, iconColor:'darkmagenta'  }
]
        

export const Others=[
    { name: 'Others', iconName: 'person-circle-question', icon: 1,iconColor:'saddlebrown' },
]


        











    // const handleEditTodo=(todoKey:string,date:string,tripKey:string,icon:number,iconName:string)=>{
    //     const editedNewTodo:TodoDataType={
    //         date:date,
    //         todo:editLabel,
    //         tripKey:tripKey,
    //         icon:icon,
    //         iconName:iconName
    //     }
    //     storeTodo(todoKey,editedNewTodo)
    //     setTodoUpdated(true)
    // }
            {/* {editingItem &&
            <View style={styles.editTextContainer}>
            <TextInput
            style={styles.editTextInput}
            defaultValue={editingItem.label}
            onChangeText={(e)=>setEditLabel(e)}
            onSubmitEditing={()=>handleEditTodo(editingItem.todoKey,editingItem.date,editingItem.tripKey,editingItem.icon,editingItem.iconName)}
            />
            </View>
            } */}
        // const [editingItem, setEditingItem] = useState<dragDataType>();
    // const [editLabel,setEditLabel]=useState('')