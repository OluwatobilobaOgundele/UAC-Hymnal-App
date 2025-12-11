import HymnList from "../components/HymnList";
import { useLocalSearchParams, router } from "expo-router";

export default function Screen() {
  const { lang } = useLocalSearchParams();

  return (
    <HymnList
  language={lang}
  onSelectHymn={(hymn) =>
    router.push({
      pathname: "/hymnDetail",
      params: {
        hymn: JSON.stringify(hymn),
        lang,
      },
    })
  }
  onBack={() => router.back()}
/>

  );
}
