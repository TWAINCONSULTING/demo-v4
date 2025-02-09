declare global {
  interface Window {
    chatbase: {
      (action: 'setConfig', config: any): void;
      (action: 'open'): void;
      (action: 'close'): void;
      (action: 'getState'): string;
      q?: any[];
    } & ((...args: any[]) => number)
  }
}

export {};