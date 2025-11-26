import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import SplashScreen from '../../components/SplashScreen';
import OnboardingScreen from '../../components/OnboardingScreen';
import LanguageSelector from '../../components/LanguageSelector';
import HymnList from '../../components/HymnList';
import HymnDetail from '../../components/HymnDetails';


export default function HomeScreen() {
  const [appState, setAppState] = useState({ screen: 'splash' });

  const renderScreen = () => {
    switch (appState.screen) {
      case 'splash':
        return <SplashScreen onFinish={() => setAppState({ screen: 'onboarding1' })} />;

      case 'onboarding1':
        return (
          <OnboardingScreen
            message="Let's Rejoice"
            isLast={false}
            onNext={() => setAppState({ screen: 'onboarding2' })}
          />
        );

      case 'onboarding2':
        return (
          <OnboardingScreen
            message="Be Glad!"
            isLast={true}
            onNext={() => setAppState({ screen: 'language' })}
          />
        );

      case 'language':
        return (
          <LanguageSelector
            onSelectLanguage={(language) => setAppState({ screen: 'hymnList', language })}
          />
        );

      case 'hymnList':
        return (
          <HymnList
            language={appState.language}
            onSelectHymn={(hymn) => setAppState({ screen: 'hymnDetail', hymn })}
          />
        );

      case 'hymnDetail':
        return (
          <HymnDetail
            hymn={appState.hymn}
            onBack={() => setAppState({ screen: 'hymnList', language: appState.hymn.language })}
          />
        );

      default:
        return <SplashScreen onFinish={() => setAppState({ screen: 'onboarding1' })} />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
