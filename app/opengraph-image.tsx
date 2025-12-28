import { ImageResponse } from "next/og";

import { profile } from "@/lib/data";

export const runtime = "edge";

export const alt = "Keanu Harrell - Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
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

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 600,
            color: "#fafafa",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {profile.name}
        </h1>
        <p
          style={{
            fontSize: "32px",
            color: "#a1a1aa",
            margin: 0,
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          {profile.title}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
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
