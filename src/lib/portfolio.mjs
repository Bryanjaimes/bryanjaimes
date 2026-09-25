// The hub's single content source. Add projects here; cards, filters, detail
// pages, counts, metadata, and the sitemap all use this catalog.
export const profile = {
  name: 'Bryan Jaimes',
  email: 'lebryanjaimes23@gmail.com',
  github: 'https://github.com/Bryanjaimes',
  linkedin: 'https://linkedin.com/in/Bryan-jaimes',
};

export const projects = [
  {
    slug: 'opendeploy', title: 'OpenDeploy', category: 'Platforms', kind: 'Open source',
    subtitle: 'One model. More possibilities.', visual: 'deploy', featured: true,
    description: 'Cost-aware ML deployment across clouds.',
    tags: ['Python', 'Docker', 'Kubernetes', 'AWS'],
    source: 'https://github.com/Bryanjaimes/openDeploy',
    overview: 'OpenDeploy explores how a unified API, CLI, and dashboard can make deploying AI models simpler. The project brings model deployment and cloud selection into one workflow.',
    problem: 'Shipping a model involves much more than inference: packaging, infrastructure, cloud selection, and operating costs all affect the path to production.',
    approach: ['Bring deployment operations into a unified interface.', 'Use containers and cloud infrastructure to make workloads portable.', 'Make cost and performance part of deployment decisions.'],
    scope: 'An open-source platform project. The repository is the source of truth for setup and currently supported functionality.',
  },
  {
    slug: 'pupuseria', title: 'PupuserIA', category: 'Vibe lab', kind: 'Interactive prototype',
    subtitle: 'A different way to find a place.', visual: 'property', featured: true,
    description: 'An interactive property-search canvas for El Salvador.',
    tags: ['Generative UI', 'JavaScript', 'Product design'],
    source: 'https://github.com/Bryanjaimes/PupuserIA-', demo: '/demos/pupuseria/index.html',
    overview: 'A hands-on exploration of generative interfaces for property discovery. A search brief and a set of preferences shape the panels, shortlist, and comparisons on the canvas.',
    problem: 'A list of properties is only part of the decision. Lifestyle, region, budget, and intended use need to come together in a useful interface.',
    approach: ['Turn a brief and preference chips into an evolving search canvas.', 'Compare properties alongside regional and lifestyle context.', 'Keep the prototype self-contained so the interaction is easy to try.'],
    scope: 'The playable demo uses sample property inventory and rule-based interactions. It is a frontend prototype, not a live listing service or an investment assessment.',
  },
  {
    slug: 'permit-classifier', title: 'Permit Classifier', category: 'AI & ML', kind: 'Career project',
    subtitle: 'From documents to decisions.', visual: 'permit', featured: true,
    description: 'BERT-powered permit classification for BLDUP.',
    tags: ['BERT', 'FastAPI', 'Redis', 'PostgreSQL'],
    source: 'https://github.com/amjustin13/MachineLearning-InCommercialRealEstate',
    overview: 'A machine learning microservice for organizing construction permits across Boston, Austin, and San Francisco. My work covered training and deployment of the classification service.',
    problem: 'Millions of permit records are difficult to organize consistently by hand. Classification makes that information easier to work with at scale.',
    approach: ['Train a BERT model using a corpus of more than three million permits.', 'Expose predictions through a FastAPI microservice.', 'Use Redis caching alongside the service to support repeated requests.'],
    scope: 'Work completed at BLDUP in 2021. My existing portfolio reports approximately 90% classification accuracy; the linked team repository provides the project context.',
  },
  {
    slug: 'a-eye', title: 'A-eye / SASHA', category: 'AI & ML', kind: 'Research project',
    subtitle: 'Exploring a clearer view.', visual: 'vision',
    description: 'Retinal-image classification with deep learning.',
    tags: ['PyTorch', 'Computer vision', 'Medical imaging', 'ONNX'],
    overview: 'A healthcare AI project exploring retinal-image analysis with deep learning. The focus is diabetic retinopathy detection and the engineering behind an image-classification workflow.',
    problem: 'Retinal images contain complex visual patterns. This project explores how computer vision can support their analysis.',
    approach: ['Explore convolutional neural networks for retinal-image classification.', 'Work with PyTorch and model-export tooling.', 'Connect model development with the practical challenges of healthcare AI.'],
    scope: 'A research portfolio project, not a clinically validated diagnostic product. A current public source link and evaluation report are not yet included.',
  },
  {
    slug: 'live-fact-checker', title: 'Live Fact Checker', category: 'Vibe lab', kind: 'Open-source fork',
    subtitle: 'Follow the claim. Find the context.', visual: 'signal',
    description: 'AI fact-checking for videos and live streams.',
    tags: ['JavaScript', 'Gemini', 'Search grounding'],
    source: 'https://github.com/Bryanjaimes/live-fact-checker',
    attribution: { name: 'alandaitch/live-fact-checker', url: 'https://github.com/alandaitch/live-fact-checker' },
    overview: 'My fork of an open-source experiment that uses Gemini and Google Search grounding to investigate claims in videos and streams.',
    problem: 'Claims move quickly in live media. Connecting them to supporting context is an interesting challenge for AI-assisted interfaces.',
    approach: ['Explore the upstream real-time fact-checking workflow.', 'Examine how search grounding can connect claims to sources.', 'Use the fork as a space for experimentation.'],
    scope: 'A fork of work by alandaitch. Original authorship belongs to the upstream project; this listing does not imply that I built the original system.',
  },
  {
    slug: 'sasha', title: 'SASHA', category: 'AI & ML', kind: 'Open source',
    subtitle: 'Such A Smart Healthcare Assistant.', visual: 'assistant',
    description: 'An experimental healthcare assistant.',
    tags: ['Healthcare', 'HTML'],
    source: 'https://github.com/Bryanjaimes/sasha',
    overview: 'SASHA stands for Such A Smart Healthcare Assistant. This entry links to the public assistant repository, separately from the A-eye retinal-image project described in my portfolio.',
    problem: 'Healthcare software is one of the areas I explore through practical engineering projects.',
    approach: ['Explore an assistant-oriented healthcare interface.', 'Keep the public implementation available for inspection.'],
    scope: 'An exploratory repository. See its source for the current implementation and setup.',
  },
  ...[
    ['myrecipe', 'myRecipe', 'EC463-myRecipe', 'JavaScript', 'An earlier course project from my engineering archive.'],
    ['auctions', 'Auctions', 'Auctions', 'Python', 'A Python project from my early software engineering work.'],
    ['shazamboni', 'Shazamboni', 'Shazamboni', 'Engineering', 'An earlier engineering project, preserved in the archive.'],
    ['mini-project', 'Mini Project', 'Mini_Project', 'Engineering', 'An early project from my public code archive.'],
    ['react-redux-template', 'React Redux Template', 'template-react-redux', 'JavaScript', 'A fork of the Hack.Diversity React / Express starter template.'],
    ['this-site', 'This website', 'bryanjaimes', 'Next.js', 'The home for my projects, experiments, and career work.'],
  ].map(([slug, title, repository, technology, description]) => ({
    slug, title, category: 'Archive', kind: repository === 'template-react-redux' ? 'Open-source fork' : 'Repository',
    subtitle: 'From the build archive.', visual: 'archive', description, tags: [technology],
    source: `https://github.com/Bryanjaimes/${repository}`,
    overview: description, problem: 'A part of my ongoing practice of learning by building.',
    approach: ['Browse the source for implementation details and project history.'],
    scope: 'An archive entry. Features and maintenance status are documented in the linked repository.',
    ...(repository === 'template-react-redux' ? { attribution: { name: 'Hack-Diversity/template-react-express-monorepo', url: 'https://github.com/Hack-Diversity/template-react-express-monorepo' } } : {}),
  })),
];

export const career = [
  { company: 'Liberty Mutual Insurance', role: 'Software Engineer', dates: 'July 2022 — Present', label: 'Financial systems & billing modernization', bullets: [
    '98% build success. 30% faster deployments.',
    'Approximately 25% faster incident recovery with Datadog.',
    'Approximately 30% fewer audit exceptions.',
  ], tags: ['Java', 'Spring Boot', 'AWS', 'Kafka', 'GitHub Actions'] },
  { company: 'BLDUP', role: 'Machine Learning Engineer Intern', dates: '2021', label: 'Machine learning for real estate data', bullets: [
    'BERT classification trained on 3M+ permits.',
    'FastAPI inference service with Redis caching.',
  ], tags: ['Python', 'PyTorch', 'BERT', 'FastAPI'] },
  { company: 'Boston University', role: 'B.S. Computer Engineering', dates: '2018 — 2022', label: 'Software, systems, and the foundations underneath', bullets: [
    'Cloud, cybersecurity, and embedded systems.',
    'React Native, IoT, and FPGA projects.',
  ], tags: ['React Native', 'C++', 'Verilog', 'FPGA'] },
];
