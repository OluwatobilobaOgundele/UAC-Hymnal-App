import LanguageSelector from "../components/LanguageSelector";
import { router } from "expo-router";

export default function Screen() {
  return (
    <LanguageSelector
      onSelectLanguage={(lang) =>
        router.push({ pathname: "/hymnList", params: { lang } })
      }
    />
  );
}
