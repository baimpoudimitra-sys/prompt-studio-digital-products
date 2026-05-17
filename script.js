const productTypeInput = document.getElementById("productType");
const audienceInput = document.getElementById("audience");
const topicInput = document.getElementById("topic");
const goalInput = document.getElementById("goal");
const toneInput = document.getElementById("tone");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");
const statusMessage = document.getElementById("statusMessage");

const templates = {
  idea: ({ productType, audience, topic, tone }) => `You are a digital product strategist.

Help me generate 10 profitable ${productType} ideas for ${audience} in the ${topic} niche.

Requirements:
- Focus on practical digital products people can buy fast
- Prioritize products with strong demand and simple delivery
- Make the ideas feel ${tone}
- For each idea include:
1. Product name
2. Core promise
3. Target buyer problem
4. Why it could sell
5. Suggested price range

Return the answer in a clear table.`,

  validation: ({ productType, audience, topic, tone }) => `You are a market validation expert for digital products.

I want to validate this product idea:
Product type: ${productType}
Audience: ${audience}
Topic: ${topic}

Analyze whether this product has potential.

Requirements:
- Use a ${tone} tone
- Explain the buyer pain point
- Explain why this audience would buy it
- List 5 validation angles
- Suggest how to improve positioning
- Suggest 3 stronger variations of the same product

End with a final verdict: weak, medium, or strong potential.`,

  blueprint: ({ productType, audience, topic, tone }) => `You are a digital product builder.

Create a full product blueprint for a ${productType} for ${audience} in the ${topic} niche.

Requirements:
- Keep the structure ${tone}
- Include product title ideas
- Include all sections/pages/modules the product should contain
- Explain what each section should include
- Suggest bonus elements to make it feel premium
- Suggest what file format is best for delivery
- Suggest a simple creation workflow

Make the result structured and easy to follow.`,

  listing: ({ productType, audience, topic, tone }) => `You are an Etsy and digital product copywriter.

Write sales copy for a ${productType} for ${audience} in the ${topic} niche.

Requirements:
- Tone: ${tone}
- Write 10 product title ideas
- Write 1 product description
- Write key benefits in bullet points
- Write a short promise statement
- Write a buyer-focused call to action
- Suggest relevant SEO keyword ideas

Make it persuasive but clear.`,

  launch: ({ productType, audience, topic, tone }) => `You are a launch strategist for digital products.

Create a launch plan for a ${productType} for ${audience} in the ${topic} niche.

Requirements:
- Use a ${tone} tone
- Create a 7-day launch plan
- Include content ideas for Instagram or TikTok
- Include 5 promo angles
- Include 3 urgency ideas
- Include a soft-sell version and a strong-sell version
- Suggest one bundle or upsell idea

Keep everything actionable and easy to execute.`
};

function getFormData() {
  return {
    productType: productTypeInput.value.trim() || "digital product",
    audience: audienceInput.value.trim() || "online creators",
    topic: topicInput.value.trim() || "productivity",
    goal: goalInput.value,
    tone: toneInput.value.trim() || "clear and premium"
  };
}

generateBtn.addEventListener("click", () => {
  const data = getFormData();
  const selectedTemplate = templates[data.goal];

  if (!selectedTemplate) {
    output.value = "No prompt template found.";
    statusMessage.textContent = "Error";
    return;
  }

  const finalPrompt = selectedTemplate(data);
  output.value = finalPrompt;
  statusMessage.textContent = "Prompt generated";
});

copyBtn.addEventListener("click", async () => {
  if (!output.value.trim()) {
    statusMessage.textContent = "Nothing to copy";
    return;
  }

  try {
    await navigator.clipboard.writeText(output.value);
    statusMessage.textContent = "Copied";
  } catch (error) {
    statusMessage.textContent = "Copy failed";
  }
});
