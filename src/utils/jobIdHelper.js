// Prefix Map for each role
export const ROLE_PREFIX_MAP = {
  python: 'ZTPYF',
  pyfullstack: 'ZTPYF',
  mern: 'ZTMERN',
  uiux: 'ZTUIUX',
  graphic: 'ZTGD',
  video: 'ZTVE',
  digital: 'ZTDM',
  seo: 'ZTSEO',
  java: 'ZTJV',
  datascience: 'ZTDS',
  dataanalytics: 'ZTDA',
};

// Returns the prefix for a given role (id or title)
export const getRolePrefix = (roleIdOrTitle) => {
  const text = (roleIdOrTitle || '').toLowerCase().trim();
  if (text.includes('python') || text.includes('pyfullstack') || text.includes('py')) return 'ZTPYF';
  if (text.includes('data science') || text.includes('datascience') || text.includes('ds')) return 'ZTDS';
  if (text.includes('data analytics') || text.includes('analytics')) return 'ZTDA';
  if (text.includes('mern') || text.includes('full stack')) return 'ZTMERN';
  if (text.includes('ui') || text.includes('ux')) return 'ZTUIUX';
  if (text.includes('graphic') || text.includes('design')) return 'ZTGD';
  if (text.includes('video') || text.includes('editor')) return 'ZTVE';
  if (text.includes('digital') || text.includes('marketing')) return 'ZTDM';
  if (text.includes('seo')) return 'ZTSEO';
  if (text.includes('java')) return 'ZTJV';

  // Fallback: ZT + first 4 uppercase characters
  const clean = text.replace(/[^a-z0-9]/g, '').toUpperCase();
  return 'ZT' + (clean.slice(0, 4) || 'JOB');
};

// Generates next Job ID (+1 format ZTPYF0001, ZTPYF0002, etc.) based on existing postings
export const generateNextJobId = (roleIdOrTitle, existingCareers = []) => {
  const prefix = getRolePrefix(roleIdOrTitle);
  const regex = new RegExp(`^${prefix}(\\d+)$`, 'i');

  let maxNum = 0;
  existingCareers.forEach((c) => {
    const checkIds = [c.jobId, c.id, c.firestoreId];
    checkIds.forEach((idVal) => {
      if (idVal && typeof idVal === 'string') {
        const match = idVal.match(regex);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxNum) maxNum = num;
        }
      }
    });
  });

  const nextNum = maxNum + 1;
  return `${prefix}${String(nextNum).padStart(4, '0')}`;
};

