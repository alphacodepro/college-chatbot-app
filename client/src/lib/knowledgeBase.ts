export interface MenuOption {
  id: string;
  label: string;
  description?: string;
  action?: string;
}

export interface Menu {
  title: string;
  parent?: string;
  options: MenuOption[];
}

export interface KnowledgeBase {
  [key: string]: Menu;
}

export const knowledgeBase: KnowledgeBase = {
  main: {
    title: 'Main Menu',
    options: [
      { id: 'admissions', label: '🎓 Admissions', description: 'Application process, eligibility, documents' },
      { id: 'academics', label: '📚 Academics', description: 'Courses, syllabus, faculty information' },
      { id: 'campus', label: '🎉 Campus Life', description: 'Clubs, events, hostel facilities' },
      { id: 'support', label: '🛠️ Support', description: 'Contact info, tech support, certificates' }
    ]
  },
  admissions: {
    title: 'Admissions Information',
    parent: 'main',
    options: [
      { id: 'eligibility', label: '📋 Eligibility Criteria', action: 'showEligibility' },
      { id: 'application', label: '📝 Application Process', action: 'showApplication' },
      { id: 'documents', label: '📄 Required Documents', action: 'showDocuments' },
      { id: 'fees', label: '💰 Fee Structure & Scholarships', action: 'showFees' }
    ]
  },
  academics: {
    title: 'Academic Information',
    parent: 'main',
    options: [
      { id: 'departments', label: '🏛️ Departments', action: 'showDepartments' },
      { id: 'syllabus', label: '📖 Syllabus & Courses', action: 'showSyllabus' },
      { id: 'faculty', label: '👨‍🏫 Faculty & Exams', action: 'showFaculty' }
    ]
  },
  campus: {
    title: 'Campus Life',
    parent: 'main',
    options: [
      { id: 'clubs', label: '🎭 Clubs & Activities', action: 'showClubs' },
      { id: 'hostel', label: '🏠 Hostel Facilities', action: 'showHostel' },
      { id: 'events', label: '🎪 Events & Festivals', action: 'showEvents' }
    ]
  },
  support: {
    title: 'Administration & Support',
    parent: 'main',
    options: [
      { id: 'contact', label: '📞 Contact Information', action: 'showContact' },
      { id: 'certificates', label: '📜 Certificates & Transcripts', action: 'showCertificates' },
      { id: 'tech', label: '💻 Technical Support', action: 'showTechSupport' }
    ]
  }
};

