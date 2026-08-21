import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to fetch posts from Supabase:", err.message);
      setError(err.message);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  return { posts, loading, error, refetch: fetchPosts };
}

export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetchPost();
  }, [slug]);

  async function fetchPost() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      console.error("Failed to fetch post from Supabase:", err.message);
      setError(err.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  return { post, loading, error };
}
