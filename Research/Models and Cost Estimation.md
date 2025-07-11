
**For Fine-Tuning a Sinhala Language Model**

## 1. Introduction

The goal of this project is to develop a lightweight, general-purpose AI language model specifically fine-tuned for Sinhala. Due to limited native Sinhala datasets, the approach includes translating existing high-quality English datasets into Sinhala. This document provides an overview of the candidate models, the approximate dataset size required for fine-tuning, and an estimated cost analysis based on GPU pricing from different service providers.

---

## 2. Candidate Models

Based on research and the unsloth page on Hugging Face, the following models are considered:

### 2.1. **unsloth/TinyLlama-1.1B-Chat**

- **Size**: 1.1 billion parameters
    
- **Dataset Requirement**: Approximately **1–2 GB** of high-quality Sinhala text
    
- **Strengths**: Lightweight, efficient, optimized for conversational tasks
    
- **Rating**: **9/10**
    
- **Ideal For**: Projects with limited computational resources and budget.
    

### 2.2. **GPT-Neo 2.7B**

- **Size**: 2.7 billion parameters
    
- **Dataset Requirement**: Approximately **2–3 GB** of high-quality Sinhala text
    
- **Strengths**: Better capacity for complex language patterns
    
- **Rating**: **7/10**
    
- **Considerations**: Requires more compute resources and a larger dataset.
    

### 2.3. **LLaMA-2 7B**

- **Size**: 7 billion parameters
    
- **Dataset Requirement**: Approximately **3–5 GB** of high-quality Sinhala text
    
- **Strengths**: Higher capacity may capture more nuances
    
- **Rating**: **8/10**
    
- **Considerations**: Increased computational cost and training time.
    

> **Recommendation**: For an undergraduate project with budget constraints, **unsloth/TinyLlama-1.1B-Chat** is the most practical choice. It offers excellent efficiency, requires a smaller dataset, and is less demanding in terms of compute and storage.

---

## 3. Dataset Requirements

Given that native Sinhala datasets are scarce, the strategy is to:

- **Translate high-quality English datasets into Sinhala**.
    
- Use datasets originally designed for general-purpose conversational tasks.
    
- **Recommended Dataset Sizes**:
    
    - **TinyLlama-1.1B-Chat**: **1–2 GB**
        
    - **GPT-Neo 2.7B**: **2–3 GB**
        
    - **LLaMA-2 7B**: **3–5 GB**
        

**Candidate Datasets** (suitable for translation):

- **WikiText-2** (small, high-quality Wikipedia data)
    
- **DailyDialog** (for conversational data)
    
- **Vicuna / Persona-Chat** (for multi-turn dialogues)
    
- **Tatoeba / FLORES-101** (for parallel sentence pairs)
    

---

## 4. Cost Estimation

Below are the estimated training costs based on three service providers. The estimates assume the following training times:

- **TinyLlama-1.1B-Chat**: ~20 hours for a 1–2 GB dataset
    
- **GPT-Neo 2.7B**: ~30 hours for a 2–3 GB dataset
    
- **LLaMA-2 7B**: ~40 hours for a 3–5 GB dataset
    

### **Cost Table**

|**Model**|**Estimated Training Time**|**Dataset Size**|**NVIDIA Launchables** (≈$/hr)|**Vast.ai** (≈$/hr)|**Runpod.io** (≈$/hr)|
|---|---|---|---|---|---|
|**TinyLlama-1.1B-Chat**|~20 hours|1–2 GB|~$0.50/hour → ~$10 total|~$0.15/hour → ~$3 total|~$0.20/hour → ~$4 total|
|**GPT-Neo 2.7B**|~30 hours|2–3 GB|~$0.75/hour → ~$22.5 total|~$0.20/hour → ~$6 total|~$0.25/hour → ~$7.5 total|
|**LLaMA-2 7B**|~40 hours|3–5 GB|~$1.50/hour → ~$60 total|~$0.30/hour → ~$12 total|~$0.35/hour → ~$14 total|

_Note: These prices are estimates and may vary with region, GPU availability, and current market conditions. It is recommended to check the respective provider’s website for the most up-to-date pricing:_

- [NVIDIA Launchables Pricing](https://www.nvidia.com/en-us/launchables/pricing/)
    
- [Vast.ai Pricing](https://vast.ai/pricing)
    
- [Runpod.io Pricing](https://www.runpod.io/pricing)
    

---

## 5. Discussion

- **TinyLlama-1.1B-Chat** is the best match for an undergraduate project due to its efficiency, lower dataset requirement, and minimal computational needs. Estimated training costs are between **$3–$10**.
    
- **GPT-Neo 2.7B** and **LLaMA-2 7B** offer higher capacity but come with increased data, compute, and storage costs.
    
- While Vast.ai and Runpod.io are generally cheaper than NVIDIA Launchables, the final choice should be based on the availability of GPUs and specific project requirements.
    
- **Storage Costs**: Remember that you also need to account for storage costs for the dataset, checkpoints, and model outputs. However, storage is usually billed separately and is often relatively low compared to compute costs.
    

---

