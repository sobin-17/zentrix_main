// Prefix Map for each course category / title
export const COURSE_PREFIX_MAP = {
  fullstack: 'ZTFS',
  full: 'ZTFS',
  stack: 'ZTFS',
  uiux: 'ZTUIUX',
  design: 'ZTUIUX',
  datascience: 'ZTDS',
  dataanalytics: 'ZTDA',
  ai: 'ZTAI',
  marketing: 'ZTDM',
  digitalmarketing: 'ZTDM',
};

// Returns prefix for a given course
export const getCoursePrefix = (titleOrCategory) => {
  const text = (titleOrCategory || '').toLowerCase().trim();
  if (text.includes('full stack') || text.includes('fullstack') || text.includes('full')) return 'ZTFS';
  if (text.includes('ui') || text.includes('ux') || text.includes('design')) return 'ZTUIUX';
  if (text.includes('data analytics') || text.includes('analytics')) return 'ZTDA';
  if (text.includes('data science') || text.includes('datascience') || text.includes('ml')) return 'ZTDS';
  if (text.includes('ai') || text.includes('artificial')) return 'ZTAI';
  if (text.includes('marketing') || text.includes('digital')) return 'ZTDM';

  // Fallback: ZT + first 4 uppercase characters
  const clean = text.replace(/[^a-z0-9]/g, '').toUpperCase();
  return 'ZT' + (clean.slice(0, 4) || 'CRS');
};

// Generates next Course ID (+1 format ZTFS0001, ZTFS0002, etc.) based on existing courses
export const generateNextCourseId = (titleOrCategory, existingCourses = []) => {
  const prefix = getCoursePrefix(titleOrCategory);
  const regex = new RegExp(`^${prefix}(\\d+)$`, 'i');

  let maxNum = 0;
  existingCourses.forEach((c) => {
    const checkIds = [c.courseId, c.id, c.firestoreId];
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

// Default seed courses with assigned Course IDs
export const DEFAULT_SEED_COURSES = [
  { id: 'full-stack', courseId: 'ZTFS0001', title: 'Full Stack Development', category: 'Development', duration: '6 Months', level: 'Intermediate', mode: 'Hybrid', price: 1999, students: 280, status: 'Published', image: '/mern_stack.jpeg', description: 'Master complete frontend and backend software development, database architecture, APIs, and cloud deployment.', skills: ['React', 'Node.js', 'Python', 'MongoDB', 'SQL', 'Express'], internship: true, placement: true },
  { id: 'ui-ux', courseId: 'ZTUIUX0001', title: 'UI / UX Design', category: 'Design', duration: '3 Months', level: 'Beginner', mode: 'Remote', price: 999, students: 165, status: 'Published', image: '/ui_ux.jpeg', description: 'Design intuitive, engaging, and modern digital product experiences from research to interactive prototyping.', skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping'], internship: false, placement: true },
  { id: 'data-analytics', courseId: 'ZTDA0001', title: 'Data Analytics', category: 'Data Science', duration: '6 Months', level: 'Beginner – Intermediate', mode: 'Remote', price: 1299, students: 190, status: 'Published', image: '/data.jpeg', description: 'Transform raw data into meaningful business insights through statistical analysis and dynamic dashboards.', skills: ['Python', 'SQL', 'Pandas', 'Power BI', 'Excel', 'Tableau'], internship: true, placement: true },
  { id: 'data-science-ml', courseId: 'ZTDS0001', title: 'Data Science & Machine Learning', category: 'Data Science', duration: '6 Months', level: 'Advanced', mode: 'Hybrid', price: 1999, students: 145, status: 'Published', image: '/data science.jpeg', description: 'Harness predictive data modeling, statistical algorithms, and machine learning to build intelligent data solutions.', skills: ['Python', 'Scikit-Learn', 'TensorFlow', 'NLP', 'Data Mining'], internship: true, placement: true },
  { id: 'ZTAI0001', courseId: 'ZTAI0001', title: 'Artificial Intelligence', category: 'AI', duration: '4 Months', level: 'Advanced', mode: 'Onsite', price: 2499, students: 120, status: 'Published', image: '/ai.jpeg', description: 'Explore neural networks, computer vision, generative AI, and Large Language Models to create adaptive AI systems.', skills: ['TensorFlow', 'PyTorch', 'OpenCV', 'LLMs', 'Prompt Engineering'], internship: true, placement: true },
  { id: 'digital-marketing', courseId: 'ZTDM0001', title: 'Digital Marketing', category: 'Marketing', duration: '3 Months', level: 'Beginner', mode: 'Hybrid', price: 999, students: 150, status: 'Published', image: '/marketing.jpeg', description: 'Master SEO, social media strategy, search engine marketing, performance ads, and digital brand growth.', skills: ['SEO', 'Google Ads', 'Meta Ads', 'Content Strategy', 'Analytics'], internship: true, placement: true },
];

// Helper to ensure every course item has a valid Course ID & mode
export const ensureCourseIds = (coursesList = []) => {
  if (!coursesList || coursesList.length === 0) {
    return [];
  }

  const assigned = [];
  coursesList.forEach((item) => {
    const formatted = {
      ...item,
      mode: item.mode || 'Hybrid',
    };
    if (!formatted.courseId) {
      formatted.courseId = generateNextCourseId(item.id || item.title, assigned);
    }
    assigned.push(formatted);
  });

  return assigned;
};
