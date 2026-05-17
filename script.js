const productTypeInput = document.getElementById("productType");
const audienceInput = document.getElementById("audience");
const topicInput = document.getElementById("topic");
const goalInput = document.getElementById("goal");
const toneInput = document.getElementById("tone");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("output");
const statusMessage = document.getElementById("statusMessage");

generateBtn.addEventListener("click", function () {
  const productType = productTypeInput.value.trim() || "digital product";
  const audience = audienceInput.value.trim() || "online creators";
  const topic = topicInput.value.trim() || "productivity";
  const goal = goalInput.value;
  const tone = toneInput.value.trim() || "clear and premium";

  let finalPrompt = "";

  if (goal === "idea") {
    finalPrompt = `You are a digital product strategist.

Generate 10 profitable ${productType} ideas for ${audience} in the ${topic} niche.

Requirements:
- Make them practical and easy to sell
- Keep the tone ${tone}
- Include product name, promise, buyer problem, and suggested price`;
  } else if (goal === "validation") {
    finalPrompt = `You are a market validation expert.

Validate this ${productType} idea for ${audience} in the ${topic} niche.

Requirements:
- Use a ${tone} tone
- Explain buyer pain points
- Explain demand potential
- Suggest 3 stronger variations`;
  } else if (goal === "blueprint") {
    finalPrompt = `You are a digital product builder.

Create a full blueprint for a ${productType} for ${audience} in the ${topic} niche.

Requirements:
- Keep it ${tone}
- Include all sections or modules
- Suggest bonuses
- Suggest best delivery format`;
  } else if (goal === "listing") {
    finalPrompt = `You are a digital product copywriter.

Write sales copy for a ${productType} for ${audience} in the ${topic} niche.

Requirements:
- Tone: ${tone}
- Write 10 title ideas
- Write a product description
- Add benefits and SEO keywords`;
  } else if (goal === "launch") {
    finalPrompt = `You are a launch strategist.

Create a 7-day launch plan for a ${productType} for ${audience} in the ${topic} niche.

Requirements:
- Tone: ${tone}
- Add content ideas
- Add promo angles
- Add one upsell idea`;
  } else {
    finalPrompt = "No prompt template found.";
  }

  output.value = finalPrompt;
  statusMessage.textContent = "Prompt generated";
});

copyBtn.addEventListener("click", function () {
  const text = output.value.trim();

  if (!text) {
    statusMessage.textContent = "Nothing to copy";
    return;
  }

  navigator.clipboard.writeText(text)
    .then(function () {
      statusMessage.textContent = "Copied";
    })
    .catch(function () {
      statusMessage.textContent = "Copy failed";
    });
});
