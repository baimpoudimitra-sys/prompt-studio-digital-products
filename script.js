const platformInput = document.getElementById("platform");
const productTypeInput = document.getElementById("productType");
const audienceInput = document.getElementById("audience");
const topicInput = document.getElementById("topic");
const collectionNameInput = document.getElementById("collectionName");
const seasonThemeInput = document.getElementById("seasonTheme");
const variationCountInput = document.getElementById("variationCount");
const targetFormatInput = document.getElementById("targetFormat");
const goalInput = document.getElementById("goal");
const outputModeInput = document.getElementById("outputMode");
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
    productType: productTypeInput.value.trim() || "Digital Product Bundle",
    audience: audienceInput.value.trim() || "Etsy sellers and digital product creators",
    topic: topicInput.value.trim() || "AI-assisted digital products",
    collectionName: collectionNameInput.value.trim() || "Signature Collection",
    seasonTheme: seasonThemeInput.value.trim() || "Evergreen",
    variationCount: variationCountInput.value || "12",
    targetFormat: targetFormatInput.value || "PNG bundle",
    goal: goalInput.value || "blueprint",
    outputMode: outputModeInput.value || "batchplanner",
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
  const goal = button.dataset.goal || "blueprint";

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

function baseIntro(data) {
  return `You are an expert digital product strategist, Etsy listing specialist, bundle planner, and AI-assisted product development assistant writing for ${data.platform}.

I want to create a ${data.offerType} ${data.productType} collection for ${data.audience}.

Main niche or use case: ${data.topic}
Collection name: ${data.collectionName}
Season or theme: ${data.seasonTheme}
Number of product variations to plan: ${data.variationCount}
Preferred delivery format: ${data.targetFormat}

Use a ${data.tone} tone.

Important rules:
- Focus only on finished digital products that can be sold online
- Do not frame the output as prompt bundles for sale
- Make the response specific, practical, and commercial
- Keep the output useful for batch creation, listing, packaging, and repeatable workflows`;
}

function goalInstruction(goal) {
  if (goal === "idea") return "Generate strong product concepts with clear sales potential.";
  if (goal === "validation") return "Validate the product direction and identify ways to improve it.";
  if (goal === "blueprint") return "Build the product structure from concept to deliverables.";
  if (goal === "listing") return "Focus on conversion-friendly listing support.";
  if (goal === "launch") return "Focus on a simple launch workflow for the batch.";
  if (goal === "pricing") return "Focus on pricing strategy and offer structure.";
  if (goal === "bundle") return "Focus on bundles, cross-sells, and upsells.";
  if (goal === "email") return "Focus on email promotion ideas.";
  if (goal === "faq") return "Focus on buyer questions and support clarity.";
  return "Create a useful commercial response.";
}

function buildBatchPlannerPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Collection Direction
- Define the overall concept of the collection
- Explain what makes it cohesive

2. ${data.variationCount} Product Variation Ideas
- Suggest ${data.variationCount} different product variations for this collection
- Give each variation a name and short angle

3. Best-Selling Priorities
- Identify which 3 variations should be created first

4. Product Family Expansion
- Suggest how this collection could expand into more listings later

5. Batch Workflow
- Explain the smartest order to create these products in

6. Repeatable System
- Explain how to repeat this process for a new niche or season

7. Best Next Step
- Tell me exactly what to create first`;
}

function buildProductPackPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Core Product Definition
- Define the main product clearly

2. Product Contents
- List exactly what is included in the product

3. Variation Structure
- Explain how the ${data.variationCount} variations should differ

4. File and Asset Planning
- Suggest what assets need to be created

5. Bonus Add-Ons
- Suggest 5 bonuses that increase value

6. Premium Positioning
- Explain how to make the product feel more premium

7. Production Advice
- Give practical creation guidance for fast execution`;
}

function buildListingKitPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Listing Title Ideas
- Suggest 12 Etsy-style titles for this collection

2. Description
- Write a listing description for the main product

