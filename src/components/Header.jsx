import { Box, Flex, Link, Input, InputGroup, InputRightElement, IconButton, HStack, Text } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  return (
    <Box as="header" bg="gray.800" color="white" py={4} px={8} boxShadow="md">
      <Flex justify="space-between" align="center">
        {/* Logo or Site Name */}
        <Text fontSize="xl" fontWeight="bold">
          MySite
        </Text>

        {/* Navigation Links */}
        <HStack spacing={8} display={{ base: "none", md: "flex" }}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none", color: "teal.300" }}>
            Home
          </Link>
          <Link as={RouterLink} to="/about" _hover={{ textDecoration: "none", color: "teal.300" }}>
            About
          </Link>
          <Link as={RouterLink} to="/contact" _hover={{ textDecoration: "none", color: "teal.300" }}>
            Contact
          </Link>
          <Link as={RouterLink} to="/new-link" _hover={{ textDecoration: "none", color: "teal.300" }}>
            New Link
          </Link> {/* New navigation link */}
        </HStack>

        {/* Search Bar */}
        <InputGroup maxW="300px" display={{ base: "none", md: "flex" }}>
          <Input placeholder="Search..." />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={<FaSearch />}
              variant="ghost"
              colorScheme="teal"
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default Header;