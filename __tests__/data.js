import { ApiDataCodec } from "../src/api/codecs";

const MOCK_JOB = {
  id: 274964,
  reference: "WTTJ_9MP4PxM",
  name: "Backend Developer (Ruby / Elixir)",
  slug: "backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
  description:
    '<p>Nous recherchons un(e) Développeur(se) Backend Ruby / Elixir pour nous rejoindre ! Idéalement quelqu\'un d\'à l\'aise avec notre <a href="https://www.welcometothejungle.co/companies/wttj/tech" target="_blank">stack actuelle</a>, mais surtout quelqu\'un d\'intéressé(e) pour aller encore plus loin (comprendre quelqu\'un de curieux(se), d\'exigeant(e), de challengeant(e)) afin de : </p>\n\n<ul>\n<li>1/ toujours proposer la meilleure expérience possible </li>\n<li>et 2/ scale up autant que possible nos différents produits, que ce soit sur Welcome to the Jungle, <a href="https://www.welcomekit.co/" target="_blank">WelcomeKit</a> ou d\'autres produits sur lesquels nous travaillons en ce moment même !</li>\n</ul>\n\n<p>Pour en savoir plus sur notre équipe Tech, composée aujourd\'hui d\'une 20aine de personnes, tu peux consulter : </p>\n\n<ul>\n<li>Les <a href="https://www.welcometothejungle.com/fr/companies/wttj/paris" target="_blank">vidéos</a> de différentes personnes de l\'équipe</li>\n<li>La <a href="https://www.welcometothejungle.com/fr/companies/wttj/tech" target="_blank">page Tech</a> de notre profil WTTJ </li>\n<li>Quelques <a href="https://medium.com/wttj-tech" target="_blank">articles</a> rédigés par des membres de l\'équipe Tech</li>\n</ul>\n',
  published_at: "2021-01-15T11:48:19.927+01:00",
  created_at: {
    fr: "Le 12 Novembre 2020 à 16h42",
    en: "The 12 November 2020 at 16h42",
  },
  office: {
    id: 196,
    name: "Paris",
    address: "16 Rue du Mail",
    zip_code: "75002",
    district: "Paris",
    city: "Paris",
    country: {
      fr: "France",
      en: "France",
    },
  },
  department: {
    id: 8,
    name: "Tech",
  },
  contract_type: {
    fr: "CDI",
    en: "Full-Time",
    es: "Contrato indefinido",
    cs: "Plný úvazek",
    sk: "Zmluva na dobu neurčitú",
  },
  profile:
    "<p>Welcome to the Jungle aspire à avoir un impact social positif, et prête une attention particulière au fait de respecter la diversité, l'inclusion et l’équité. Chaque candidature sera traitée de manière équitable et se basera sur les compétences et les motivations de chacun.</p>\n\n<p>Tu es notre profil idéal si :</p>\n\n<ul>\n<li>Tu réfléchis avant de coder et tu es pragmatique à l'extrême !</li>\n<li>Tu aimes le code propre (les tests, tu connais, et ça ne te fait pas peur d'en poser)</li>\n<li>Ruby / Ruby On Rails : tu <a href=\"http://rubyonrails.org/doctrine/\" target=\"_blank\">adhères</a>\n</li>\n<li>Elixir / Phoenix : ce sont tes technos du moment ! (si tu as juste fait quelques projets personnels avec, ton profil nous intéresse également :))</li>\n<li>Ca te motive : construire (ou plutôt continuer à construire) un ATS entièrement temps réel (utilisé par 3000+ entreprises, des milliers de recruteurs à un instant t) et constuire le WTTJ de demain !</li>\n<li>Les problématiques de performances t'intéressent et tu as pleinement conscience que Ruby n'est pas le meilleur langage pour ça, c'est pourquoi tu regardes d'autres technos type Elixir / Go (vu que tu es curieux(se), tu gardes également un oeil sur Rust, Crystal et d'autres langages pour le futur mais tu as bien conscience que c'est un peu trop tôt pour de la production :))</li>\n</ul>\n\n<p>Gros plus si :</p>\n\n<ul>\n<li>Tu as déjà contribué à des projets open-source</li>\n<li>Tu as déjà travaillé sur une architecture \"micro-services\"</li>\n<li>Tu as déjà mis en place une API GraphQL</li>\n<li>Tu connais bien l'univers AWS</li>\n<li>Tu as travaillé sur des sujets \"data\" (segmentation et stockage de gros volumes / moteur de recommandations / etc.)</li>\n<li>Si tu es également intéressé(e) par les sujets front (React JS notamment), on recrute également côté Full Stack :)</li>\n</ul>\n\n<p>Les diplômes nous importent peu, on recherche un(e) passionné(e) du web, un(e) acharné(e) de veille et de gadgets en tous genres, quelqu'un qui peut nous présenter un projet dont il/elle est fier(e).</p>\n\n<p>Aussi, étant donné que l'équipe est encore relativement petite, on reste très ouverts aux initiatives ! (choix des technos / outils / etc.)</p>\n\n<p>Bref, tu l'as compris, on ne cherche pas un simple développeur cantonné à faire de la maintenance sur nos applications, on recherche quelqu'un qui veut activement participer à l'aventure ! </p>\n\n<p>NB1: nous ne sommes pas fermés au télétravail en full time ! (la moitié de l'équipe Tech travaille déjà depuis les 4 coins de la France)</p>\n\n<p>NB2: si ton profil ne colle pas exactement aux critères mentionnés ci-avant, n'hésite pas à postuler, on reste ouverts !</p>\n",
  recruitment_process:
    '<p>Le CV n’est pas obligatoire si ton profil LinkedIn est à jour.</p>\n\n<ul>\n<li>Etape 1: Call de 45min avec <a href="https://www.linkedin.com/in/xavier-dejean-61292b69/" target="_blank">Xavier</a>\n</li>\n<li>Etape 2 Test technique</li>\n<li>Etape 3: Rencontres avec les opérationnels</li>\n</ul>\n',
  salary: {
    min: null,
    max: null,
    currency: "EUR",
    period: "none",
  },
  cms_sites_references: ["wttj_fr"],
  websites_urls: [
    {
      website_reference: "plaine-images",
      url:
        "https://plaine-images.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "h7",
      url:
        "https://h7.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "techcity",
      url:
        "https://techcity.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "naaphii",
      url:
        "https://naaphii.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "edtech-france",
      url:
        "https://edtech-france.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "reseau-entreprendre-paris",
      url:
        "https://reseau-entreprendre-paris.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "station-f-job-board",
      url:
        "https://jobs.stationf.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "starther",
      url:
        "https://starther.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "xange",
      url:
        "https://xange.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "hub-bpifrance",
      url:
        "https://hub-bpifrance.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "raise-co",
      url:
        "https://raise-co.welcomekit.co/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
    {
      website_reference: "wttj_fr",
      url:
        "https://www.welcometothejungle.com/companies/wttj/jobs/backend-developer-ruby-elixir_paris_WTTJ_9MP4PxM",
    },
  ],
};

const data = ApiDataCodec.decode({
  jobs: [MOCK_JOB],
  name: "test data",
  websites: [],
}).right;

export default data;
