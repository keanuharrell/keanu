import { BlogPreview, Hero, ProjectsSection } from "@/components/sections";
import { getAllProjects, getRecentPosts } from "@/lib/db";

export default async function Page() {
  const [projects, posts] = await Promise.all([
    getAllProjects(),
    getRecentPosts(5),
  ]);

  return (
    <>
      <Hero />
      <ProjectsSection projects={projects} />
      <BlogPreview posts={posts} />
    </>
  );
}
