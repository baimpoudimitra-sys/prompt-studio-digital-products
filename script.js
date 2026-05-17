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

function buildPrompt(data) {
  const intro = `You are an expert AI product strategist and prompt pack creator writing for ${data.platform}.`;
  const context = `I want to create a ${data.offerType} ${data.productType} for ${data.audience} in the niche of ${data.topic}.`;
  const style = `Use a ${data.tone} tone. Keep the response highly structured, commercially useful, specific, and beginner-friendly.`;
  const productIntent = `The goal is to create a digital product or prompt pack that can be sold online, especially on marketplaces like Etsy or similar platforms.`;
  const visualFocus = `Focus on visual digital products, themed AI image generation assets, commercial use cases, and bundle opportunities where relevant.`;

  if (data.goal === "idea") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Generate 12 strong product ideas for this prompt pack.

For each idea include:
1. Product name
2. What it helps create
3. Who it is for
4. Why it would sell
5. Suggested format
6. Suggested starter price

${style}`;
  }

  if (data.goal === "validation") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Validate this product idea.

Requirements:
- Evaluate market potential
- Identify buyer pain points and use cases
- Explain whether the idea feels too broad, too narrow, or well-positioned
- Suggest 3 stronger positioning angles
- Suggest 3 ways to improve commercial appeal
- Give a final verdict: weak, medium, or strong

${style}`;
  }

  if (data.goal === "blueprint") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Create a full product blueprint for this prompt pack.

Requirements:
- Suggest a strong final product title
- Define the promise of the product
- Suggest 8 to 12 sections or modules
- Explain what each section should contain
- Suggest prompt categories inside the pack
- Suggest beginner-friendly instructions to include
- Suggest bonuses that increase perceived value
- Suggest the best delivery format
- Suggest how to make the pack feel premium

${style}`;
  }

  if (data.goal === "listing") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Write Etsy-style sales copy for this product.

Requirements:
- Write 12 listing title ideas
- Write a compelling product description
- Write benefit-focused bullet points
- Suggest strong keyword ideas
- Write a short hook for the first product image
- Write a concise call to action
- Highlight who this product is best for

${style}`;
  }

  if (data.goal === "launch") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Create a simple 7-day launch plan.

Requirements:
- Break down the plan day by day
- Include content ideas for Instagram, Pinterest, or TikTok
- Suggest 5 launch angles
- Suggest urgency or bonus ideas
- Include one audience-building idea
- Include one upsell suggestion
- Keep the plan realistic for a solo creator

${style}`;
  }

  if (data.goal === "pricing") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Build a pricing strategy for this product.

Requirements:
- Suggest a starter, core, and premium version
- Explain what should be included in each tier
- Suggest realistic price ranges
- Explain which version should be launched first
- Include perceived-value advice
- Suggest one bundle pricing option

${style}`;
  }

  if (data.goal === "bundle") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Create bundle ideas for this product.

Requirements:
- Suggest 7 bundle concepts
- Explain what each bundle should include
- Suggest which audience each bundle suits best
- Suggest bundle naming ideas
- Suggest a discount logic for bundles
- Include one cross-sell and one upsell idea
- Mention which bundles feel best for Etsy

${style}`;
  }

  if (data.goal === "email") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Write a 5-email sequence to promote this product.

Requirements:
- Include subject line for each email
- Explain the goal of each email
- Include one nurture email
- Include one education email
- Include one product pitch email
- Include one objection-handling email
- Include one urgency email

${style}`;
  }

  if (data.goal === "faq") {
    return `${intro}

${context}

${productIntent}
${visualFocus}

Create customer FAQ and objection-handling content.

Requirements:
- Write 12 common questions buyers may ask
- Write clear and helpful answers
- Address doubts about value, originality, ease of use, and results
- Make the answers persuasive but honest
- Keep the copy suitable for Etsy listings or product pages

${style}`;
  }

  return `${intro}

${context}

${productIntent}
${visualFocus}

Create a useful structured response for this product.

${style}`;
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
  setStatus("Prompt generated");
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