3. Key Benefits
- Write benefit-focused bullet points

4. Search Keywords
- Suggest keywords and phrases

5. Listing Image Hooks
- Suggest short text hooks for product images

6. Buyer Fit
- Explain who this collection is best for

7. CTA
- Write a short call to action`;
}

function buildBundleBuilderPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Core Bundle Concept
- Define the bundle clearly

2. Bundle Variations
- Suggest 5 to 7 bundle versions

3. What Each Bundle Includes
- Explain exact contents

4. Cross-Sell Ideas
- Suggest related products

5. Upsell Idea
- Suggest one higher-value upgrade

6. Pricing Logic
- Explain how to price the bundles

7. Naming Ideas
- Suggest strong bundle names`;
}

function buildBuyerGuidePrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Buyer Welcome Note
- Write a short welcome message

2. What Is Included
- Explain what files and assets the buyer receives

3. How to Use the Product
- Give simple beginner-friendly steps

4. Best Results Tips
- Explain how buyers can get the most value

5. Important Notes
- Clarify limitations, software notes, or usage notes

6. Support Guidance
- Suggest helpful wording for common questions

7. Download / Access Reminder
- Write a buyer-friendly reminder about file access`;
}

function buildAIDisclosurePrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Short Disclosure Line
- Write a short transparent line for the listing

2. Detailed Disclosure Note
- Explain how AI was used during the process

3. Human Creative Role
- Explain the seller's design, editing, curation, and finishing role

4. Etsy-Safe Product Wording
- Focus on the finished product rather than prompts

5. Description Insert
- Write a paragraph I can place inside the listing description

6. FAQ Version
- Write a short buyer-facing answer about AI use`;
}

function buildFilePlanPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Final Deliverables
- List the exact files the buyer should receive

2. File Naming Plan
- Suggest clean file names

3. Folder Structure
- Suggest folder organization

4. Best File Formats
- Recommend the best file types for this product

5. Delivery Method
- Explain how to package or split files for delivery

6. Etsy Upload Planning
- Suggest how to organize uploads with platform limitations in mind

7. Buyer Clarity Notes
- Suggest what should be explained so the buyer clearly understands the files`;
}

function buildChecklistPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Batch Planning Checklist
- List all planning steps for the collection

2. Asset Creation Checklist
- List the creation steps for all ${data.variationCount} variations

3. Packaging Checklist
- List file prep and organization steps

4. Listing Checklist
- List Etsy listing preparation steps

5. Buyer Experience Checklist
- List clarity and instruction checks

6. Quality Control Checklist
- List final review checks

7. Batch Repeat Checklist
- Explain how to reuse this workflow for another collection`;
}

function buildPrompt(data) {
  if (data.outputMode === "productpack") return buildProductPackPrompt(data);
  if (data.outputMode === "listingkit") return buildListingKitPrompt(data);
  if (data.outputMode === "bundlebuilder") return buildBundleBuilderPrompt(data);
  if (data.outputMode === "buyerguide") return buildBuyerGuidePrompt(data);
  if (data.outputMode === "aidisclosure") return buildAIDisclosurePrompt(data);
  if (data.outputMode === "fileplan") return buildFilePlanPrompt(data);
  if (data.outputMode === "checklist") return buildChecklistPrompt(data);
  return buildBatchPlannerPrompt(data);
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
  const rawName = `${data.collectionName}-${data.productType}-${data.outputMode}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return rawName ? `${rawName}.txt` : "batch-digital-product-output.txt";
}

function clearFormFields() {
  productTypeInput.value = "";
  audienceInput.value = "";
  topicInput.value = "";
  collectionNameInput.value = "";
  seasonThemeInput.value = "";
  variationCountInput.value = "12";
  targetFormatInput.value = "PNG bundle";
  toneInput.value = "";
  platformInput.value = "ChatGPT";
  goalInput.value = "blueprint";
  outputModeInput.value = "batchplanner";
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
  setStatus(`Generated: ${data.outputMode}`);
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
