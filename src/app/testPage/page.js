"use client"
import { useState, useEffect } from 'react';
const URL = process.env.NEXT_PUBLIC_BACKEND_URL 

const HomeContent = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${URL}/about`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home Content</h1>
      <p>{content}</p>
    </div>
  );
};

export default HomeContent;
