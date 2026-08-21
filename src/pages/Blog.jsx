import { Link } from "react-router-dom";
import { Calendar, ArrowRight, FileText, Loader } from "lucide-react";
import SEO from "../components/SEO";
import { usePosts } from "../hooks/usePosts";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 z-10 rounded-l-2xl" />

      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText size={32} className="text-gray-200" />
          </div>
        )}
      </div>

      <div className="pl-5 pr-4 pt-4 pb-5 flex flex-col flex-grow">
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-2">
          <Calendar size={12} />
          {formatDate(post.created_at)}
        </span>
        <h3 className="text-base font-bold text-blue-950 leading-snug line-clamp-2 mb-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-red-600 group-hover:gap-2.5 transition-all duration-200">
          Read More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  const { posts, loading, error } = usePosts();

  return (
    <div className="bg-white">
      <SEO
        title="Blog"
        description="Safety tips, PPE guides, and industry news from Teclo Safety Mart — Kenya's trusted supplier of certified safety equipment."
        page="blog"
      />

      {/* Hero */}
      <section className="bg-blue-950 pt-24 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 -left-10 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-6 h-px bg-red-500" />
            Safety Insights
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            The Teclo Safety <span className="text-red-500">Blog</span>
          </h1>
          <p className="mt-6 text-blue-300 text-lg max-w-2xl leading-relaxed">
            Practical PPE guides, compliance updates, and safety tips for Kenya's construction, manufacturing, and logistics teams.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
              <Loader size={20} className="animate-spin" />
              <span className="text-sm">Loading articles...</span>
            </div>
          ) : error || posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FileText size={36} className="text-gray-200 mb-3" />
              <p className="text-gray-500 font-semibold">No articles yet</p>
              <p className="text-gray-400 text-sm mt-1">Check back soon for safety tips and updates.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
