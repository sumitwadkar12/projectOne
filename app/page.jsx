import prisma from "@/lib/prisma";
import Post from "./Components/Post";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <h1>Feed</h1>
      {
        posts.map((singlePost) => (
          <Post
            key={singlePost.id}
            id={singlePost.id}
            title={singlePost.title}
            content={singlePost.content}
            authorName={singlePost.author.name}
          />
        ))
      }
    </main>
  );
}
