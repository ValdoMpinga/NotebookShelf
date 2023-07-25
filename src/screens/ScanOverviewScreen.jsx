import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import scanOverviewStyles from '../styles/screens/scanOverviewStyles';
import globalStyle from '../styles/components/globalStyle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import CustomButton from '../components/CustomButton';
import Colors from '../utils/constants';

const ScanOverviewScreen = ({navigation}) => {
  const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/250',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/350',
    'https://via.placeholder.com/400',
    'https://via.placeholder.com/450',
    'https://via.placeholder.com/500',
    'https://via.placeholder.com/550',
    'https://via.placeholder.com/600',
  ];

  const [imageUrls, setImageUrls] = useState(images);
  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[3]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(3);

 const handleImageClick = (imageUrl, index) => {
   setSelectedImageUrl(imageUrl);
   setSelectedImageIndex(index);
 };

  const renderSmallImage = ({item, drag, isActive}) => {
    const imageContainerStyle = isActive
      ? {
          ...scanOverviewStyles.activeSmallImageContainer,
          backgroundColor: 'green',
          borderRadius: 3,
        }
      : scanOverviewStyles.smallImageContainer;

    return (
      <TouchableOpacity
        style={imageContainerStyle}
        onPress={() => handleImageClick(item)}
        onLongPress={drag}>
        <Image
          source={{uri: item}}
          style={scanOverviewStyles.smallImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const reorderImages = ({data}) => {
    setImageUrls(data.map(item => item));
  };

  const renderControlButton = (title, color, marginLeft = 0,onButtonClick) => (
    <CustomButton
      onPress={() => {onButtonClick()}}
      title={title}
      customButtonStyle={{
        backgroundColor: Colors.white,
        borderColor: color,
        marginTop: 30,
        marginLeft: marginLeft,
        width: 140,
      }}
      customTextStyle={{color: color, fontSize: 18}}
    />
  );

  return (
    <View style={globalStyle.container}>
      {/* <Text style={globalStyle.title}>Scan Overview</Text> */}
      <View style={scanOverviewStyles.selectedImageContainer}>
        <Image
          source={{uri: selectedImageUrl}}
          style={scanOverviewStyles.selectedImage}
          resizeMode="contain"
        />
      </View>
      <View style={scanOverviewStyles.controlsContainer}>
        {renderControlButton('Add scan', Colors.blue1, 0)}
        {renderControlButton('Save Scans', Colors.orange, 30, () => {navigation.navigate('SaveScan');})}
      </View>

      <View style={scanOverviewStyles.imagesListContainer}>
        <DraggableFlatList
          horizontal
          data={imageUrls}
          renderItem={renderSmallImage}
          keyExtractor={(_, index) => index.toString()}
          onDragEnd={reorderImages}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ScanOverviewScreen;
