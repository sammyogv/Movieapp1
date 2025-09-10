
import { Client, Databases, ID, Query } from "appwrite";
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject(PROJECT_ID); // Your project ID

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) =>{
    // using appwrite sdk to check if a search count document exists, if it does, increment the count by 1, if not create a new document with count 1
    try {
        const result = await databases.listDocuments(DATABASE_ID, TABLE_ID,[Query.equal('searchTerm', searchTerm)]);
        if (result.total > 0) {
            const doc = result.documents[0];
            await databases.updateDocument(DATABASE_ID, TABLE_ID, doc.$id, { count: doc.count + 1 });
        } else {
            await databases.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), { searchTerm, count: 1, movie_id: movie.id, poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`  });
        }

    } catch (error) {
        console.error("Error updating search count:", error);
    }
}

export const getTrendingMovies = async () => {
    // using appwrite sdk to get top 3 trending movies based on search count
    try {
        const result = await databases.listDocuments(DATABASE_ID, TABLE_ID, [Query.limit(3), Query.orderDesc('count')]);
        return result.documents;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return [];  
    }
}
