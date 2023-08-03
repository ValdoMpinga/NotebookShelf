import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import PDFView from 'react-native-pdf';
import endpointComposer from '../utils/endpoinComposer';

// ... (other imports)

const NotebookViewScreen = ({ route }) => {
  const { shelfName, notebookName } = route.params;
  const [pdfContent, setPdfContent] = useState(null);

  useEffect(() => {
    console.log(shelfName);
    console.log(notebookName);
    fetchPdfContent();
  }, []);

  const fetchPdfContent = async () => {
    try {
      let endpoint = endpointComposer('/get-pdf-content');
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
      };
      reader.readAsDataURL(blobData);
    } catch (error) {
      console.error('Error fetching PDF content:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {pdfContent ? (
        <PDFView
          style={{ flex: 1 }}
          source={{
            uri: `data:application/pdf;base64,${pdfContent}`,
          }}
        />
      ) : (
        <Text>Loading PDF...</Text>
      )}
    </View>
  );
};

export default NotebookViewScreen;
