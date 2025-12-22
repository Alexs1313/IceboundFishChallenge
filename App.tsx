import { NavigationContainer } from '@react-navigation/native';
import IceboundFishChallengeStack from './IceboundFishChallenge/IceboundFishChallengeNavigation/IceboundFishChallengeStack';
import { IceboundFishChallengeContext } from './IceboundFishChallenge/IceboundFishChallengeStore/iceboundFishChallengeContext';

const App = () => {
  return (
    <NavigationContainer>
      <IceboundFishChallengeContext>
        <IceboundFishChallengeStack />
      </IceboundFishChallengeContext>
    </NavigationContainer>
  );
};

export default App;
