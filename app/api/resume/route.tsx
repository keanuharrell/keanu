import { renderToBuffer } from "@react-pdf/renderer";

import { experiences, profile, skills } from "@/lib/data";
import { getAllProjects } from "@/lib/db";
import { ResumeDocument } from "@/lib/pdf/resume-template";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getAllProjects();

    const pdfBuffer = await renderToBuffer(
      <ResumeDocument
        profile={profile}
        experiences={experiences}
        skills={skills}
        projects={projects}
      />,
    );

    const filename = `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`;

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error generating resume:", error);
    return new Response("Error generating resume", { status: 500 });
  }
}
