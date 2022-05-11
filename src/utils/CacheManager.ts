class CacheManager {
  private readonly prefix = '@Taproom';

  private namespace(key: string) {
    return `${this.prefix}/${key}`;
  }

  set<T>(key: string, value: T) {
    try {
      const serializedData = JSON.stringify({ data: value });
      const queryKey = this.namespace(key);
      localStorage.setItem(queryKey, serializedData);
    } catch (error) {
      console.warn(
        `Failed to save ${key}: ${value}. LocalStorage is disabled or storage is full.`
      );
    }
  }

  get<T = string>(key: string) {
    const queryKey = this.namespace(key);
    const storedValue = localStorage.getItem(queryKey);
    if (!storedValue) return;

    try {
      const parsed: T = JSON.parse(storedValue);
      return { data: parsed };
    } catch (error) {
      return { data: storedValue }; // JSON.parse threw an exception, value is plain string.
    }
  }

  delete(key: string) {
    localStorage.removeItem(this.namespace(key));
  }
}

export const cacheManager = new CacheManager();
