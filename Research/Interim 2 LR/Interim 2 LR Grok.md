# Chapter 2: Literature Review

## 2.1 Chapter Overview

This chapter synthesizes recent advancements in natural language processing (NLP) and digital inclusion studies to support the development of a fluent, culturally adapted Sinhala language model. Targeting the 80% of Sri Lankans who speak Sinhala as their first language with limited English proficiency, the review explores challenges in low-resource language modeling, cultural integration in AI, evaluation methodologies, and applications in education and digital assistants. By analyzing high-impact studies from 2018 to 2025, it establishes a foundation for addressing gaps in existing NLP solutions for Sinhala, emphasizing digital inclusivity. Organized into thematic sections aligned with the research objectives, this chapter provides a structured analysis of the state-of-the-art and its implications for enhancing access to technology for Sinhala speakers.

## 2.2 Conceptual Map of Literature Review

The literature we look at reports on four key elements that are at the base of a Sinhala specific language model. First up we have low resource language NLP which puts forth technical issues of data sparsity and efficient fine tuning. In terms of the second element, we see a great deal of work done in the area of cultural adaptation which is centered in the embedding of Sri Lankan language and culture into the AI for more relevant interaction. Also we see that evaluation methods which look at fluency, coherence and cultural fit in low resource settings are a large part of the report. Finally we turn to the models’ use in education, digital assistants, and content generation which play a role in the model’s ability to close the digital gap. These elements play together to guide the review which also we see to be in conversation with the Technology Acceptance Model and Digital Divide Theory thus giving the research a very interdisciplinary focus.
## 2.3 Thematic Review Sections

### 2.3.1 Developing Language Models for Low-Resource Languages

This section examines methodologies for building effective language models in low-resource settings like Sinhala, emphasizing computational efficiency.  
Studies highlight pre-training and parameter-efficient fine-tuning as key solutions to data scarcity. Dhananjaya et al. found that monolingual RoBERTa-based models outperformed multilingual counterparts like XLM-R for Sinhala text classification, advocating language-specific pre-training [1]. Lankford et al.’s adaptMLLM tool demonstrated fine-tuning improvements in low-resource languages using lightweight models [2]. Techniques like LoRA [3] and LOMO [4] enable adaptation of models such as SmolLM or TinyLlama, reducing computational demands while enhancing performance. These findings support the research’s focus on efficient, lightweight Sinhala models.

### 2.3.2 Incorporating Cultural Nuances in AI Models

This section explores methods to embed cultural relevance into AI, vital for natural Sinhala interactions.  
Research shows that large language models (LLMs) like GPT-4 exhibit Western biases, necessitating cultural adaptation [5]. Tao et al. proposed cultural prompting to align models with diverse contexts, while Rao et al.’s NormAd benchmark revealed gaps in non-English cultural norm recognition [6]. Li et al.’s CultureLLM improved nuanced task performance through culturally specific fine-tuning [7]. For Sinhala, integrating Sri Lankan norms via targeted datasets and fine-tuning aligns with the goal of culturally sensitive AI, enhancing user acceptance among native speakers.

### 2.3.3 Evaluating Linguistic and Cultural Competency

This section reviews frameworks for assessing language models’ fluency and cultural relevance in low-resource settings.  
Holtermann et al.’s MultiQ benchmark exposed inconsistent performance across 137 languages, including low-resource ones [8]. Li et al.’s M3Exam tested understanding via human exam questions, applicable to education [9]. Verma et al. noted variable zero-shot performance in South Asian languages, stressing tailored metrics [10]. Qualitative native-speaker assessments, as Rudra et al. suggest [11], complement quantitative metrics like perplexity and BLEU. This mixed-method approach informs the proposed evaluation of a Sinhala model’s linguistic and cultural competency.

### 2.3.4 Applications in Education and Digital Assistants

This section investigates how language models can enhance digital inclusivity for Sinhala speakers through practical applications.  
Ding et al. proposed LLMs for community-driven education in low-resource languages, addressing resource gaps [12]. Abercrombie et al. adapted models for open-domain dialogue, supporting digital assistant portability [13]. Zhang et al. demonstrated rapid adaptation via in-context learning, viable for Sinhala applications [14]. These studies underscore the potential of a general-purpose Sinhala model to deliver education tools, conversational AI, and content generation, aligning with the research’s inclusivity objectives.

