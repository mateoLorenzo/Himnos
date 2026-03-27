import hymnsData from "@/src/data/hymns.json";
import { Hymn } from "@/src/types/hymn";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const hymns = hymnsData as Hymn[];

export default function HymnDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hymn = hymns.find((h) => h.id === Number(id));

  if (!hymn) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Himno no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerSection}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>#{hymn.id}</Text>
        </View>
        <Text style={styles.title}>{hymn.title}</Text>
      </View>

      <View style={styles.separator} />

      {hymn.verses.map((verse, index) => (
        <View key={index} style={styles.verseBlock}>
          <Text style={styles.verseNumber}>{index + 1}</Text>
          <Text style={styles.verse}>{verse}</Text>
        </View>
      ))}

      {hymn.chorus && (
        <View style={styles.chorusContainer}>
          <Text style={styles.chorusLabel}>Coro</Text>
          <Text style={styles.chorus}>{hymn.chorus}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 60,
  },
  headerSection: {
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#1A1A1A",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    fontVariant: ["tabular-nums"],
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    lineHeight: 32,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E0E0E0",
    marginVertical: 24,
  },
  verseBlock: {
    flexDirection: "row",
    marginBottom: 28,
    gap: 14,
  },
  verseNumber: {
    fontSize: 13,
    fontWeight: "600",
    color: "#C0C0C0",
    marginTop: 3,
    width: 16,
    textAlign: "right",
    fontVariant: ["tabular-nums"],
  },
  verse: {
    flex: 1,
    fontSize: 18,
    lineHeight: 30,
    color: "#2A2A2A",
  },
  chorusContainer: {
    borderLeftWidth: 3,
    borderLeftColor: "#1A1A1A",
    paddingLeft: 18,
    marginLeft: 30,
    marginBottom: 28,
  },
  chorusLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#AAAAAA",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  chorus: {
    fontSize: 18,
    lineHeight: 30,
    color: "#2A2A2A",
    fontStyle: "italic",
  },
  notFound: {
    textAlign: "center",
    marginTop: 48,
    fontSize: 16,
    color: "#999",
  },
});
