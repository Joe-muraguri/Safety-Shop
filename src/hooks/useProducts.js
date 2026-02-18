import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import fallbackProducts from "../data/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // If Supabase returns products use them, otherwise fall back to static file
      setProducts(data && data.length > 0 ? data : fallbackProducts);
    } catch (err) {
      console.error("Failed to fetch products from Supabase:", err.message);
      setError(err.message);
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }

  return { products, loading, error, refetch: fetchProducts };
}
