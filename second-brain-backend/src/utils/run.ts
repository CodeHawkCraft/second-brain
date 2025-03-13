import { MongoClient } from 'mongodb';
import { pipeline } from '@xenova/transformers';
// connect to your Atlas deployment

// import { MongoClient } from 'mongodb';
const DB_CONNECTION_SECRET='mongodb+srv://davinderkumarcode:Abcxyz1210.1322@cluster0.ix1lz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// const DB_CONNECTION_SECRET = 'mongodb+srv://davinderkumarcode:vfvfdvdffdvdf@cluster0.ix1lz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(DB_CONNECTION_SECRET);

export async function getEmbedding(data:string) {
    try {
      console.log('data going to embedd si -----> ',data);
      
      const embedder = await pipeline(
        'feature-extraction', 
        'Xenova/nomic-embed-text-v1');
        
        const results = await embedder(data, { pooling: 'mean', normalize: true });
        return Array.from(results.data);
    } catch (error) {
        console.log('error in get embedding is ----> ',error);
        
    }
   
}



export  async function searchVector() {
  try {
    // Connect to the MongoDB client
    await client.connect();

    // Specify the database and collection
    const database = client.db("sample_db");
    const collection = database.collection("embeddings");

    // Generate embedding for the search query
    const queryEmbedding:any = await getEmbedding("ocean tragedy");
    console.log("Embedding shape:", queryEmbedding.length);
    // Define the sample vector search pipeline
    const pipeline = [
      {
        $vectorSearch: {
          index: "vector_index",
          queryVector: queryEmbedding,
          path: "embedding",
          exact: true,
          limit: 5,
        },
      },
      {
        $project: {
          _id: 0,
          text: 1,
          // score: {
          //     $meta: "vectorSearchScore"
          // }
        },
      },
    ];

    // run pipeline
    const result = collection.aggregate(pipeline);
    // console.log('result after pipline is------> ',result);

    // print results
    for await (const doc of result) {
      console.dir(JSON.stringify(doc), " doc is ----->");
    }
  } catch (err:any) {
    console.log(err.message, " error while searching vector");
  } finally {
    await client.close();
  }
}


