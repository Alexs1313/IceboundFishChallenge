import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ScrollView,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fishSearchGameLevels } from '../IceboundFishChallengeData/fishSearchGameLevels';

const IceboundFishChallengeLevels = () => {
  const navigationIceboundLevels = useNavigation();
  const [currentScreenStageIcebound, setCurrentScreenStageIcebound] = useState(
    'LEVEL_SELECTION_ICEBOUND',
  );
  const [activeLevelIndexIcebound, setActiveLevelIndexIcebound] = useState(1);
  const [completedLevelsListIcebound, setCompletedLevelsListIcebound] =
    useState([]);
  const [userInputAnswerIcebound, setUserInputAnswerIcebound] = useState('');
  const [isLevelWinStateIcebound, setIsLevelWinStateIcebound] = useState(false);
  const [failedAttemptsCountIcebound, setFailedAttemptsCountIcebound] =
    useState(0);
  const [noRetryWinStreakCounterIcebound, setNoRetryWinStreakCounterIcebound] =
    useState(0);

  useEffect(() => {
    loadSavedProgressIcebound();
  }, []);

  const loadSavedProgressIcebound = async () => {
    const savedProgressRawIcebound = await AsyncStorage.getItem(
      'ICEBOUND_FISH_PROGRESS',
    );
    if (savedProgressRawIcebound) {
      const parsedProgressIcebound = JSON.parse(savedProgressRawIcebound);
      setCompletedLevelsListIcebound(parsedProgressIcebound.completed || []);
      setActiveLevelIndexIcebound(parsedProgressIcebound.currentLevel || 1);
    }
  };

  const unlockRewardByIdIcebound = async rewardIdentifierIcebound => {
    const storedRewardsRawIcebound = await AsyncStorage.getItem(
      'ICEBOUND_REWARDS',
    );
    const rewardsMapIcebound = storedRewardsRawIcebound
      ? JSON.parse(storedRewardsRawIcebound)
      : {};

    if (!rewardsMapIcebound[rewardIdentifierIcebound]) {
      rewardsMapIcebound[rewardIdentifierIcebound] = true;
      await AsyncStorage.setItem(
        'ICEBOUND_REWARDS',
        JSON.stringify(rewardsMapIcebound),
      );
    }
  };

  const persistProgressIcebound = async (
    nextLevelIndexIcebound,
    completedArrayIcebound,
  ) => {
    await AsyncStorage.setItem(
      'ICEBOUND_FISH_PROGRESS',
      JSON.stringify({
        currentLevel: nextLevelIndexIcebound,
        completed: completedArrayIcebound,
      }),
    );
  };

  const currentLevelDataIcebound = fishSearchGameLevels.find(
    levelItemIcebound => levelItemIcebound.id === activeLevelIndexIcebound,
  );

  const evaluateUserAnswerIcebound = async () => {
    const isCorrectAnswerIcebound =
      Number(userInputAnswerIcebound) === currentLevelDataIcebound.answer;

    setIsLevelWinStateIcebound(isCorrectAnswerIcebound);

    if (isCorrectAnswerIcebound) {
      const updatedCompletedLevelsIcebound = [
        ...new Set([...completedLevelsListIcebound, activeLevelIndexIcebound]),
      ];

      const nextLevelIndexIcebound = Math.min(activeLevelIndexIcebound + 1, 9);

      setCompletedLevelsListIcebound(updatedCompletedLevelsIcebound);
      persistProgressIcebound(
        nextLevelIndexIcebound,
        updatedCompletedLevelsIcebound,
      );

      if (updatedCompletedLevelsIcebound.length >= 1)
        unlockRewardByIdIcebound('frozen_mark');
      if (failedAttemptsCountIcebound === 0)
        unlockRewardByIdIcebound('silent_count');
      if (
        updatedCompletedLevelsIcebound.length >= 3 &&
        failedAttemptsCountIcebound === 0
      )
        unlockRewardByIdIcebound('icebound_eye');

      if (activeLevelIndexIcebound === 4)
        unlockRewardByIdIcebound('crack_watcher');
      if (updatedCompletedLevelsIcebound.length >= 5)
        unlockRewardByIdIcebound('snow_beneath');
      if (failedAttemptsCountIcebound >= 2)
        unlockRewardByIdIcebound('cold_patience');

      if (activeLevelIndexIcebound === 7)
        unlockRewardByIdIcebound('hidden_tail');
      if (noRetryWinStreakCounterIcebound >= 7)
        unlockRewardByIdIcebound('still_water');
      if (updatedCompletedLevelsIcebound.length === 9)
        unlockRewardByIdIcebound('winter_proof');

      setFailedAttemptsCountIcebound(0);
      setNoRetryWinStreakCounterIcebound(prevStreak => prevStreak + 1);
    } else {
      setFailedAttemptsCountIcebound(prevAttempt => prevAttempt + 1);
      setNoRetryWinStreakCounterIcebound(0);
    }

    setCurrentScreenStageIcebound('LEVEL_RESULT_ICEBOUND');
  };

  const startSelectedLevelIcebound = levelNumberIcebound => {
    setActiveLevelIndexIcebound(levelNumberIcebound);
    setUserInputAnswerIcebound('');
    setCurrentScreenStageIcebound('LEVEL_GAME_ICEBOUND');
  };

  const proceedToNextLevelIcebound = () => {
    setUserInputAnswerIcebound('');
    setActiveLevelIndexIcebound(prevLevel => Math.min(prevLevel + 1, 9));
    setCurrentScreenStageIcebound('LEVEL_GAME_ICEBOUND');
  };

  if (currentScreenStageIcebound === 'LEVEL_SELECTION_ICEBOUND') {
    return (
      <ImageBackground
        source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeBg.png')}
        style={styles.screenBackgroundIcebound}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerWrapperIcebound}>
            <LinearGradient
              colors={['#25609B', '#64BAE1']}
              style={styles.headerBarIcebound}
            >
              <TouchableOpacity
                style={styles.backButtonIcebound}
                onPress={() => navigationIceboundLevels.goBack()}
              >
                <Image
                  source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeArrow.png')}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitleIcebound}>Levels</Text>
            </LinearGradient>

            <View style={styles.levelGridIcebound}>
              {fishSearchGameLevels.map(levelItemIcebound => {
                const isCompletedIcebound =
                  completedLevelsListIcebound.includes(levelItemIcebound.id);
                const isCurrentIcebound =
                  levelItemIcebound.id === activeLevelIndexIcebound;
                const isLockedIcebound =
                  levelItemIcebound.id > activeLevelIndexIcebound;

                return (
                  <TouchableOpacity
                    key={levelItemIcebound.id}
                    disabled={isLockedIcebound}
                    onPress={() =>
                      startSelectedLevelIcebound(levelItemIcebound.id)
                    }
                    style={[
                      styles.levelTileIcebound,
                      isCompletedIcebound && styles.levelTileCompletedIcebound,
                      isCurrentIcebound && styles.levelTileCurrentIcebound,
                    ]}
                  >
                    <Text
                      style={[
                        styles.levelTileTextIcebound,
                        (isCompletedIcebound || isCurrentIcebound) && {
                          color: '#14273A',
                        },
                      ]}
                    >
                      {levelItemIcebound.id}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              onPress={() =>
                startSelectedLevelIcebound(activeLevelIndexIcebound)
              }
            >
              <ImageBackground
                style={styles.primaryButtonIcebound}
                source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeStartBtn.png')}
              >
                <Text style={styles.primaryButtonTextIcebound}>
                  Start Level {activeLevelIndexIcebound}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  if (currentScreenStageIcebound === 'LEVEL_GAME_ICEBOUND') {
    return (
      <ImageBackground
        source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeHomeBg.png')}
        style={styles.screenBackgroundIcebound}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerWrapperIcebound}>
            <LinearGradient
              colors={['#25609B', '#64BAE1']}
              style={styles.headerBarIcebound}
            >
              <TouchableOpacity
                style={styles.backButtonIcebound}
                onPress={() => navigationIceboundLevels.goBack()}
              >
                <Image
                  source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeArrow.png')}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitleIcebound}>
                Level {activeLevelIndexIcebound}
              </Text>
            </LinearGradient>
          </View>

          <Text style={styles.questionTextIcebound}>
            Find all the fish. How many are there?
          </Text>

          <TextInput
            value={userInputAnswerIcebound}
            onChangeText={setUserInputAnswerIcebound}
            keyboardType="number-pad"
            placeholder="..."
            placeholderTextColor="#000"
            style={styles.answerInputIcebound}
          />

          <Image
            source={currentLevelDataIcebound.image}
            style={styles.levelImageIcebound}
          />

          <TouchableOpacity onPress={evaluateUserAnswerIcebound}>
            <ImageBackground
              style={styles.primaryButtonIcebound}
              source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeStartBtn.png')}
            >
              <Text style={styles.primaryButtonTextIcebound}>Continue</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={
        isLevelWinStateIcebound
          ? require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWinBg.png')
          : require('../IceboundFishChallengeAssets/images/IceboundFishChallengeLoseBg.png')
      }
      style={styles.screenBackgroundIcebound}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultContainerIcebound}>
          <Image
            source={
              isLevelWinStateIcebound
                ? require('../IceboundFishChallengeAssets/images/IceboundFishChallengeLoseTxt1.png')
                : require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWinTxt1.png')
            }
            style={{ marginTop: 30 }}
          />

          <View>
            <Image
              source={
                isLevelWinStateIcebound
                  ? require('../IceboundFishChallengeAssets/images/IceboundFishChallengeLoseTxt2.png')
                  : require('../IceboundFishChallengeAssets/images/IceboundFishChallengeWinTxt2.png')
              }
            />

            <View style={styles.resultButtonsGroupIcebound}>
              <TouchableOpacity
                style={styles.resultActionButtonIcebound}
                onPress={() =>
                  isLevelWinStateIcebound
                    ? proceedToNextLevelIcebound()
                    : setCurrentScreenStageIcebound('LEVEL_GAME_ICEBOUND')
                }
              >
                <Text style={styles.resultActionTextIcebound}>
                  {isLevelWinStateIcebound ? 'Next Level' : 'Try Again'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resultActionButtonIcebound}
                onPress={() =>
                  Share.share({
                    message: `I completed level ${activeLevelIndexIcebound} in Icebound Fish Challenge 🧊🐟`,
                  })
                }
              >
                <Text style={styles.resultActionTextIcebound}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resultActionButtonIcebound}
                onPress={() => navigationIceboundLevels.goBack()}
              >
                <Text style={styles.resultActionTextIcebound}>Home</Text>
              </TouchableOpacity>
            </View>
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
  headerWrapperIcebound: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 70,
  },
  headerBarIcebound: {
    height: 62,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonIcebound: {
    position: 'absolute',
    left: 20,
  },
  headerTitleIcebound: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  levelGridIcebound: {
    marginTop: 80,
    width: '65%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 90,
    gap: 20,
  },
  levelTileIcebound: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#25609B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#14243E',
  },
  levelTileCompletedIcebound: {
    backgroundColor: '#ADF2D6',
  },
  levelTileCurrentIcebound: {
    backgroundColor: '#ADD4F2',
  },
  levelTileTextIcebound: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '900',
  },
  questionTextIcebound: {
    marginTop: 50,
    fontSize: 20,
    marginBottom: 23,
    color: '#14243E',
    fontWeight: '700',
  },
  levelImageIcebound: {
    width: 277,
    height: 420,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#374253',
  },
  answerInputIcebound: {
    width: 150,
    height: 39,
    backgroundColor: '#fff',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#374253',
    color: '#000',
    fontWeight: '700',
  },
  primaryButtonIcebound: {
    width: 155,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonTextIcebound: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  resultContainerIcebound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 150,
  },
  resultButtonsGroupIcebound: {
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
  },
  resultActionButtonIcebound: {
    width: 155,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#223B6F',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ADD4F2',
  },
  resultActionTextIcebound: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default IceboundFishChallengeLevels;
