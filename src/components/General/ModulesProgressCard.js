import { Card, Text, Group, RingProgress, Center, SimpleGrid } from '@mantine/core';

function ModulesProgressCard() {
  return (
    <Card shadow="sm" p="lg" style={{ backgroundColor: '#1A1B1E', color: '#FFFFFF', borderRadius: '8px' }}>
      <Text weight={500} size="lg" mb="md">Modules Progress</Text>
      <SimpleGrid cols={2} spacing="md">
        <Group direction="column" align="center">
          <RingProgress
            sections={[{ value: 100, color: '#34c759' }]}
            label={<Center><Text size="xs">0</Text></Center>}
            size={100}  
            thickness={7}
          />
          <Text size="sm">COMPLETED</Text>
        </Group>
        <Group direction="column" align="center">
          <RingProgress
            sections={[{ value: 100, color: '#e5e5ea' }]}
            label={<Center><Text size="xs">12</Text></Center>}
            size={100} 
            thickness={7}
          />
          <Text size="sm">NOT STARTED</Text>
        </Group>
      </SimpleGrid>
    </Card>
  );
}

export default ModulesProgressCard;
