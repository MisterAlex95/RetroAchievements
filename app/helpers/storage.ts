import { config } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type pour stocker les données avec expiration
type CachedData<T> = {
  data: T;
  expiry: number;
};

// Fonction pour obtenir des éléments avec vérification d'expiration
export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) return null;

    const cached: CachedData<T> = JSON.parse(jsonValue);

    if (config.autoExpire || (cached.expiry && cached.expiry <= Date.now())) {
      await removeItem(key); // Supprimer l'élément expiré
      return null;
    }

    return cached.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// Fonction pour définir des éléments avec expiration
export const setItem = async <T>(key: string, value: T, ttl: number) => {
  const expiry = Date.now() + ttl;
  const cached: CachedData<T> = { data: value, expiry };
  try {
    const jsonValue = JSON.stringify(cached);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

// Fonction pour supprimer des éléments
export const removeItem = async (key: string) => {
  try {
    console.info(key + ' removed');
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