// Rich predefined details for every role
export const ROLE_PREDEFINED_DETAILS = {
  python: {
    category: 'Software Development',
    overview: 'Work on real-world software applications, RESTful APIs, database design, and automation scripts using Python, Django, Flask, and modern cloud deployment practices.',
    responsibilities: [
      'Write clean, efficient, and well-tested Python backend code',
      'Design, build, and maintain RESTful APIs using Django / Flask / FastAPI',
      'Optimize database queries and schema models using MySQL and MongoDB',
      'Collaborate with frontend developers to integrate client-side interfaces',
      'Debug, test, and maintain existing application codebases',
      'Participate in agile sprints, code reviews, and technical design discussions',
    ],
    skills: ['Python', 'Django / Flask', 'RESTful APIs', 'SQL / MongoDB', 'Git & GitHub', 'Problem Solving'],
    whatYouGet: [
      'Real-world Industry Project Experience',
      'Mentorship from Senior Software Engineers',
      'Official Internship Certificate & Merit-Based Stipend',
      'Direct Fast-Track Hiring Pathway',
    ],
  },
  mern: {
    category: 'Full Stack Development',
    overview: 'Build high-performance, scalable web applications using MongoDB, Express.js, React, and Node.js. Experience the complete product lifecycle from architectural design to cloud deployment.',
    responsibilities: [
      'Develop dynamic, responsive user interfaces using React.js and Tailwind CSS',
      'Build modular RESTful API microservices with Node.js and Express.js',
      'Design and manage database schemas using MongoDB and Mongoose ORM',
      'Implement secure user authentication, JWT protocols, and role-based access control',
      'Write reusable frontend components and optimize application bundle size',
      'Deploy full-stack web applications to Vercel, AWS, or Netlify',
    ],
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'REST APIs', 'Git'],
    whatYouGet: [
      'Full-Stack Live Application Portfolio',
      'Architecture & Code Quality Mentorship',
      'Internship Certificate & Performance-Based Stipend',
      'Placement & Referral Support',
    ],
  },
  uiux: {
    category: 'Product Design',
    overview: 'Create intuitive user experiences, interactive wireframes, and high-fidelity UI designs. Work alongside product managers and software engineers to build human-centered digital products.',
    responsibilities: [
      'Conduct user research, persona creation, and user journey mapping',
      'Design wireframes, user flows, and interactive prototypes in Figma',
      'Build scalable design systems, typography standards, and UI component libraries',
      'Perform usability testing and iterate designs based on user feedback and analytics',
      'Prepare developer hand-off specs for seamless frontend implementation',
      'Maintain visual and brand consistency across web and mobile platforms',
    ],
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
    whatYouGet: [
      'Published Live Product Design Portfolio',
      '1-on-1 Mentorship from Lead UX Designers',
      'Official Internship Certificate',
      'Professional Recommendation Letter',
    ],
  },
  graphic: {
    category: 'Visual & Brand Design',
    overview: 'Craft compelling visual content, brand identities, ad creatives, and digital marketing graphics that elevate brand presence across all digital and print platforms.',
    responsibilities: [
      'Design social media graphics, ad banners, and promotional campaign assets',
      'Develop logo concepts, typography palettes, and brand identity guidelines',
      'Create high-resolution vector illustrations and marketing collateral',
      'Collaborate with marketing teams to brainstorm creative visual concepts',
      'Prepare print-ready and web-optimized artwork files',
      'Manage and organize creative asset repositories',
    ],
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'InDesign', 'Canva', 'Typography', 'Branding & Layout'],
    whatYouGet: [
      'High-Impact Creative Campaign Portfolio',
      'Creative Direction & Art Guidance',
      'Official Internship Certificate',
      'Performance Rewards & Stipend',
    ],
  },
  video: {
    category: 'Media Production',
    overview: 'Produce and edit engaging video content, motion graphics, and visual effects for social media reels, promotional campaigns, YouTube, and corporate branding.',
    responsibilities: [
      'Edit raw video footage into polished, high-converting video content',
      'Create custom motion graphics, title animations, and lower thirds',
      'Perform professional color grading, sound design, and audio cleaning',
      'Format and optimize short-form video content for Instagram Reels & Shorts',
      'Assist in visual storytelling, script pacing, and storyboard execution',
      'Organize media assets and maintain project renders',
    ],
    skills: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics', 'Sound Design', 'Color Grading'],
    whatYouGet: [
      'Professional Video Editing Showreel',
      'Hands-On Commercial Production Experience',
      'Official Internship Certificate',
      'Performance-Based Stipend',
    ],
  },
  digital: {
    category: 'Digital Marketing & Growth',
    overview: 'Execute performance marketing campaigns, social media growth strategies, and content initiatives to drive traffic, leads, and brand engagement.',
    responsibilities: [
      'Manage content calendars and publish posts across Instagram, LinkedIn, and YouTube',
      'Assist in planning, setting up, and optimizing Meta Ads and Google Ads campaigns',
      'Write persuasive ad copy, social post captions, and promotional newsletters',
      'Track and analyze campaign KPIs using Google Analytics and Meta Business Suite',
      'Research industry trends, audience demographics, and competitor marketing tactics',
      'Engage with online communities and manage follower interactions',
    ],
    skills: ['Social Media Marketing', 'Meta Ads', 'Google Analytics', 'Content Writing', 'Email Marketing', 'Copywriting'],
    whatYouGet: [
      'Real Ad Campaign & Growth Analytics Experience',
      'Growth Strategy Mentorship',
      'Official Internship Certificate',
      'Performance Rewards',
    ],
  },
  seo: {
    category: 'Search Engine Optimization',
    overview: 'Optimize web applications for organic search engines, conduct technical audits, and implement data-driven SEO strategies to boost search rankings and organic user acquisition.',
    responsibilities: [
      'Perform technical, on-page, and off-page SEO audits for client web platforms',
      'Conduct comprehensive keyword research, search volume analysis, and competitor analysis',
      'Optimize page titles, meta descriptions, heading structures, and image alt tags',
      'Identify and fix crawl errors, broken links, and site speed bottlenecks',
      'Track keyword position rankings using Google Search Console, Ahrefs, or Semrush',
      'Collaborate with developers and content creators to publish SEO-friendly pages',
    ],
    skills: ['On-Page & Off-Page SEO', 'Keyword Research', 'Google Search Console', 'Google Analytics', 'Technical SEO', 'Content Optimization'],
    whatYouGet: [
      'Proven Organic Search Growth Case Study',
      'SEO Architect Mentorship',
      'Official Internship Certificate',
      'Stipend & Career Recommendation',
    ],
  },
  datascience: {
    category: 'Data Science & Machine Learning',
    overview: 'Extract valuable insights from complex data, build predictive machine learning models, and implement data science algorithms using Python and modern AI frameworks.',
    responsibilities: [
      'Preprocess, clean, and analyze structured and unstructured datasets',
      'Develop machine learning models for classification, regression, and clustering',
      'Create interactive data visualizations and exploratory data reports',
      'Deploy predictive ML endpoints using FastAPI or Flask web servers',
      'Evaluate model accuracy, tuning hyperparameters and optimizing performance',
      'Present analytical insights to cross-functional teams',
    ],
    skills: ['Python', 'Pandas & NumPy', 'Scikit-Learn', 'SQL', 'Machine Learning', 'Data Visualization'],
    whatYouGet: [
      'Production ML Model Portfolio',
      'Data Science Lead Mentorship',
      'Official Internship Certificate',
      'Placement Support',
    ],
  },
  dataanalytics: {
    category: 'Business Intelligence & Data Analytics',
    overview: 'Transform raw enterprise data into actionable business intelligence using SQL, Python, and interactive dashboard tools like Power BI and Tableau.',
    responsibilities: [
      'Query relational databases using SQL to extract and transform business metrics',
      'Build automated, interactive dashboards in Power BI or Tableau',
      'Perform exploratory data analysis to identify operational trends and anomalies',
      'Clean and structure disparate data sources for reporting pipelines',
      'Communicate data-driven insights through clear visual storytelling',
      'Collaborate with business managers to define and track key performance metrics',
    ],
    skills: ['SQL', 'Power BI / Tableau', 'Python', 'Advanced Excel', 'Data Cleaning', 'Data Storytelling'],
    whatYouGet: [
      'Enterprise Business Intelligence Dashboard Portfolio',
      'Analytics Architect Guidance',
      'Official Internship Certificate',
      'Career Referral Pathway',
    ],
  },
  java: {
    category: 'Backend Software Engineering',
    overview: 'Build robust enterprise backend systems, microservices, and secure REST APIs using Java 17+, Spring Boot, and relational database architectures.',
    responsibilities: [
      'Develop backend services and REST APIs using Java and Spring Boot framework',
      'Design relational database schemas and write efficient SQL queries with Hibernate ORM',
      'Implement object-oriented design patterns, clean code principles, and JUnit tests',
      'Integrate Spring Security, JWT authentication, and API gateway services',
      'Debug, optimize, and maintain high-throughput backend applications',
      'Participate in agile development, sprint planning, and code reviews',
    ],
    skills: ['Java 17+', 'Spring Boot', 'Hibernate / JPA', 'MySQL / PostgreSQL', 'RESTful APIs', 'Git'],
    whatYouGet: [
      'Enterprise Java Backend System Portfolio',
      'Senior Java Engineer Mentorship',
      'Official Internship Certificate',
      'Performance-Based Stipend',
    ],
  },
};

