import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, ArrowLeft, ArrowRight, Loader, FileText, MessageCircle } from "lucide-react";
import SEO from "../components/SEO";
import { usePost } from "../hooks/usePosts";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center gap-3 text-gray-400">
        <Loader size={20} className="animate-spin" />
        <span className="text-sm">Loading article...</span>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <FileText size={36} className="text-gray-200 mb-3" />
        <p className="text-gray-500 font-semibold">Article not found</p>
        <p className="text-gray-400 text-sm mt-1 mb-6">This post may have been moved or unpublished.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-bold"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <SEO title={post.title} description={post.excerpt || post.title} page="blog" path={`/blog/${post.slug}`} />

      {/* Hero */}
      <section className="bg-blue-950 pt-24 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent" />

        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-xs font-semibold uppercase tracking-widest mb-6 transition-colors"
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <span className="mt-6 inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium">
            <Calendar size={14} />
            {formatDate(post.created_at)}
          </span>
        </div>
      </section>

      {/* Cover image */}
      {post.cover_image && (
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 -mt-10 relative z-10">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl border border-gray-200 shadow-xl"
          />
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div
          className="prose prose-blue max-w-none
            prose-headings:text-blue-950 prose-headings:font-extrabold
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-red-600 prose-a:font-semibold hover:prose-a:text-red-700
            prose-strong:text-blue-950
            prose-li:text-gray-600
            prose-img:rounded-xl prose-img:border prose-img:border-gray-200
            prose-blockquote:border-red-600 prose-blockquote:text-gray-500"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="bg-blue-950 py-14">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-white font-semibold text-center sm:text-left">
            Need certified safety equipment for your team?
          </p>
          <a
            href="https://wa.me/254701223920?text=Hi%20TelcoSafetyMart%2C%20I%20read%20your%20blog%20and%20I%27d%20like%20to%20enquire%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-red-900/30"
          >
            <MessageCircle size={16} /> Chat on WhatsApp <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
