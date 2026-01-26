import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// custom button import
import IceboundFishChallengeButton from '../[FishComponents]/IceboundFishChallengeButton';

const FishChallengeHome = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeTalesBg.png')}
      style={styles.screenBackgroundIcebound}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContentIcebound}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.homeContainerIcebound}>
          {Platform.OS === 'ios' ? (
            <Image
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLogo.png')}
              style={styles.homeLogoImageIcebound}
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

          <View style={styles.menuButtonsWrapperIcebound}>
            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl1.png')}
              onPress={() => navigation.navigate('FishLevelsScreen')}
            />

            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl2.png')}
              onPress={() =>
                navigation.navigate('IceboundFishChallengeRewards')
              }
            />

            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl3.png')}
              onPress={() => navigation.navigate('FishTalesScreen')}
            />

            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeLbl4.png')}
              onPress={() => navigation.navigate('IceboundSavedScreen')}
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

export default FishChallengeHome;
