import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React, { useState } from 'react';
import scanOverviewStyles from '../styles/screens/scanOverviewStyles';
import globalStyle from '../styles/components/globalStyle';
const ScanOverviewScreen = () => {
  const imageUrls = [
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

  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[3]);

  const handleImageClick = imageUrl => {
    setSelectedImageUrl(imageUrl);
  };
    
    
  const renderSmallImage = ({item}) => (
    <TouchableOpacity
      style={scanOverviewStyles.smallImageContainer}
      onPress={() => handleImageClick(item)}>
      <Image
        source={{uri: item}}
        style={scanOverviewStyles.smallImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

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
      <FlatList
        horizontal
        data={imageUrls}
        renderItem={renderSmallImage}
        keyExtractor={item => item}
        contentContainerStyle={scanOverviewStyles.rowContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};


export default ScanOverviewScreen;
