import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import IceboundFishChallengeButton from '../IceboundFishChallengeComponents/IceboundFishChallengeButton';

const IceboundFishChallengeHome = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeBg.png')}
      style={styles.screenBackgroundIcebound}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContentIcebound}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.homeContainerIcebound}>
          <Image
            source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLogo.png')}
            style={styles.homeLogoImageIcebound}
          />

          <View style={styles.menuButtonsWrapperIcebound}>
            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl1.png')}
              onPress={() => navigation.navigate('IceboundFishChallengeLevels')}
            />

            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl2.png')}
              onPress={() =>
                navigation.navigate('IceboundFishChallengeRewards')
              }
            />

            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl3.png')}
              onPress={() => navigation.navigate('IceboundFishChallengeTales')}
            />

            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl4.png')}
              onPress={() => navigation.navigate('IceboundFishChallengeSaved')}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenBackgroundIcebound: {
    flex: 1,
  },
  scrollContentIcebound: {
    flexGrow: 1,
  },
  homeContainerIcebound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  homeLogoImageIcebound: {
    marginBottom: 54,
  },
  menuButtonsWrapperIcebound: {
    gap: 16,
  },
});

export default IceboundFishChallengeHome;
