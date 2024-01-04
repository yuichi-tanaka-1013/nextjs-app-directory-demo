import { Suspense, useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};
async function getPosts(): Promise<Post[]> {
  const url1 = 'http://nginx/'
  // const url1 = 'https://jsonplaceholder.typicode.com/posts'
  const res = await fetch(url1, { cache: 'no-store' })
  return res.json();
}

// ページ全体を表示するReact関数コンポーネント(async)
export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((posts) => {
      setPosts(posts);
    });
  }, []);
  console.log("in posts");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {posts.map((p) => {
          // 1 記事一覧
          return (
            <li key={p.id}>
              <h3>
                記事ID {p.id} : {p.title}
              </h3>
              <p>{p.body}</p>
            </li>
          );
        })}{" "}
      </ul>
    </Suspense>
  );
}
