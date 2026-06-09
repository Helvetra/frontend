<!--
  News article: Apertus keynote at Uphill Conf 2026.
  Primary source: Imanol Schlag's spoken transcript (Alex was in the room
  and shared slide photos). Date-stamped 2026-05-22.

  Content is shipped in EN/DE/FR/IT via a per-locale `content` object
  below. Each language has its own canonical URL.
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>{{ t.title }}</template>
      <template #subtitle>{{ t.subtitle }}</template>

      <ContentProseSection id="event-opener" :title="t.s1.heading">
        <p v-html="t.s1.p1" />
        <p v-html="t.s1.p2" />
      </ContentProseSection>

      <ContentProseSection id="the-keynote" :title="t.s2.heading">
        <p v-html="t.s2.p1" />
        <p>{{ t.s2.p2 }}</p>
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/who-is-building-ai.jpg`"
            alt="Slide titled 'Who is Building AI?' comparing Closed (OpenAI, Anthropic, Google, xAI, Mistral), Open-Weight (Meta Llama, DeepSeek, Alibaba Qwen, Moonshot Kimi, Google Gemma, Z.AI GLM, Mistral) and Fully Open (Swiss AI Apertus, AI2 Olmo, MBZUAI K2, OpenEuroLLM, EuroLLM, AI Singapore SEA-LION) categories."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2" v-html="t.s2.caption" />
        </figure>
      </ContentProseSection>

      <ContentProseSection id="compliance-edge" :title="t.s3.heading">
        <p v-html="t.s3.p1" />
        <p>{{ t.s3.p2 }}</p>
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/responsible-data-practices.jpg`"
            alt="Slide titled 'Responsible Data Practices' showing a comparison table where Apertus 8B/70B is the only model with a green check mark in 'Training data transparency & availability' and 'EU AI Act Art 53 compliance' rows. Qwen, DeepSeek, Mistral, Meta Llama, and OpenAI GPT-4.5 are marked with red X's in those rows."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2">{{ t.s3.caption }}</figcaption>
        </figure>
        <p v-html="t.s3.p3" />
        <p>{{ t.s3.p4 }}</p>
      </ContentProseSection>

      <ContentProseSection id="swiss-german-moment" :title="t.s4.heading">
        <p>{{ t.s4.p1 }}</p>
        <p>{{ t.s4.p2 }}</p>
        <p>{{ t.s4.p3 }}</p>
        <blockquote class="border-l-4 border-swiss-red pl-4 italic text-neutral-700 my-6">
          {{ t.s4.quote }}
        </blockquote>
        <p v-html="t.s4.p4" />
        <p>{{ t.s4.p5 }}</p>
        <p>{{ t.s4.p6 }}</p>
      </ContentProseSection>

      <ContentProseSection id="release-cycle" :title="t.s5.heading">
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/release-cycle.jpg`"
            alt="Slide titled 'Release Cycle' showing four stages (Foundation Models, Human-AI Alignment, Communal Red-teaming, Deployment & Feedback) with the Alps supercomputer at the centre. Partner logos visible: Swisscom, Public AI Inference Utility, ti (Ticino), Infomaniak, SafeSwiss Cloud, PHOENIQS, Exoscale."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2" v-html="t.s5.caption" />
        </figure>
        <p v-html="t.s5.p1" />
        <p>{{ t.s5.p2 }}</p>
        <p v-html="t.s5.p3" />
        <p v-html="t.s5.p4" />
      </ContentProseSection>

      <ContentProseSection id="why-it-matters" :title="t.s6.heading">
        <figure class="mb-10">
          <img
            :src="`/img/news/uphill-2026/why-build-our-own-models.jpg`"
            alt="Slide titled 'Why Build Our Own Models?' listing five reasons: Legal necessity (Transparency and aligned to our values, responsible AI); R&D autonomy (Focus on what matters to us: multilinguality, compliance, local values); Scientific integrity (Open data and reproducibility are foundational to science); Deployment control (On-premise, no vendor lock-in, data stays internal if you want); Teach the next generation ('What I cannot create, I do not understand')."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2" v-html="t.s6.caption" />
        </figure>
        <p v-html="t.s6.p1" />
        <p>{{ t.s6.p2 }}</p>
      </ContentProseSection>

      <ContentProseSection id="resources" :title="t.resources.heading">
        <ul>
          <li v-for="item in t.resources.items" :key="item" v-html="item" />
        </ul>
      </ContentProseSection>

      <template #cta>
        <ContentArticleCTA :to="localePath('/')">
          <template #text>{{ t.cta.text }}</template>
          <template #button>{{ t.cta.button }}</template>
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

// Per-locale content. EN is the source of truth; DE/FR/IT are AI-produced
// translations awaiting native-speaker review.
const content = {
  en: {
    title: 'Apertus at Uphill Conf 2026: what it means for Helvetra',
    subtitle:
      "Imanol Schlag's keynote on the fully-open Swiss AI model behind Helvetra. Why a single PhD student took Apertus from zero Swiss German to ~40% in a day, and why every Apertus release from here on directly upgrades the translations you get from us.",
    s1: {
      heading: 'A developer conference on the Gurten',
      p1: '<a href="https://uphillconf.com/" target="_blank" rel="noopener">Uphill Conf 2026</a> took place on 7–8 May at the Gurten, above Bern. Per the conference\'s own framing, the event is tailored to software developers and focused on practical AI/ML in production: building AI-native products, securing LLM applications, agentic systems, cost-efficient inference. This year\'s programme included talks from Google DeepMind, AWS, Hugging Face, and IBM Research, alongside the keynote we came for.',
      p2: '<a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a> is the Swiss-built, fully-open large language model that powers every translation Helvetra produces. When the project\'s co-lead announces what\'s coming next, we listen.',
    },
    s2: {
      heading: 'The keynote',
      p1: 'On Friday morning, <strong>Imanol Schlag</strong>, AI Research Scientist at the <a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a> and co-lead of the Apertus project, opened the day with <em>"Apertus: Democratizing Open and Compliant LLMs For Global Language Environments"</em> (<a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">talk page</a>).',
      p2: 'It was the kind of talk that pulls everything together in 30 minutes. What Apertus is, why it\'s structured the way it is, where it sits in the global landscape, and what\'s coming next. The slides below are from the actual session.',
      caption: 'Schlag\'s mental model of the LLM landscape: <em>share outputs</em> (closed), <em>share weights</em> (open-weight), or <em>share everything</em> (fully open). Apertus sits in the third category alongside AI2\'s Olmo, OpenEuroLLM, and Singapore\'s SEA-LION. Almost all of these come from public institutions.',
    },
    s3: {
      heading: 'Why "fully open" is not just a slogan',
      p1: 'The distinction matters. An open-weight model lets you download the file and run it on your own hardware: useful, but you still don\'t know what it was trained on, who curated the data, how it was aligned. A <strong>fully open</strong> model publishes all of it. The training data and the pipeline to reproduce it, the training code, model checkpoints throughout training, and a 100+ page technical report. The <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">Apertus GitHub organisation</a> hosts the lot.',
      p2: 'Schlag put this in concrete terms with a comparison table that\'s worth reproducing:',
      caption:
        'Of the models compared on this slide, Apertus is the only one marked ✓ on both training-data transparency and EU AI Act Article 53 compliance. The rest, including every American closed model and most of the open-weight catalogue, are marked ✗.',
      p3: 'That\'s not a marketing claim. Article 53 of the <a href="https://artificialintelligenceact.eu/article/53/" target="_blank" rel="noopener">EU AI Act</a> requires general-purpose AI providers to publish <em>"a detailed summary of the training content"</em>. As Schlag pointed out in his talk: "so far I know of no closed or open weight model that actually fulfills this requirement." Apertus does.',
      p4: 'The team also categorically refused to scrape pirated content. They respect AI opt-out signals (the robots.txt-style AI directives), which costs them about 8% of English training data and 4% of non-English data. A price they were happy to pay. They went further: Schlag described an explicit anti-memorisation method in the training pipeline so the model can\'t regurgitate copyrighted passages it saw during training. None of the big closed labs publishes anything comparable.',
    },
    s4: {
      heading: 'The Swiss German moment',
      p1: 'Here\'s the part of the talk that mattered most for Helvetra users.',
      p2: 'Apertus 1 was released in September 2025. The first post-training pass (the supervised fine-tuning that teaches the foundation model how to behave conversationally) included zero Swiss German data. The model would simply refuse to speak Swiss German because it had barely seen any during instruction tuning.',
      p3: 'And then, in Schlag\'s own words:',
      quote:
        '"Because we have such a strong multilingual foundation and lots of other Alemannic languages in the training data, it took a PhD student maybe a day to put together a few thousand Swiss German conversational examples, half of them actually synthetically generated, to bring the performance from basically zero to, let\'s be honest, 50–40%. So it\'s not amazing of course, but the amazing thing is how far it got with the little work that we had to put into."',
      p4: 'Read that carefully. <strong>One PhD student. One day. A few thousand examples, half of them synthetic. Zero to roughly 40% Swiss German performance.</strong>',
      p5: 'Schlag was honest: 40% isn\'t amazing yet. But the trajectory is the point. A foundation model strong enough to pick up an under-resourced language to that level on a single day of post-training is a foundation model that will keep getting much better at Swiss German as the team puts more effort in. And the team is. Apertus 1.5 is in post-training right now; Apertus 2 is being designed at a much larger scale.',
      p6: 'Every time Apertus improves, Helvetra improves automatically. That\'s the deal we signed up for when we chose a fully-open Swiss model as our engine.',
    },
    s5: {
      heading: 'What\'s coming next',
      caption:
        'The Apertus release cycle and its ecosystem partners. <a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, who hosts the Apertus inference we use for Helvetra, sits in the deployment partner row.',
      p1: 'The Ticino deployment Schlag mentioned in passing is worth a closer look, because it\'s the most concrete public-sector use of Apertus to date. <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">According to CSCS</a> (March 2026), the canton\'s Computer Systems Centre (Centro sistemi informativi, CSI), inside the Department of Finance and Economy, is rolling out an in-house translation tool built on Apertus by a USI-affiliated startup called <strong>Artificialy</strong>, co-founded by Luca Gambardella (Professor of AI at Università della Svizzera italiana). A test phase with around 100 cantonal employees is starting in the coming weeks. Notably, CSCS reports that Apertus 8B reached a 94% benchmark score after fine-tuning for the specific translation task. A useful data point on how the smaller Apertus model performs when targeted at a real workload.',
      p2: 'Two concrete roadmap items came out of the talk:',
      p3: '<strong>Apertus 1.5</strong> is being trained as we write this. It\'s a continued pre-training of the previous checkpoint with image and audio input capabilities (vision is mature, audio more experimental for now), and a reinforcement-learning pipeline for reasoning, code, and tool use. Schlag was visibly excited about preliminary vision results, and they\'ll share more when ready.',
      p4: '<strong>Apertus 2</strong> is bigger ambition: closing the gap with the largest open-weight models, which now sit between 500 billion and a trillion parameters. The current Apertus 70B was deliberately designed to match the original Llama 3 70B as a proof of capability. The team now wants to see how big they can go on <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">CSCS\'s Alps supercomputer</a> (the largest public-institution AI-ready compute in the world) while staying within the transparency standards they set for themselves.',
    },
    s6: {
      heading: 'Why we\'re staying with Apertus',
      caption:
        'Schlag\'s closing thesis on why <a href="https://ethz.ch/en.html" target="_blank" rel="noopener">ETH Zurich</a>, EPFL, and CSCS chose to build a model from scratch rather than fine-tune someone else\'s, all under the umbrella of the <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Swiss AI Initiative</a>. The closing line, <em>"What I cannot create, I do not understand,"</em> sums up the project\'s stance.',
      p1: 'We\'ve made the same bet at our scale. Helvetra is anchored to one model, Apertus, for the same reasons Schlag listed. The data residency stays in Switzerland, the training story is reproducible, the alignment is transparent, and the model is governed by Swiss public institutions, not American shareholders. We don\'t plan to offer an "LLM picker" or quietly swap to whatever is cheapest this quarter. <a href="/about">More on that bet here</a>.',
      p2: 'The trade-off is honest. Apertus 1 has gaps, especially on Swiss German. We feel them when we translate, you feel them when you read the output. But the talk on the Gurten this month was a strong reminder that the gap is closing, fast, in public, by a team that\'s telling us exactly how they\'re doing it. The next time Apertus ships, Helvetra ships with it.',
    },
    resources: {
      heading: 'Resources',
      items: [
        'Apertus project home: <a href="https://apertvs.ai/" target="_blank" rel="noopener">apertvs.ai</a> (formerly apertus-ai.org)',
        'Swiss AI Initiative (umbrella): <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">swiss-ai.org</a>',
        'Apertus on Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Apertus on GitHub: <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">github.com/swiss-ai</a>',
        'The talk page: <a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">Uphill Conf, Apertus keynote</a>',
        'Uphill Conf 2026: <a href="https://uphillconf.com/" target="_blank" rel="noopener">uphillconf.com</a>',
        'The infrastructure: <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">CSCS Alps supercomputer</a>',
        'The Ticino deployment: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">CSCS: Apertus powers in-house AI translation for Ticino</a> (March 2026)',
      ],
    },
    cta: {
      text: 'Try Helvetra and see Apertus in action, translating between English, German, French, Italian, Swiss German (with dialects), and Romansh.',
      button: 'Open Helvetra',
    },
    meta: {
      description:
        'Imanol Schlag (ETH AI Center, Apertus co-lead) presented Apertus at Uphill Conf 2026. Why fully-open beats open-weight, the EU AI Act compliance gap, and how a PhD student took Apertus to ~40% Swiss German in a single day of post-training, directly relevant to Helvetra users.',
      ogDescription:
        "Notes from Imanol Schlag's keynote on the fully-open Swiss AI model behind Helvetra. The Swiss German moment that signals every future Apertus release will upgrade Helvetra automatically.",
    },
  },
  de: {
    title: 'Apertus an der Uphill Conf 2026: was das für Helvetra bedeutet',
    subtitle:
      'Imanol Schlags Keynote über das vollständig offene Schweizer KI-Modell hinter Helvetra. Warum ein einzelner Doktorand Apertus an einem Tag von null auf etwa 40 Prozent Schweizerdeutsch gebracht hat, und warum jedes künftige Apertus-Release die Übersetzungen, die Sie von uns erhalten, direkt verbessert.',
    s1: {
      heading: 'Eine Entwicklerkonferenz auf dem Gurten',
      p1: 'Die <a href="https://uphillconf.com/" target="_blank" rel="noopener">Uphill Conf 2026</a> fand am 7. und 8. Mai auf dem Gurten oberhalb von Bern statt. Gemäss der Selbstbeschreibung der Konferenz richtet sich der Anlass an Software-Entwickler und konzentriert sich auf praxisnahe KI und ML im produktiven Einsatz: KI-native Produkte bauen, LLM-Anwendungen absichern, agentische Systeme, kosteneffiziente Inferenz. Das diesjährige Programm umfasste Vorträge von Google DeepMind, AWS, Hugging Face und IBM Research, neben der Keynote, für die wir gekommen waren.',
      p2: '<a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a> ist das in der Schweiz entwickelte, vollständig offene Large Language Model, das jede von Helvetra erzeugte Übersetzung antreibt. Wenn der Co-Lead des Projekts ankündigt, was als Nächstes kommt, hören wir hin.',
    },
    s2: {
      heading: 'Die Keynote',
      p1: 'Am Freitagmorgen eröffnete <strong>Imanol Schlag</strong>, AI Research Scientist am <a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a> und Co-Lead des Apertus-Projekts, den Tag mit <em>«Apertus: Democratizing Open and Compliant LLMs For Global Language Environments»</em> (<a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">Vortragsseite</a>).',
      p2: 'Es war eine dieser Präsentationen, die in 30 Minuten alles zusammenbringen. Was Apertus ist, warum es so aufgebaut ist, wo es im globalen Umfeld steht, und was als Nächstes kommt. Die Folien unten stammen aus der tatsächlichen Session.',
      caption:
        'Schlags mentales Modell der LLM-Landschaft: <em>share outputs</em> (closed), <em>share weights</em> (open-weight) oder <em>share everything</em> (fully open). Apertus steht in der dritten Kategorie neben Olmo von AI2, OpenEuroLLM und SEA-LION aus Singapur. Fast alle dieser Modelle stammen aus öffentlichen Institutionen.',
    },
    s3: {
      heading: 'Warum «fully open» nicht nur ein Slogan ist',
      p1: 'Der Unterschied ist wichtig. Ein open-weight Modell können Sie herunterladen und auf eigener Hardware betreiben. Nützlich, aber Sie wissen immer noch nicht, womit es trainiert wurde, wer die Daten kuratiert hat, wie es ausgerichtet wurde. Ein <strong>fully open</strong> Modell veröffentlicht das alles: die Trainingsdaten und die Pipeline zu ihrer Reproduktion, den Trainingscode, Model-Checkpoints aus dem gesamten Trainingsverlauf, sowie einen technischen Bericht von über 100 Seiten. Die <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">Apertus-GitHub-Organisation</a> hostet das Ganze.',
      p2: 'Schlag hat das mit einer Vergleichstabelle konkret gemacht, die wir hier wiedergeben:',
      caption:
        'Von den auf dieser Folie verglichenen Modellen ist Apertus das einzige mit einem ✓ sowohl bei der Transparenz der Trainingsdaten als auch bei der Konformität mit Artikel 53 des EU AI Act. Die übrigen, einschliesslich jedes amerikanischen Closed-Modells und des Grossteils des Open-Weight-Katalogs, tragen ein ✗.',
      p3: 'Das ist keine Marketingaussage. Artikel 53 des <a href="https://artificialintelligenceact.eu/article/53/" target="_blank" rel="noopener">EU AI Act</a> verlangt von Anbietern allgemeiner KI-Modelle, <em>«eine ausreichend detaillierte Zusammenfassung der Trainingsinhalte»</em> zu veröffentlichen. Schlag wies in seinem Vortrag darauf hin: «Soweit ich weiss, erfüllt kein Closed- oder Open-Weight-Modell diese Anforderung tatsächlich.» Apertus tut es.',
      p4: 'Das Team hat sich auch kategorisch geweigert, raubkopierte Inhalte zu crawlen. Es respektiert AI-Opt-out-Signale (die KI-Direktiven nach Art von robots.txt), was etwa 8 Prozent der englischen Trainingsdaten und 4 Prozent der nicht-englischen Daten kostet. Ein Preis, den das Team gerne gezahlt hat. Es ging noch weiter: Schlag beschrieb eine explizite Methode gegen Memorisierung in der Trainings-Pipeline, damit das Modell urheberrechtlich geschützte Passagen, die es im Training gesehen hat, nicht wiedergeben kann. Keines der grossen Closed-Labs veröffentlicht etwas Vergleichbares.',
    },
    s4: {
      heading: 'Der Moment für Schweizerdeutsch',
      p1: 'Hier kommt der Teil des Vortrags, der für die Helvetra-Nutzerinnen und -Nutzer am wichtigsten war.',
      p2: 'Apertus 1 wurde im September 2025 veröffentlicht. Im ersten Post-Training-Schritt (das überwachte Feintuning, das dem Foundation Model beibringt, sich konversationell zu verhalten) waren null Schweizerdeutsch-Daten enthalten. Das Modell weigerte sich schlicht, Schweizerdeutsch zu sprechen, weil es im Instruction-Tuning kaum welches gesehen hatte.',
      p3: 'Und dann, in Schlags eigenen Worten:',
      quote:
        '«Weil wir ein so starkes multilinguales Fundament und viele andere alemannische Sprachen in den Trainingsdaten haben, hat es einen Doktoranden vielleicht einen Tag gekostet, ein paar Tausend Schweizerdeutsch-Konversationsbeispiele zusammenzustellen, davon etwa die Hälfte synthetisch generiert, um die Leistung von praktisch null auf, ehrlich gesagt, 50–40 Prozent zu bringen. Das ist natürlich nicht überragend, aber das Erstaunliche ist, wie weit es mit so wenig Aufwand kam.»',
      p4: 'Lesen Sie das in Ruhe. <strong>Ein Doktorand. Ein Tag. Ein paar Tausend Beispiele, davon die Hälfte synthetisch. Von null auf rund 40 Prozent Schweizerdeutsch-Leistung.</strong>',
      p5: 'Schlag war ehrlich: 40 Prozent sind noch nicht beeindruckend. Aber es geht um die Richtung. Ein Foundation Model, das stark genug ist, eine ressourcenarme Sprache an einem einzigen Tag Post-Training auf dieses Niveau zu bringen, ist ein Foundation Model, das mit jedem zusätzlichen Aufwand des Teams beim Schweizerdeutsch deutlich besser wird. Und das Team legt nach. Apertus 1.5 befindet sich gerade im Post-Training; Apertus 2 wird in einem deutlich grösseren Massstab entworfen.',
      p6: 'Jedes Mal, wenn Apertus besser wird, wird Helvetra automatisch besser. Das ist die Vereinbarung, der wir zugestimmt haben, als wir uns für ein fully open Schweizer Modell als unsere Engine entschieden haben.',
    },
    s5: {
      heading: 'Was als Nächstes kommt',
      caption:
        'Der Release-Zyklus von Apertus und seine Ökosystem-Partner. <a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, das die Apertus-Inferenz hostet, die wir für Helvetra nutzen, befindet sich in der Reihe der Deployment-Partner.',
      p1: 'Der Einsatz im Tessin, den Schlag nebenbei erwähnte, ist einen genaueren Blick wert, weil er bislang die konkreteste Nutzung von Apertus im öffentlichen Sektor darstellt. <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">Laut CSCS</a> (März 2026) rollt das Centro sistemi informativi (CSI) des Kantons, angesiedelt im Departement für Finanzen und Wirtschaft, ein hauseigenes Übersetzungswerkzeug aus, das von einem USI-nahen Startup namens <strong>Artificialy</strong> auf Apertus aufgebaut wurde. Mitgegründet wurde Artificialy von Luca Gambardella (Professor für KI an der Università della Svizzera italiana). Eine Testphase mit rund 100 Kantonsangestellten startet in den kommenden Wochen. Bemerkenswert: CSCS berichtet, dass Apertus 8B nach dem Fine-Tuning für diese spezifische Übersetzungsaufgabe einen Benchmark-Wert von 94 Prozent erreicht hat. Ein aussagekräftiger Datenpunkt dazu, wie das kleinere Apertus-Modell auf eine konkrete Aufgabe abgestimmt abschneidet.',
      p2: 'Zwei konkrete Roadmap-Punkte kamen aus dem Vortrag:',
      p3: '<strong>Apertus 1.5</strong> wird, während wir das schreiben, gerade trainiert. Es handelt sich um ein fortgesetztes Pre-Training des vorigen Checkpoints mit Bild- und Audio-Input-Fähigkeiten (Vision ist ausgereift, Audio vorerst experimenteller) sowie einer Reinforcement-Learning-Pipeline für Reasoning, Code und Tool Use. Schlag war sichtlich begeistert von ersten Vision-Ergebnissen, und sie werden mehr teilen, sobald es so weit ist.',
      p4: '<strong>Apertus 2</strong> ist die grössere Ambition: die Lücke zu den grössten open-weight Modellen schliessen, die mittlerweile zwischen 500 Milliarden und einer Billion Parameter liegen. Das aktuelle Apertus 70B wurde bewusst so ausgelegt, das ursprüngliche Llama 3 70B als Fähigkeitsnachweis zu erreichen. Das Team will nun ausloten, wie weit es auf dem <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">Alps-Supercomputer von CSCS</a> gehen kann (dem grössten AI-ready Hochleistungsrechner einer öffentlichen Institution weltweit), und dabei innerhalb der eigenen Transparenzstandards bleiben.',
    },
    s6: {
      heading: 'Warum wir bei Apertus bleiben',
      caption:
        'Schlags Schlussthese darüber, warum <a href="https://ethz.ch/en.html" target="_blank" rel="noopener">ETH Zürich</a>, EPFL und CSCS sich entschieden haben, ein Modell von Grund auf zu bauen, statt das eines anderen zu fine-tunen. Alles unter dem Dach der <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Swiss AI Initiative</a>. Die abschliessende Zeile <em>«Was ich nicht erschaffen kann, verstehe ich nicht»</em> bringt die Haltung des Projekts auf den Punkt.',
      p1: 'Wir haben in unserer Grössenordnung die gleiche Wette gemacht. Helvetra ist auf ein einziges Modell, Apertus, ausgerichtet, aus den gleichen Gründen, die Schlag aufgezählt hat. Die Daten bleiben in der Schweiz, die Trainingsgeschichte ist reproduzierbar, das Alignment ist transparent, und das Modell wird von Schweizer öffentlichen Institutionen geführt, nicht von amerikanischen Aktionären. Wir planen keinen «LLM-Picker» und kein stilles Wechseln auf das, was dieses Quartal am günstigsten ist. <a href="/de/about">Mehr zu dieser Wette hier</a>.',
      p2: 'Der Trade-off ist ehrlich. Apertus 1 hat Lücken, vor allem beim Schweizerdeutsch. Wir spüren sie beim Übersetzen, Sie spüren sie beim Lesen der Ausgabe. Aber der Vortrag auf dem Gurten in diesem Monat war eine starke Erinnerung daran, dass sich diese Lücke schliesst, schnell, in der Öffentlichkeit, durch ein Team, das uns genau erklärt, wie es das macht. Wenn Apertus das nächste Mal ausliefert, liefert Helvetra mit.',
    },
    resources: {
      heading: 'Ressourcen',
      items: [
        'Apertus-Projektseite: <a href="https://apertvs.ai/" target="_blank" rel="noopener">apertvs.ai</a> (vormals apertus-ai.org)',
        'Swiss AI Initiative (Dach): <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">swiss-ai.org</a>',
        'Apertus auf Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Apertus auf GitHub: <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">github.com/swiss-ai</a>',
        'Vortragsseite: <a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">Uphill Conf, Apertus-Keynote</a>',
        'Uphill Conf 2026: <a href="https://uphillconf.com/" target="_blank" rel="noopener">uphillconf.com</a>',
        'Die Infrastruktur: <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">CSCS Alps Supercomputer</a>',
        'Der Tessiner Einsatz: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">CSCS: Apertus powers in-house AI translation for Ticino</a> (März 2026)',
      ],
    },
    cta: {
      text: 'Probieren Sie Helvetra aus und sehen Sie Apertus in Aktion, beim Übersetzen zwischen Englisch, Deutsch, Französisch, Italienisch, Schweizerdeutsch (mit Dialekten) und Rätoromanisch.',
      button: 'Helvetra öffnen',
    },
    meta: {
      description:
        'Imanol Schlag (ETH AI Center, Apertus Co-Lead) hat Apertus an der Uphill Conf 2026 präsentiert. Warum fully open open-weight schlägt, die Compliance-Lücke beim EU AI Act, und wie ein Doktorand Apertus an einem einzigen Tag Post-Training auf etwa 40 Prozent Schweizerdeutsch gebracht hat. Direkt relevant für Helvetra-Nutzer.',
      ogDescription:
        'Notizen aus Imanol Schlags Keynote über das vollständig offene Schweizer KI-Modell hinter Helvetra. Der Schweizerdeutsch-Moment, der signalisiert, dass jedes künftige Apertus-Release Helvetra automatisch verbessert.',
    },
  },
  fr: {
    title: 'Apertus à la Uphill Conf 2026: ce que cela signifie pour Helvetra',
    subtitle:
      "La keynote d'Imanol Schlag sur le modèle d'IA suisse entièrement ouvert qui propulse Helvetra. Pourquoi un seul doctorant a fait passer Apertus de zéro à environ 40 % en suisse allemand en une journée, et pourquoi chaque future sortie d'Apertus améliorera directement les traductions que vous obtenez chez nous.",
    s1: {
      heading: 'Une conférence pour développeurs sur le Gurten',
      p1: 'La <a href="https://uphillconf.com/" target="_blank" rel="noopener">Uphill Conf 2026</a> s\'est tenue les 7 et 8 mai sur le Gurten, au-dessus de Berne. Selon la présentation de la conférence, l\'événement s\'adresse aux développeurs et se concentre sur l\'IA/ML pratique en production: créer des produits AI-natifs, sécuriser les applications de LLM, les systèmes agentiques, l\'inférence à coût maîtrisé. Le programme de cette année comprenait des interventions de Google DeepMind, AWS, Hugging Face et IBM Research, en plus de la keynote pour laquelle nous étions venus.',
      p2: '<a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a> est le grand modèle de langage entièrement ouvert, conçu en Suisse, qui propulse chaque traduction produite par Helvetra. Quand le co-lead du projet annonce la suite, nous écoutons.',
    },
    s2: {
      heading: 'La keynote',
      p1: 'Vendredi matin, <strong>Imanol Schlag</strong>, AI Research Scientist au <a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a> et co-lead du projet Apertus, a ouvert la journée avec <em>«Apertus: Democratizing Open and Compliant LLMs For Global Language Environments»</em> (<a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">page du talk</a>).',
      p2: "C'était le genre de présentation qui réunit tout en 30 minutes. Ce qu'est Apertus, pourquoi il est structuré ainsi, où il se situe dans le paysage mondial, et ce qui arrive ensuite. Les diapositives ci-dessous proviennent de la session elle-même.",
      caption:
        'Le modèle mental de Schlag pour le paysage des LLM: <em>share outputs</em> (closed), <em>share weights</em> (open-weight), ou <em>share everything</em> (fully open). Apertus se situe dans la troisième catégorie aux côtés d\'Olmo (AI2), OpenEuroLLM et SEA-LION (Singapour). Presque tous ces modèles viennent d\'institutions publiques.',
    },
    s3: {
      heading: 'Pourquoi «fully open» n\'est pas qu\'un slogan',
      p1: 'La distinction compte. Un modèle open-weight vous permet de télécharger le fichier et de le faire tourner sur votre matériel: utile, mais vous ne savez toujours pas sur quoi il a été entraîné, qui a curé les données, comment il a été aligné. Un modèle <strong>fully open</strong> publie tout: les données d\'entraînement et le pipeline pour les reproduire, le code d\'entraînement, les checkpoints du modèle tout au long de l\'entraînement, et un rapport technique de plus de 100 pages. L\'<a href="https://github.com/swiss-ai" target="_blank" rel="noopener">organisation GitHub Apertus</a> héberge l\'ensemble.',
      p2: 'Schlag l\'a rendu concret avec un tableau comparatif que voici:',
      caption:
        'Parmi les modèles comparés sur cette diapositive, Apertus est le seul à être marqué ✓ à la fois pour la transparence des données d\'entraînement et pour la conformité à l\'article 53 de l\'AI Act européen. Tous les autres, y compris chaque modèle closed américain et la majorité du catalogue open-weight, sont marqués ✗.',
      p3: 'Ce n\'est pas un argument marketing. L\'article 53 de l\'<a href="https://artificialintelligenceact.eu/article/53/" target="_blank" rel="noopener">AI Act européen</a> oblige les fournisseurs d\'IA à usage général à publier <em>«un résumé suffisamment détaillé du contenu d\'entraînement»</em>. Comme l\'a souligné Schlag pendant son talk: «À ma connaissance, aucun modèle closed ni open-weight ne satisfait réellement cette exigence à ce jour.» Apertus, lui, le fait.',
      p4: "L'équipe a aussi refusé catégoriquement de scraper du contenu piraté. Elle respecte les signaux AI opt-out (les directives IA façon robots.txt), ce qui leur coûte environ 8 % des données d'entraînement en anglais et 4 % des données non anglophones. Un prix qu'ils étaient heureux de payer. Ils sont allés plus loin: Schlag a décrit une méthode explicite anti-mémorisation dans le pipeline d'entraînement, pour que le modèle ne puisse pas restituer les passages protégés par le droit d'auteur qu'il a vus pendant l'entraînement. Aucun des grands labos closed ne publie quoi que ce soit de comparable.",
    },
    s4: {
      heading: 'Le moment suisse allemand',
      p1: "Voici la partie du talk qui comptait le plus pour les utilisateurs et utilisatrices de Helvetra.",
      p2: "Apertus 1 est sorti en septembre 2025. Le premier passage de post-training (le fine-tuning supervisé qui apprend au modèle de fondation à se comporter de manière conversationnelle) contenait zéro donnée en suisse allemand. Le modèle refusait simplement de parler suisse allemand, faute d'en avoir vu pendant l'instruction tuning.",
      p3: 'Et puis, dans les mots de Schlag lui-même:',
      quote:
        "«Parce que nous avons une base multilingue très forte et beaucoup d'autres langues alémaniques dans les données d'entraînement, il a fallu à un doctorant peut-être une journée pour assembler quelques milliers d'exemples conversationnels en suisse allemand, dont la moitié générés de façon synthétique, pour faire passer la performance de pratiquement zéro à, soyons honnêtes, 50–40 %. Donc ce n'est évidemment pas extraordinaire, mais l'extraordinaire est jusqu'où c'est allé avec si peu de travail.»",
      p4: "Relisez attentivement. <strong>Un doctorant. Une journée. Quelques milliers d'exemples, dont la moitié synthétiques. De zéro à environ 40 % de performance en suisse allemand.</strong>",
      p5: "Schlag a été honnête: 40 % n'est pas encore exceptionnel. Mais c'est la trajectoire qui compte. Un modèle de fondation assez puissant pour faire monter une langue peu dotée à ce niveau en une seule journée de post-training, c'est un modèle qui continuera de bien s'améliorer en suisse allemand au fur et à mesure que l'équipe y investit. Et elle le fait. Apertus 1.5 est en post-training en ce moment même; Apertus 2 est conçu à une échelle bien plus grande.",
      p6: "Chaque fois qu'Apertus s'améliore, Helvetra s'améliore automatiquement. C'est le contrat que nous avons signé en choisissant un modèle suisse fully open comme moteur.",
    },
    s5: {
      heading: 'Ce qui arrive ensuite',
      caption:
        "Le cycle de release d'Apertus et ses partenaires d'écosystème. <a href=\"https://www.infomaniak.com/\" target=\"_blank\" rel=\"noopener\">Infomaniak</a>, qui héberge l'inférence Apertus que nous utilisons pour Helvetra, figure dans la rangée des partenaires de déploiement.",
      p1: "Le déploiement tessinois que Schlag a mentionné en passant mérite un regard plus attentif, parce que c'est l'usage le plus concret d'Apertus dans le secteur public à ce jour. <a href=\"https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino\" target=\"_blank\" rel=\"noopener\">Selon CSCS</a> (mars 2026), le Centro sistemi informativi (CSI) du canton, rattaché au Département des finances et de l'économie, déploie un outil de traduction interne construit sur Apertus par une startup affiliée à l'USI appelée <strong>Artificialy</strong>, cofondée par Luca Gambardella (professeur d'IA à l'Università della Svizzera italiana). Une phase de test avec environ 100 employés cantonaux démarre dans les semaines à venir. Fait notable: CSCS rapporte qu'Apertus 8B a atteint un score de benchmark de 94 % après fine-tuning sur cette tâche de traduction spécifique. Un repère utile sur la performance du plus petit modèle Apertus une fois ciblé sur une charge de travail réelle.",
      p2: 'Deux éléments concrets de la roadmap sont ressortis du talk:',
      p3: "<strong>Apertus 1.5</strong> est en cours d'entraînement au moment où nous écrivons. Il s'agit d'un pre-training continu du précédent checkpoint avec des capacités d'entrée image et audio (la vision est mature, l'audio plus expérimental pour l'instant), et d'un pipeline de reinforcement learning pour le raisonnement, le code et l'utilisation d'outils. Schlag était visiblement enthousiasmé par les premiers résultats vision, et l'équipe en partagera plus dès que ce sera prêt.",
      p4: "<strong>Apertus 2</strong> est une ambition plus large: combler l'écart avec les plus grands modèles open-weight, qui se situent désormais entre 500 milliards et mille milliards de paramètres. L'actuel Apertus 70B a été délibérément conçu pour égaler le Llama 3 70B original, en preuve de capacité. L'équipe veut maintenant voir jusqu'où elle peut aller sur le <a href=\"https://www.cscs.ch/computers/alps\" target=\"_blank\" rel=\"noopener\">supercalculateur Alps du CSCS</a> (le plus grand cluster AI-ready opéré par une institution publique au monde) tout en restant dans les standards de transparence qu'elle s'est fixés.",
    },
    s6: {
      heading: 'Pourquoi nous restons sur Apertus',
      caption:
        "La thèse de clôture de Schlag sur la raison pour laquelle <a href=\"https://ethz.ch/en.html\" target=\"_blank\" rel=\"noopener\">l'ETH Zurich</a>, l'EPFL et le CSCS ont choisi de construire un modèle de zéro plutôt que de fine-tuner celui de quelqu'un d'autre, le tout sous l'ombrelle de la <a href=\"https://www.swiss-ai.org/\" target=\"_blank\" rel=\"noopener\">Swiss AI Initiative</a>. La phrase de fin, <em>«Ce que je ne peux pas créer, je ne le comprends pas»</em>, résume la posture du projet.",
      p1: "Nous avons fait le même pari à notre échelle. Helvetra est ancrée à un seul modèle, Apertus, pour les mêmes raisons que Schlag a listées. Les données restent en Suisse, l'historique d'entraînement est reproductible, l'alignement est transparent, et le modèle est gouverné par des institutions publiques suisses, pas par des actionnaires américains. Nous ne prévoyons pas de proposer un «sélecteur de LLM» ni de basculer en douce vers le moins cher du trimestre. <a href=\"/fr/about\">Plus de détails sur ce pari ici</a>.",
      p2: "Le compromis est honnête. Apertus 1 a des lacunes, en particulier sur le suisse allemand. Nous les sentons quand nous traduisons, vous les sentez quand vous lisez le résultat. Mais la conférence sur le Gurten ce mois-ci a été un rappel fort que l'écart se réduit, vite, en public, par une équipe qui nous dit exactement comment elle s'y prend. La prochaine fois qu'Apertus sortira, Helvetra sortira avec lui.",
    },
    resources: {
      heading: 'Ressources',
      items: [
        'Page du projet Apertus: <a href="https://apertvs.ai/" target="_blank" rel="noopener">apertvs.ai</a> (anciennement apertus-ai.org)',
        'Swiss AI Initiative (ombrelle): <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">swiss-ai.org</a>',
        'Apertus sur Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Apertus sur GitHub: <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">github.com/swiss-ai</a>',
        'La page du talk: <a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">Uphill Conf, keynote Apertus</a>',
        'Uphill Conf 2026: <a href="https://uphillconf.com/" target="_blank" rel="noopener">uphillconf.com</a>',
        "L'infrastructure: <a href=\"https://www.cscs.ch/computers/alps\" target=\"_blank\" rel=\"noopener\">supercalculateur CSCS Alps</a>",
        'Le déploiement tessinois: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">CSCS: Apertus powers in-house AI translation for Ticino</a> (mars 2026)',
      ],
    },
    cta: {
      text: "Essayez Helvetra et voyez Apertus en action, en traduisant entre l'anglais, l'allemand, le français, l'italien, le suisse allemand (avec dialectes) et le romanche.",
      button: 'Ouvrir Helvetra',
    },
    meta: {
      description:
        "Imanol Schlag (ETH AI Center, co-lead d'Apertus) a présenté Apertus à la Uphill Conf 2026. Pourquoi fully open dépasse open-weight, l'écart de conformité à l'AI Act européen, et comment un doctorant a fait monter Apertus à environ 40 % en suisse allemand en une seule journée de post-training. Directement pertinent pour les utilisateurs de Helvetra.",
      ogDescription:
        "Notes de la keynote d'Imanol Schlag sur le modèle d'IA suisse entièrement ouvert qui propulse Helvetra. Le moment suisse allemand qui signale que chaque future sortie d'Apertus améliorera Helvetra automatiquement.",
    },
  },
  it: {
    title: 'Apertus alla Uphill Conf 2026: cosa significa per Helvetra',
    subtitle:
      "Il keynote di Imanol Schlag sul modello di IA svizzero completamente aperto che alimenta Helvetra. Perché un singolo dottorando ha portato Apertus da zero a circa il 40% in tedesco svizzero in un giorno, e perché ogni futura release di Apertus migliorerà direttamente le traduzioni che vi forniamo.",
    s1: {
      heading: 'Una conferenza per sviluppatori sul Gurten',
      p1: 'La <a href="https://uphillconf.com/" target="_blank" rel="noopener">Uphill Conf 2026</a> si è tenuta il 7 e 8 maggio sul Gurten, sopra Berna. Secondo la presentazione ufficiale, l\'evento è pensato per sviluppatori software e si concentra su IA/ML pratiche in produzione: costruire prodotti AI-nativi, mettere in sicurezza le applicazioni LLM, sistemi agentici, inferenza a costi sostenibili. Il programma di quest\'anno includeva interventi di Google DeepMind, AWS, Hugging Face e IBM Research, oltre al keynote per cui eravamo lì.',
      p2: '<a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a> è il large language model interamente aperto, costruito in Svizzera, che alimenta ogni traduzione prodotta da Helvetra. Quando il co-lead del progetto annuncia cosa arriverà dopo, noi ascoltiamo.',
    },
    s2: {
      heading: 'Il keynote',
      p1: 'Venerdì mattina <strong>Imanol Schlag</strong>, AI Research Scientist all\'<a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a> e co-lead del progetto Apertus, ha aperto la giornata con <em>«Apertus: Democratizing Open and Compliant LLMs For Global Language Environments»</em> (<a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">pagina del talk</a>).',
      p2: 'Era il tipo di intervento che mette tutto insieme in 30 minuti. Cos\'è Apertus, perché è strutturato così, dove si colloca nel panorama globale e cosa arriverà dopo. Le slide qui sotto provengono dalla sessione stessa.',
      caption:
        'Il modello mentale di Schlag per il panorama LLM: <em>share outputs</em> (closed), <em>share weights</em> (open-weight), oppure <em>share everything</em> (fully open). Apertus si colloca nella terza categoria insieme a Olmo (AI2), OpenEuroLLM e SEA-LION (Singapore). Quasi tutti questi modelli arrivano da istituzioni pubbliche.',
    },
    s3: {
      heading: 'Perché «fully open» non è solo uno slogan',
      p1: 'La distinzione conta. Un modello open-weight permette di scaricare il file e farlo girare sul proprio hardware: utile, ma non si sa ancora su cosa sia stato addestrato, chi abbia curato i dati, come sia stato allineato. Un modello <strong>fully open</strong> pubblica tutto: i dati di addestramento e la pipeline per riprodurli, il codice di addestramento, i checkpoint del modello lungo tutto il training, e un report tecnico di oltre 100 pagine. L\'<a href="https://github.com/swiss-ai" target="_blank" rel="noopener">organizzazione GitHub di Apertus</a> ospita il tutto.',
      p2: 'Schlag l\'ha reso concreto con una tabella comparativa che vale la pena riportare:',
      caption:
        'Tra i modelli messi a confronto in questa slide, Apertus è l\'unico segnato con ✓ sia sulla trasparenza dei dati di addestramento, sia sulla conformità all\'Articolo 53 dell\'AI Act europeo. Gli altri, inclusi tutti i modelli closed americani e gran parte del catalogo open-weight, sono segnati con ✗.',
      p3: 'Non è un\'affermazione di marketing. L\'articolo 53 dell\'<a href="https://artificialintelligenceact.eu/article/53/" target="_blank" rel="noopener">AI Act europeo</a> impone ai fornitori di IA di uso generale di pubblicare <em>«un riassunto sufficientemente dettagliato dei contenuti di addestramento»</em>. Come ha sottolineato Schlag durante il talk: «Per quanto ne so, nessun modello closed o open-weight soddisfa davvero questo requisito.» Apertus invece sì.',
      p4: 'Il team ha anche rifiutato categoricamente di scrapare contenuti piratati. Rispetta i segnali di AI opt-out (le direttive IA in stile robots.txt), il che costa circa l\'8% dei dati di addestramento in inglese e il 4% dei dati non in inglese. Un prezzo che erano felici di pagare. Sono andati oltre: Schlag ha descritto un metodo esplicito anti-memorizzazione nella pipeline di addestramento, perché il modello non possa restituire passaggi protetti da copyright visti durante l\'addestramento. Nessuno dei grandi laboratori closed pubblica nulla di paragonabile.',
    },
    s4: {
      heading: 'Il momento del tedesco svizzero',
      p1: 'Ecco la parte del talk più importante per chi usa Helvetra.',
      p2: 'Apertus 1 è uscito a settembre 2025. Il primo passaggio di post-training (il fine-tuning supervisionato che insegna al foundation model a comportarsi in modo conversazionale) non includeva alcun dato in tedesco svizzero. Il modello si rifiutava semplicemente di parlare tedesco svizzero perché ne aveva visto pochissimo durante l\'instruction tuning.',
      p3: 'E poi, con le parole stesse di Schlag:',
      quote:
        '«Visto che abbiamo una base multilingue molto forte e molte altre lingue alemanniche nei dati di addestramento, è bastato a un dottorando forse un giorno per mettere insieme qualche migliaio di esempi conversazionali in tedesco svizzero, di cui circa la metà generati in modo sintetico, per portare le prestazioni da praticamente zero a, diciamolo onestamente, il 50–40%. Quindi non è chiaramente straordinario, ma la cosa straordinaria è quanto siamo arrivati lontano con così poco lavoro.»',
      p4: 'Rileggetelo con calma. <strong>Un dottorando. Un giorno. Qualche migliaio di esempi, metà sintetici. Da zero a circa il 40% di prestazioni in tedesco svizzero.</strong>',
      p5: 'Schlag è stato onesto: il 40% non è ancora eccezionale. Ma il punto è la traiettoria. Un foundation model abbastanza solido da portare una lingua poco rappresentata a quel livello in una sola giornata di post-training è un modello che continuerà a migliorare parecchio sul tedesco svizzero man mano che il team ci investe. E il team ci sta investendo. Apertus 1.5 è in post-training proprio adesso; Apertus 2 è in progettazione su una scala molto più ampia.',
      p6: 'Ogni volta che Apertus migliora, Helvetra migliora automaticamente. È il patto che abbiamo accettato quando abbiamo scelto un modello svizzero fully open come motore.',
    },
    s5: {
      heading: 'Cosa arriverà dopo',
      caption:
        'Il ciclo di release di Apertus e i suoi partner di ecosistema. <a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, che ospita l\'inferenza di Apertus che usiamo per Helvetra, è nella fila dei partner di deployment.',
      p1: 'Il deployment ticinese che Schlag ha menzionato di passaggio merita uno sguardo più approfondito, perché è finora l\'uso più concreto di Apertus nel settore pubblico. <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">Secondo CSCS</a> (marzo 2026), il Centro sistemi informativi (CSI) del Cantone, all\'interno del Dipartimento delle finanze e dell\'economia, sta lanciando uno strumento di traduzione interno costruito su Apertus da una startup affiliata all\'USI chiamata <strong>Artificialy</strong>, cofondata da Luca Gambardella (Professore di IA all\'Università della Svizzera italiana). Una fase di test con circa 100 dipendenti cantonali parte nelle prossime settimane. Notevolmente, CSCS riferisce che Apertus 8B ha raggiunto un punteggio benchmark del 94% dopo il fine-tuning per quello specifico compito di traduzione. Un dato utile su come il modello Apertus più piccolo si comporta quando viene ottimizzato su un carico di lavoro reale.',
      p2: 'Dal talk sono emersi due punti concreti di roadmap:',
      p3: '<strong>Apertus 1.5</strong> è in addestramento mentre scriviamo. Si tratta di un pre-training continuato del checkpoint precedente con capacità di input immagini e audio (la vision è matura, l\'audio per ora più sperimentale), e di una pipeline di reinforcement learning per ragionamento, codice e uso di strumenti. Schlag era visibilmente entusiasta dei primi risultati sulla vision, e il team condividerà di più non appena sarà pronto.',
      p4: '<strong>Apertus 2</strong> è un\'ambizione più ampia: colmare il divario con i più grandi modelli open-weight, che ora si collocano tra 500 miliardi e mille miliardi di parametri. L\'attuale Apertus 70B è stato progettato deliberatamente per eguagliare il Llama 3 70B originale come prova di capacità. Il team ora vuole vedere quanto in alto possa spingersi sul <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">supercomputer Alps di CSCS</a> (il più grande cluster pronto per l\'IA gestito da un\'istituzione pubblica al mondo), restando dentro gli standard di trasparenza che si è dato.',
    },
    s6: {
      heading: 'Perché restiamo su Apertus',
      caption:
        'La tesi conclusiva di Schlag sul perché <a href="https://ethz.ch/en.html" target="_blank" rel="noopener">ETH Zurigo</a>, EPFL e CSCS abbiano scelto di costruire un modello da zero invece di fare il fine-tuning di quello di qualcun altro, il tutto sotto l\'ombrello della <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Swiss AI Initiative</a>. La frase finale, <em>«Quello che non posso creare, non lo capisco»</em>, riassume la posizione del progetto.',
      p1: 'Abbiamo fatto la stessa scommessa, nella nostra dimensione. Helvetra è ancorata a un solo modello, Apertus, per le stesse ragioni elencate da Schlag. I dati restano in Svizzera, la storia di addestramento è riproducibile, l\'allineamento è trasparente, e il modello è governato da istituzioni pubbliche svizzere, non da azionisti americani. Non abbiamo in programma un «selettore di LLM» né di passare in silenzio a quello che costa meno questo trimestre. <a href="/it/about">Più dettagli su questa scommessa qui</a>.',
      p2: 'Il compromesso è onesto. Apertus 1 ha delle lacune, soprattutto sul tedesco svizzero. Le sentiamo quando traduciamo, voi le sentite quando leggete il risultato. Ma il talk sul Gurten di questo mese è stato un forte promemoria del fatto che il divario si sta chiudendo, in fretta, in pubblico, da parte di un team che ci dice esattamente come lo sta facendo. La prossima volta che Apertus uscirà, Helvetra uscirà con lui.',
    },
    resources: {
      heading: 'Risorse',
      items: [
        'Sito del progetto Apertus: <a href="https://apertvs.ai/" target="_blank" rel="noopener">apertvs.ai</a> (in precedenza apertus-ai.org)',
        'Swiss AI Initiative (ombrello): <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">swiss-ai.org</a>',
        'Apertus su Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Apertus su GitHub: <a href="https://github.com/swiss-ai" target="_blank" rel="noopener">github.com/swiss-ai</a>',
        'Pagina del talk: <a href="https://uphillconf.com/talks/apertus-democratizing-open-and-compliant-llms-for-global-language-environments/" target="_blank" rel="noopener">Uphill Conf, keynote Apertus</a>',
        'Uphill Conf 2026: <a href="https://uphillconf.com/" target="_blank" rel="noopener">uphillconf.com</a>',
        'L\'infrastruttura: <a href="https://www.cscs.ch/computers/alps" target="_blank" rel="noopener">supercomputer Alps di CSCS</a>',
        'Il deployment ticinese: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-powers-in-house-ai-translation-for-ticino" target="_blank" rel="noopener">CSCS: Apertus powers in-house AI translation for Ticino</a> (marzo 2026)',
      ],
    },
    cta: {
      text: 'Provate Helvetra e vedete Apertus in azione, mentre traduce tra inglese, tedesco, francese, italiano, tedesco svizzero (con dialetti) e romancio.',
      button: 'Apri Helvetra',
    },
    meta: {
      description:
        'Imanol Schlag (ETH AI Center, co-lead di Apertus) ha presentato Apertus alla Uphill Conf 2026. Perché fully open batte open-weight, il gap di conformità sull\'AI Act europeo, e come un dottorando ha portato Apertus a circa il 40% di tedesco svizzero in una sola giornata di post-training. Direttamente rilevante per gli utenti di Helvetra.',
      ogDescription:
        'Note dal keynote di Imanol Schlag sul modello di IA svizzero interamente aperto che alimenta Helvetra. Il momento del tedesco svizzero che segnala come ogni futura release di Apertus migliorerà Helvetra in automatico.',
    },
  },
} as const

const t = computed(() => content[locale.value as keyof typeof content] || content.en)

const canonical = computed(() => {
  const path = '/news/apertus-at-uphill-conf-2026'
  return locale.value === 'en'
    ? `https://helvetra.ch${path}`
    : `https://helvetra.ch/${locale.value}${path}`
})

