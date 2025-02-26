import { useState, useRef, ChangeEvent} from 'react';
import {GptfilesService, GptfilesOcrEndpointData, GptfilesOcrEndpointResponse } from '../../client';
import { Box, FormControl, Input, Button, HStack,Textarea } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react"

function FileUploaderTS() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [filePath, setFilePath] = useState('');
  const [responseJson, setResponseJson] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  console.log("Component rendered");
  console.log("responseJson ", responseJson);
  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger hidden file input
  };

  const handleFileChange = (event : ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("File selected: ", file);
    setSelectedFile(file);
    if (file) {
      setFilePath(file.name); // Set only the file name
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    setIsLoading(true);
    // setFileUploaded(selectedFile.name);
    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      // const response = await fetch('http://localhost:5000/upload', {
      //   method: 'POST',
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error(`Server error: ${response.statusText}`);
      // }

      // const data = await response.json();
      // setResponseJson(JSON.stringify(data, null, 2));

      const uploadData: GptfilesOcrEndpointData = { formData: {
        file: selectedFile,
      } };
      const response: GptfilesOcrEndpointResponse = await GptfilesService.ocrEndpoint(uploadData);
      console.log('Upload successful:', response);
      if (!response) {
        throw new Error(`Server error: ${response}`);
      }else{
        // let parsedResponse;
        // try {
        //   parsedResponse = JSON.parse(response.text);
        // } catch (e) {
        //   parsedResponse = response.text;
        // }
        // setResponseJson(JSON.stringify(parsedResponse, null, 2));
        const formattedResponse = response.text.replace(/\n/g, '\n'); // Replace \n with actual line breaks

        setResponseJson(formattedResponse);
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setResponseJson(`Error uploading file: ${error.message}`);
    }
    setIsLoading(false);
  };  

  return (
    <>
    <Box 
    // css={{
    // "& *": {
    //   border: "2px solid",
    //   borderColor: "blue.500",
    // },
    // }}    
    >
      <FormControl as="form" display="flex" py={4}>
        <HStack spacing={2} w="full">
          <Input
            type="text"
            value={filePath}
            isReadOnly          
            placeholder="File path will be displayed here"
            flexShrink={1}
            minW={0}
            // px={2}
            // py={1}
            borderRadius="md"
          />
          {/* Hidden File Input */}
          <Input
            ref={fileInputRef}
            type="file"
            display="none"
            onChange={handleFileChange}
          />

          {/* Custom Button */}
          <Button onClick={handleButtonClick} 
            bg="ui.main"
            _hover={{ bg: "#00766C" }}
            color="white"
            fontWeight="bold"
            px={2}
            py={1}
            borderRadius="md">
            Choose File
          </Button>                        
          {selectedFile && (
          <Button
            type="button"
            bg="ui.main"
            _hover={{ bg: "#00766C" }}
            color="white"
            fontWeight="bold"
            px={2}
            py={1}
            borderRadius="md"
            onClick={handleUpload} 
            //isDisabled={!selectedFile}
          >
            Upload
          </Button>
          )}
        </HStack>
      </FormControl>
    </Box>
    <Box>
    {isLoading ? (
        <Spinner size="xl" color="ui.main" />
      ) : (responseJson && (
          <Textarea
            value={responseJson}
            isReadOnly
            placeholder="..."
            mt={4}
            borderRadius="md"
            rows={20}
          />
        ))}
    </Box>
    </>
  );
}

export default FileUploaderTS;