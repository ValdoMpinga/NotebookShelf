import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import PDFView from 'react-native-pdf';
import endpointComposer from '../utils/endpoinComposer';
import {useSelector} from 'react-redux';
import {Colors} from '../utils/constants';

const NotebookViewScreen = ({route}) => {
  const {shelfName, notebookName} = route.params;
  const [pdfContent, setPdfContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {ip} = useSelector(state => state.notebookShelf);

  useEffect(() => {
    fetchPdfContent();
  }, []);

  const fetchPdfContent = async () => {
    try {
      let endpoint = endpointComposer(ip, 'notebook/get-notebook-content');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shelfName: shelfName,
          notebookName: notebookName,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error fetching PDF content:', errorMessage);
        return;
      }

      // Get the Blob data from the response
      const blobData = await response.blob();

      // Convert Blob to base64 string
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        setPdfContent(base64String);
        setIsLoading(false); // Set loading to false once content is ready
      };
      reader.readAsDataURL(blobData);
    } catch (error) {
      console.error('Error fetching PDF content:', error);
      setIsLoading(false); // Set loading to false on error
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: Colors.blue2,
          }}>
          <ActivityIndicator size="large" color="#000" />
          <Text
            style={{color: Colors.black, fontSize: 18, textAlign: 'center'}}>
            loading notebook, this might take a while...
          </Text>
        </View>
      ) : pdfContent ? (
        <PDFView
          style={{flex: 1, backgroundColor: Colors.blue2}}
          source={{
            uri: `data:application/pdf;base64,${pdfContent}`,
          }}
        />
      ) : (
        <Text>Error loading PDF</Text>
      )}
    </View>
  );
};

export default NotebookViewScreen;
