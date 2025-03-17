import { ContentModel } from "../models/content";
import { LinkModel } from "../models/link";
import ApiResponse from "../utils/apiReponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { format } from "date-fns";
import { getRandomHash } from "../utils/getRandomHash";
import mongoose from "mongoose";
import { createEmbedding } from "../utils/createEmbedding";
import { searchWithGemini } from "../utils/deepSearch";
export const createContent = asyncHandler(async (req: Request, res: Response) => {
  const {title,description}=req.body;
  const contentCreated = await ContentModel.create({
    ...req.body,
    userId: req.userId,
  });
  contentCreated.descriptionEmbeddings = await createEmbedding(description);
  contentCreated.titleEmbeddings = await createEmbedding(title);
  await contentCreated.save();
  const formattedContent={
   ...contentCreated.toObject(),
    createdAt: format(new Date(contentCreated.createdAt), "MM/dd/yyyy"),
  }
  res
    .status(201)
    .json(new ApiResponse(201, "Content created successfully", formattedContent));
});

export const getContent = asyncHandler(async (req: Request, res: Response) => {
  const {filterOptions,searchOption,searchWord,isDeepSearch}=req.params;
  const query:{
    userId:string,
    type?:string,
    title?:{},
    description?:{}
  }={
    userId:req.userId as string
  }
  if (filterOptions != "all") {
    query.type = filterOptions;
  }

  let output;
  const notNeededFields = {
    descriptionEmbeddings: 0,
    titleEmbeddings: 0,
    _id:0,
    userId:0,
    updatedAt:0
  };
  if (searchWord && searchOption) {
    if (isDeepSearch) {
      output=await ContentModel.find({userId:req.userId},{_id:0,userId:0,updatedAt:0,__v:0});
      output=await searchWithGemini(searchWord,output);
      console.log()
    } else {
      query[searchOption as "title" | "description"] = {
        $regex: searchWord,
        $options: "i",
      };
      output = await ContentModel.find(query,notNeededFields);
    }
  }
  else{
    output = await ContentModel.find(query,notNeededFields);
  }

  const formattedContent = output?.map((item:any) => ({
    ...(!isDeepSearch ? item.toObject() : item),
    createdAt: format(new Date(item.createdAt), "MM/dd/yyyy"),
  }));
  res
    .status(200)
    .json(new ApiResponse(200, "Content Fetched successfully", formattedContent));
});

export const deleteContent = asyncHandler(
  async (req: Request, res: Response) => {
    const {contentId} = req.params;
    await ContentModel.deleteOne({
      _id:(contentId),
      userId: req.userId,
    });

    res.status(200).json(new ApiResponse(201, "delete content successfully"));
  }
);

export const shareContent = asyncHandler(
  async (req: Request, res: Response) => {
    const { share } = req.body;
    if (share) {
      const link = await LinkModel.findOne({ userId: req.userId });
      if (link) {
        res.json({
          link: link.hash,
        });
        return;
      }
      const hash = getRandomHash(10);
      const createLink = await LinkModel.create({ userId: req.userId, hash });
      await createLink.save();
      res
        .status(200)
        .json(
          new ApiResponse(201, "Link created Successfully", { link: hash })
        );
    } else {
      await LinkModel.deleteOne({ userId: req.userId });
      res.status(200).json(new ApiResponse(201, "Link deleted Successfully"));
    }
  }
);

export const getSharableContent = asyncHandler(
  async (req: Request, res: Response) => {
    const shareLink = req.params.shareLink;
    const link = await LinkModel.findOne({ hash: shareLink });
    if (!link) {
      res.status(401).json(new ApiResponse(401, "Link not found"));
      return;
    }
    const content = await ContentModel.find({ userId: link.userId });
    res
      .status(401)
      .json(new ApiResponse(401, "Content fetched successfulyl", content));
  }
);
