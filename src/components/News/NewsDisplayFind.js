import React, { useState, useEffect } from "react";
import { List } from "@mantine/core";
import { NewsItemFind } from "@/components/News/NewsItemFind";

export function NewsDisplayFind() {
    const [items, setItems] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:5000/api/get-news-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setItems(data);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    useEffect(() => {
        // Fetch data when the component loads
        fetchData();
    }, []);

    return (
        <div className="news-body">
            <List>
                {items.map((item, index) => (
                    <List.Item key={index}>
                        <NewsItemFind item={item} />
                    </List.Item>
                ))}
            </List>
        </div>
    );
}

