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
const presetButtons = document.querySelectorAll(".preset-btn");

function getFormData() {
  return {
    platform: platformInput.value || "ChatGPT",
    productType: productTypeInput.value.trim() || "Visual Prompt Pack",
    audience: audienceInput.value.trim() || "digital product creators",
    topic: topicInput.value.trim() || "visual AI design assets",
    goal: goalInput.value || "idea",
    tone: toneInput.value.trim() || "clear, premium, commercial",
    offerType: offerTypeInput.value || "core"
  };
}

function autoResizeTextarea() {
  output.style.height = "auto";
  output.style.height = output.scrollHeight + "px";
}

function setStatus(message) {
  statusMessage.textContent = message;
}

function applyPreset(button) {
  const product = button.dataset.product || "";
  const audience = button.dataset.audience || "";
  const topic = button.dataset.topic || "";
  const tone = button.dataset.tone || "";
  const offer = button.dataset.offer || "core";
  const goal = button.dataset.goal || "idea";

  productTypeInput.value = product;
  audienceInput.value = audience;
  topicInput.value = topic;
  toneInput.value = tone;
  offerTypeInput.value = offer;
  goalInput.value = goal;

  presetButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  setStatus(`Preset loaded: ${product}`);
}

function basePromptIntro(data) {
  return `You are an expert AI digital product strategist, Etsy product developer, and prompt pack creator writing for ${data.platform}.

I want to create a ${data.offerType} ${data.productType} for ${data.audience} in the niche of ${data.topic}.

The product should be commercially useful, beginner-friendly, visually oriented, and suitable for sale as a digital product.

Use a ${data.tone} tone.

Return the answer in clearly labeled sections with strong structure, practical ideas, and no vague filler.`;
}

function buildIdeaPrompt(data) {
  return `${basePromptIntro(data)}

Create the response using these exact sections:

1. Product Concept
- Suggest 10 product ideas
- Explain what each one helps the buyer create

2. Best Buyer Types
- List the buyer types most likely to purchase this

3. Strongest Commercial Angles
- Suggest 5 positioning angles that would help this sell

4. Recommended Formats
- Suggest the best formats for delivery such as PDF, guide, prompt pack, Notion file, worksheet, or bundle

5. Starter Pricing
- Suggest realistic starter price ranges for Etsy-style sales`;
}

function buildValidationPrompt(data) {
  return `${basePromptIntro(data)}

Create the response using these exact sections:

1. Product Potential
- Evaluate whether this product has weak, medium, or strong sales potential

2. Buyer Pain Points
- Explain what buyer problem this solves

3. Strengths
- List the strongest reasons this could sell

4. Weak Points
- List the risks, weaknesses, or unclear areas

5. Improvement Ideas
- Suggest 5 ways to improve the offer

6. Final Verdict
- Give a short and honest final conclusion`;
}

function buildBlueprintPrompt(data) {
  return `${basePromptIntro(data)}

Create a full prompt-pack blueprint using these exact sections:

1. Product Title Ideas
- Suggest 10 product title ideas

2. Core Promise
- Explain the transformation or outcome for the buyer

3. Pack Structure
- Suggest 8 to 12 sections or modules inside the product

4. Prompt Categories
- Suggest specific prompt categories to include

5. Bonus Ideas
- Suggest at least 5 bonuses that increase value

6. Beginner Guide
- Explain what simple beginner instructions should be included

7. Delivery Format
- Recommend the best final format for selling this product

8. Premium Positioning
- Explain how to make the offer feel more premium`;
}

function buildListingPrompt(data) {
  return `${basePromptIntro(data)}

Create Etsy-ready listing support using these exact sections:

1. Listing Title Ideas
- Suggest 12 SEO-friendly title ideas

2. Product Description
- Write a compelling product description

3. Key Benefits
- Write benefit-led bullet points

4. Search Keywords
- Suggest relevant search keywords

5. First Image Hook
- Write short hook text for the first listing image

6. CTA
- Write a short call to action

7. Buyer Fit
- Explain who this product is best for`;
}

function buildLaunchPrompt(data) {
  return `${basePromptIntro(data)}

Create a launch plan using these exact sections:

1. Launch Goal
- Define the launch objective

2. 7-Day Plan
- Break actions down day by day

3. Content Ideas
- Suggest content ideas for Instagram, Pinterest, or TikTok

4. Promo Angles
- Suggest 5 promotional angles

5. Bonus / Urgency
- Suggest launch bonus or urgency ideas

6. Upsell Option
- Suggest one related upsell

7. Solo-Creator Advice
- Keep the plan realistic for one creator`;
}

