"use client";

// src/components/ApiComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiComponent = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/data')
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    return (
        <div>
            <h1>Flask API Response:</h1>
            <p>{data}</p>
        </div>
    );
};

export default ApiComponent;
