import React from 'react';
import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Box } from '@chakra-ui/react';
import { useEvents } from '../integrations/supabase';

const EventsPage = () => {
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Heading as="h2" size="xl" color="red.500">Error loading events</Heading>
      </Box>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" mb={6}>Events</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Created At</Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Venue ID</Th>
            <Th>Starred</Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map((event) => (
            <Tr key={event.id}>
              <Td>{event.id}</Td>
              <Td>{new Date(event.created_at).toLocaleString()}</Td>
              <Td>{event.name}</Td>
              <Td>{new Date(event.date).toLocaleDateString()}</Td>
              <Td>{event.venue_id}</Td>
              <Td>{event.is_starred ? 'Yes' : 'No'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default EventsPage;