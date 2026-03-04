import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { GeneratedCV } from "@/types";

const styles = StyleSheet.create({
  page:        { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#1a1a1a", lineHeight: 1.4 },
  name:        { fontSize: 20, fontWeight: "bold", marginBottom: 3 },
  contact:     { flexDirection: "row", flexWrap: "wrap", fontSize: 8, color: "#555", marginBottom: 16, borderBottom: "0.5px solid #ddd", paddingBottom: 10 },
  contactItem: { marginRight: 10 },
  sectionHead: { fontSize: 7.5, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 1.2, color: "#777", borderBottom: "0.5px solid #ddd", paddingBottom: 2, marginTop: 14, marginBottom: 6 },
  summary:     { fontSize: 9.5, lineHeight: 1.55 },
  expBlock:    { marginBottom: 9 },
  expRow:      { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
  expTitle:    { fontSize: 9.5, fontWeight: "bold" },
  expPeriod:   { fontSize: 8.5, color: "#777" },
  expCompany:  { fontSize: 9, color: "#555", marginBottom: 3 },
  bullet:      { flexDirection: "row", marginBottom: 1.5 },
  bulletDot:   { fontSize: 9, color: "#999", marginTop: 0.5, marginRight: 5 },
  bulletText:  { fontSize: 9, flex: 1 },
  skillRow:    { fontSize: 9, marginBottom: 2 },
  bold:        { fontWeight: "bold" },
  eduRow:      { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  eduLeft:     { flex: 1 },
  eduDegree:   { fontSize: 9.5, fontWeight: "bold" },
  eduInst:     { fontSize: 9, color: "#555" },
  eduPeriod:   { fontSize: 8.5, color: "#777" },
  certItem:    { fontSize: 9, marginBottom: 2 },
});

interface Props {
  cv: GeneratedCV;
}

export function CVPdfDocument({ cv }: Props) {
  const contactParts = [cv.contact.email, cv.contact.phone, cv.contact.linkedin, cv.contact.location].filter(Boolean);
  const hasSkills = cv.skills.technical.length > 0 || cv.skills.tools.length > 0 || cv.skills.soft.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{cv.name}</Text>
        <View style={styles.contact}>
          {contactParts.map((part, i) => <Text key={i} style={styles.contactItem}>{part}</Text>)}
        </View>

        {cv.summary ? (
          <View>
            <Text style={styles.sectionHead}>Professional Summary</Text>
            <Text style={styles.summary}>{cv.summary}</Text>
          </View>
        ) : null}

        {cv.experience.length > 0 ? (
          <View>
            <Text style={styles.sectionHead}>Experience</Text>
            {cv.experience.map((exp, i) => (
              <View key={i} style={styles.expBlock} wrap={false}>
                <View style={styles.expRow}>
                  <Text style={styles.expTitle}>{exp.title}</Text>
                  <Text style={styles.expPeriod}>{exp.period}</Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
                {exp.bullets.map((b, j) => (
                  <View key={j} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {hasSkills ? (
          <View>
            <Text style={styles.sectionHead}>Skills</Text>
            {cv.skills.technical.length > 0 ? <Text style={styles.skillRow}><Text style={styles.bold}>Technical: </Text>{cv.skills.technical.join(", ")}</Text> : null}
            {cv.skills.tools.length > 0 ? <Text style={styles.skillRow}><Text style={styles.bold}>Tools: </Text>{cv.skills.tools.join(", ")}</Text> : null}
            {cv.skills.soft.length > 0 ? <Text style={styles.skillRow}><Text style={styles.bold}>Soft Skills: </Text>{cv.skills.soft.join(", ")}</Text> : null}
          </View>
        ) : null}

        {cv.education.length > 0 ? (
          <View>
            <Text style={styles.sectionHead}>Education</Text>
            {cv.education.map((edu, i) => (
              <View key={i} style={styles.eduRow}>
                <View style={styles.eduLeft}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduInst}>{edu.institution}</Text>
                </View>
                <Text style={styles.eduPeriod}>{edu.period}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {cv.certifications.length > 0 ? (
          <View>
            <Text style={styles.sectionHead}>Certifications</Text>
            {cv.certifications.map((cert, i) => <Text key={i} style={styles.certItem}>{cert}</Text>)}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