export const getPredefinedDetailsForRole = (roleIdOrTitle) => {
  const text = (roleIdOrTitle || '').toLowerCase().trim();
  if (text.includes('python') || text.includes('pyfullstack') || text.includes('py')) return ROLE_PREDEFINED_DETAILS.python;
  if (text.includes('data science') || text.includes('datascience') || text.includes('ml')) return ROLE_PREDEFINED_DETAILS.datascience;
  if (text.includes('data analyst') || text.includes('analyst') || text.includes('data analytics') || text.includes('analytics') || text.includes('bi')) return ROLE_PREDEFINED_DETAILS.dataanalytics;
  if (text.includes('mern') || text.includes('full stack')) return ROLE_PREDEFINED_DETAILS.mern;
  if (text.includes('ui') || text.includes('ux') || text.includes('design system')) return ROLE_PREDEFINED_DETAILS.uiux;
  if (text.includes('graphic') || text.includes('branding')) return ROLE_PREDEFINED_DETAILS.graphic;
  if (text.includes('video') || text.includes('editor') || text.includes('media')) return ROLE_PREDEFINED_DETAILS.video;
  if (text.includes('digital') || text.includes('marketing')) return ROLE_PREDEFINED_DETAILS.digital;
  if (text.includes('seo')) return ROLE_PREDEFINED_DETAILS.seo;
  if (text.includes('java')) return ROLE_PREDEFINED_DETAILS.java;

  return ROLE_PREDEFINED_DETAILS.python;
};

