import hymnsData from "@/src/data/hymns.json";
import { useSettingsStore } from "@/src/stores/settings";
import { Hymn } from "@/src/types/hymn";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const hymns = hymnsData as Hymn[];

export default function HymnDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const fontSize = useSettingsStore((s) => s.fontSize);
  const hymn = hymns.find((h) => h.id === Number(id));

  if (!hymn) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Himno no encontrado</Text>
      </View>
    );
  }

  const textStyle = { fontSize, lineHeight: fontSize * 1.7 };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{hymn.title}</Text>
      <View style={styles.separator} />

      {hymn.verses.map((verse, index) => (
        <Text key={index} style={[styles.verse, textStyle]}>
          {verse}
        </Text>
      ))}

      {hymn.chorus && (
        <Text style={[styles.verse, textStyle]}>
          <Text style={styles.chorusLabel}>Coro:{"\n"}</Text>
          {hymn.chorus}
        </Text>
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
    paddingTop: 16,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    lineHeight: 32,
  },
  separator: {
    height: 3,
    backgroundColor: "#1A1A1A",
    marginTop: 14,
    marginBottom: 28,
    width: 50,
  },
  verse: {
    color: "#1A1A1A",
    marginBottom: 28,
  },
  chorusLabel: {
    fontWeight: "700",
  },
  notFound: {
    textAlign: "center",
    marginTop: 48,
    fontSize: 16,
    color: "#999",
  },
});
