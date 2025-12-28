"use client";

import {
  Copy01Icon,
  Delete01Icon,
  Edit01Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useTransition } from "react";

import {
  deletePostAction,
  duplicatePostAction,
  toggleFeaturedAction,
  togglePublishAction,
} from "@/app/actions/posts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Post } from "@/db/schemas";
import { cn } from "@/lib/utils";

interface PostsTableProps {
  posts: Post[];
}

function formatDate(date: Date | null) {
  if (!date) return "-";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function PostsTable({ posts }: PostsTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleTogglePublish = (id: number, isPublished: boolean) => {
    startTransition(async () => {
      await togglePublishAction(id, isPublished);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deletePostAction(id);
    });
  };

  const handleDuplicate = (id: number) => {
    startTransition(async () => {
      await duplicatePostAction(id);
    });
  };

  const handleToggleFeatured = (id: number, isFeatured: boolean) => {
    startTransition(async () => {
      await toggleFeaturedAction(id, isFeatured);
    });
  };

  if (posts.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">No posts yet.</p>
        <Link
          href="/studio/posts/new"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Create your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-muted-foreground text-sm">{post.slug}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={post.isPublished}
                    onCheckedChange={(checked) =>
                      handleTogglePublish(post.id, checked)
                    }
                    disabled={isPending}
                  />
                  <Badge variant={post.isPublished ? "default" : "secondary"}>
                    {post.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  checked={post.isFeatured}
                  onCheckedChange={(checked) =>
                    handleToggleFeatured(post.id, checked)
                  }
                  disabled={isPending}
                />
              </TableCell>
              <TableCell>{post.viewCount}</TableCell>
              <TableCell>{formatDate(post.createdAt)}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    )}
                    title="Preview"
                  >
                    <HugeiconsIcon icon={ViewIcon} className="size-4" />
                  </Link>
                  <Link
                    href={`/studio/posts/${post.id}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    )}
                    title="Edit"
                  >
                    <HugeiconsIcon icon={Edit01Icon} className="size-4" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDuplicate(post.id)}
                    disabled={isPending}
                    title="Duplicate"
                  >
                    <HugeiconsIcon icon={Copy01Icon} className="size-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the post &quot;{post.title}&quot;.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post.id)}
                          className={buttonVariants({ variant: "destructive" })}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
