import { useSettingsStore } from "@/src/stores/settings";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MIN_FONT = 14;
const MAX_FONT = 28;
const STEP = 1;

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { fontSize, setFontSize } = useSettingsStore();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <Text style={styles.screenTitle}>Ajustes</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tamaño de fuente</Text>
        <View style={styles.sliderRow}>
          <Text style={styles.labelSmall}>A</Text>
          <Slider
            style={styles.slider}
            minimumValue={MIN_FONT}
            maximumValue={MAX_FONT}
            step={STEP}
            value={fontSize}
            onValueChange={setFontSize}
            minimumTrackTintColor="#1A1A1A"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#1A1A1A"
            accessibilityLabel="Tamaño de fuente"
          />
          <Text style={styles.labelLarge}>A</Text>
        </View>
        <Text
          style={[styles.preview, { fontSize, lineHeight: fontSize * 1.7 }]}
        >
          Sublime gracia del Señor{"\n"}que a un infeliz salvó.
        </Text>
      </View>

      <View style={styles.spacer} />

      <Pressable
        style={({ pressed }) => [
          styles.contactButton,
          pressed && styles.contactButtonPressed,
        ]}
        onPress={() =>
          Linking.openURL(
            "https://wa.me/5491140392404?text=Hola,%20tengo%20una%20sugerencia%20para%20la%20app%20Himnos",
          )
        }
        accessibilityRole="button"
        accessibilityLabel="Enviar sugerencia por WhatsApp"
      >
        <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
        <Text style={styles.contactButtonText}>Enviar sugerencia</Text>
      </Pressable>
      <View style={{ height: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 24,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#AAAAAA",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  labelSmall: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  labelLarge: {
    fontSize: 24,
    fontWeight: "600",
    color: "#999",
  },
  slider: {
    flex: 1,
    height: 40,
  },
  preview: {
    marginTop: 20,
    color: "#2A2A2A",
  },
  spacer: {
    flex: 1,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#179130",
    borderRadius: 14,
    paddingVertical: 14,
    gap: 10,
  },
  contactButtonPressed: {
    opacity: 0.8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
