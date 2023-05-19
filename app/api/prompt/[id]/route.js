import {connectToDB} from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate('creator');

    if(!prompts) {
      return new Response('Prompt not found', {status: 404})
    }

    return new Response(JSON.stringify(prompts), {status: 200})
  } catch (e) {
    return new Response('Failed to fetch prompt', {status: 500})
  }
}

export const PATCH = async (request, {params}) => {
  try {
    const { prompt, tag } = await request.json();

    try {
      await connectToDB();
      const existingPrompts = await Prompt.findById(params.id).populate('creator');

      if(!existingPrompts) {
        return new Response('Prompt not found', {status: 404})
      }

      existingPrompts.prompt = prompt;
      existingPrompts.tag = tag;

      await existingPrompts.save();

      return new Response(JSON.stringify(existingPrompts), {status: 200})
    } catch (e) {
      return new Response('Failed to update prompt', {status: 500})
    }
  } catch (e) {
    return new Response('Failed to update prompt', {status: 500})
  }
}

export const DELETE = async (request, {param}) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(param.id).populate('creator');

    return new Response('Prompt deleted successfully', {status: 200})
  } catch (e) {
    return new Response('Failed to delete prompt', {status: 500})
  }
}