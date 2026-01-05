import { Type } from '@google/genai';

export const playbookSchema = {
  type: Type.OBJECT,
  properties: {
    ideaCore: {
      type: Type.OBJECT,
      required: ["businessName", "oneLiner", "problemStatement"],
      properties: {
        businessName: {
          type: Type.STRING,
          description: "Official business name (not a placeholder)."
        },
        oneLiner: {
          type: Type.STRING,
          description: "Simple one-sentence explanation of the idea for a non-technical audience."
        },
        problemStatement: {
          type: Type.STRING,
          description: "The painful problem being solved and who experiences it."
        }
      }
    },
    targetMarket: {
      type: Type.OBJECT,
      required: ["targetCustomer"],
      properties: {
        targetCustomer: {
          type: Type.STRING,
          description: "Primary customer role and context."
        }
      }
    },
    valueDifferentiation: {
      type: Type.OBJECT,
      required: ["uniqueValueProposition", "differentiationType"],
      properties: {
        uniqueValueProposition: {
          type: Type.STRING,
          description: "Why users would switch from their current solution."
        },
        differentiationType: {
          type: Type.STRING,
          enum: ["cost", "speed", "accuracy", "convenience", "experience", "access", "network_effects"],
          description: "Primary dimension on which the product gains advantage."
        }
      }
    },
    solution: {
      type: Type.OBJECT,
      required: ["coreWorkflow", "keyFeature"],
      properties: {
        coreWorkflow: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Key steps in the solution showing how the user reaches a successful outcome."
        },
        keyFeature: {
          type: Type.STRING,
          description: "Single most important feature that delivers the core value."
        }
      }
    },
    additionalNotes: {
      type: Type.ARRAY,
      description: "Any other relevant information or constraints provided by the user. (Can be empty if nothing can be inferred)",
      items: { type: Type.STRING },
    },
    system: {
      type: Type.OBJECT,
      properties: {
        inFeedback: {
          type: Type.BOOLEAN,
          description: "Whether the playbook is currently in feedback mode once all fields are satisfied."
        },
        feedbackCount: {
          type: Type.INTEGER,
          description: "Number of feedback iterations completed."
        },
        totalCount: {
          type: Type.INTEGER,
          description: "Total number of feedback iterations to perform before finalizing."
        }
      }
    }
  },
  required: ["ideaCore", "targetMarket", "valueDifferentiation", "solution", "system","additionalNotes"]
};
