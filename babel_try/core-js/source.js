const students = [
  { name: "Tom", grade: "A", subject: "Math" },
  { name: "Jerry", grade: "B", subject: "Math" },
  { name: "Spike", grade: "A", subject: "Science" },
  { name: "Heisenberg", grade: "A", subject: "Math" },
];
Object.groupBy(students, s => `${s.grade}-${s.subject}`);