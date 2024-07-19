import Image from "next/image";
export function NewsItem({item}) {
    // const websiteUrl = item.article_url;
    // const website = websiteUrl.split('https://').pop().split('/')[0]
    const publishedUtc = item.published_utc;

    const date = new Date(publishedUtc)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
      const formattedDate = date.toLocaleDateString('en-US', options);
      
      console.log(formattedDate);

    return (
        <div className="news-body">
            <a href={item.article_url} className="article">
                <div className="article-image">
                    <Image src={item.image_url} alt={item.title} width={50} height={50} />
                </div>
                <div className="article-content">
                    <div className="article-source">
                        <Image src={item.publisher.favicon_url} alt={item.id} width={50} height={50}/>
                        <span>{item.publisher.name}</span>
                    </div>
                    <div className="article-title">
                        <h2>{item.title}</h2>
                    </div>
                    <p className="article-description">
                        {item.description}
                    </p>
                </div>
            </a>
        </div>
    )
}