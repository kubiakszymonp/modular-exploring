/**
 * Serwis do zarządzania localStorage
 * Zapewnia bezpieczny dostęp do localStorage z obsługą błędów
 */

/**
 * Pobiera wartość z localStorage
 * @param key - Klucz w localStorage
 * @param defaultValue - Wartość domyślna jeśli klucz nie istnieje
 * @returns Wartość z localStorage lub wartość domyślna
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") {
    return defaultValue
  }

  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Pobiera wartość tekstową z localStorage (bez parsowania JSON)
 * @param key - Klucz w localStorage
 * @param defaultValue - Wartość domyślna jeśli klucz nie istnieje
 * @returns Wartość tekstowa z localStorage lub wartość domyślna
 */
export function getStorageString(key: string, defaultValue: string = ""): string {
  if (typeof window === "undefined") {
    return defaultValue
  }

  try {
    const item = localStorage.getItem(key)
    return item ?? defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Zapisuje wartość do localStorage
 * @param key - Klucz w localStorage
 * @param value - Wartość do zapisania (będzie zserializowana do JSON)
 */
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
  }
}

/**
 * Zapisuje wartość tekstową do localStorage (bez serializacji JSON)
 * @param key - Klucz w localStorage
 * @param value - Wartość tekstowa do zapisania
 */
export function setStorageString(key: string, value: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error)
  }
}

/**
 * Usuwa wartość z localStorage
 * @param key - Klucz do usunięcia
 */
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error)
  }
}

/**
 * Sprawdza czy klucz istnieje w localStorage
 * @param key - Klucz do sprawdzenia
 * @returns true jeśli klucz istnieje, false w przeciwnym razie
 */
export function hasStorageItem(key: string): boolean {
  if (typeof window === "undefined") {
    return false
  }

  try {
    return localStorage.getItem(key) !== null
  } catch (error) {
    console.error(`Error checking localStorage key "${key}":`, error)
    return false
  }
}

/**
 * Czyści cały localStorage
 */
export function clearStorage(): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.clear()
  } catch (error) {
    console.error("Error clearing localStorage:", error)
  }
}