function buildPricingPrompt(data) {
  return `${basePromptIntro(data)}

Create a pricing strategy using these exact sections:

1. Pricing Tiers
- Suggest starter, core, and premium tiers

2. What Each Tier Includes
- Explain what belongs in each offer

3. Suggested Price Range
- Suggest realistic prices

4. Best Launch Version
- Explain which tier should launch first

5. Perceived Value Boosters
- Suggest ways to increase value perception

6. Bundle Offer
- Suggest one bundle pricing option`;
}

function buildBundlePrompt(data) {
  return `${basePromptIntro(data)}

Create bundle strategy output using these exact sections:

1. Bundle Concepts
- Suggest 7 bundle ideas

2. What Each Bundle Includes
- Explain contents clearly

3. Buyer Match
- Explain who each bundle is for

4. Bundle Names
- Suggest strong bundle names

5. Discount Logic
- Suggest smart bundle discount positioning

6. Cross-Sell Idea
- Suggest one cross-sell

7. Upsell Idea
- Suggest one upsell`;
}

function buildEmailPrompt(data) {
  return `${basePromptIntro(data)}

Create a 5-email sequence using these exact sections:

1. Email 1
- Subject line
- Goal
- Main message

2. Email 2
- Subject line
- Goal
- Main message

3. Email 3
- Subject line
- Goal
- Main message

4. Email 4
- Subject line
- Goal
- Main message

5. Email 5
- Subject line
- Goal
- Main message

6. Sequence Strategy
- Explain the logic behind the sequence`;
}

function buildFaqPrompt(data) {
  return `${basePromptIntro(data)}

Create FAQ content using these exact sections:

1. Top Buyer Questions
- List 12 common buyer questions

2. Answers
- Answer each one clearly

3. Objection Handling
- Address price, value, ease of use, and originality concerns

4. Confidence Builders
- Suggest trust-building statements for the listing

5. Best Placement
- Explain where this FAQ content should appear in the product page`;
}

function buildPrompt(data) {
  if (data.goal === "idea") return buildIdeaPrompt(data);
  if (data.goal === "validation") return buildValidationPrompt(data);
  if (data.goal === "blueprint") return buildBlueprintPrompt(data);
  if (data.goal === "listing") return buildListingPrompt(data);
  if (data.goal === "launch") return buildLaunchPrompt(data);
  if (data.goal === "pricing") return buildPricingPrompt(data);
  if (data.goal === "bundle") return buildBundlePrompt(data);
  if (data.goal === "email") return buildEmailPrompt(data);
  if (data.goal === "faq") return buildFaqPrompt(data);

  return `${basePromptIntro(data)}

Create a structured response with practical, commercially useful sections.`;
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

function createFilename(data) {
  const rawName = `${data.productType}-${data.goal}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return rawName ? `${rawName}.txt` : "prompt-output.txt";
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

  presetButtons.forEach((btn) => btn.classList.remove("active"));

  autoResizeTextarea();
  setStatus("Cleared");
}

generateBtn.addEventListener("click", function () {
  const data = getFormData();
  const finalPrompt = buildPrompt(data);
  output.value = finalPrompt;
  autoResizeTextarea();
  setStatus("Pack sections prompt generated");
});

copyBtn.addEventListener("click", function () {
  const text = output.value.trim();

  if (!text) {
    setStatus("Nothing to copy");
    return;
  }

  navigator.clipboard.writeText(text)
    .then(function () {
      setStatus("Copied");
    })
    .catch(function () {
      setStatus("Copy failed");
    });
});

downloadBtn.addEventListener("click", function () {
  const text = output.value.trim();

  if (!text) {
    setStatus("Nothing to download");
    return;
  }

  const data = getFormData();
  downloadTextFile(text, createFilename(data));
  setStatus("Downloaded");
});

clearBtn.addEventListener("click", function () {
  clearFormFields();
});

presetButtons.forEach((button) => {
  button.addEventListener("click", function () {
    applyPreset(button);
  });
});

output.addEventListener("input", autoResizeTextarea);

autoResizeTextarea();
