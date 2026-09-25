export type TestSeverity = 'Critical' | 'Major' | 'Minor' | 'Cosmetic';
export type TestStatus = 'Passed' | 'Failed' | 'In Progress' | 'Blocked';
export type TestModule = 'ERP Sales Orders' | 'Challan & Invoicing' | 'Web App QA' | 'Data Reconciliation' | 'Security & RBAC';

export interface TestCase {
  id: string;
  module: TestModule;
  title: string;
  description: string;
  preconditions: string[];
  steps: string[];
  testData: Record<string, string | number>;
  expectedResult: string;
  actualResult: string;
  severity: TestSeverity;
  status: TestStatus;
  executionDate: string;
  testedBy: string;
  defectId?: string;
  tags: string[];
}

export interface BugReport {
  id: string;
  title: string;
  module: string;
  severity: TestSeverity;
  priority: 'High' | 'Medium' | 'Low';
  environment: string;
  stepsToReproduce: string[];
  expectedBehavior: string;
  actualBehavior: string;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Verified';
  reportedDate: string;
  detectedBy: string;
  assignedTo: string;
  notes?: string;
}

export interface ReconciliationItem {
  id: string;
  itemCode: string;
  description: string;
  hsnCode: string;
  challanQty: number;
  invoiceQty: number;
  unit: string;
  challanRate: number;
  invoiceRate: number;
  taxRatePercent: number;
  mismatchType?: 'Quantity Mismatch' | 'Rate Variance' | 'HSN Error' | 'Matched';
  notes?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  department: string;
  description: string;
  keyResponsibilities: string[];
  achievements: string[];
  toolsAndDomains: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  company: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  testingScope: string[];
  sampleBugsUncovered: string[];
  toolsUsed: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  focus: string;
  highlights: string[];
}
