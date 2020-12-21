import { Injectable } from '@angular/core'

@Injectable()
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(data))
    } catch (err) {
      console.error('Error saving to localStorage', err)
    }
  }

  get(key: string): any {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
    } catch (err) {
      console.error('Error getting data from localStorage', err)
    }
    return null
  }
}
