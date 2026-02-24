/**
 * Seed Script — Insert 50 courses into Supabase
 *
 * Usage:
 *   npx tsx scripts/seed-courses.ts <email> <password>
 *
 * Example:
 *   npx tsx scripts/seed-courses.ts user@example.com MyPass123
 */

import { createClient } from "@supabase/supabase-js";

// ─── Configuration ───────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.error("❌ Usage: npx tsx scripts/seed-courses.ts <email> <password>");
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "❌ Missing SUPABASE env vars. Make sure .env.local is loaded.",
  );
  process.exit(1);
}

// ─── Course Data ─────────────────────────────────────────────
const categories = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Database",
  "Blockchain",
  "Game Development",
];

const levels = ["Beginner", "Intermediate", "Advanced"] as const;

const courses = [
  // Web Development (10)
  {
    title: "Complete React 19 Masterclass",
    description:
      "Deep dive into React 19 with Server Components, Actions, and the new compiler. Build production-ready applications from scratch.",
    instructor: "Sarah Chen",
    duration: "42 hours",
    level: "Advanced",
    category: "Web Development",
    price: 89.99,
  },
  {
    title: "Next.js 16 Full-Stack Bootcamp",
    description:
      "Build modern full-stack applications with Next.js 16, covering App Router, Server Actions, middleware, and deployment strategies.",
    instructor: "James Wilson",
    duration: "38 hours",
    level: "Intermediate",
    category: "Web Development",
    price: 79.99,
  },
  {
    title: "HTML & CSS for Beginners",
    description:
      "Start your web development journey. Learn semantic HTML5, modern CSS3, Flexbox, Grid, and responsive design principles.",
    instructor: "Emily Rodriguez",
    duration: "18 hours",
    level: "Beginner",
    category: "Web Development",
    price: 29.99,
  },
  {
    title: "TypeScript Pro Patterns",
    description:
      "Master advanced TypeScript patterns including generics, conditional types, mapped types, and template literal types for enterprise apps.",
    instructor: "Alex Kumar",
    duration: "24 hours",
    level: "Advanced",
    category: "Web Development",
    price: 69.99,
  },
  {
    title: "Vue.js 3 Composition API",
    description:
      "Learn the Vue.js 3 Composition API, Pinia state management, Vue Router, and building scalable single-page applications.",
    instructor: "Marie Dupont",
    duration: "28 hours",
    level: "Intermediate",
    category: "Web Development",
    price: 59.99,
  },
  {
    title: "Svelte & SvelteKit Complete Guide",
    description:
      "Build blazing fast web apps with Svelte and SvelteKit. Covers reactivity, stores, SSR, and progressive enhancement.",
    instructor: "Lars Andersen",
    duration: "22 hours",
    level: "Intermediate",
    category: "Web Development",
    price: 54.99,
  },
  {
    title: "JavaScript Fundamentals A-Z",
    description:
      "Comprehensive JavaScript course covering ES6+, closures, prototypes, async/await, modules, and modern best practices.",
    instructor: "David Park",
    duration: "32 hours",
    level: "Beginner",
    category: "Web Development",
    price: 39.99,
  },
  {
    title: "Tailwind CSS Mastery",
    description:
      "Design stunning interfaces with Tailwind CSS. Custom themes, plugins, component patterns, and responsive design techniques.",
    instructor: "Nina Patel",
    duration: "14 hours",
    level: "Beginner",
    category: "Web Development",
    price: 34.99,
  },
  {
    title: "Node.js Backend Architecture",
    description:
      "Build scalable Node.js backends with Express, authentication, REST APIs, WebSockets, and microservices architecture.",
    instructor: "Michael Brown",
    duration: "36 hours",
    level: "Advanced",
    category: "Web Development",
    price: 84.99,
  },
  {
    title: "GraphQL API Development",
    description:
      "Design and build GraphQL APIs with Apollo Server, schema design, resolvers, subscriptions, and federation for microservices.",
    instructor: "Priya Sharma",
    duration: "20 hours",
    level: "Intermediate",
    category: "Web Development",
    price: 64.99,
  },

  // Mobile Development (5)
  {
    title: "React Native Cross-Platform Apps",
    description:
      "Build iOS and Android apps with React Native. Covers navigation, native modules, animations, and App Store deployment.",
    instructor: "Carlos Mendez",
    duration: "34 hours",
    level: "Intermediate",
    category: "Mobile Development",
    price: 74.99,
  },
  {
    title: "Flutter & Dart Complete Course",
    description:
      "Create beautiful mobile apps with Flutter. Material Design, state management with Riverpod, Firebase integration.",
    instructor: "Aisha Khan",
    duration: "40 hours",
    level: "Beginner",
    category: "Mobile Development",
    price: 69.99,
  },
  {
    title: "iOS Development with SwiftUI",
    description:
      "Master SwiftUI for iOS 18. Build modern iOS apps with declarative UI, Combine, Core Data, and App Clips.",
    instructor: "John Mitchell",
    duration: "30 hours",
    level: "Intermediate",
    category: "Mobile Development",
    price: 79.99,
  },
  {
    title: "Kotlin Android Development",
    description:
      "Build Android apps with Kotlin, Jetpack Compose, MVVM architecture, Room database, and Material You design.",
    instructor: "Yuki Tanaka",
    duration: "28 hours",
    level: "Intermediate",
    category: "Mobile Development",
    price: 64.99,
  },
  {
    title: "Progressive Web Apps (PWA)",
    description:
      "Transform web apps into installable PWAs with service workers, offline support, push notifications, and Web APIs.",
    instructor: "Sophie Laurent",
    duration: "16 hours",
    level: "Advanced",
    category: "Mobile Development",
    price: 49.99,
  },

  // Data Science (5)
  {
    title: "Python for Data Science",
    description:
      "Learn data analysis with Python, NumPy, Pandas, and Matplotlib. Statistical methods, data cleaning, and visualization.",
    instructor: "Dr. Rachel Green",
    duration: "36 hours",
    level: "Beginner",
    category: "Data Science",
    price: 59.99,
  },
  {
    title: "Advanced Data Visualization",
    description:
      "Create compelling data stories with D3.js, Plotly, and Tableau. Interactive dashboards and presentation techniques.",
    instructor: "Tom Anderson",
    duration: "20 hours",
    level: "Advanced",
    category: "Data Science",
    price: 74.99,
  },
  {
    title: "Statistics & Probability Essentials",
    description:
      "Master statistical foundations: hypothesis testing, regression analysis, Bayesian methods, and experimental design.",
    instructor: "Dr. Lisa Wang",
    duration: "24 hours",
    level: "Intermediate",
    category: "Data Science",
    price: 49.99,
  },
  {
    title: "SQL for Data Analysis",
    description:
      "Advanced SQL techniques for data analysis: window functions, CTEs, pivots, performance optimization, and reporting.",
    instructor: "Robert Kim",
    duration: "18 hours",
    level: "Beginner",
    category: "Data Science",
    price: 39.99,
  },
  {
    title: "Big Data with Apache Spark",
    description:
      "Process massive datasets with Apache Spark. RDDs, DataFrames, Spark SQL, MLlib, and streaming data pipelines.",
    instructor: "Dr. Marco Rossi",
    duration: "26 hours",
    level: "Advanced",
    category: "Data Science",
    price: 89.99,
  },

  // Machine Learning (5)
  {
    title: "Machine Learning Fundamentals",
    description:
      "Supervised & unsupervised learning, neural networks, decision trees, SVMs, and model evaluation with scikit-learn.",
    instructor: "Dr. Andrew Foster",
    duration: "40 hours",
    level: "Intermediate",
    category: "Machine Learning",
    price: 89.99,
  },
  {
    title: "Deep Learning with PyTorch",
    description:
      "Build deep neural networks with PyTorch. CNNs, RNNs, transformers, GANs, and transfer learning for real-world projects.",
    instructor: "Dr. Wei Zhang",
    duration: "35 hours",
    level: "Advanced",
    category: "Machine Learning",
    price: 99.99,
  },
  {
    title: "Natural Language Processing",
    description:
      "NLP techniques from tokenization to transformers. Sentiment analysis, text generation, chatbots, and BERT fine-tuning.",
    instructor: "Dr. Maria Santos",
    duration: "28 hours",
    level: "Advanced",
    category: "Machine Learning",
    price: 84.99,
  },
  {
    title: "Computer Vision with OpenCV",
    description:
      "Image processing, object detection, face recognition, and video analysis using OpenCV and deep learning models.",
    instructor: "Dr. Pavel Ivanov",
    duration: "22 hours",
    level: "Intermediate",
    category: "Machine Learning",
    price: 69.99,
  },
  {
    title: "AI & Prompt Engineering",
    description:
      "Master large language models, prompt engineering techniques, RAG systems, fine-tuning, and building AI-powered applications.",
    instructor: "Samantha Lee",
    duration: "16 hours",
    level: "Beginner",
    category: "Machine Learning",
    price: 54.99,
  },

  // Cloud Computing (5)
  {
    title: "AWS Solutions Architect",
    description:
      "Prepare for AWS certification. EC2, S3, VPC, Lambda, RDS, CloudFormation, and architecting resilient systems.",
    instructor: "Chris Taylor",
    duration: "45 hours",
    level: "Advanced",
    category: "Cloud Computing",
    price: 99.99,
  },
  {
    title: "Google Cloud Platform Essentials",
    description:
      "Master GCP services: Compute Engine, Cloud Functions, BigQuery, Kubernetes Engine, and Cloud Run.",
    instructor: "Diana Garcia",
    duration: "30 hours",
    level: "Intermediate",
    category: "Cloud Computing",
    price: 74.99,
  },
  {
    title: "Azure DevOps & Cloud Services",
    description:
      "Microsoft Azure fundamentals: VMs, App Services, Azure Functions, Cosmos DB, and CI/CD with Azure DevOps.",
    instructor: "Henrik Bergman",
    duration: "32 hours",
    level: "Intermediate",
    category: "Cloud Computing",
    price: 79.99,
  },
  {
    title: "Serverless Architecture",
    description:
      "Build cost-effective serverless apps. AWS Lambda, API Gateway, DynamoDB, event-driven patterns, and monitoring.",
    instructor: "Fatima Al-Rashid",
    duration: "18 hours",
    level: "Advanced",
    category: "Cloud Computing",
    price: 64.99,
  },
  {
    title: "Cloud Security Fundamentals",
    description:
      "Secure cloud infrastructure: IAM, encryption, compliance, vulnerability management, and zero-trust architecture.",
    instructor: "Brian O'Connor",
    duration: "20 hours",
    level: "Intermediate",
    category: "Cloud Computing",
    price: 59.99,
  },

  // DevOps (5)
  {
    title: "Docker & Kubernetes Mastery",
    description:
      "Containerize applications with Docker and orchestrate with Kubernetes. Helm, service mesh, and production deployment.",
    instructor: "Viktor Petrov",
    duration: "36 hours",
    level: "Advanced",
    category: "DevOps",
    price: 84.99,
  },
  {
    title: "CI/CD Pipeline Engineering",
    description:
      "Build robust CI/CD pipelines with GitHub Actions, Jenkins, GitLab CI. Automated testing, deployments, and monitoring.",
    instructor: "Rebecca Torres",
    duration: "22 hours",
    level: "Intermediate",
    category: "DevOps",
    price: 64.99,
  },
  {
    title: "Infrastructure as Code with Terraform",
    description:
      "Manage cloud infrastructure declaratively with Terraform. Modules, state management, and multi-cloud provisioning.",
    instructor: "Ahmed Hassan",
    duration: "20 hours",
    level: "Intermediate",
    category: "DevOps",
    price: 59.99,
  },
  {
    title: "Linux System Administration",
    description:
      "Master Linux for DevOps: shell scripting, process management, networking, security hardening, and automation.",
    instructor: "Olga Novak",
    duration: "28 hours",
    level: "Beginner",
    category: "DevOps",
    price: 44.99,
  },
  {
    title: "Monitoring & Observability",
    description:
      "Implement observability with Prometheus, Grafana, ELK Stack, distributed tracing, and incident response workflows.",
    instructor: "Daniel Wright",
    duration: "18 hours",
    level: "Advanced",
    category: "DevOps",
    price: 69.99,
  },

  // Cybersecurity (4)
  {
    title: "Ethical Hacking & Penetration Testing",
    description:
      "Learn offensive security: reconnaissance, vulnerability scanning, exploitation, post-exploitation, and reporting.",
    instructor: "Kevin Black",
    duration: "40 hours",
    level: "Advanced",
    category: "Cybersecurity",
    price: 94.99,
  },
  {
    title: "Network Security Essentials",
    description:
      "Secure networks with firewalls, IDS/IPS, VPNs, TLS/SSL, and wireless security. Hands-on labs included.",
    instructor: "Laura Chen",
    duration: "24 hours",
    level: "Intermediate",
    category: "Cybersecurity",
    price: 59.99,
  },
  {
    title: "Web Application Security",
    description:
      "OWASP Top 10, XSS, SQL injection, CSRF prevention, secure coding practices, and security testing automation.",
    instructor: "Raj Patel",
    duration: "20 hours",
    level: "Intermediate",
    category: "Cybersecurity",
    price: 54.99,
  },
  {
    title: "Cybersecurity for Beginners",
    description:
      "Introduction to cybersecurity concepts, threat landscape, cryptography basics, and building a security mindset.",
    instructor: "Emma Wilson",
    duration: "14 hours",
    level: "Beginner",
    category: "Cybersecurity",
    price: 34.99,
  },

  // UI/UX Design (4)
  {
    title: "UI/UX Design with Figma",
    description:
      "Design beautiful interfaces in Figma. Component libraries, auto-layout, prototyping, design tokens, and handoff.",
    instructor: "Isabella Martinez",
    duration: "26 hours",
    level: "Beginner",
    category: "UI/UX Design",
    price: 49.99,
  },
  {
    title: "Design Systems at Scale",
    description:
      "Build and maintain enterprise design systems. Atomic design, documentation, versioning, and cross-team collaboration.",
    instructor: "Oliver Schmidt",
    duration: "18 hours",
    level: "Advanced",
    category: "UI/UX Design",
    price: 74.99,
  },
  {
    title: "User Research & Testing",
    description:
      "Conduct effective user research: interviews, usability testing, A/B testing, analytics, and actionable insights.",
    instructor: "Grace Kim",
    duration: "16 hours",
    level: "Intermediate",
    category: "UI/UX Design",
    price: 44.99,
  },
  {
    title: "Mobile UX Design Patterns",
    description:
      "Design intuitive mobile experiences. Touch patterns, navigation, micro-interactions, accessibility, and platform conventions.",
    instructor: "Lucas Silva",
    duration: "14 hours",
    level: "Intermediate",
    category: "UI/UX Design",
    price: 39.99,
  },

  // Database (4)
  {
    title: "PostgreSQL Performance Tuning",
    description:
      "Optimize PostgreSQL: query planning, indexing strategies, partitioning, connection pooling, and monitoring production databases.",
    instructor: "Dr. Hans Mueller",
    duration: "22 hours",
    level: "Advanced",
    category: "Database",
    price: 79.99,
  },
  {
    title: "MongoDB Complete Developer Guide",
    description:
      "NoSQL with MongoDB: aggregation pipeline, indexing, replication, sharding, transactions, and Atlas cloud deployment.",
    instructor: "Chen Wei",
    duration: "28 hours",
    level: "Intermediate",
    category: "Database",
    price: 64.99,
  },
  {
    title: "Redis for High-Performance Apps",
    description:
      "In-memory data structures, caching strategies, pub/sub, streams, Lua scripting, and Redis cluster architecture.",
    instructor: "Anna Kowalski",
    duration: "14 hours",
    level: "Intermediate",
    category: "Database",
    price: 49.99,
  },
  {
    title: "Database Design & Modeling",
    description:
      "Relational database design: normalization, ER diagrams, schema evolution, data migration strategies, and best practices.",
    instructor: "Dr. Yusuf Ahmed",
    duration: "20 hours",
    level: "Beginner",
    category: "Database",
    price: 44.99,
  },

  // Blockchain (2)
  {
    title: "Solidity & Smart Contracts",
    description:
      "Write Ethereum smart contracts with Solidity. DeFi protocols, NFTs, security auditing, and deploying to mainnet.",
    instructor: "Max Keller",
    duration: "30 hours",
    level: "Advanced",
    category: "Blockchain",
    price: 89.99,
  },
  {
    title: "Blockchain Fundamentals",
    description:
      "Understand blockchain technology: consensus mechanisms, cryptographic hashing, distributed ledgers, and real-world use cases.",
    instructor: "Tanya Reeves",
    duration: "16 hours",
    level: "Beginner",
    category: "Blockchain",
    price: 39.99,
  },

  // Game Development (1)
  {
    title: "Unity Game Development",
    description:
      "Build 2D and 3D games with Unity and C#. Physics, animation, AI, multiplayer networking, and publishing to stores.",
    instructor: "Jake Morrison",
    duration: "44 hours",
    level: "Intermediate",
    category: "Game Development",
    price: 74.99,
  },
];

