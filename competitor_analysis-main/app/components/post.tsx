"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Heart, MessageCircle, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type PostProps = {
  content_type: string;
  post: {
    id: string;
    caption?: string;
    media_type: string;
    media_url: string;
    permalink: string;
    like_count?: number;
    comments_count?: number;
  };
  index: number;
};

const Content = ({ content_type, post, index }: PostProps) => {
  if(content_type === "ig_acc"){
      return <img
        src={post.media_url}
        alt={`Post ${index + 1}`}
        className="post-cover"/>
  }
  else if (content_type === "hashtag"){
    return post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM" ? (
      <img
        src={post.media_url}
        alt={`Post ${index + 1}`}
        className="post-cover"
      />
    ) : post.media_type === "VIDEO" ? (
      <video
        src={post.media_url}
        controls
        className="post-cover"
      />
    ) : null
  }
}

const Post = ({ content_type, post, index }: PostProps) => {
    // console.log(post)
  return (
    <Card className="post">
      <Content content_type={content_type} post={post} index={index}/>
      <CardContent>
        <CardDescription className="line-clamp-2 mt-3">
          {post.caption || "No caption"}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1">
            <Heart size={16} className="text-red-500" />
            {post.like_count ?? ""}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={16} />
            {post.comments_count ?? 0}
          </span>
        </div>
        <Button asChild>
          <Link href={post.permalink} target="_blank" rel="noopener noreferrer">
            View <MoveRight className="ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
