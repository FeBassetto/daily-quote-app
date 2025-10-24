import { useAuth } from "@/src/hooks/useAuth";
import { DailyQuoteScreen } from "@/src/screens/DailyQuote/DailyQuote";

const HomePage = () => {
  const { signOut } = useAuth();

  return <DailyQuoteScreen onLogout={signOut} />;
};

export default HomePage;
