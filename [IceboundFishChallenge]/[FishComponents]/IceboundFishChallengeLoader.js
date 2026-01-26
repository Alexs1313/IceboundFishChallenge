import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { iceboundFishChallengeHtmlLoader } from '../[IceboundConstants]/iceboundFishChallengeHtmlLoader';

const IceboundFishChallengeLoader = () => {
  const navigation = useNavigation();
  const [isVisibleIcon, setIsVisibleIcon] = useState(true);

  useEffect(() => {
    const hideIconTimeout = setTimeout(() => {
      setIsVisibleIcon(false);

      const navigateTimeout = setTimeout(() => {
        navigation.replace('ChallengeOnboardScreen');
      }, 2000);

      return () => clearTimeout(navigateTimeout);
    }, 5000);

    return () => clearTimeout(hideIconTimeout);
  }, []);

  return (
    <ImageBackground
      source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeBg.png')}
      style={{ flex: 1 }}
    >
      {!isVisibleIcon ? (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLogo.png')}
            />
          ) : (
            <Image
              source={require('../IceboundFishChallengeAssets/images/icon.png')}
              style={{
                width: 290,
                height: 240,
                marginBottom: 54,
                borderRadius: 50,
              }}
            />
          )}
        </View>
      ) : (
        <View style={styles.spinner}>
          <WebView
            originWhitelist={['*']}
            source={{ html: iceboundFishChallengeHtmlLoader }}
            style={{ width: 220, height: 200, backgroundColor: 'transparent' }}
            scrollEnabled={false}
          />
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IceboundFishChallengeLoader;
