import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { levelRewards } from '../[ChallengeData]/levelRewards';
import IceboundFishChallengeButton from '../[FishComponents]/IceboundFishChallengeButton';

const bgImg = require('../IceboundFishChallengeAssets/images/IceboundFishChallengeTalesBg.png');
const gradientColors = ['#25609B', '#64BAE1'];
const fff = '#FFFFFF';

const IceboundFishChallengeRewards = () => {
  const navigationIceboundRewards = useNavigation();
  const [earnedRewardsMapIcebound, setEarnedRewardsMapIcebound] = useState({});
  const { height } = useWindowDimensions();

  useEffect(() => {
    loadEarnedRewardsFromStorageIcebound();
  }, []);

  const loadEarnedRewardsFromStorageIcebound = async () => {
    try {
      const storedRewardsRawIcebound = await AsyncStorage.getItem(
        'ICEBOUND_REWARDS',
      );
      if (storedRewardsRawIcebound) {
        setEarnedRewardsMapIcebound(JSON.parse(storedRewardsRawIcebound));
      }
    } catch (error) {}
  };

  const hasAtLeastOneRewardIcebound = Object.values(
    earnedRewardsMapIcebound,
  ).some(Boolean);

  return (
    <ImageBackground source={bgImg} style={styles.screenBackgroundIcebound}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.topHeaderWrapperIcebound,
            { paddingTop: height * 0.07 },
          ]}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.topHeaderBarIcebound}
          >
            <TouchableOpacity
              style={styles.backNavigationButtonIcebound}
              onPress={() => navigationIceboundRewards.goBack()}
            >
              <Image
                source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeArrow.png')}
              />
            </TouchableOpacity>

            <Text style={styles.topHeaderTitleIcebound}>Level Rewards</Text>
          </LinearGradient>
        </View>

        {!hasAtLeastOneRewardIcebound ? (
          <View style={styles.emptyStateContainerIcebound}>
            <Text style={styles.emptyStateTextIcebound}>No rewards yet.</Text>

            <IceboundFishChallengeButton
              buttonLabel={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeFind.png')}
              onPress={() =>
                navigationIceboundRewards.navigate('FishLevelsScreen')
              }
            />
          </View>
        ) : (
          <View style={styles.rewardsGridContainerIcebound}>
            {levelRewards
              .filter(
                rewardItemIcebound =>
                  earnedRewardsMapIcebound[rewardItemIcebound.id],
              )
              .map(rewardItemIcebound => (
                <View
                  key={rewardItemIcebound.id}
                  style={styles.rewardCardContainerIcebound}
                >
                  <View style={styles.rewardImageFrameIcebound}>
                    <Image
                      source={rewardItemIcebound.image}
                      style={styles.rewardIconImageIcebound}
                    />
                  </View>

                  <Text style={styles.rewardTitleTextIcebound}>
                    {rewardItemIcebound.title}
                  </Text>
                  <Text style={styles.rewardDescriptionTextIcebound}>
                    {rewardItemIcebound.desc}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenBackgroundIcebound: {
    flex: 1,
  },
  topHeaderWrapperIcebound: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 70,
  },
  topHeaderBarIcebound: {
    height: 62,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backNavigationButtonIcebound: {
    position: 'absolute',
    left: 20,
  },
  topHeaderTitleIcebound: {
    color: fff,
    fontSize: 22,
    fontWeight: '800',
  },
  emptyStateContainerIcebound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyStateTextIcebound: {
    fontSize: 20,
    marginBottom: 70,
    color: '#1E2B3A',
    fontWeight: '700',
  },
  rewardsGridContainerIcebound: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  rewardCardContainerIcebound: {
    width: '47%',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  rewardImageFrameIcebound: {
    width: 84,
    height: 89,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#477394',
    borderWidth: 1,
    borderColor: '#14243E',
  },
  rewardIconImageIcebound: {
    width: 68,
    height: 68,
    resizeMode: 'contain',
  },
  rewardTitleTextIcebound: {
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 3,
    color: '#0F1B2F',
  },
  rewardDescriptionTextIcebound: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
  },
  primaryActionButtonIcebound: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 24,
  },
  primaryActionTextIcebound: {
    color: fff,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default IceboundFishChallengeRewards;
