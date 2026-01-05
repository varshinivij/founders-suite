import { Type } from '@google/genai';
import { playbookSchema } from './playbookSchema';

export const responseSchema = {
  type: Type.OBJECT,
  properties: {
    assistantMessage: {
      type: Type.STRING,
      description: "Natural language message shown to the user."
    },
    bluePrintState: playbookSchema,
  },
  required: ["assistantMessage"]
};
