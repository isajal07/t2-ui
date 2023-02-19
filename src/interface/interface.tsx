export interface Accuracies {
    wave: number;
    AICorrectProbability: number;
    humanCorrectProbability: number;
}

export interface Parameters {
  maxWaves: number;
  accuracies: Accuracies[];
  penalty: number;
  maliciousPacketProbability: number;
  intervalBetweenPackets: number;
  maxNumberOfPackets: number;
  minIntervalBetweenRuleChanges: number;
  maxIntervalBetweenRuleChanges: number;
  minHumanAdviceTimeInSeconds: number;
  maxHumanAdviceTimeInSeconds: number;
  minAIAdviceTimeInSeconds: number;
  maxAIAdviceTimeInSeconds: number;
  AIRandomSeed: number;
  humanRandomSeed: number;
  difficultyRatio: number;
}

export interface GameModeSettings {
  _id?: string;
  name: string;
  note: string;
  isSelected: Boolean;
  training: Parameters;
  session: Parameters;
}

export const defaultSettings = {
  name:"",
  note:"",
  isSelected: false,
  training: {
      maxWaves: 2,
      accuracies: [
        {
          wave: 1,
          AICorrectProbability: 0.7,
          humanCorrectProbability: 0.8,
        },
        {
          wave: 2,
          AICorrectProbability: 0.8,
          humanCorrectProbability: 0.8,
        },
      ],
      penalty: 15,
      maliciousPacketProbability: 0.25,
      intervalBetweenPackets: 0.5,
      maxNumberOfPackets: 500,
      minIntervalBetweenRuleChanges: 23,
      maxIntervalBetweenRuleChanges: 40,
      minHumanAdviceTimeInSeconds: 4,
      maxHumanAdviceTimeInSeconds: 4,
      minAIAdviceTimeInSeconds: 4,
      maxAIAdviceTimeInSeconds: 4,
      AIRandomSeed: 4583,
      humanRandomSeed: 66305,
      difficultyRatio: 0.8,
    },
  session: {
      maxWaves: 1,
      accuracies: [
        {
          wave: 1,
          AICorrectProbability: 0.8,
          humanCorrectProbability: 0.8,
        },
      ],
      penalty: 15,
      maliciousPacketProbability: 0.25,
      intervalBetweenPackets: 0.5,
      maxNumberOfPackets: 500,
      minIntervalBetweenRuleChanges: 23,
      maxIntervalBetweenRuleChanges: 40,
      minHumanAdviceTimeInSeconds: 4,
      maxHumanAdviceTimeInSeconds: 4,
      minAIAdviceTimeInSeconds: 4,
      maxAIAdviceTimeInSeconds: 4,
      AIRandomSeed: 4583,
      humanRandomSeed: 66305,
      difficultyRatio: 0.8,
    },
  };