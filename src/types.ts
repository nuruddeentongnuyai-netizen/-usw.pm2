export type TabId = 'poster' | 'home' | 'dashboard' | 'alerts' | 'reports' | 'knowledge';

export interface WaterState {
  pH: number;
  turbidity: number; // NTU
  temperature: number; // °C
  odorIndex: number; // 0 - 100 %
  treatedPh: number;
  treatedTurbidity: number;
  treatedOdorIndex: number;
  status: 'idle' | 'pumping' | 'filtering' | 'neutralizing' | 'uv_sterilizing' | 'completed' | 'paused';
  progress: number;
}

export interface WaterPreset {
  id: string;
  name: string;
  pH: number;
  turbidity: number;
  temperature: number;
  odorIndex: number;
  icon: string;
  description: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'warn' | 'success';
}

export interface ThresholdConfig {
  minPh: number;
  maxPh: number;
  maxTurbidity: number;
  maxOdor: number;
}
