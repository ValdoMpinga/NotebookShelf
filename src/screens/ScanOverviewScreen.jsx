import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import scanOverviewStyles from '../styles/screens/scanOverviewStyles';
import globalStyle from '../styles/components/globalStyle';
import DraggableFlatList from 'react-native-draggable-flatlist';

const ScanOverviewScreen = () => {
  const images = [
    'https://via.placeholder.com/150', // Placeholder image URL
    'https://via.placeholder.com/200', // Placeholder image URL
    'https://via.placeholder.com/250', // Placeholder image URL
    'https://via.placeholder.com/300', // Placeholder image URL
    'https://via.placeholder.com/350', // Placeholder image URL
    'https://via.placeholder.com/400', // Placeholder image URL
    'https://via.placeholder.com/450', // Placeholder image URL
    'https://via.placeholder.com/500', // Placeholder image URL
    'https://via.placeholder.com/550', // Placeholder image URL
    'https://via.placeholder.com/600', // Placeholder image URL
  ];

  const [imageUrls, setImageUrls] = useState(images);
  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[3]);

  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };

  const renderSmallImage = ({item, drag, isActive}) => (
    <TouchableOpacity
      style={
        isActive
          ? scanOverviewStyles.activeSmallImageContainer
          : scanOverviewStyles.smallImageContainer
      }
      onPress={() => handleImageClick(item)}
      onLongPress={drag}>
      <Image
        source={{uri: item}}
        style={scanOverviewStyles.smallImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const reorderImages = ({data}) => {
    setImageUrls(data.map(item => item.url)); // Update the imageUrls state with the new order
  };

  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.title}>Scan Overview</Text>
      <View style={scanOverviewStyles.selectedImageContainer}>
        <Image
          source={{uri: selectedImageUrl}}
          style={scanOverviewStyles.selectedImage}
          resizeMode="contain"
        />
      </View>
      <DraggableFlatList
        horizontal
        data={images}
        renderItem={renderSmallImage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={scanOverviewStyles.rowContainer}
        onDragEnd={reorderImages}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ScanOverviewScreen;