export const responses: Record<string, string> = {
  showEligibility: "📋 **Eligibility Criteria for Undergraduate Programs:**\n\n• Candidates must have passed 10+2 with at least 50% aggregate marks from a recognized board\n• Specific requirements may vary by course\n• Age limit: 17-25 years for most programs\n\nNeed more specific information about a particular course? Just ask! 😊",
  
  showApplication: "📝 **Online Application Process:**\n\n1. Visit our Online Admission Portal\n2. Register with your email & phone number\n3. Fill the application form completely\n4. Upload required documents (scan quality should be clear)\n5. Pay the application fee online\n6. Submit and take a printout for your records\n\n💡 **Pro tip:** Keep all documents ready before starting!",
  
  showDocuments: "📄 **Required Documents Checklist:**\n\n✅ Class 10 & 12 mark sheets (original + photocopy)\n✅ Transfer Certificate from previous institution\n✅ Character Certificate\n✅ ID proof (Aadhar Card/Passport)\n✅ Recent passport-size photographs (6 copies)\n✅ Caste certificate (if applicable)\n✅ Income certificate (for scholarships)\n\n📌 All documents should be attested by a Gazetted Officer.",
  
  showFees: "💰 **Fee Structure & Scholarships:**\n\n**Undergraduate Courses:** ₹50,000/year (approx.)\n**Postgraduate Courses:** ₹70,000/year (approx.)\n\n🎯 **Scholarship Opportunities:**\n• Merit-based scholarships (up to 50% fee waiver)\n• Need-based financial assistance\n• Government scholarships for eligible categories\n• Sports/Cultural achievement scholarships\n\n💳 Payment can be made online or through demand draft.",
  
  showDepartments: "🏛️ **Academic Departments:**\n\n🖥️ Computer Science & Engineering\n⚗️ Physics & Chemistry\n📖 English Literature\n💼 Economics & Business Studies\n🧬 Biotechnology\n🔬 Applied Sciences\n\nEach department offers undergraduate and postgraduate programs with excellent faculty and modern infrastructure! 🌟",
  
  showSyllabus: "📖 **B.Sc Computer Science Syllabus Highlights:**\n\n**Programming Languages:** C, Java, Python, JavaScript\n**Core Subjects:** Data Structures, Operating Systems, DBMS, Computer Networks\n**Emerging Tech:** Artificial Intelligence, Machine Learning, Web Development\n**Practical:** Lab sessions, projects, internships\n\nFor detailed syllabus of other courses, contact our academic office! 📧",
  
  showFaculty: "👨‍🏫 **Faculty & Examination Information:**\n\n🌟 **Faculty Profiles:** Available on our Faculty Directory page\n📅 **Exam Timetable:** Check Student Portal & Notice Board\n📊 **Assessment Pattern:** Continuous evaluation + Semester exams\n🏆 **Faculty Achievements:** Many PhD holders and industry experts\n\nOur faculty maintains excellent student-teacher ratios for personalized attention! 👩‍🎓",
  
  showClubs: "🎭 **Student Clubs & Activities (20+ Active Clubs):**\n\n💻 Coding Club - Programming competitions & hackathons\n🎵 Music & Dance Club - Cultural performances\n🎪 Drama Society - Theatre & storytelling\n🗣️ Debate & Quiz Club - Intellectual discussions\n🤖 Robotics Club - Tech innovations\n🌱 Environmental Club - Sustainability initiatives\n\nJoin any club that matches your interests! Every student is welcome 🎉",
  
  showHostel: "🏠 **Hostel Facilities:**\n\n🔐 **Security:** Separate secured hostels for boys and girls with 24/7 security\n💰 **Fees:** Starting from ₹40,000/year (including mess facility)\n🍲 **Mess:** Nutritious meals with diverse menu options\n🏃‍♂️ **Amenities:** Wi-Fi, study rooms, recreation areas, laundry\n📍 **Location:** Within campus premises for easy access\n\nHostel life builds lifelong friendships and independence! 🤝",
  
  showEvents: "🎪 **Annual Events & Festivals:**\n\n🎭 **\"Udaan\" Cultural Festival** - February\n   • Music, dance, drama competitions\n   • Celebrity performances & cultural nights\n\n🤖 **\"Innovision 2025\" Tech Festival** - November\n   • Technical competitions, workshops\n   • Industry expert talks, startup expo\n\n🏆 **Sports Meet** - December\n🎓 **Annual Day** - March\n\nThese events showcase student talents and create memorable experiences! ✨",
  
  showContact: "📞 **Contact Information:**\n\n🎓 **Admission Office:**\n   📧 Email: admissions@xyzcollege.edu\n   📱 Phone: +91-9876543210\n   🕒 Timing: 9 AM - 5 PM (Mon-Fri)\n\n🏛️ **Main Office:**\n   📧 info@xyzcollege.edu\n   📱 +91-9876543211\n\n📍 **Address:** XYZ College, Education City, Your City - 123456\n\nWe're always here to help! Don't hesitate to reach out 😊",
  
  showCertificates: "📜 **Certificates & Transcripts:**\n\n📋 **Application Process:**\n   • Apply via Student Portal OR visit admin office\n   • Fill certificate request form\n   • Pay prescribed fees\n\n⏰ **Processing Time:** 7 working days\n💰 **Fees:** ₹100 per certificate, ₹200 per transcript\n📮 **Delivery:** Collect in person or request postal delivery\n\n✅ All certificates are digitally verified and tamper-proof!",
  
  showTechSupport: "💻 **Technical Support:**\n\n🆘 **IT Helpdesk:**\n   📧 Email: support@xyzcollege.edu\n   📱 Phone: +91-9876543212\n   🕒 Available: 24/7 for critical issues\n\n🔧 **Services:**\n   • Student portal login issues\n   • Wi-Fi connectivity problems\n   • Email account setup\n   • Online exam technical support\n\nOur tech team ensures smooth digital experience for all students! 🚀"
};

