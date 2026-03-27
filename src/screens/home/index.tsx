import hymnsData from "@/src/data/hymns.json";
import { Hymn } from "@/src/types/hymn";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const hymns = hymnsData as Hymn[];

export default function HomeScreen() {
  const { push } = useRouter();
  const insets = useSafeAreaInsets();

  const handlePress = useCallback(
    (id: number) => {
      push(`/hymn/${id}`);
    },
    [push],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.header}>Himnos</Text>
      <FlashList
        data={hymns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
            onPress={() => handlePress(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`Himno ${item.id}, ${item.title}`}
          >
            <Text style={styles.number}>{item.id}</Text>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
          </Pressable>
        )}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E8E8E8",
  },
  itemPressed: {
    opacity: 0.6,
  },
  number: {
    fontSize: 14,
    color: "#999",
    width: 36,
    fontVariant: ["tabular-nums"],
  },
  title: {
    fontSize: 16,
    color: "#1A1A1A",
    flex: 1,
  },
});
