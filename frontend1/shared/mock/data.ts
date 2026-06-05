export const stats = {
  jobs: 24,
  candidates: 342,
  interviews: 18,
  offers: 6,
};

export const recentActivity = [
  { id: 1, text: "Alice applied to Product Designer", time: "2h" },
  { id: 2, text: "Interview scheduled: Bob - Backend", time: "1d" },
  { id: 3, text: "Offer sent to Clara", time: "3d" },
];

export const jobs = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: ["Frontend Engineer", "Backend Engineer", "Product Designer", "QA Engineer"][i % 4],
  department: ["Engineering", "Design", "Product"][i % 3],
  status: i % 3 === 0 ? "Closed" : "Open",
}));

export const candidates = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: ["Alex Johnson", "Bella Rose", "Carlos Diaz", "Dana Lee"][i % 4],
  email: `candidate${i + 1}@example.com`,
  experience: `${2 + (i % 6)} yrs`,
  status: ["Applied", "Screening", "Interview"][i % 3],
}));

export const pipeline = {
  Applied: candidates.slice(0, 5),
  Screening: candidates.slice(5, 8),
  Interview: candidates.slice(8, 10),
  Offer: candidates.slice(10, 11),
  Hired: [],
};

export const calendarEvents = [
  {
    id: 1,
    date: new Date().toDateString(),
    time: "10:00 AM",
    name: "Ananya Roy",
    role: "React Developer",
    tag: "Technical",
  },
  {
    id: 2,
    date: new Date().toDateString(),
    time: "11:30 AM",
    name: "Neha Sharma",
    role: "HR BP",
    tag: "HR round",
  },
  {
    id: 3,
    date: new Date().toDateString(),
    time: "2:00 PM",
    name: "Karan Patel",
    role: "Product Manager",
    tag: "Managerial",
  },
];
