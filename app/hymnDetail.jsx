import HymnDetail from "../components/HymnDetails";
import { useLocalSearchParams, router } from "expo-router";

export default function Screen() {
  const { hymn, lang } = useLocalSearchParams();

  let hymnObj = null;
  try {
    hymnObj = JSON.parse(hymn);
  } catch {
    hymnObj = null;
  }

  return (
    <HymnDetail
      hymn={hymnObj}
      language={lang}
      onBack={() => router.back()}
    />
  );
}