// Per-article 1200×630 Open Graph image. Manually composed from one of
// the Uphill slide photos in public/img/news/uphill-2026/og.jpg.
// Long-term solution (auto-generated per-page OG images via the
// nuxt-og-image module) is tracked separately. The module's current
// versions don't build cleanly against Nuxt 4.2 + Tailwind 3.
const ogImageUrl = 'https://helvetra.ch/img/news/uphill-2026/og.jpg'

useJsonLd(getArticleSchema({
  headline: t.value.title,
  description: t.value.subtitle,
  datePublished: '2026-05-22',
  dateModified: '2026-05-22',
  image: ogImageUrl,
}))

useHead(() => ({
  title: t.value.title,
  link: [{ rel: 'canonical', href: canonical.value }],
  meta: [
    { name: 'description', content: t.value.meta.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: t.value.title },
    { property: 'og:url', content: canonical.value },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: t.value.title },
    { property: 'article:published_time', content: '2026-05-22' },
    { property: 'article:section', content: 'News' },
    { property: 'article:tag', content: 'Apertus' },
    { property: 'article:tag', content: 'Swiss AI' },
    { property: 'article:tag', content: 'Swiss German' },
    { property: 'og:description', content: t.value.meta.ogDescription },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t.value.title },
    { name: 'twitter:image', content: ogImageUrl },
  ],
}))
</script>
