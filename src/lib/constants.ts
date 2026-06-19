import type {
  BlogPost,
  Category,
  FAQItem,
  HowItWorksStep,
  Stat,
  Testimonial,
} from "@/types/lead";

// Icônes lucide-react par slug (pour mapper recon -> icône)
const ICON_BY_SLUG: Record<string, string> = {
  plomberie: "Wrench",
  electricite: "Zap",
  serrurerie: "Lock",
  chauffage: "Flame",
  vitrerie: "Square",
  electromenager: "WashingMachine",
  "petits-travaux": "Hammer",
  "travaux-embellissement": "Paintbrush",
  peinture: "PaintBucket",
  sols: "Grid3x3",
  "pompe-a-chaleur": "Wind",
  climatisation: "Wind",
  toiture: "Home",
  nuisibles: "Bug",
  ramonage: "Cloud",
  ventilation: "AirVent",
  menuiserie: "Drill",
  "serrurerie-blindee": "ShieldCheck",
  "depannage-urgence": "Siren",
  "projet-travaux": "ClipboardList",
};

export const CATEGORIES: Category[] = [
  {
    slug: "plomberie",
    label: "Plomberie",
    icon: ICON_BY_SLUG.plomberie,
    subcategories: [
      "Recherche de fuite",
      "Fuite ballon d'eau chaude",
      "Débouchage WC",
      "Débouchage évier / lavabo",
      "Réfection des joints de douche / baignoire",
      "Réparation d'une fuite après vanne principale",
      "Panne de chasse d'eau WC",
      "Fuite tuyau d'évacuation",
    ],
  },
  {
    slug: "electricite",
    label: "Électricité",
    icon: ICON_BY_SLUG.electricite,
    subcategories: [
      "Panne de tableau électrique",
      "Panne de plusieurs prises",
      "Problème d'électricité dans tout l'appartement",
      "Remplacement d'un disjoncteur",
      "Court-circuit",
      "Mise aux normes électriques",
    ],
  },
  {
    slug: "serrurerie",
    label: "Serrurerie",
    icon: ICON_BY_SLUG.serrurerie,
    subcategories: [
      "Ouverture de porte simple claquée",
      "Fourniture et pose d'une serrure 3 points",
      "Problème concernant la serrure",
      "Remplacement de cylindre",
      "Blindage de porte",
      "Serrure bloquée",
    ],
  },
  {
    slug: "chauffage",
    label: "Chauffage",
    icon: ICON_BY_SLUG.chauffage,
    subcategories: [
      "Visite d'entretien annuelle d'une chaudière",
      "Réparation d'une chaudière au gaz",
      "Réparation d'un ballon d'eau chaude électrique",
      "Contrat d'entretien chauffage",
      "Dépannage radiateur",
      "Détartrage ballon d'eau chaude",
    ],
  },
  {
    slug: "vitrerie",
    label: "Vitrerie",
    icon: ICON_BY_SLUG.vitrerie,
    subcategories: [
      "Remplacement de vitre cassée",
      "Pose de double vitrage",
      "Réparation de fenêtre",
      "Sécurisation après effraction",
      "Miroiterie",
    ],
  },
  {
    slug: "electromenager",
    label: "Électroménager",
    icon: ICON_BY_SLUG.electromenager,
    subcategories: [
      "Dépannage lave-linge",
      "Dépannage lave-vaisselle",
      "Dépannage four",
      "Dépannage réfrigérateur",
      "Dépannage sèche-linge",
    ],
  },
  {
    slug: "petits-travaux",
    label: "Petits travaux",
    icon: ICON_BY_SLUG["petits-travaux"],
    subcategories: [
      "Pose d'étagères",
      "Montage de meubles",
      "Fixation murale TV",
      "Réparations diverses",
      "Pose de tringles à rideaux",
    ],
  },
  {
    slug: "travaux-embellissement",
    label: "Travaux d'embellissement",
    icon: ICON_BY_SLUG["travaux-embellissement"],
    subcategories: [
      "Peinture intérieure",
      "Revêtement de sol",
      "Travaux tous corps d'état",
      "Pose de papier peint",
      "Rénovation cuisine / salle de bain",
    ],
  },
  {
    slug: "pompe-a-chaleur",
    label: "Clim & pompe à chaleur",
    icon: ICON_BY_SLUG["pompe-a-chaleur"],
    subcategories: [
      "Installation de climatisation",
      "Pose de pompe à chaleur air/air",
      "Entretien climatisation",
      "Dépannage clim réversible",
      "Diagnostic PAC",
    ],
  },
  {
    slug: "toiture",
    label: "Toiture",
    icon: ICON_BY_SLUG.toiture,
    subcategories: [
      "Recherche de fuite toiture",
      "Réparation de tuiles",
      "Nettoyage de toiture",
      "Démoussage",
      "Pose de gouttières",
    ],
  },
  {
    slug: "nuisibles",
    label: "Nuisibles",
    icon: ICON_BY_SLUG.nuisibles,
    subcategories: [
      "Traitement punaises de lit",
      "Désinsectisation cafards",
      "Dératisation",
      "Traitement guêpes / frelons",
      "Traitement puces",
    ],
  },
  {
    slug: "ramonage",
    label: "Ramonage",
    icon: ICON_BY_SLUG.ramonage,
    subcategories: [
      "Ramonage conduit cheminée",
      "Ramonage poêle à bois",
      "Ramonage chaudière",
      "Certificat de ramonage",
      "Débistrage",
    ],
  },
  {
    slug: "depannage-urgence",
    label: "Dépannage d'urgence 24/7",
    icon: ICON_BY_SLUG["depannage-urgence"],
    subcategories: [
      "Urgence plomberie",
      "Urgence serrurerie",
      "Urgence électricité",
      "Urgence chauffage",
      "Urgence vitrerie",
    ],
  },
  {
    slug: "projet-travaux",
    label: "Projet travaux sur rendez-vous",
    icon: ICON_BY_SLUG["projet-travaux"],
    subcategories: [
      "Devis travaux",
      "Planification chantier",
      "Suivi de commande",
      "Conseils projet",
      "Estimation en ligne",
    ],
  },
];

