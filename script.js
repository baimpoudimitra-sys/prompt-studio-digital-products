const platformInput = document.getElementById("platform");
const productTypeInput = document.getElementById("productType");
const audienceInput = document.getElementById("audience");
const topicInput = document.getElementById("topic");
const goalInput = document.getElementById("goal");
const toneInput = document.getElementById("tone");
const offerTypeInput = document.getElementById("offerType");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const output = document.getElementById("output");
const statusMessage = document.getElementById("statusMessage");

function getFormData() {
  return {
    platform: platformInput.value || "ChatGPT",
    productType: productTypeInput.value.trim() || "digital product",
    audience: audienceInput.value.trim() || "online creators",
    topic: topicInput.value.trim() || "productivity",
    goal: goalInput.value || "idea",
    tone: toneInput.value.trim() || "clear and premium",
    offerType: offerTypeInput.value || "core"
  };
}

function buildPrompt(data) {
  const intro = `You are an expert digital product strategist writing for ${data.platform}.`;
  const context = `I am creating a ${data.offerType} ${data.productType} for ${data.audience} in the ${data.topic} niche.`;
  const style = `Use a ${data.tone} tone. Keep the answer practical, specific, and structured.`;

  if (data.goal === "idea") {
    return `${intro}

${context}

Help me generate 10 strong digital product ideas.

Requirements:
- Focus on products that are easy to create and easy to sell
- Prioritize clear buyer pain points
- Include:
1. Product name
2. Buyer problem
3. Core promise
4. Suggested format
5. Suggested price range

${style}`;
  }

  if (data.goal === "validation") {
    return `${intro}

${context}

Validate this product direction.

Requirements:
- Explain whether this idea has real selling potential
- Identify the buyer pain point
- Explain what makes the product attractive or weak
- Suggest 3 stronger positioning angles
- Suggest 3 ways to improve demand
- End with a final verdict: weak, medium, or strong potential

${style}`;
  }

  if (data.goal === "blueprint") {
    return `${intro}

${context}

Create a full product blueprint.

Requirements:
- Suggest a product title
- Suggest all sections, pages, or modules
- Explain what each section should contain
- Suggest bonus elements to make it feel premium
- Suggest the best format for delivery
- Suggest a simple workflow to build it fast

${style}`;
  }

  if (data.goal === "listing") {
    return `${intro}

${context}

Write sales and listing copy.

Requirements:
- Write 10 title ideas
- Write a strong product description
- Write key benefits in bullet points
- Suggest relevant keywords
- Write a short promise statement
- Write a simple call to action

${style}`;
  }

  if (data.goal === "launch") {
    return `${intro}

${context}

Create a 7-day launch plan.

Requirements:
- Include day-by-day actions
- Include Instagram or TikTok content ideas
- Include 5 promo angles
- Include urgency ideas
- Suggest one upsell or bonus
- Keep the plan easy to execute

${style}`;
  }

  if (data.goal === "pricing") {
    return `${intro}

${context}

Help me create a pricing strategy.

Requirements:
- Suggest 3 price points for this offer
- Explain what should be included at each price
- Suggest a starter version, core version, and premium version
- Explain which price is best for first launch
- Include positioning advice for perceived value

${style}`;
  }

  if (data.goal === "bundle") {
    return `${intro}

${context}

Create bundle ideas for this product.

Requirements:
- Suggest 5 bundle ideas
- Explain what to include in each bundle
- Suggest who each bundle is for
- Suggest bundle pricing logic
- Suggest one upsell and one cross-sell idea

${style}`;
  }

  if (data.goal === "email") {
    return `${intro}

${context}

Write a short email sequence for this product.

Requirements:
- Create 5 email ideas
- Include subject line for each email
- Include purpose of each email
- Include one soft-sell email
- Include one urgency email
- Keep it useful for digital product promotion

${style}`;
  }

  if (data.goal === "faq") {
    return `${intro}

${context}

Create customer FAQ and objection-handling copy.

Requirements:
- List 10 common buyer questions or objections
- Write clear answers
- Handle concerns about value, price, and usefulness
- Keep the answers persuasive but honest
- Make it suitable for a product page or checkout page

${style}`;
  }

  return "No prompt template found.";
}

function downloadTextFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function clearFormFields() {
  productTypeInput.value = "";
  audienceInput.value = "";
  topicInput.value = "";
  toneInput.value = "";
  platformInput.value = "ChatGPT";
  goalInput.value = "idea";
  offerTypeInput.value = "starter";
  output.value = "";
  autoResizeTextarea();
  statusMessage.textContent = "Cleared";
}

generateBtn.addEventListener("click", function () {
  const data = getFormData();
  const finalPrompt = buildPrompt(data);
  output.value = finalPrompt;
  autoResizeTextarea();
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

downloadBtn.addEventListener("click", function () {
  const text = output.value.trim();

  if (!text) {
    statusMessage.textContent = "Nothing to download";
    return;
  }

  downloadTextFile(text, "prompt-studio-output.txt");
  statusMessage.textContent = "Downloaded";
});

clearBtn.addEventListener("click", function () {
  clearFormFields();
});
output.addEventListener("input", autoResizeTextarea);
autoResizeTextarea();
