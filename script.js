const platformInput = document.getElementById("platform");
const productTypeInput = document.getElementById("productType");
const audienceInput = document.getElementById("audience");
const topicInput = document.getElementById("topic");
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
    goal: goalInput.value || "blueprint",
    outputMode: outputModeInput.value || "productpack",
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

I want to create a ${data.offerType} ${data.productType} for ${data.audience} in the area of ${data.topic}.

Use a ${data.tone} tone.

Important:
- Focus on finished digital products that can be sold online
- Do not frame this as selling prompt bundles
- Keep the response specific, commercial, and beginner-friendly
- Make the output practical enough to turn into a real Etsy listing or product file set`;
}

function goalInstruction(goal) {
  if (goal === "idea") return "Generate strong product concepts with clear commercial value.";
  if (goal === "validation") return "Validate the product and identify strengths, risks, and improvements.";
  if (goal === "blueprint") return "Build the full structure of the product from idea to deliverables.";
  if (goal === "listing") return "Create listing-focused sales content and conversion assets.";
  if (goal === "launch") return "Plan a simple launch strategy for this product.";
  if (goal === "pricing") return "Suggest pricing, tiers, and value positioning.";
  if (goal === "bundle") return "Create bundle logic, cross-sells, and upsells.";
  if (goal === "email") return "Create a short promotional email sequence.";
  if (goal === "faq") return "Write customer FAQ and objection-handling content.";
  return "Create a commercially useful response.";
}

function buildProductPackPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Product Concept
- Define the product clearly
- Explain what the buyer receives

2. Product Contents
- List the assets, pages, files, or pieces included

3. Best Use Cases
- Explain what the buyer can create or do with it

4. Product Structure
- Suggest how to organize the product into sections, folders, or variations

5. Bonus Add-Ons
- Suggest 5 bonuses that increase value

6. Premium Positioning
- Explain how to make the offer feel more premium

7. Best Next Step
- Give the next action I should take to create this product`;
}

function buildListingKitPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Listing Title Ideas
- Suggest 12 Etsy-style title ideas

2. Product Description
- Write a sales-friendly description

3. Key Benefits
- Write benefit-focused bullet points

4. Search Keywords
- Suggest strong search phrases

5. Image Hook Ideas
- Suggest text hooks for listing images

6. Buyer Fit
- Explain who this is best for

7. CTA
- Write a short call to action`;
}

function buildBundleBuilderPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Core Product
- Define the main product clearly

2. Bundle Ideas
- Suggest 7 bundle options

3. Bundle Contents
- Explain what each bundle should include

4. Cross-Sell Opportunities
- Suggest related add-on products

5. Upsell Idea
- Suggest one premium upgrade

6. Bundle Pricing Logic
- Explain pricing structure

7. Bundle Naming Ideas
- Suggest strong bundle names`;
}

function buildBuyerGuidePrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Buyer Welcome Note
- Write a short welcome message

2. What Is Included
- Explain exactly what files or assets the buyer gets

3. How to Use It
- Write simple beginner-friendly instructions

4. Best Results Tips
- Explain how to get the most value from the product

5. Important Notes
- Add useful limitations or clarification points

6. Support Style Wording
- Write helpful guidance for common buyer confusion

7. Reuse / Access Reminder
- Include buyer-friendly wording about downloading and using files`;
}

function buildAIDisclosurePrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Short AI Disclosure
- Write a short transparent disclosure line for a listing

2. Detailed AI Process Note
- Explain how AI was used as part of the seller's process

3. Human Creative Role
- Describe the seller's design, curation, editing, or finishing role

4. Safe Listing Wording
- Write Etsy-friendly wording that focuses on the finished product

5. Product Description Insert
- Write a short disclosure paragraph I can place inside the description

6. FAQ Version
- Write a simple buyer-facing answer if someone asks whether AI was used`;
}

function buildFilePlanPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Final Deliverables
- List the exact files the buyer should receive

2. File Naming Plan
- Suggest clear file names for delivery

3. Folder Structure
- Suggest how to organize the files

4. File Format Suggestions
- Recommend the best file formats for this product

5. Etsy Upload Plan
- Explain how to split or package files for Etsy delivery

6. Size / Delivery Notes
- Mention practical delivery considerations for digital files

7. Buyer Clarity Notes
- Suggest what to explain so the buyer understands what they receive`;
}

function buildChecklistPrompt(data) {
  return `${baseIntro(data)}

${goalInstruction(data.goal)}

Return the answer in these exact sections:

1. Product Planning Checklist
- List all planning steps

2. Asset Creation Checklist
- List all creation steps

3. Packaging Checklist
- List all file preparation steps

4. Listing Checklist
- List all Etsy listing tasks

5. Buyer Experience Checklist
- List all buyer-facing clarity checks

6. Quality Control Checklist
- List final quality checks

7. Batch Creation Advice
- Explain how I can repeat this workflow for many products`;
}

function buildPrompt(data) {
  if (data.outputMode === "listingkit") return buildListingKitPrompt(data);
  if (data.outputMode === "bundlebuilder") return buildBundleBuilderPrompt(data);
  if (data.outputMode === "buyerguide") return buildBuyerGuidePrompt(data);
  if (data.outputMode === "aidisclosure") return buildAIDisclosurePrompt(data);
  if (data.outputMode === "fileplan") return buildFilePlanPrompt(data);
  if (data.outputMode === "checklist") return buildChecklistPrompt(data);
  return buildProductPackPrompt(data);
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
  const rawName = `${data.productType}-${data.outputMode}-${data.goal}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return rawName ? `${rawName}.txt` : "digital-product-output.txt";
}

function clearFormFields() {
  productTypeInput.value = "";
  audienceInput.value = "";
  topicInput.value = "";
  toneInput.value = "";
  platformInput.value = "ChatGPT";
  goalInput.value = "blueprint";
  outputModeInput.value = "productpack";
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
