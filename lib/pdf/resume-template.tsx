import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { Experience, Profile, Project, Skill } from "@/db/schemas";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  contact: {
    fontSize: 9,
    color: "#666",
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  experienceDate: {
    fontSize: 9,
    color: "#666",
  },
  experienceCompany: {
    fontSize: 10,
    color: "#444",
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 9,
    color: "#444",
    lineHeight: 1.6,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#444",
  },
  skillBadge: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  projectDescription: {
    fontSize: 9,
    color: "#444",
    marginTop: 2,
  },
  projectTech: {
    fontSize: 8,
    color: "#666",
    marginTop: 4,
  },
});

function formatDate(date: Date | null): string {
  if (!date) return "Present";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
  }).format(date);
}

interface ResumeDocumentProps {
  profile: Profile | null;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
}

export function ResumeDocument({
  profile,
  experiences,
  skills,
  projects,
}: ResumeDocumentProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{profile?.name ?? "Your Name"}</Text>
          <Text style={styles.title}>
            {profile?.title ?? "Software Developer"}
          </Text>
          <Text style={styles.contact}>
            {[profile?.email, profile?.location, profile?.websiteUrl]
              .filter(Boolean)
              .join(" • ")}
          </Text>
        </View>

        {/* Bio */}
        {profile?.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.experienceDescription}>{profile.bio}</Text>
          </View>
        )}

        {/* Skills */}
        {Object.keys(skillsByCategory).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {Object.entries(skillsByCategory).map(
              ([category, categorySkills]) => (
                <View key={category} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{category}</Text>
                  <View style={styles.skillsContainer}>
                    {categorySkills.map((skill) => (
                      <Text key={skill.id} style={styles.skillBadge}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ),
            )}
          </View>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{exp.title}</Text>
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </Text>
                </View>
                {exp.company && (
                  <Text style={styles.experienceCompany}>
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </Text>
                )}
                {exp.description && (
                  <Text style={styles.experienceDescription}>
                    {exp.description}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project) => (
              <View key={project.id} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>
                  {project.description}
                </Text>
                {project.techStack && project.techStack.length > 0 && (
                  <Text style={styles.projectTech}>
                    Tech: {project.techStack.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