export const FAQ: FAQItem[] = [
  {
    question: "Quels types de services proposez-vous ?",
    answer:
      "Spécialiste du dépannage d'urgence à domicile, nous intervenons en plomberie, serrurerie, électricité, chauffage, vitrerie et électroménager. Nous proposons également un service de travaux d'embellissement pour transformer votre intérieur : peinture, revêtement de sol, travaux tous corps d'état.",
  },
  {
    question: "Comment régler mon dépannage ?",
    answer:
      "Nos artisans acceptent plusieurs modes de règlement. Une fois le devis validé et l'intervention terminée, vous pouvez payer directement auprès du professionnel par carte bancaire, chèque ou virement. Et si vous préférez tout faire en ligne, notre plateforme sécurisée permet de régler dès la commande.",
  },
  {
    question: "Dois-je payer l'intervention tout de suite ?",
    answer:
      "Non. Vous ne payez qu'une fois le devis signé et l'intervention terminée. Le déplacement et le devis sont toujours gratuits : le pro se déplace, vous êtes libre de dire non. Vous pouvez aussi opter pour le pré-blocage en ligne, qui ne débite votre carte qu'au moment du règlement final.",
  },
  {
    question: "En cas d'urgence, sous combien de temps arrive l'artisan ?",
    answer:
      "Un pro vous rappelle en 3 à 20 minutes pendant les horaires d'ouverture (7j/7 de 8h30 à 19h30). L'artisan adapte ensuite le rendez-vous à votre disponibilité : la majorité des interventions urgentes ont lieu sous 1 à 2 heures sur les grandes villes couvertes.",
  },
  {
    question: "Les artisans sont-ils certifiés et assurés ?",
    answer:
      "Oui, 100% de nos artisans sont diplômés, qualifiés et couverts par une assurance décennale. Nous vérifions leurs documents (Kbis, attestations, qualifications) avant toute mise en relation et suivons leur note moyenne dans le temps pour garantir un niveau de service constant.",
  },
  {
    question: "Le devis est-il vraiment gratuit ?",
    answer:
      "Oui, le déplacement et le devis sont systématiquement gratuits. Vous ne payez que si vous acceptez l'intervention. Aucun frais caché, le tarif annoncé est celui que vous payez à la fin.",
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer:
      "Notre service client est joignable 7j/7 et toutes les interventions sont couvertes par une assurance professionnelle. En cas de désaccord, nous médions entre vous et l'artisan pour trouver une solution, et nous prenons en charge les éventuelles malfaçons via la garantie décennale.",
  },
  {
    question: "Couvrez-vous toute la France ?",
    answer:
      "Notre réseau couvre 80% du territoire français, avec 48 grandes villes où nous intervenons jusqu'à 30 km sans surcoût de déplacement. Pour les zones plus éloignées, contactez-nous pour vérifier la disponibilité d'un artisan partenaire proche de chez vous.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophie Lemaire",
    city: "Paris 11e",
    service: "Plomberie",
    rating: 5,
    text: "Fuite sous l'évier à 22h, l'artisan était là en 35 minutes. Travail propre, devis respecté, je recommande à 100%.",
  },
  {
    name: "Karim Benali",
    city: "Lyon",
    service: "Serrurerie",
    rating: 5,
    text: "Porte claquée un dimanche soir, ouverture en 10 minutes sans dégâts. Tarif transparent annoncé avant l'intervention, parfait.",
  },
  {
    name: "Mathilde Roux",
    city: "Bordeaux",
    service: "Électricité",
    rating: 4,
    text: "Tableau électrique à remettre aux normes. Diagnostic rapide, devis clair, intervention le lendemain. Très pro.",
  },
  {
    name: "Julien Marchand",
    city: "Marseille",
    service: "Chauffage",
    rating: 5,
    text: "Chaudière en panne en plein hiver. Réponse immédiate, pièce changée le jour même. Sauvé !",
  },
  {
    name: "Aurélie Petit",
    city: "Lille",
    service: "Vitrerie",
    rating: 5,
    text: "Vitre cassée après cambriolage : sécurisation dans l'heure, remplacement le surlendemain. Service impeccable et rassurant.",
  },
  {
    name: "Thomas Garnier",
    city: "Toulouse",
    service: "Électroménager",
    rating: 4,
    text: "Lave-linge en panne, diagnostic offert, réparation en 1h. Beaucoup moins cher que d'en racheter un neuf.",
  },
];

