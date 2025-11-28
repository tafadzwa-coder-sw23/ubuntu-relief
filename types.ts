export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  anonymous: boolean;
}

export interface Need {
  id: string;
  title: string;
  organization: string;
  location: string;
  category: 'Medical' | 'Food' | 'Logistics' | 'Education' | 'Hygiene';
  urgency: 'High' | 'Medium' | 'Low';
  description: string;
  raised: number;
  target: number;
  donations: Donation[];
  aiSummary?: string;
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export interface AIResponsePlan {
  strategyName: string;
  immediateActions: string[];
  requiredResources: string[];
  riskAssessment: string;
  estimatedBudgetUSD: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}