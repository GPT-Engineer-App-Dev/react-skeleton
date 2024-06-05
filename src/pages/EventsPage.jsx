import React, { useState } from 'react';
import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Spinner, Box, Button, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Checkbox, useToast } from '@chakra-ui/react';
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from '../integrations/supabase';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EventsPage = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', date: '', venue_id: '', is_starred: false });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (currentEvent) {
        await updateEvent.mutateAsync({ ...formData, id: currentEvent.id });
        toast({ title: 'Event updated successfully', status: 'success' });
      } else {
        await addEvent.mutateAsync(formData);
        toast({ title: 'Event added successfully', status: 'success' });
      }
      setFormData({ name: '', date: '', venue_id: '', is_starred: false });
      setCurrentEvent(null);
      onClose();
    } catch (error) {
      toast({ title: 'Error submitting form', status: 'error' });
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData({ name: event.name, date: event.date, venue_id: event.venue_id, is_starred: event.is_starred });
    onOpen();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent.mutateAsync(id);
        toast({ title: 'Event deleted successfully', status: 'success' });
      } catch (error) {
        toast({ title: 'Error deleting event', status: 'error' });
      }
    }
  };

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
      <Button colorScheme="teal" onClick={onOpen} mb={4}>Add Event</Button>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Created At</Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Venue ID</Th>
            <Th>Starred</Th>
            <Th>Actions</Th>
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
              <Td>
                <IconButton icon={<FaEdit />} onClick={() => handleEdit(event)} mr={2} />
                <IconButton icon={<FaTrash />} onClick={() => handleDelete(event.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentEvent ? 'Edit Event' : 'Add Event'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Venue ID</FormLabel>
              <Input name="venue_id" value={formData.venue_id} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <Checkbox name="is_starred" isChecked={formData.is_starred} onChange={handleInputChange}>Starred</Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit} mr={3}>
              {currentEvent ? 'Update' : 'Add'}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default EventsPage;