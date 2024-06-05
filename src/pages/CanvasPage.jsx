import { Container, VStack, Heading } from "@chakra-ui/react";
import DrawingCanvas from "../components/DrawingCanvas";

const CanvasPage = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Drawing Canvas</Heading>
        <DrawingCanvas />
      </VStack>
    </Container>
  );
};

export default CanvasPage;