export const TRUST_LOGOS: string[] = [
  "MAIF",
  "M6",
  "Capital",
  "Trustpilot",
  "Le Figaro",
  "BFMTV",
];

export const STATS: Stat[] = [
  { value: "+500 000", label: "dépannages réussis depuis 2013" },
  { value: "93%", label: "de clients satisfaits après intervention" },
  { value: "1 300", label: "pros diplômés et assurés en décennale" },
  { value: "3 - 20 min", label: "pour vous rappeler, chez vous aujourd'hui ou demain" },
  { value: "100%", label: "des interventions couvertes par une assurance pro" },
  { value: "80%", label: "du territoire français couvert par nos artisans" },
  { value: "48", label: "grandes villes couvertes, jusqu'à 30 km sans surcoût" },
  { value: "4,2/5", label: "note moyenne sur plus de 6 400 avis Trustpilot" },
];

export const HERO = {
  h1: "Le meilleur artisan est déjà en chemin",
  subtitle: "+500 000 dépannages depuis 2013. On s'occupe du vôtre ?",
};

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    num: "01",
    title: "Décrivez votre besoin",
    description:
      "En 30 secondes, sélectionnez votre problème, votre adresse et vos disponibilités.",
    icon: "FileText",
  },
  {
    num: "02",
    title: "On trouve l'artisan",
    description:
      "Un pro certifié et assuré vous rappelle en moins de 20 minutes avec un devis clair.",
    icon: "Users",
  },
  {
    num: "03",
    title: "Intervention rapide",
    description:
      "L'artisan se déplace, résout le problème, et vous ne payez qu'une fois satisfait.",
    icon: "Wrench",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "fuite-eau-que-faire",
    title: "Fuite d'eau à la maison : les 5 réflexes à avoir avant l'arrivée du plombier",
    excerpt:
      "Couper l'arrivée d'eau, sécuriser les appareils électriques... les bons gestes qui limitent les dégâts.",
    category: "Plomberie",
    date: "2026-05-28",
  },
  {
    slug: "tableau-electrique-disjoncte",
    title: "Tableau électrique qui disjoncte sans arrêt : causes et solutions",
    excerpt:
      "Surcharge, court-circuit, défaut différentiel : on vous explique comment diagnostiquer rapidement.",
    category: "Électricité",
    date: "2026-05-14",
  },
  {
    slug: "ouverture-porte-claquee",
    title: "Porte claquée : combien coûte vraiment un serrurier en 2026 ?",
    excerpt:
      "Tarifs moyens, frais cachés à éviter et le bon réflexe avant d'appeler en urgence.",
    category: "Serrurerie",
    date: "2026-04-30",
  },
  {
    slug: "entretien-chaudiere-obligatoire",
    title: "Entretien chaudière : ce que dit vraiment la loi",
    excerpt:
      "Obligation légale, fréquence, prix moyen et conséquences en cas d'oubli pour votre assurance.",
    category: "Chauffage",
    date: "2026-04-12",
  },
  {
    slug: "punaises-de-lit-traitement",
    title: "Punaises de lit : pourquoi le traitement par un pro reste indispensable",
    excerpt:
      "Pourquoi les solutions grand public échouent et combien coûte une vraie désinsectisation.",
    category: "Nuisibles",
    date: "2026-03-25",
  },
  {
    slug: "renover-cuisine-budget",
    title: "Rénover sa cuisine : à quel budget faut-il s'attendre en 2026 ?",
    excerpt:
      "Décomposition des postes de dépense et conseils pour optimiser le devis de votre artisan.",
    category: "Travaux",
    date: "2026-03-08",
  },
];

export const PHONE_URGENCY = "01 86 65 47 09";
