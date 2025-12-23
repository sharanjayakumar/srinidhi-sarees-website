import { RequestHandler } from 'express';
import { getNeonClient } from '../db/neon';
import { PostResponse } from '@shared/api';

export const getPost: RequestHandler = async (req, res) => {
  const sql = getNeonClient();
  
  if (!sql) {
    res.status(503).json({ error: 'Database not available' });
    return;
  }

  try {
    const postId = parseInt(req.params.id, 10);
    
    if (isNaN(postId)) {
      res.status(400).json({ error: 'Invalid post ID' });
      return;
    }

    const result = await sql`SELECT * FROM posts WHERE id = ${postId}`;
    const post = result[0];
    
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const response: PostResponse = {
      id: post.id as number,
      title: post.title as string,
      content: post.content as string,
      created_at: post.created_at as string,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const listPosts: RequestHandler = async (_req, res) => {
  const sql = getNeonClient();
  
  if (!sql) {
    res.status(503).json({ error: 'Database not available' });
    return;
  }

  try {
    const result = await sql`SELECT * FROM posts ORDER BY created_at DESC LIMIT 100`;
    const posts = Array.isArray(result) ? result : [];
    
    const response: PostResponse[] = posts.map((post: any) => ({
      id: post.id as number,
      title: post.title as string,
      content: post.content as string,
      created_at: post.created_at as string,
    }));

    res.json(response);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};