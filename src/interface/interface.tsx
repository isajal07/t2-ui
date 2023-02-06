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

export interface GameModeParameters {
  training: Parameters;
  session: Parameters;
}
