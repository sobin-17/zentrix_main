// Prefix Map for each course category / title
export const COURSE_PREFIX_MAP = {
  python: 'ZTPYF',
  pyfullstack: 'ZTPYF',
  mern: 'ZTMERN',
  java: 'ZTJV',
  uiux: 'ZTUIUX',
  design: 'ZTUIUX',
  datascience: 'ZTDS',
  dataanalytics: 'ZTDA',
  ai: 'ZTAI',
};

// Returns prefix for a given course
export const getCoursePrefix = (titleOrCategory) => {
  const text = (titleOrCategory || '').toLowerCase().trim();
  if (text.includes('python') || text.includes('pyfullstack') || text.includes('py')) return 'ZTPYF';
  if (text.includes('mern') || text.includes('full stack')) return 'ZTMERN';
  if (text.includes('java')) return 'ZTJV';
  if (text.includes('ui') || text.includes('ux') || text.includes('design')) return 'ZTUIUX';
  if (text.includes('data analytics') || text.includes('analytics')) return 'ZTDA';
  if (text.includes('data science') || text.includes('datascience') || text.includes('ml')) return 'ZTDS';
  if (text.includes('ai') || text.includes('artificial')) return 'ZTAI';

  // Fallback: ZT + first 4 uppercase characters
  const clean = text.replace(/[^a-z0-9]/g, '').toUpperCase();
  return 'ZT' + (clean.slice(0, 4) || 'CRS');
};

// Generates next Course ID (+1 format ZTMERN0001, ZTMERN0002, etc.) based on existing courses
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
  { id: 'mern-stack', courseId: 'ZTMERN0001', title: 'MERN Stack', category: 'Development', duration: '6 Months', level: 'Intermediate', price: 1999, students: 254, status: 'Published', image: '/mern_stack.jpeg', description: 'Build modern, scalable, and high-performance web applications using the MERN Stack.', skills: ['React', 'Node.js', 'MongoDB', 'Express.js'], internship: true, placement: true },
  { id: 'java-dev', courseId: 'ZTJV0001', title: 'Java Programming', category: 'Development', duration: '6 Months', level: 'Intermediate', price: 1499, students: 198, status: 'Published', image: '/java.jpeg', description: 'Create fast, scalable web applications using the Java ecosystem.', skills: ['Java', 'Spring Boot', 'Hibernate', 'MySQL'], internship: true, placement: true },
  { id: 'ui-ux', courseId: 'ZTUIUX0001', title: 'UI – UX Designing', category: 'Design', duration: '3 Months', level: 'Beginner', price: 999, students: 134, status: 'Published', image: '/ui_ux.jpeg', description: 'Design intuitive and engaging digital experiences.', skills: ['Figma', 'Adobe XD', 'Prototyping'], internship: false, placement: true },
  { id: 'python-fullstack', courseId: 'ZTPYF0001', title: 'Python Full Stack', category: 'Development', duration: '6 Months', level: 'Intermediate', price: 1999, students: 176, status: 'Published', image: '/python.jpeg', description: 'Design and develop modern web applications using Python full stack.', skills: ['Python', 'Django', 'Flask', 'React'], internship: true, placement: true },
  { id: 'data-analytics', courseId: 'ZTDA0001', title: 'Data Analytics', category: 'Data Science', duration: '6 Months', level: 'Beginner – Intermediate', price: 1299, students: 156, status: 'Published', image: '/data.jpeg', description: 'Transform raw data into meaningful insights.', skills: ['Python', 'SQL', 'Pandas', 'Power BI'], internship: true, placement: true },
  { id: 'data-science-ml', courseId: 'ZTDS0001', title: 'Data Science & ML', category: 'Data Science', duration: '3 Months', level: 'Advanced', price: 1999, students: 100, status: 'Draft', image: '/data science.jpeg', description: 'Harness data science and machine learning to build intelligent solutions.', skills: ['Scikit-Learn', 'TensorFlow', 'NLP'], internship: false, placement: true },
  { id: 'ZTAI0001', courseId: 'ZTAI0001', title: 'Artificial Intelligence', category: 'AI', duration: '4 Months', level: 'Advanced', price: 2499, students: 88, status: 'Published', image: '/ai.jpeg', description: 'Explore AI to create smart, adaptive solutions.', skills: ['TensorFlow', 'OpenCV', 'LLMs'], internship: false, placement: true },
];

// Helper to ensure every course item has a valid Course ID
export const ensureCourseIds = (coursesList = []) => {
  if (!coursesList || coursesList.length === 0) {
    return [];
  }

  const assigned = [];
  coursesList.forEach((item) => {
    if (item.courseId) {
      assigned.push({ ...item });
    } else {
      const generatedId = generateNextCourseId(item.id || item.title, assigned);
      assigned.push({ ...item, courseId: generatedId });
    }
  });

  return assigned;
};
