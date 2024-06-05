import { Box, Flex, Link, Text, IconButton, HStack } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box as="footer" role="contentinfo" py={6} px={8} bg="gray.800" color="white" mt={10}>
      <Flex justify="space-between" align="center" direction={{ base: "column", md: "row" }}>
        <HStack spacing={4} mb={{ base: 4, md: 0 }}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none", color: "teal.300" }}>
            Home
          </Link>
          <Link as={RouterLink} to="/about" _hover={{ textDecoration: "none", color: "teal.300" }}>
            About
          </Link>
          <Link as={RouterLink} to="/contact" _hover={{ textDecoration: "none", color: "teal.300" }}>
            Contact
          </Link>
        </HStack>
        <HStack spacing={4} mb={{ base: 4, md: 0 }}>
          <IconButton
            as="a"
            href="https://facebook.com"
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            colorScheme="teal"
            _hover={{ bg: "teal.500", color: "white" }}
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            colorScheme="teal"
            _hover={{ bg: "teal.500", color: "white" }}
          />
          <IconButton
            as="a"
            href="https://linkedin.com"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
            colorScheme="teal"
            _hover={{ bg: "teal.500", color: "white" }}
          />
        </HStack>
        <Text textAlign="center" fontSize="sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;