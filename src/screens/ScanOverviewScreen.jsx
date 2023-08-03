import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import scanOverviewStyles from '../styles/screens/scanOverviewStyles';
import globalStyle from '../styles/components/globalStyle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import CustomButton from '../components/CustomButton';
import {Colors, IP_ADDRESS} from '../utils/constants';
import {useSelector, useDispatch} from 'react-redux';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {setScannedImages} from '../../redux/notebookShelfStore';

const ScanOverviewScreen = ({navigation}) => {
  const {scannedImagesArray} = useSelector(state => state.notebookShelf);
  const dispatch = useDispatch();
  const endpointURL = `http://${IP_ADDRESS}:3000/pdf/create-notebook`;

  const [imageUrls, setImageUrls] = useState(scannedImagesArray);
  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl, index) => {
    setSelectedImageUrl(imageUrl);
  };

  // Function to upload all images to the server
  const uploadImagesToServer = async imagePaths => {
    const formData = new FormData();
    formData.append('shelfName', 'Valdo'); 
    formData.append('notebookName', 'Valdo'); 

    imagePaths.forEach((imagePath, index) => {
      const fileName = `image_${index}.jpg`;
      formData.append('image', {
        uri: imagePath,
        type: 'image/jpeg',
        name: fileName,
      });
    });

    try {
      // Send the formData with all images to the server using a single POST request
      const response = await fetch(endpointURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseData = await response.json();
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const scanDocument = async () => {
    try {
      const {scannedImages} = await DocumentScanner.scanDocument();
      dispatch(setScannedImages(scannedImages[0]));
    } catch (e) {
      console.log('some error occured:');
      console.log(e);
    }
  };

  const renderSmallImage = ({item, drag, isActive}) => {
    const imageContainerStyle = isActive
      ? {
          ...scanOverviewStyles.activeSmallImageContainer,
          backgroundColor: 'green',
          borderRadius: 3,
        }
      : scanOverviewStyles.smallImageContainer;

    useEffect(() => {
      console.log(scannedImagesArray);
      setImageUrls(scannedImagesArray);
    }, [scannedImagesArray]);
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

  const renderControlButton = (title, color, marginLeft = 0, onButtonClick) => (
    <CustomButton
      onPress={() => {
        onButtonClick();
      }}
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

  useEffect(() => {}, [scannedImagesArray]);
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
        {renderControlButton('Add scan', Colors.blue1, 0, () => {
          scanDocument();
        })}
        {renderControlButton('Save Scans', Colors.orange, 30, () => {
          uploadImagesToServer(scannedImagesArray);
        })}
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
