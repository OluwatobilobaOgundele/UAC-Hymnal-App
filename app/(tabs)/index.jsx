import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import LanguageSelector from '../../components/LanguageSelector';
import HymnList from '../../components/HymnList';
import HymnDetail from '../../components/HymnDetails';
import 'react-native-reanimated';
import AnimatedWrapper from '../../components/AnimatedWrapper';

export default function HomeScreen() {
  const [appState, setAppState] = useState({
    screen: 'language',
    language: null,
    hymn: null,
  });

  const renderScreen = () => {
    switch (appState.screen) {
      /** LANGUAGE SELECTION */
      case 'language':
        return (
          <AnimatedWrapper key="language">
            <LanguageSelector
              onSelectLanguage={(language) =>
                setAppState({
                  ...appState,
                  screen: 'hymnList',
                  language,
                })
              }
            />
          </AnimatedWrapper>
        );

      /** HYMN LIST */
      case 'hymnList':
        return (
          <AnimatedWrapper key="hymnList">
            <HymnList
              language={appState.language}
              onSelectHymn={(hymn) =>
                setAppState({
                  ...appState,
                  screen: 'hymnDetail',
                  hymn,
                })
              }
              onBack={() => setAppState({ ...appState, screen: 'language' })}
            />
          </AnimatedWrapper>
        );

      /** HYMN DETAIL */
      case 'hymnDetail':
        return (
          <AnimatedWrapper key={`hymnDetail-${appState.hymn?.id}`}>
            <HymnDetail
              hymn={appState.hymn}
              language={appState.language}
              onBack={() =>
                setAppState({
                  ...appState,
                  screen: 'hymnList',
                })
              }
              onNavigateHymn={(nextHymn) =>
                setAppState({ ...appState, hymn: nextHymn })
              }
            />
          </AnimatedWrapper>
        );

      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});