// ─── Seed Function ───────────────────────────────────────────
async function seed() {
  console.log("🌱 CourseHub Seeder");
  console.log("━".repeat(50));

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 1. Sign in
  console.log(`\n🔐 Signing in as ${email}...`);
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError || !authData.user) {
    console.error("❌ Authentication failed:", authError?.message);
    process.exit(1);
  }

  const userId = authData.user.id;
  console.log(`✅ Authenticated as ${authData.user.email} (${userId})`);

  // 2. Check existing courses
  const { count: existingCount } = await supabase
    .from("courses")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  console.log(`📊 Existing courses: ${existingCount ?? 0}`);

  // 3. Insert courses in batches of 10
  console.log(`\n📦 Inserting ${courses.length} courses...\n`);

  let inserted = 0;
  let failed = 0;
  const batchSize = 10;

  for (let i = 0; i < courses.length; i += batchSize) {
    const batch = courses.slice(i, i + batchSize).map((course) => ({
      ...course,
      user_id: userId,
      image_url: "",
    }));

    const { error } = await supabase.from("courses").insert(batch);

    if (error) {
      console.error(
        `  ❌ Batch ${Math.floor(i / batchSize) + 1} failed:`,
        error.message,
      );
      failed += batch.length;
    } else {
      inserted += batch.length;
      console.log(
        `  ✅ Batch ${Math.floor(i / batchSize) + 1}: Inserted ${batch.length} courses (${inserted}/${courses.length})`,
      );
    }
  }

  // 4. Summary
  console.log("\n" + "━".repeat(50));
  console.log(`🎉 Seeding complete!`);
  console.log(`   ✅ Inserted: ${inserted}`);
  if (failed > 0) console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📊 Total courses: ${(existingCount ?? 0) + inserted}`);
  console.log("━".repeat(50));

  await supabase.auth.signOut();
  process.exit(0);
}

seed().catch((err) => {
  console.error("💥 Unexpected error:", err);
  process.exit(1);
});
