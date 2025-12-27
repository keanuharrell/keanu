import { renderToBuffer } from "@react-pdf/renderer";

import {
  getAllExperiences,
  getAllProjects,
  getAllSkills,
  getProfile,
} from "@/lib/db";
import { ResumeDocument } from "@/lib/pdf/resume-template";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [profile, experiences, skills, projects] = await Promise.all([
      getProfile(),
      getAllExperiences(),
      getAllSkills(),
      getAllProjects(),
    ]);

    const pdfBuffer = await renderToBuffer(
      <ResumeDocument
        profile={profile}
        experiences={experiences}
        skills={skills}
        projects={projects}
      />,
    );

    const filename = profile?.name
      ? `${profile.name.replace(/\s+/g, "_")}_Resume.pdf`
      : "Resume.pdf";

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
