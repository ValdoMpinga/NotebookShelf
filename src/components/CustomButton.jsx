import { Text,TouchableOpacity} from 'react-native';
import buttonStyle from '../styles/components/buttonStyle';

const CustomButton = ({ title, onPress, customButtonStyle, customTextStyle, textStyle}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[buttonStyle.button, customButtonStyle]}
      onPress={onPress}>
      <Text style={[buttonStyle.text, customTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