// Keyword mapping for intelligent search
export const keywordMap: Record<string, string[]> = {
  // Admissions keywords
  showEligibility: ['eligibility', 'criteria', 'requirements', 'qualify', 'admission requirements', 'eligible', 'requirement', 'qualify for', 'can i apply', 'who can apply', 'minimum marks', 'percentage', 'aggregate'],
  showApplication: ['apply', 'application', 'how to apply', 'application process', 'online application', 'registration', 'register', 'admission portal', 'applying', 'submit application'],
  showDocuments: ['documents', 'document', 'papers', 'certificates', 'marksheet', 'mark sheet', 'transfer certificate', 'tc', 'id proof', 'aadhar', 'passport', 'photos', 'required documents', 'what documents'],
  showFees: ['fees', 'fee', 'cost', 'charges', 'expenses', 'tuition', 'scholarship', 'financial aid', 'fee structure', 'how much', 'price', 'payment', 'scholarships', 'waiver'],
  
  // Academics keywords  
  showDepartments: ['departments', 'department', 'courses', 'programs', 'subjects', 'branches', 'streams', 'computer science', 'physics', 'chemistry', 'english', 'economics', 'business', 'biotechnology'],
  showSyllabus: ['syllabus', 'curriculum', 'course content', 'subjects', 'what will i study', 'topics', 'programming languages', 'java', 'python', 'c++', 'data structures', 'algorithms'],
  showFaculty: ['faculty', 'teachers', 'professors', 'staff', 'exam', 'exams', 'examination', 'timetable', 'schedule', 'assessment', 'evaluation'],
  
  // Campus Life keywords
  showClubs: ['clubs', 'activities', 'extracurricular', 'coding club', 'music', 'dance', 'drama', 'debate', 'robotics', 'environmental', 'student activities', 'competitions'],
  showHostel: ['hostel', 'accommodation', 'housing', 'residence', 'stay', 'rooms', 'mess', 'food', 'boarding', 'facilities', 'security', 'boys hostel', 'girls hostel'],
  showEvents: ['events', 'festivals', 'fest', 'cultural', 'technical', 'udaan', 'innovision', 'celebrations', 'programs', 'competitions', 'sports meet'],
  
  // Support keywords
  showContact: ['contact', 'phone', 'email', 'address', 'location', 'admission office', 'reach', 'call', 'number', 'office hours', 'timing'],
  showCertificates: ['certificate', 'transcript', 'degree', 'diploma', 'documents', 'verification', 'attestation', 'provisional', 'original'],
  showTechSupport: ['technical support', 'tech support', 'it help', 'portal issue', 'login problem', 'password', 'wifi', 'internet', 'computer', 'system']
};

// Smart search function
export function searchKnowledgeBase(query: string): string | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Direct keyword matching
  for (const [responseKey, keywords] of Object.entries(keywordMap)) {
    for (const keyword of keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        return responseKey;
      }
    }
  }
  
  // Fuzzy matching for common variations
  const commonSynonyms: Record<string, string[]> = {
    'fees': ['fee', 'cost', 'price', 'money', 'charges', 'payment'],
    'apply': ['application', 'admission', 'join', 'enroll', 'register'],
    'hostel': ['accommodation', 'residence', 'rooms', 'housing', 'stay'],
    'courses': ['programs', 'subjects', 'degrees', 'streams', 'branches'],
    'contact': ['phone', 'email', 'reach', 'call', 'address']
  };
  
  for (const [mainWord, synonyms] of Object.entries(commonSynonyms)) {
    if (synonyms.some(syn => normalizedQuery.includes(syn))) {
      // Find the response key that contains this main word
      for (const [responseKey, keywords] of Object.entries(keywordMap)) {
        if (keywords.some(keyword => keyword.includes(mainWord))) {
          return responseKey;
        }
      }
    }
  }
  
  return null;
}

export const fallbackMessage = `I'm sorry, I didn't quite understand that. 🤔 Here are some things I can help you with:

🎓 Ask about admissions, eligibility, or application process
📚 Get information about courses and academic programs  
🎉 Learn about campus life, clubs, and events
🛠️ Find contact information and support services

Or you can browse through the menu options below! 👇`;