export const computeJobTitle = (baseTitleOrRole, type = 'Internship') => {
  if (!baseTitleOrRole) return '';
  const cleanBase = baseTitleOrRole
    .replace(/\s+Intern$/i, '')
    .replace(/\s*\([^)]*\)$/g, '')
    .trim();

  if (type === 'Internship') {
    return `${cleanBase} Intern`;
  }
  if (type === 'Part-time') {
    return `${cleanBase} (Part-time)`;
  }
  if (type === 'Contract') {
    return `${cleanBase} (Contract)`;
  }
  return cleanBase;
};

// Default initial Job IDs for predefined seed roles
export const DEFAULT_SEED_CAREERS = [
  { id: 'python', jobId: 'ZTPYF0001', baseTitle: 'Python Full Stack', title: 'Python Full Stack Intern', type: 'Internship', experience: '3 – 6 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Onsite', status: 'Active', ...ROLE_PREDEFINED_DETAILS.python },
  { id: 'dataanalytics', jobId: 'ZTDA0001', baseTitle: 'Data Analyst', title: 'Data Analyst Intern', type: 'Internship', experience: '3 – 6 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Hybrid', status: 'Active', ...ROLE_PREDEFINED_DETAILS.dataanalytics },
  { id: 'mern', jobId: 'ZTMERN0001', baseTitle: 'Mern Stack', title: 'Mern Stack Intern', type: 'Internship', experience: '3 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Hybrid', status: 'Active', ...ROLE_PREDEFINED_DETAILS.mern },
  { id: 'uiux', jobId: 'ZTUIUX0001', baseTitle: 'UI / UX', title: 'UI / UX Intern', type: 'Internship', experience: '3 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Remote', status: 'Active', ...ROLE_PREDEFINED_DETAILS.uiux },
  { id: 'graphic', jobId: 'ZTGD0001', baseTitle: 'Graphic Design', title: 'Graphic Design Intern', type: 'Internship', experience: '3 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Remote', status: 'Active', ...ROLE_PREDEFINED_DETAILS.graphic },
  { id: 'video', jobId: 'ZTVE0001', baseTitle: 'Video Editor', title: 'Video Editor Intern', type: 'Internship', experience: '3 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Remote', status: 'Active', ...ROLE_PREDEFINED_DETAILS.video },
  { id: 'digital', jobId: 'ZTDM0001', baseTitle: 'Digital Marketing', title: 'Digital Marketing Intern', type: 'Internship', experience: '3 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Hybrid', status: 'Active', ...ROLE_PREDEFINED_DETAILS.digital },
  { id: 'seo', jobId: 'ZTSEO0001', baseTitle: 'SEO Analyst', title: 'SEO Analyst Intern', type: 'Internship', experience: '3 Months', location: 'Nagercoil, Tamil Nadu', mode: 'Remote', status: 'Active', ...ROLE_PREDEFINED_DETAILS.seo },
];

// Helper to ensure every career item has a valid Job ID & rich details
export const ensureCareerJobIds = (careersList = []) => {
  if (!careersList || careersList.length === 0) {
    return [];
  }

  const assigned = [];
  careersList.forEach((item) => {
    const details = getPredefinedDetailsForRole(item.id || item.title || item.jobId);

    const hasSpecificResp = item.responsibilities && item.responsibilities.length > 0 && !item.responsibilities[0].includes('Contribute to real-world');
    const hasSpecificSkills = item.skills && item.skills.length > 0 && !item.skills[0].includes('Relevant domain skills');
    const hasSpecificGet = item.whatYouGet && item.whatYouGet.length > 0 && !item.whatYouGet[0].includes('Hands-on real-world');

    const formattedItem = {
      ...item,
      mode: item.mode || details.mode || 'Onsite',
      category: item.category || details.category,
      overview: item.overview || item.description || details.overview,
      responsibilities: hasSpecificResp ? item.responsibilities : details.responsibilities,
      skills: hasSpecificSkills ? item.skills : details.skills,
      whatYouGet: hasSpecificGet ? item.whatYouGet : details.whatYouGet,
    };

    if (!formattedItem.jobId) {
      formattedItem.jobId = generateNextJobId(item.id || item.title, assigned);
    }

    assigned.push(formattedItem);
  });

  return assigned;
};
