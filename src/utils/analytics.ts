import { storage } from './storage'

interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp: number
}

class Analytics {
  private events: AnalyticsEvent[] = []
  private readonly maxEvents = 100
  private readonly storageKey = 'analytics_events'

  constructor() {
    this.loadEvents()
  }

  private loadEvents() {
    this.events = storage.get<AnalyticsEvent[]>(this.storageKey, [])
  }

  private saveEvents() {
    storage.set(this.storageKey, this.events)
  }

  track(name: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now()
    }

    this.events.push(event)

    // Keep only the latest events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents)
    }

    this.saveEvents()
    this.sendToServer(event)
  }

  private async sendToServer(event: AnalyticsEvent) {
    // Implementer sending til server her
    console.log('Analytics event:', event)
  }

  getEvents() {
    return [...this.events]
  }

  clearEvents() {
    this.events = []
    this.saveEvents()
  }
}

export const analytics = new Analytics()