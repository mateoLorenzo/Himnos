import hymnsData from "@/src/data/hymns.json";
import { useFavoritesStore } from "@/src/stores/favorites";
import { useSettingsStore } from "@/src/stores/settings";
import { Hymn } from "@/src/types/hymn";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const hymns = hymnsData as Hymn[];

export default function FavoritesScreen() {
  const { push } = useRouter();
  const insets = useSafeAreaInsets();
  const favoriteIds = useFavoritesStore((s) => s.ids);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const fontSize = useSettingsStore((s) => s.fontSize);

  const favorites = useMemo(
    () => hymns.filter((h) => favoriteIds.has(h.id)),
    [favoriteIds],
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[styles.headerSection, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>Favoritos</Text>
      </View>

      <FlashList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
            onPress={() => push(`/hymn/${item.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`Himno ${item.id}, ${item.title}`}
          >
            <Text style={styles.number}>{item.id}</Text>
            <Text style={[styles.title, { fontSize }]} numberOfLines={1}>
              {item.title}
            </Text>
            <Pressable
              onPress={() => toggleFavorite(item.id)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Quitar de favoritos"
            >
              <Ionicons name="heart" size={20} color="#E05555" />
            </Pressable>
          </Pressable>
        )}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={48} color="#CCC" />
            <Text style={styles.emptyText}>Aún no tenés himnos favoritos</Text>
            <Text style={styles.emptySubtext}>
              Tocá el corazón en un himno para guardarlo acá
            </Text>
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
    backgroundColor: "#000",
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
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
    color: "#1A1A1A",
    flex: 1,
    fontWeight: "400",
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 80,
    gap: 10,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#999",
    marginTop: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#BBB",
    textAlign: "center",
  },
});
