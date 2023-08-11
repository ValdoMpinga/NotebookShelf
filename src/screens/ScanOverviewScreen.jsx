import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, BackHandler} from 'react-native';
import scanOverviewStyles from '../styles/screens/scanOverviewStyles';
import globalStyle from '../styles/components/globalStyle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import CustomButton from '../components/CustomButton';
import {Colors} from '../utils/constants';
import {useSelector, useDispatch} from 'react-redux';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {setScannedImages} from '../../redux/notebookShelfStore';
import yesOrNoAlert from '../utils/yesOrNoAlert';
const ScanOverviewScreen = ({navigation, route}) => {
  const {scannedImagesArray} = useSelector(state => state.notebookShelf);
  const dispatch = useDispatch();

  const {shelfName} = route.params;

  const [imageUrls, setImageUrls] = useState(scannedImagesArray);
  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[0]);

  const handleBackPress = () => {
    yesOrNoAlert(
      'Warning',
      'Are you sure you want to go back, you will lose all of your scans, but i can remake them later!',
      () => {
        dispatch(setScannedImages('EMPTY_ARRAY'));
        navigation.navigate('Shelf', {shelfName: shelfName});
      },
    );
    return true;
  };

  const handleImageClick = (imageUrl, index) => {
    setSelectedImageUrl(imageUrl);
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
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
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
    console.log('reorder');
    console.log(imageUrls[0]);
    console.log(imageUrls[1]);
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
          dispatch(setScannedImages('EMPTY_ARRAY'));
          dispatch(setScannedImages(imageUrls));
          navigation.navigate('SaveScan', {shelfName: shelfName});
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
