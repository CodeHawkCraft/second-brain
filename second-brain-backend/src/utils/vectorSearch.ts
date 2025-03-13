import { ContentModel } from "../models/content";
import { createEmbedding } from "./createEmbedding";

export  async function searchVector(searchWord:string,path:'titleEmbeddings'|'descriptionEmbeddings') {
        const queryEmbedding = await createEmbedding(searchWord);

        const pipeline:any = [
            {
                $vectorSearch: {
                    index: "default",
                    queryVector: queryEmbedding,
                    path:path,
                    exact: true,
                    limit: 5,
                }
            },
            {
                $project: {
                    _id: 0,
                    createdAt:1,
                    description:1,
                    type:1,
                    title:1,
                    content:1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ];

        // run pipeline
        const result = await ContentModel.aggregate(pipeline);
        return result;
}
