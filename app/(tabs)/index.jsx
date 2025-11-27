import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import SplashScreen from '../../components/SplashScreen';
import OnboardingScreen from '../../components/OnboardingScreen';
import LanguageSelector from '../../components/LanguageSelector';
import HymnList from '../../components/HymnList';
import HymnDetail from '../../components/HymnDetails';

export default function HomeScreen() {
  const [appState, setAppState] = useState({
    screen: 'splash',
    language: null,
    hymn: null,
  });

  const renderScreen = () => {
    switch (appState.screen) {

      /** SPLASH */
      case 'splash':
        return (
          <SplashScreen
            onFinish={() => setAppState({ ...appState, screen: 'onboarding1' })}
          />
        );

      /** ONBOARDING 1 */
      case 'onboarding1':
        return (
          <OnboardingScreen
            message="Let's Rejoice"
            isLast={false}
            onNext={() => setAppState({ ...appState, screen: 'onboarding2' })}
          />
        );

      /** ONBOARDING 2 */
      case 'onboarding2':
        return (
          <OnboardingScreen
            message="Be Glad!"
            isLast={true}
            onNext={() => setAppState({ ...appState, screen: 'language' })}
          />
        );

      /** LANGUAGE SELECTION */
      case 'language':
        return (
          <LanguageSelector
            onSelectLanguage={(language) =>
              setAppState({ ...appState, screen: 'hymnList', language })
            }
          />
        );

      /** HYMN LIST */
      case 'hymnList':
        return (
          <HymnList
            language={appState.language}
            onSelectHymn={(hymn) =>
              setAppState({ ...appState, screen: 'hymnDetail', hymn })
            }
            onBack={() => setAppState({ ...appState, screen: 'language' })}
          />
        );

      /** HYMN DETAIL */
      case 'hymnDetail':
        return (
          <HymnDetail
            hymn={appState.hymn}
            language={appState.language}
            onBack={() =>
              setAppState({
                ...appState,
                screen: 'hymnList',
              })
            }
          />
        );

      default:
        return (
          <SplashScreen
            onFinish={() => setAppState({ ...appState, screen: 'onboarding1' })}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
