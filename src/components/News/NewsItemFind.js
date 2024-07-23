import React from "react";
import { List, Anchor, Text, Title, Group } from "@mantine/core";

export function NewsItemFind({ item }) {
    // Extract the relevant data from the item
    const headline = item[1];
    const publisherName = item[0];
    const link = item[3];

    return (
        <List.Item>
            <Anchor href={link} className="article" target="_blank">
                <Group direction="column" spacing="xs" className="article-content">
                    <Text className="article-source" color="dimmed" size="sm">
                        {publisherName}
                    </Text>
                    <Title order={2} className="article-title">
                        {headline}
                    </Title>
                </Group>
            </Anchor>
        </List.Item>
    );
}
