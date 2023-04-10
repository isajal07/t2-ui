export interface WaveParameters {
    wave: number;
    AICorrectProbability: number;
    humanCorrectProbability: number;
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
}

export interface Parameters {
  maxWaves: number;
  waveParameters: WaveParameters[];
  AIRandomSeed: number;
  humanRandomSeed: number;
}

export interface StudyInfo {
  name: string;
  _id: string;
  numberOfSettings: number;
}
export interface GameModeSettings {
  _id?: string;
  name: string;
  note: string;
  createdBy: string | null;
  isSelected: Boolean;
  training: Parameters;
  session: Parameters;
  study: StudyInfo;
  settingNumber: number | null; 
}

export const defaultSettings = {
  name:"",
  note:"",
  createdBy: "Default",
  isSelected: false,
  study: {
    name: "",
    numberOfSettings: 1,
    _id: "",
  },
  settingNumber: null,
  training: {
      maxWaves: 2,
      waveParameters: [
        {
          wave: 1,
          AICorrectProbability: 0.7,
          humanCorrectProbability: 0.8,
          penalty: 10,
          maliciousPacketProbability: 0.25,
          intervalBetweenPackets: 0.5,
          maxNumberOfPackets: 500,
          minIntervalBetweenRuleChanges: 23,
          maxIntervalBetweenRuleChanges: 40,
          minHumanAdviceTimeInSeconds: 4,
          maxHumanAdviceTimeInSeconds: 4,
          minAIAdviceTimeInSeconds: 4,
          maxAIAdviceTimeInSeconds: 4,
        },
        {
          wave: 2,
          AICorrectProbability: 0.8,
          humanCorrectProbability: 0.8,
          penalty: 10,
          maliciousPacketProbability: 0.25,
          intervalBetweenPackets: 0.5,
          maxNumberOfPackets: 500,
          minIntervalBetweenRuleChanges: 23,
          maxIntervalBetweenRuleChanges: 40,
          minHumanAdviceTimeInSeconds: 4,
          maxHumanAdviceTimeInSeconds: 4,
          minAIAdviceTimeInSeconds: 4,
          maxAIAdviceTimeInSeconds: 4,
        },
      ],
      AIRandomSeed: 4583,
      humanRandomSeed: 66305,
    },
  session: {
      maxWaves: 1,
      waveParameters: [
        {
          wave: 1,
          AICorrectProbability: 0.8,
          humanCorrectProbability: 0.8,
          penalty: 10,
          maliciousPacketProbability: 0.25,
          intervalBetweenPackets: 0.5,
          maxNumberOfPackets: 500,
          minIntervalBetweenRuleChanges: 23,
          maxIntervalBetweenRuleChanges: 40,
          minHumanAdviceTimeInSeconds: 4,
          maxHumanAdviceTimeInSeconds: 4,
          minAIAdviceTimeInSeconds: 4,
          maxAIAdviceTimeInSeconds: 4,
        },
      ],
      
      AIRandomSeed: 4583,
      humanRandomSeed: 66305,
    },
  };