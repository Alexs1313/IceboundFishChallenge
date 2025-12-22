import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { iceboundFishChallengeHtmlLoader } from '../IceboundFishChallengeConsts/iceboundFishChallengeHtmlLoader';

const IceboundFishChallengeLoader = () => {
  const navigation = useNavigation();
  const [isVisibleIcon, setIsVisibleIcon] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleIcon(false);
      setTimeout(() => {
        navigation.replace('IceboundFishChallengeOnboard');
      }, 2000);
    }, 5000);
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
          <Image
            source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLogo.png')}
          />
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
