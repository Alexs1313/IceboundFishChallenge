import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useStore } from '../[IceboundChallengeStore]/iceboundFishChallengeContext';
import { useNavigation } from '@react-navigation/native';

const bgImg = require('../IceboundFishChallengeAssets/images/IceboundFishChallengeTalesBg.png');
const gradientColors = ['#25609B', '#64BAE1'];
const fff = '#FFFFFF';

const IceboundSavedScreen = () => {
  const { storedIceboundTales, fetchSavedTales, deleteIceboundSavedTale } =
    useStore();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchSavedTales);
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground source={bgImg} style={styles.screenIcebound}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.topBarWrapIcebound, { paddingTop: height * 0.07 }]}
        >
          <LinearGradient colors={gradientColors} style={styles.topBarIcebound}>
            <TouchableOpacity
              style={styles.navBackIcebound}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeArrow.png')}
              />
            </TouchableOpacity>

            <Text style={styles.topTitleIcebound}>Saved Tales</Text>
          </LinearGradient>
        </View>

        {storedIceboundTales.length === 0 ? (
          <View style={styles.emptyStateWrapIcebound}>
            <Text style={styles.emptyStateTextIcebound}>
              No saved tales yet.
            </Text>
          </View>
        ) : (
          <View>
            {storedIceboundTales.map(tale => (
              <View key={tale.id} style={styles.taleBlockIcebound}>
                <LinearGradient
                  colors={['#E0F9FD', '#2974C0']}
                  style={styles.frameOuterIcebound}
                >
                  <LinearGradient
                    colors={['#25609B', '#25609B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.frameInnerIcebound}
                  >
                    <View style={styles.contentBoxIcebound}>
                      <Text style={styles.taleTitleIcebound}>{tale.title}</Text>
                      <Text style={styles.taleTextIcebound}>{tale.text}</Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>

                <View style={styles.actionRowIcebound}>
                  <TouchableOpacity
                    style={styles.deleteBtnIcebound}
                    onPress={() => deleteIceboundSavedTale(tale.id)}
                  >
                    <Image
                      source={require('../IceboundFishChallengeAssets/images/IceboundFishChallengeFilled.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenIcebound: {
    flex: 1,
  },
  topBarWrapIcebound: {
    paddingTop: 70,
  },
  topBarIcebound: {
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBackIcebound: {
    position: 'absolute',
    left: 20,
  },
  topTitleIcebound: {
    color: fff,
    fontSize: 22,
    fontWeight: '800',
  },
  emptyStateWrapIcebound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateTextIcebound: {
    fontSize: 20,
    color: '#14243E',
    fontWeight: '700',
  },
  taleBlockIcebound: {
    marginBottom: 5,
  },
  frameOuterIcebound: {
    borderRadius: 6,
    width: '80%',
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: 40,
  },
  frameInnerIcebound: {
    borderRadius: 5,
    padding: Platform.OS === 'ios' ? 3 : 0,
    margin: Platform.OS === 'ios' ? 0 : 3,
  },
  contentBoxIcebound: {
    padding: 18,
  },
  taleTitleIcebound: {
    fontSize: 20,
    fontWeight: '800',
    color: fff,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  taleTextIcebound: {
    fontSize: 16,
    color: fff,
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  actionRowIcebound: {
    alignItems: 'center',
  },
  deleteBtnIcebound: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#1F5C94',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#14243E',
    marginTop: 8,
  },
});

export default IceboundSavedScreen;
