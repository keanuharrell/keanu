import { BlogPreview, Hero, ProjectsPreview } from "@/components/sections";
import { getFeaturedProjects, getRecentPosts } from "@/lib/db";

export default async function Page() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(),
    getRecentPosts(5),
  ]);

  return (
    <>
      <Hero />
      <ProjectsPreview projects={projects} />
      <BlogPreview posts={posts} />
    </>
  );
}
