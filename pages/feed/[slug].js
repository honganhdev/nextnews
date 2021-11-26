import Head from "next/head";
import styles from "../../styles/Articles.module.css";
import { useRouter } from "next/dist/client/router";
import { Toolbar } from "../../components/toolbar";

export const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();
  return articles.length ? (
    <>
      <Head>
        <meta property="og:title" content={articles[0]?.title + " and more!"} />
        <meta property="og:description" content={articles[0]?.description} />
        <meta property="og:image" content={articles[0]?.urlToImage} />
      </Head>
      <div className="page-container">
        <Toolbar />
        <div className={styles.main}>
          {articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={() => (window.location.href = article.url)}>
                {article.title}
              </h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} />}
            </div>
          ))}
        </div>
        <div className={styles.paginator}>
          <div
            onClick={() => {
              if (pageNumber > 1) {
                router
                  .push(`/feed/${pageNumber - 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
            className={pageNumber === 1 ? styles.disable : styles.active}
          >
            Previous Page
          </div>
          <div>#{pageNumber}</div>
          <div
            className={pageNumber === 5 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber < 5) {
                router
                  .push(`/feed/${pageNumber + 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Next Page
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const ApiReSponse = await fetch(
    `https://newsapi.org/v2/everything?q=nft&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer 6b877b2ab222440ba053c7ed6c34453f`,
      },
    }
  );

  const apiJson = await ApiReSponse.json();

  const { articles } = apiJson;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
