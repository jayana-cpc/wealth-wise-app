import React, { useState, useEffect } from "react";
import { Menu } from "./News/NewsMenu";
import { NewsGrid } from "./News/NewsGrid";

export function NewsDisplay() {
    const [items, setItems] = useState([]);
    const [stockSymbol, setStockSymbol] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const storedSymbol = localStorage.getItem('userStock');
        if (storedSymbol) {
          setStockSymbol(storedSymbol);
        } else {
          setLoading(false); 
        }
    }, []);

    useEffect(() => {
        if (stockSymbol) {
            fetch(`https://api.polygon.io/v2/reference/news?ticker=${stockSymbol}&limit=6&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`)
                .then((res) => res.json())
                .then((data) => {
                    setItems(data.results);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
    }, [stockSymbol]);

    return (
        <div className="news-body">
            <Menu />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <NewsGrid items={items} />
            )}
        </div>
    );
}