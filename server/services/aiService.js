export const generateAIContent = async (topic) => {
  return `
Title: ${topic}

Introduction:
This is an AI generated blog about ${topic}.

Main Content:
- ${topic} is growing rapidly
- It impacts many industries
- Future of ${topic} is bright

Conclusion:
${topic} will continue to evolve in future.
`;
};