<!--
  News article: Apertus keynote at Uphill Conf 2026.
  Primary source: Imanol Schlag's spoken transcript (Alex was in the room
  and shared slide photos). Date-stamped 2026-05-22 (written ~2 weeks
  after the event so the news angle still holds).
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>Apertus at Uphill Conf 2026: what it means for Helvetra</template>
      <template #subtitle>
        Imanol Schlag's keynote on the fully-open Swiss AI model behind Helvetra. Why a single PhD student took Apertus from zero Swiss German to ~40% in a day, and why every Apertus release from here on directly upgrades the translations you get from us.
      </template>

      <!-- Event opener -->
      <ContentProseSection id="event-opener" title="A developer conference on the Gurten">
        <p>
          <a href="https://uphillconf.com/" target="_blank" rel="noopener">Uphill Conf 2026</a> took place on 7–8 May at the Gurten, above Bern. Per the conference's own framing, the event is tailored to software developers and focused on practical AI/ML in production: building AI-native products, securing LLM applications, agentic systems, cost-efficient inference. This year's programme included talks from Google DeepMind, AWS, Hugging Face, and IBM Research, alongside the keynote we came for.
        </p>
        <p>
          <a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a> is the Swiss-built, fully-open large language model that powers every translation Helvetra produces. When the project's co-lead announces what's coming next, we listen.
        </p>
      </ContentProseSection>

      <!-- The talk -->
      <ContentProseSection id="the-keynote" title="The keynote">
        <p>
          On Friday morning, <strong>Imanol Schlag</strong>, AI Research Scientist at the <a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a> and co-lead of the Apertus project, opened the day with <em>"Apertus: Democratizing Open and Compliant LLMs For Global Language Environments"</em> (<a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">talk page</a>).
        </p>
        <p>
          It was the kind of talk that pulls everything together in 30 minutes. What Apertus is, why it's structured the way it is, where it sits in the global landscape, and what's coming next. The slides below are from the actual session.
        </p>
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/who-is-building-ai.jpg`"
            alt="Slide titled 'Who is Building AI?' comparing Closed (OpenAI, Anthropic, Google, xAI, Mistral), Open-Weight (Meta Llama, DeepSeek, Alibaba Qwen, Moonshot Kimi, Google Gemma, Z.AI GLM, Mistral) and Fully Open (Swiss AI Apertus, AI2 Olmo, MBZUAI K2, OpenEuroLLM, EuroLLM, AI Singapore SEA-LION) categories."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2">
            Schlag's mental model of the LLM landscape: <em>share outputs</em> (closed), <em>share weights</em> (open-weight), or <em>share everything</em> (fully open). Apertus sits in the third category alongside AI2's Olmo, OpenEuroLLM, and Singapore's SEA-LION. Almost all of these come from public institutions.
          </figcaption>
        </figure>
      </ContentProseSection>

      <!-- The compliance edge -->
      <ContentProseSection id="compliance-edge" title="Why &quot;fully open&quot; is not just a slogan">
        <p>
          The distinction matters. An open-weight model lets you download the file and run it on your own hardware: useful, but you still don't know what it was trained on, who curated the data, how it was aligned. A <strong>fully open</strong> model publishes all of it. The training data and the pipeline to reproduce it, the training code, model checkpoints throughout training, and a 100+ page technical report. The <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">Apertus GitHub organisation</a> hosts the lot.
        </p>
        <p>
          Schlag put this in concrete terms with a comparison table that's worth reproducing:
        </p>
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/responsible-data-practices.jpg`"
            alt="Slide titled 'Responsible Data Practices' showing a comparison table where Apertus 8B/70B is the only model with a green check mark in 'Training data transparency & availability' and 'EU AI Act Art 53 compliance' rows. Qwen, DeepSeek, Mistral, Meta Llama, and OpenAI GPT-4.5 are marked with red X's in those rows."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2">
            Of the models compared on this slide, Apertus is the only one marked ✓ on both training-data transparency <em>and</em> EU AI Act Article 53 compliance. The rest, including every American closed model and most of the open-weight catalogue, are marked ✗.
          </figcaption>
        </figure>
        <p>
          That's not a marketing claim. Article 53 of the <a href="https://artificialintelligenceact.eu/article/53/" target="_blank" rel="noopener">EU AI Act</a> requires general-purpose AI providers to publish <em>"a detailed summary of the training content"</em>. As Schlag pointed out in his talk: "so far I know of no closed or open weight model that actually fulfills this requirement." Apertus does.
        </p>
        <p>
          The team also categorically refused to scrape pirated content. They respect AI opt-out signals (the <code>robots.txt</code>-style AI directives), which costs them about 8% of English training data and 4% of non-English data. A price they were happy to pay. They went further: Schlag described an explicit anti-memorisation method in the training pipeline so the model can't regurgitate copyrighted passages it saw during training. None of the big closed labs publishes anything comparable.
        </p>
      </ContentProseSection>

      <!-- The Swiss German story -->
      <ContentProseSection id="swiss-german-moment" title="The Swiss German moment">
        <p>
          Here's the part of the talk that mattered most for Helvetra users.
        </p>
        <p>
          Apertus 1 was released in September 2025. The first post-training pass (the supervised fine-tuning that teaches the foundation model how to behave conversationally) included <strong>zero</strong> Swiss German data. The model would simply refuse to speak Swiss German because it had barely seen any during instruction tuning.
        </p>
        <p>
          And then, in Schlag's own words:
        </p>
        <blockquote class="border-l-4 border-swiss-red pl-4 italic text-neutral-700 my-6">
          "Because we have such a strong multilingual foundation and lots of other Alemannic languages in the training data, it took a PhD student maybe a day to put together a few thousand Swiss German conversational examples, half of them actually synthetically generated, to bring the performance from basically zero to, let's be honest, 50–40%. So it's not amazing of course, but the amazing thing is how far it got with the little work that we had to put into."
        </blockquote>
        <p>
          Read that carefully. <strong>One PhD student. One day. A few thousand examples, half of them synthetic. Zero to roughly 40% Swiss German performance.</strong>
        </p>
        <p>
          Schlag was honest: 40% isn't amazing yet. But the trajectory is the point. A foundation model strong enough to pick up an under-resourced language to that level on a single day of post-training is a foundation model that will keep getting much better at Swiss German as the team puts more effort in. And the team is. Apertus 1.5 is in post-training right now; Apertus 2 is being designed at a much larger scale.
        </p>
        <p>
          Every time Apertus improves, Helvetra improves automatically. That's the deal we signed up for when we chose a fully-open Swiss model as our engine.
        </p>
      </ContentProseSection>

      <!-- Release cycle + roadmap -->
      <ContentProseSection id="release-cycle" title="What's coming next">
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/release-cycle.jpg`"
            alt="Slide titled 'Release Cycle' showing four stages (Foundation Models, Human-AI Alignment, Communal Red-teaming, Deployment & Feedback) with the Alps supercomputer at the centre. Partner logos visible: Swisscom, Public AI Inference Utility, ti (Ticino), Infomaniak, SafeSwiss Cloud, PHOENIQS, Exoscale."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2">
            The Apertus release cycle and its ecosystem partners. <a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, who hosts the Apertus inference we use for Helvetra, sits in the deployment partner row.
          </figcaption>
        </figure>
        <p>
          The Ticino deployment Schlag mentioned in passing is worth a closer look, because it's the most concrete public-sector use of Apertus to date. <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">According to CSCS</a> (March 2026), the canton's Computer Systems Centre (Centro sistemi informativi, CSI), inside the Department of Finance and Economy, is rolling out an in-house translation tool built on Apertus by a USI-affiliated startup called <strong>Artificialy</strong>, co-founded by Luca Gambardella (Professor of AI at Università della Svizzera italiana). A test phase with around 100 cantonal employees is starting in the coming weeks. Notably, CSCS reports that Apertus 8B reached a 94% benchmark score after fine-tuning for the specific translation task. A useful data point on how the smaller Apertus model performs when targeted at a real workload.
        </p>
        <p>
          Two concrete roadmap items came out of the talk:
        </p>
        <p>
          <strong>Apertus 1.5</strong> is being trained as we write this. It's a continued pre-training of the previous checkpoint with image and audio input capabilities (vision is mature, audio more experimental for now), and a reinforcement-learning pipeline for reasoning, code, and tool use. Schlag was visibly excited about preliminary vision results, and they'll share more when ready.
        </p>
        <p>
          <strong>Apertus 2</strong> is bigger ambition: closing the gap with the largest open-weight models, which now sit between 500 billion and a trillion parameters. The current Apertus 70B was deliberately designed to match the original Llama 3 70B as a proof of capability. The team now wants to see how big they can go on <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">CSCS's Alps supercomputer</a> (the largest public-institution AI-ready compute in the world) while staying within the transparency standards they set for themselves.
        </p>
      </ContentProseSection>

      <!-- Why this matters for Helvetra -->
      <ContentProseSection id="why-it-matters" title="Why we're staying with Apertus">
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/why-build-our-own-models.jpg`"
            alt="Slide titled 'Why Build Our Own Models?' listing five reasons: Legal necessity (Transparency and aligned to our values, responsible AI); R&D autonomy (Focus on what matters to us: multilinguality, compliance, local values); Scientific integrity (Open data and reproducibility are foundational to science); Deployment control (On-premise, no vendor lock-in, data stays internal if you want); Teach the next generation ('What I cannot create, I do not understand')."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2">
            Schlag's closing thesis on why <a href="https://ethz.ch/en.html" target="_blank" rel="noopener">ETH Zurich</a>, EPFL, and CSCS chose to build a model from scratch rather than fine-tune someone else's, all under the umbrella of the <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Swiss AI Initiative</a>. The closing line, <em>"What I cannot create, I do not understand,"</em> sums up the project's stance.
          </figcaption>
        </figure>
        <p>
          We've made the same bet at our scale. Helvetra is anchored to one model, Apertus, for the same reasons Schlag listed. The data residency stays in Switzerland, the training story is reproducible, the alignment is transparent, and the model is governed by Swiss public institutions, not American shareholders. We don't plan to offer an "LLM picker" or quietly swap to whatever is cheapest this quarter. <a href="/about">More on that bet here</a>.
        </p>
        <p>
          The trade-off is honest. Apertus 1 has gaps, especially on Swiss German. We feel them when we translate, you feel them when you read the output. But the talk on the Gurten this month was a strong reminder that the gap is closing, fast, in public, by a team that's telling us exactly how they're doing it. The next time Apertus ships, Helvetra ships with it.
        </p>
      </ContentProseSection>

      <ContentProseSection id="resources" title="Resources">
        <ul>
          <li>Apertus project home: <a href="https://apertvs.ai/" target="_blank" rel="noopener">apertvs.ai</a> (formerly apertus-ai.org)</li>
          <li>Swiss AI Initiative (umbrella): <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">swiss-ai.org</a></li>
          <li>Apertus on Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a></li>
          <li>Apertus on GitHub: <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">github.com/swiss-ai</a></li>
          <li>The talk page: <a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">Uphill Conf, Apertus keynote</a></li>
          <li>Uphill Conf 2026: <a href="https://uphillconf.com/" target="_blank" rel="noopener">uphillconf.com</a></li>
          <li>The infrastructure: <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">CSCS Alps supercomputer</a></li>
          <li>The Ticino deployment: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">CSCS: Apertus powers in-house AI translation for Ticino</a> (March 2026)</li>
        </ul>
      </ContentProseSection>

      <template #cta>
        <ContentArticleCTA :to="localePath('/')">
          <template #text>Try Helvetra and see Apertus in action, translating between English, German, French, Italian, Swiss German (with dialects), and Romansh.</template>
          <template #button>Open Helvetra</template>
        </ContentArticleCTA>
      </template>
    </ContentArticleLayout>

    <MarketingNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { locale } = useI18n()
const { getArticleSchema, useJsonLd } = useSchemaOrg()

// EN is the only language this article actually exists in. The localised
// URLs (/de, /fr, /it) serve the same EN content under a localised wrapper
// today, which is a duplicate-content footgun for SEO. We declare the EN
// URL as canonical from every variant, and noindex the non-EN variants so
// Google doesn't index 4 copies of the same text under 4 different URLs.
// When real translations land, remove the noindex and the canonical will
// take care of itself.
const CANONICAL_URL = 'https://helvetra.ch/news/apertus-at-uphill-conf-2026'

useJsonLd(getArticleSchema({
  headline: 'Apertus at Uphill Conf 2026: what it means for Helvetra',
  description: 'Notes from Imanol Schlag\'s keynote on the fully-open Swiss AI model behind Helvetra. The Swiss German moment: how a single PhD student took Apertus from 0% to ~40% Swiss German performance in one day of post-training.',
  datePublished: '2026-05-22',
  dateModified: '2026-05-22',
}))

useHead(() => {
  const isNonEnglish = locale.value !== 'en'
  return {
    title: 'Apertus at Uphill Conf 2026: what it means for Helvetra',
    link: [
      { rel: 'canonical', href: CANONICAL_URL },
    ],
    meta: [
      {
        name: 'description',
        content: 'Imanol Schlag (ETH AI Center, Apertus co-lead) presented Apertus at Uphill Conf 2026. Why fully-open beats open-weight, the EU AI Act compliance gap, and how a PhD student took Apertus to ~40% Swiss German in a single day of post-training, directly relevant to Helvetra users.',
      },
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: 'Apertus at Uphill Conf 2026: what it means for Helvetra' },
      { property: 'og:url', content: CANONICAL_URL },
      { property: 'article:published_time', content: '2026-05-22' },
      { property: 'article:section', content: 'News' },
      { property: 'article:tag', content: 'Apertus' },
      { property: 'article:tag', content: 'Swiss AI' },
      { property: 'article:tag', content: 'Swiss German' },
      {
        property: 'og:description',
        content: 'Notes from Imanol Schlag\'s keynote on the fully-open Swiss AI model behind Helvetra. The Swiss German moment that signals every future Apertus release will upgrade Helvetra automatically.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Apertus at Uphill Conf 2026: what it means for Helvetra' },
      ...(isNonEnglish
        ? [{ name: 'robots', content: 'noindex,follow' }]
        : []),
    ],
  }
})
</script>
