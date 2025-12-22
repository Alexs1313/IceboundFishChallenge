import { createStackNavigator } from '@react-navigation/stack';
import IceboundFishChallengeLoader from '../IceboundFishChallengeComponents/IceboundFishChallengeLoader';
import IceboundFishChallengeOnboard from '../IceboundFishChallengeViews/IceboundFishChallengeOnboard';
import IceboundFishChallengeHome from '../IceboundFishChallengeViews/IceboundFishChallengeHome';
import IceboundFishChallengeLevels from '../IceboundFishChallengeViews/IceboundFishChallengeLevels';
import IceboundFishChallengeRewards from '../IceboundFishChallengeViews/IceboundFishChallengeRewards';
import IceboundFishChallengeTales from '../IceboundFishChallengeViews/IceboundFishChallengeTales';
import IceboundFishChallengeSaved from '../IceboundFishChallengeViews/IceboundFishChallengeSaved';

const Stack = createStackNavigator();

const IceboundFishChallengeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="IceboundFishChallengeLoader"
        component={IceboundFishChallengeLoader}
      />
      <Stack.Screen
        name="IceboundFishChallengeOnboard"
        component={IceboundFishChallengeOnboard}
      />
      <Stack.Screen
        name="IceboundFishChallengeHome"
        component={IceboundFishChallengeHome}
      />
      <Stack.Screen
        name="IceboundFishChallengeLevels"
        component={IceboundFishChallengeLevels}
      />
      <Stack.Screen
        name="IceboundFishChallengeRewards"
        component={IceboundFishChallengeRewards}
      />
      <Stack.Screen
        name="IceboundFishChallengeTales"
        component={IceboundFishChallengeTales}
      />
      <Stack.Screen
        name="IceboundFishChallengeSaved"
        component={IceboundFishChallengeSaved}
      />
    </Stack.Navigator>
  );
};

export default IceboundFishChallengeStack;
