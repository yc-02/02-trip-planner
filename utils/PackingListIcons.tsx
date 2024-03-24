import { Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"

export const TitleIcons = ({title}:{title:string})=>{
  const {colors} = useTheme()

    if(title === 'Travel Documents'){
      return(
        <Fontisto name="passport-alt" size={24} color={colors.text}/>
      )
    }else if (title ==='Essential Wear'){
      return(
        <MaterialCommunityIcons name="tshirt-crew" size={24} color={colors.text}/>
      )
    }else if (title === 'Active Wear'){
        return(
        <MaterialCommunityIcons name="shoe-sneaker" size={24} color={colors.text}/>
        )
    }else if(title==='Accessories'){
      return(
        <MaterialCommunityIcons name="sunglasses" size={24} color={colors.text}/>
      )
    }else if(title==='Electronics and Accessories'){
      return (
        <MaterialIcons name="laptop-mac" size={24} color={colors.text}/>
      )
    }else if(title==='Personal Care Essentials'){
      return(
        <MaterialCommunityIcons name="toothbrush-paste" size={24} color={colors.text}/>
      )
    }else if(title==='Skincare'){
      return(
        <MaterialCommunityIcons name="lotion" size={24} color={colors.text}/>
      )
    }else if(title==='Cosmetics or Beauty Products'){
      return(
        <MaterialCommunityIcons name="lipstick" size={24} color={colors.text}/>
      )
    }
}