'use client';
import { useState, useEffect } from "react";
import axios from 'axios';

const LearnPage = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      const res = await axios.get('/api/articles');
      // console.log(res);
      // const data = await res.json();

      setArticles(res.data);
    }

    getArticles();
  }, []);

  return (
    <>
    <h1>hello</h1>
      {
        articles && articles.map((article) => (
          <>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </>
        ))
      }
    </>
  )
}

export default LearnPage;