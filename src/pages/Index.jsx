import React, { useState } from "react";
import { Container, VStack, FormControl, FormLabel, Input, Button, Text, useToast } from "@chakra-ui/react";

const Index = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [workingHours, setWorkingHours] = useState(null);
  const toast = useToast();

  const calculateWorkingHours = () => {
    if (!startTime || !endTime) {
      toast({
        title: "Error",
        description: "Please enter both start and end times.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const start = new Date(`2023-01-01T${startTime}:00`);
    const end = new Date(`2023-01-01T${endTime}:00`);
    let hours = (end - start) / (1000 * 60 * 60);

    if (hours < 0) {
      toast({
        title: "Error",
        description: "End time must be after start time.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (hours > 8) {
      hours -= 0.5; // Deduct 30 minutes
    }

    setWorkingHours(hours.toFixed(2));
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <FormControl>
          <FormLabel htmlFor="start-time">Start Time</FormLabel>
          <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="end-time">End Time</FormLabel>
          <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={calculateWorkingHours}>
          Calculate Working Hours
        </Button>
        {workingHours !== null && <Text fontSize="lg">Total Working Hours: {workingHours} hours</Text>}
      </VStack>
    </Container>
  );
};

export default Index;
