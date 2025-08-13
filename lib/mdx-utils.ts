import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MDXContent {
  content: string;
  frontmatter: {
    title?: string;
    description?: string;
    date?: string;
    [key: string]: any;
  };
}

export async function getMDXContent(filename: string): Promise<MDXContent> {
  const filePath = path.join(contentDirectory, filename);
  const source = fs.readFileSync(filePath, 'utf8');
  
  const { content, data } = matter(source);
  
  return {
    content,
    frontmatter: data,
  };
}

export async function getMDXContentList(): Promise<string[]> {
  const files = fs.readdirSync(contentDirectory);
  return files.filter(file => file.endsWith('.mdx'));
}

export async function compileMDXContent(content: string) {
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });
  
  return compiledContent;
}
