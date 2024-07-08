import { NewsItem } from "./NewsItem"
export function NewsGrid({items}) {
    return (
        <div className="news-body">
            <div className="news-grid">
                {items.map((item, i) => (
                    <NewsItem key={i} item={item} />
                ))}
            </div>
        </div>
    )
}
