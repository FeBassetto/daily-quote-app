import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button/Button";
import { Logo } from "../../components/Logo/Logo";
import { useConfirmLogout } from "../../hooks/useConfirmLogout";
import { styles } from "./styles.dailyquote";

interface DailyQuoteScreenProps {
  onLogout: () => Promise<void>;
}

export const DailyQuoteScreen = ({ onLogout }: DailyQuoteScreenProps) => {
  const { confirmLogout, loading } = useConfirmLogout({ onLogout });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo size="medium" />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Mensagem do Dia</Text>
          <Text style={styles.subtitle}>
            Em breve você verá aqui sua mensagem diária de inspiração
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Sair"
            variant="outline"
            onPress={confirmLogout}
            loading={loading}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
