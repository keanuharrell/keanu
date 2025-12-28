import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/lib/db";

export const runtime = "edge";

export const alt = "Blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "Blog Post";
  const date = post?.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(post.publishedAt)
    : "";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#0a0a0b",
        padding: "80px",
      }}
    >
      {/* Gradient background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent)",
        }}
      />

      {/* Blog label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            backgroundColor: "#27272a",
            color: "#a1a1aa",
            padding: "8px 16px",
            borderRadius: "9999px",
            fontSize: "20px",
            fontWeight: 500,
          }}
        >
          Blog
        </div>
        {date && (
          <span
            style={{
              fontSize: "20px",
              color: "#71717a",
            }}
          >
            {date}
          </span>
        )}
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          zIndex: 1,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 600,
            color: "#fafafa",
            lineHeight: 1.1,
            margin: 0,
            maxWidth: "1000px",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#22c55e",
          }}
        />
        <span
          style={{
            fontSize: "24px",
            color: "#71717a",
          }}
        >
          keanuharrell.com
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
