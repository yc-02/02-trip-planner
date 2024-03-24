import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import { CheckListData } from '../../utils/CheckListData'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { TitleIcons } from '../../utils/PackingListIcons';
import { Entypo } from '@expo/vector-icons';

export default function ReadyMadeList() {
  const {colors} = useTheme()
  const initialHide =["Travel Documents", "Essential Wear", "Active Wear", "Accessories", "Electronics and Accessories", "Personal Care Essentials", "Skincare", "Cosmetics or Beauty Products"]
  const [hideCategory,setHideCategory]=useState<string[]>(initialHide)

  const handleHide = (title: string) => {
    const isHidden = hideCategory.includes(title);
    if (isHidden) {
      setHideCategory(hideCategory.filter((item) => item !== title));
    } else {
      setHideCategory([...hideCategory, title]);
    }
  };
console.log(hideCategory)

 

  
  return (
    <View style={styles.container}>
      <SectionList
      sections={CheckListData}
      keyExtractor={(item)=>item}
      renderItem={({item,section})=>(
        <View>
          {!hideCategory.includes(section.title)&&
          <BouncyCheckbox
          fillColor={colors.primary}
          unfillColor={colors.background}
          text={item}
          innerIconStyle={{borderWidth:2, borderRadius:10, borderColor:colors.primary }}
          onPress={() => console.log('checked')}
          onLongPress={()=>console.log('long press')}
          style={{paddingVertical:5}}
          textStyle={{
            textTransform:'capitalize',
            fontSize:17,
          }}
          />}
        </View>
      )}
      renderSectionHeader={({section:{title}})=>(
        <Pressable onPress={()=>handleHide(title)} style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={styles.CheckListTitleContainer}> 
            <TitleIcons title={title}/>
            <Text style={[styles.CheckListTitle,{color:colors.text}]}>{title}</Text>
          </View>
            <View>
              {hideCategory.includes(title)?
              <Entypo name="chevron-small-down" size={24} color="black" />
              :
              <Entypo name="chevron-small-up" size={24} color="black" />
              }
            </View>
        </Pressable>
       
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  CheckListTitleContainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:10,
    gap:10
  },
  CheckListTitle:{
    fontSize:18,
    fontWeight:'bold',
  }

})