import { databases, appwriteConfig, client, userPermissions } from '@/lib/appwrite';
import { useAuthStore } from '@/stores/authStore';
import { ID } from 'appwrite';

/**
 * Run this in the browser console to test Appwrite connectivity:
 *   await window.__testAppwrite()
 */
export async function testAppwriteConnection(): Promise<{
  ping: boolean;
  auth: boolean;
  databaseRead: boolean;
  databaseWrite: boolean;
  errors: string[];
}> {
  const errors: string[] = [];
  let ping = false;
  let auth = false;
  let databaseRead = false;
  let databaseWrite = false;

  // 1. Ping
  try {
    await client.ping();
    ping = true;
    console.log('✅ Ping: OK');
  } catch (e: any) {
    errors.push(`Ping failed: ${e.message}`);
    console.error('❌ Ping failed:', e.message);
  }

  // 2. Auth
  const user = useAuthStore.getState().user;
  if (user) {
    auth = true;
    console.log('✅ Auth: Logged in as', user.email);
  } else {
    errors.push('Not logged in');
    console.error('❌ Auth: Not logged in');
  }

  // 3. Database read (list documents from books table)
  try {
    await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.books,
      []
    );
    databaseRead = true;
    console.log('✅ Database read: OK');
  } catch (e: any) {
    errors.push(`Database read failed: ${e.message}`);
    console.error('❌ Database read failed:', e.message);
  }

  // 4. Database write (create a test doc then delete it)
  if (user) {
    const testId = ID.unique();
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.books,
        testId,
        {
          userId: user.$id,
          title: '__test__',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        userPermissions(user.$id)
      );
      databaseWrite = true;
      console.log('✅ Database write: OK');

      // Cleanup
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.books,
        testId
      );
      console.log('🧹 Test doc cleaned up');
    } catch (e: any) {
      errors.push(`Database write failed: ${e.message}`);
      console.error('❌ Database write failed:', e.message);
    }
  }

  const result = { ping, auth, databaseRead, databaseWrite, errors };
  console.log('Appwrite Test Result:', result);
  return result;
}

// Expose to browser console for easy debugging
if (typeof window !== 'undefined') {
  (window as any).__testAppwrite = testAppwriteConnection;
}
