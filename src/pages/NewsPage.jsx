import React, { useEffect, useState } from 'react';
import { Container, Table, Thead, Tbody, Tr, Th, Td, Heading, Spinner, Box, Link } from '@chakra-ui/react';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const stories = await Promise.all(
          storyIds.slice(0, 10).map(async (id) => {
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return await storyResponse.json();
          })
        );
        setNews(stories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" mb={6}>Hacker News Top Stories</Heading>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Score</Th>
              <Th>URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {news.map((story) => (
              <Tr key={story.id}>
                <Td>{story.title}</Td>
                <Td>{story.by}</Td>
                <Td>{story.score}</Td>
                <Td>
                  <Link href={story.url} isExternal color="teal.500">
                    {story.url}
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default NewsPage;