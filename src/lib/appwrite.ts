import { Client, Account, Databases, ID, Permission, Role } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'YOUR_APPWRITE_PROJECT_ID';
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'YOUR_APPWRITE_DATABASE_ID';

export const collections = {
  books: import.meta.env.VITE_APPWRITE_COLLECTION_BOOKS || 'books',
  chapters: import.meta.env.VITE_APPWRITE_COLLECTION_CHAPTERS || 'chapters',
  characters: import.meta.env.VITE_APPWRITE_COLLECTION_CHARACTERS || 'characters',
  loreBibles: import.meta.env.VITE_APPWRITE_COLLECTION_LORE_BIBLES || 'lore_bibles',
  profiles: import.meta.env.VITE_APPWRITE_COLLECTION_PROFILES || 'profiles',
} as const;

export const appwriteConfig = {
  endpoint,
  projectId,
  databaseId,
  collections,
};

export const client = new Client();
export const account = new Account(client);
export const databases = new Databases(client);

client.setEndpoint(endpoint).setProject(projectId);

export function userPermissions(userId: string) {
  return [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId)),
    Permission.delete(Role.user(userId)),
  ];
}

export { ID, Permission, Role };
