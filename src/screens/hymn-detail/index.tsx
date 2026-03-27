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
      <Text style={styles.number}>Himno {hymn.id}</Text>
      <Text style={styles.title}>{hymn.title}</Text>

      {hymn.verses.map((verse, index) => (
        <Text key={index} style={styles.verse}>
          {verse}
        </Text>
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
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
    paddingBottom: 48,
  },
  number: {
    fontSize: 14,
    color: "#999",
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 4,
    marginBottom: 24,
  },
  verse: {
    fontSize: 18,
    lineHeight: 30,
    color: "#1A1A1A",
    marginBottom: 24,
  },
  chorusContainer: {
    borderLeftWidth: 3,
    borderLeftColor: "#E8E8E8",
    paddingLeft: 16,
    marginBottom: 24,
  },
  chorusLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  chorus: {
    fontSize: 18,
    lineHeight: 30,
    color: "#1A1A1A",
    fontStyle: "italic",
  },
  notFound: {
    textAlign: "center",
    marginTop: 48,
    fontSize: 16,
    color: "#999",
  },
});
