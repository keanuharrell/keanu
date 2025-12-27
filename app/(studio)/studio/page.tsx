import {
  Briefcase01Icon,
  Note01Icon,
  StackStarIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllExperiences,
  getAllPosts,
  getAllProjects,
  getAllSkills,
  getProfile,
} from "@/lib/db";

export default async function StudioDashboardPage() {
  const [profile, posts, projects, experiences, skills] = await Promise.all([
    getProfile(),
    getAllPosts(),
    getAllProjects(),
    getAllExperiences(),
    getAllSkills(),
  ]);

  const stats = [
    {
      title: "Profile",
      value: profile ? "Complete" : "Not set",
      icon: UserIcon,
      href: "/studio/profile",
      description: profile ? `${profile.name}` : "Set up your profile",
    },
    {
      title: "Posts",
      value: posts.length,
      icon: Note01Icon,
      href: "/studio/posts",
      description: `${posts.filter((p) => p.isPublished).length} published`,
    },
    {
      title: "Projects",
      value: projects.length,
      icon: StackStarIcon,
      href: "/studio/projects",
      description: `${projects.filter((p) => p.featured).length} featured`,
    },
    {
      title: "Experiences",
      value: experiences.length,
      icon: Briefcase01Icon,
      href: "/studio/experiences",
      description: `${experiences.filter((e) => e.isCurrent).length} current`,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your portfolio content from here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-medium text-sm">
                  {stat.title}
                </CardTitle>
                <HugeiconsIcon
                  icon={stat.icon}
                  className="size-4 text-muted-foreground"
                />
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">{stat.value}</div>
                <p className="text-muted-foreground text-xs">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No posts yet.</p>
            ) : (
              <ul className="space-y-2">
                {posts.slice(0, 5).map((post) => (
                  <li
                    key={post.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="truncate">{post.title}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                        post.isPublished
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Skills by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {skills.length === 0 ? (
              <p className="text-muted-foreground text-sm">No skills yet.</p>
            ) : (
              <ul className="space-y-2">
                {Object.entries(
                  skills.reduce(
                    (acc, skill) => {
                      acc[skill.category] = (acc[skill.category] || 0) + 1;
                      return acc;
                    },
                    {} as Record<string, number>,
                  ),
                ).map(([category, count]) => (
                  <li
                    key={category}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="capitalize">{category}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
