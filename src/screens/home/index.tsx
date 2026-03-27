import hymnsData from "@/src/data/hymns.json";
import { Hymn } from "@/src/types/hymn";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const hymns = hymnsData as Hymn[];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const { push } = useRouter();
  const insets = useSafeAreaInsets();

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return hymns;
    const queryNum = parseInt(query, 10);
    return hymns.filter((h) => {
      if (!isNaN(queryNum) && h.id === queryNum) return true;
      return h.title.toLowerCase().includes(query);
    });
  }, [search]);

  const handlePress = useCallback(
    (id: number) => {
      push(`/hymn/${id}`);
    },
    [push],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.headerSection, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>Himnos</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={16} color="rgba(255,255,255,0.5)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o número..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
            accessibilityLabel="Buscar himnos"
            accessibilityRole="search"
          />
        </View>
      </View>

      <FlashList
        data={filtered}
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
            <Ionicons name="chevron-forward" size={16} color="#CCC" />
          </Pressable>
        )}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={40} color="#CCC" />
            <Text style={styles.emptyText}>No se encontraron himnos</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  headerSection: {
    backgroundColor: "#1A1A1A",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
    color: "#FFFFFF",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ECECEC",
  },
  itemPressed: {
    backgroundColor: "#F5F5F5",
  },
  number: {
    fontSize: 15,
    color: "#AAAAAA",
    width: 34,
    fontWeight: "500",
    fontVariant: ["tabular-nums"],
  },
  title: {
    fontSize: 16,
    color: "#1A1A1A",
    flex: 1,
    fontWeight: "400",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: "#999",
  },
});