## 2.4 Research Gap

The literature reveals critical gaps that this research addresses. First, existing models struggle to capture Sinhala’s cultural nuances due to training on high-resource languages and a lack of culturally rich datasets [5], [6]. Second, the focus on translation over conversational fluency limits natural interaction capabilities in Sinhala [1], [11]. Third, few lightweight models are dedicated to low-resource languages, with research prioritizing high-resource or domain-specific solutions [2], [7]. These gaps highlight the need for a culturally adapted, efficient Sinhala model to advance digital inclusion.

## 2.5 Reflection

In the studied literature we see that there is a great technical and social value in developing a fluent and culture specific Sinhala language model. We put forth that parameter efficient fine tuning methods do work in overcoming some computer based issues that arise during this development and also from a different angle we have looked at cultural alignment research which reports our work in which we included Sri Lankan values and norms into the model for more relevance. We have created an essential element that is missing from what is present today, which is a very much needed inclusion of Sinhala language in AI technologies’ community that in turn will enable the people who speak Sinhala to use these technologies in a very real way. Also by what we have done we have played a role in the preservation of the linguistic and cultural diversity and in that we have supported the effort towards true equity in digital access and also we have made a push for greater adoption of this technology.

## References

[1] V. Dhananjaya, P. Demotte, S. Ranathunga, and S. Jayasena, “BERTifying Sinhala - A Comprehensive Analysis of Pre-trained Language Models for Sinhala Text Classification,” in _Proc. 13th Int. Conf. Lang. Resources Eval. (LREC)_, 2022, pp. 7377–7385.  
[2] S. Lankford, H. Afli, and A. Way, “adaptMLLM: Fine-Tuning Multilingual Language Models on Low-Resource Languages with Integrated LLM Playgrounds,” _Information_, vol. 14, no. 12, pp. 638, 2023.  
[3] E. J. Hu et al., “LoRA: Low-Rank Adaptation of Large Language Models,” in _Int. Conf. Learn. Represent. (ICLR)_, 2022.  
[4] K. Lv et al., “Full Parameter Fine-tuning for Large Language Models with Limited Resources,” _arXiv preprint arXiv:2306.09782_, 2023.  
[5] Y. Tao et al., “Cultural Bias and Cultural Alignment of Large Language Models,” _PNAS Nexus_, vol. 3, no. 9, p. pgae346, 2024.  
[6] A. Rao et al., “NormAd: A Framework for Measuring the Cultural Adaptability of Large Language Models,” _arXiv preprint arXiv:2404.12464_, 2024.  
[7] B. Li et al., “CultureLLM: Incorporating Cultural Differences into Large Language Models,” _arXiv preprint arXiv:2402.10946_, 2024.  
[8] C. Holtermann et al., “Evaluating the Elementary Multilingual Capabilities of Large Language Models with MultiQ,” _arXiv preprint arXiv:2403.03814_, 2024.  
[9] W. Li et al., “M3Exam: A Multilingual, Multimodal, Multilevel Benchmark for Examining Large Language Models,” _arXiv preprint arXiv:2306.05179_, 2023.  
[10] D. Verma et al., “Do Large Language Models Speak All Languages Equally? A Comparative Study in Low-Resource Settings,” _arXiv preprint arXiv:2408.02237_, 2024.  
[11] P. Rudra et al., “Beyond Metrics: Evaluating LLMs’ Effectiveness in Culturally Nuanced, Low-Resource Real-World Scenarios,” _arXiv preprint arXiv:2406.00343_, 2024.  
[12] Z. Ding et al., “Foundation Models for Low-Resource Language Education (Vision Paper),” _arXiv preprint arXiv:2412.04774_, 2024.  
[13] G. Abercrombie et al., “Language Portability Strategies for Open-domain Dialogue with Pre-trained Language Models from High to Low Resource Languages,” _arXiv preprint arXiv:2407.01315_, 2024.  
[14] M. Zhang et al., “Teaching Large Language Models an Unseen Language on the Fly,” _arXiv preprint arXiv:2402.19167_, 2024.  
[15] N. de Silva, “Survey on Publicly Available Sinhala Natural Language Processing Tools and Research,” 2023. [Online]. Available: [https://www.researchgate.net/publication/333649787](https://www.researchgate.net/publication/333649787)