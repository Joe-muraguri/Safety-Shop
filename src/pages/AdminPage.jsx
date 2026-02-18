import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Shield, Plus, Pencil, Trash2, Eye, EyeOff, LogOut,
  Save, X, Package, CheckCircle, AlertCircle, Loader,
  ArrowUpDown, Image as ImageIcon, Tag, DollarSign, UploadCloud, Link,
} from "lucide-react";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "safetyke2026";

const emptyForm = {
  name: "",
  short_description: "",
  price: "",
  old_price: "",
  category: "",
  image: "",
  certified: false,
};

const categories = [
  "Head Protection",
  "Eye & Face Protection",
  "Reflective Vests",
  "Safety Gloves",
  "Respiratory Protection",
  "Safety Footwear",
  "Ear Protection",
  "Fall Protection",
  "First Aid",
  "Fire Safety",
];

// ── Tiny ProductCard preview ──────────────────────────────────────────
function MiniPreview({ form }) {
  const hasImage = form.image && form.image.startsWith("http");
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden w-52 flex-shrink-0">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 rounded-l-2xl z-10" />
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {hasImage ? (
          <img src={form.image} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={32} className="text-gray-300" />
          </div>
        )}
        {form.certified && (
          <span className="absolute top-2 right-2 bg-white/90 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
            <Shield size={9} /> Certified
          </span>
        )}
      </div>
      <div className="pl-4 pr-3 pt-3 pb-3">
        {form.category && (
          <span className="text-xs text-red-500 font-bold uppercase tracking-widest">
            {form.category}
          </span>
        )}
        <p className="text-sm font-bold text-blue-950 leading-snug line-clamp-2 mt-0.5">
          {form.name || "Product Name"}
        </p>
        {form.short_description && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{form.short_description}</p>
        )}
        <p className="text-base font-extrabold text-blue-950 mt-2">
          {form.price ? `KES ${Number(form.price).toLocaleString("en-KE")}` : "KES —"}
        </p>
        {form.old_price && (
          <p className="text-xs text-gray-400 line-through">
            KES {Number(form.old_price).toLocaleString("en-KE")}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Toast notification ────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all duration-300 ${
      toast.type === "success"
        ? "bg-green-600 text-white"
        : "bg-red-600 text-white"
    }`}>
      {toast.type === "success"
        ? <CheckCircle size={18} />
        : <AlertCircle size={18} />}
      {toast.message}
    </div>
  );
}

// ── Main Admin Component ──────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");

  // ── Auth ──────────────────────────────────────────────────────────
  useEffect(() => {
    const saved = sessionStorage.getItem("sk_admin");
    if (saved === "1") setAuthed(true);
  }, []);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("sk_admin", "1");
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("sk_admin");
    setAuthed(false);
    setPasswordInput("");
  };

  // ── Fetch ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (authed) fetchProducts();
  }, [authed]);

  async function fetchProducts() {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoadingProducts(false);
  }

  // ── Toast helper ──────────────────────────────────────────────────
  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  // ── Form handlers ─────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setForm({
      name: product.name || "",
      short_description: product.short_description || "",
      price: product.price || "",
      old_price: product.old_price || "",
      category: product.category || "",
      image: product.image || "",
      certified: product.certified || false,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // ── Image upload to Supabase Storage ─────────────────────────────
  const handleImageUpload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Please upload an image file.", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image must be under 5MB.", "error");
      return;
    }
    setUploadingImage(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage
      .from("product-image")
      .upload(fileName, file, { upsert: false });

    if (error) {
      showToast("Upload failed: " + error.message, "error");
      setUploadingImage(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("product-image")
      .getPublicUrl(data.path);

    setForm((prev) => ({ ...prev, image: urlData.publicUrl }));
    showToast("Image uploaded!");
    setUploadingImage(false);
  };

  // ── Save (create or update) ───────────────────────────────────────
  const handleSave = async () => {
    if (!form.name.trim() || !form.price) {
      showToast("Name and price are required.", "error");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      short_description: form.short_description.trim(),
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : null,
      category: form.category,
      image: form.image.trim(),
      certified: form.certified,
    };

    let error;
    if (editingId) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    setSaving(false);
    if (error) {
      showToast("Failed to save product.", "error");
    } else {
      showToast(editingId ? "Product updated!" : "Product added!");
      closeForm();
      fetchProducts();
    }
  };

  // ── Delete ────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    setDeletingId(id);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setDeletingId(null);
    if (error) {
      showToast("Failed to delete product.", "error");
    } else {
      showToast("Product deleted.");
      fetchProducts();
    }
  };

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Login screen ──────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="bg-blue-950 px-8 py-6 flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
              <Shield size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <p className="text-white font-bold text-lg">SafetyKE Admin</p>
            <p className="text-blue-400 text-xs">Product Management Dashboard</p>
          </div>
          <div className="px-8 py-8 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-blue-950 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {loginError && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle size={12} /> {loginError}
                </p>
              )}
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md shadow-red-100"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <Toast toast={toast} />

      {/* Header */}
      <header className="bg-blue-950 border-b border-blue-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Shield size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-bold text-sm">SafetyKE Admin</p>
            <p className="text-blue-400 text-xs">Product Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-blue-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Eye size={14} /> View Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-blue-300 hover:text-white text-xs font-medium border border-blue-800 hover:border-blue-600 px-3 py-1.5 rounded-lg transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Products", value: products.length, icon: Package },
            { label: "Certified", value: products.filter((p) => p.certified).length, icon: Shield },
            { label: "Categories", value: [...new Set(products.map((p) => p.category).filter(Boolean))].length, icon: Tag },
            { label: "With Discount", value: products.filter((p) => p.old_price).length, icon: DollarSign },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-blue-950 leading-none">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div className="relative w-full sm:w-72">
            <Package size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 placeholder-gray-400"
            />
          </div>
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-red-100 whitespace-nowrap"
          >
            <Plus size={17} /> Add Product
          </button>
        </div>

        {/* Product table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {loadingProducts ? (
            <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
              <Loader size={20} className="animate-spin" />
              <span className="text-sm">Loading products...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package size={36} className="text-gray-200 mb-3" />
              <p className="text-gray-500 font-semibold">No products found</p>
              <p className="text-gray-400 text-sm mt-1">Add your first product to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="text-left px-4 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Certified</th>
                    <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon size={16} className="text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-blue-950 line-clamp-1">{product.name}</p>
                            {product.short_description && (
                              <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{product.short_description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs bg-blue-50 text-blue-700 font-medium px-2.5 py-1 rounded-lg">
                          {product.category || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-bold text-blue-950">
                          KES {Number(product.price).toLocaleString("en-KE")}
                        </p>
                        {product.old_price && (
                          <p className="text-xs text-gray-400 line-through">
                            KES {Number(product.old_price).toLocaleString("en-KE")}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        {product.certified ? (
                          <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-lg border border-emerald-100">
                            <CheckCircle size={11} /> Yes
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">No</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditForm(product)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <Pencil size={13} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deletingId === product.id
                              ? <Loader size={13} className="animate-spin" />
                              : <Trash2 size={13} />}
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl">

            {/* Modal header */}
            <div className="bg-blue-950 px-6 py-5 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600/20 border border-red-500/30 rounded-lg flex items-center justify-center">
                  {editingId ? <Pencil size={14} className="text-red-400" /> : <Plus size={14} className="text-red-400" />}
                </div>
                <p className="text-white font-bold text-sm">
                  {editingId ? "Edit Product" : "Add New Product"}
                </p>
              </div>
              <button onClick={closeForm} className="text-blue-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col lg:flex-row gap-6">

              {/* Form fields */}
              <div className="flex-1 space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Safety Helmet Type 2"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                    Short Description
                  </label>
                  <textarea
                    name="short_description"
                    value={form.short_description}
                    onChange={handleFormChange}
                    rows={2}
                    placeholder="Brief product description..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 resize-none"
                  />
                </div>

                {/* Price + Old Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                      Price (KES) <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleFormChange}
                      placeholder="1500"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                      Old Price (KES)
                    </label>
                    <input
                      name="old_price"
                      type="number"
                      value={form.old_price}
                      onChange={handleFormChange}
                      placeholder="2000 (optional)"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 bg-white"
                  >
                    <option value="">Select a category...</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-1.5">
                    Product Image
                  </label>

                  {/* Drop zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      handleImageUpload(e.dataTransfer.files[0]);
                    }}
                    className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${
                      dragOver
                        ? "border-red-400 bg-red-50"
                        : form.image
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-gray-200 hover:border-red-300 hover:bg-red-50/30"
                    }`}
                  >
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2 py-2">
                        <Loader size={22} className="animate-spin text-red-500" />
                        <p className="text-xs text-gray-500 font-medium">Uploading...</p>
                      </div>
                    ) : form.image ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={form.image}
                          alt="preview"
                          className="w-14 h-14 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1 text-left">
                          <p className="text-xs font-semibold text-emerald-700">Image ready ✓</p>
                          <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[160px]">{form.image.split("/").pop()}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-1">
                        <UploadCloud size={24} className="text-gray-300" />
                        <p className="text-xs text-gray-500">
                          Drag & drop or{" "}
                          <label className="text-red-500 font-semibold cursor-pointer hover:text-red-600">
                            browse
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e.target.files[0])}
                            />
                          </label>
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
                      </div>
                    )}
                  </div>

                  {/* Manual URL fallback */}
                  <div className="mt-2 flex items-center gap-2">
                    <Link size={13} className="text-gray-400 flex-shrink-0" />
                    <input
                      name="image"
                      value={form.image}
                      onChange={handleFormChange}
                      placeholder="Or paste an image URL..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-xs text-blue-950 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Certified toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((prev) => ({ ...prev, certified: !prev.certified }))}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.certified ? "bg-emerald-500" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${form.certified ? "translate-x-5" : ""}`} />
                  </div>
                  <span className="text-sm font-semibold text-blue-950">
                    {form.certified ? "Certified ✓" : "Not Certified"}
                  </span>
                </label>
              </div>

              {/* Live preview */}
              <div className="lg:w-56 flex flex-col items-center gap-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider self-start lg:self-center">
                  Live Preview
                </p>
                <MiniPreview form={form} />
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 pb-6 flex items-center justify-end gap-3">
              <button
                onClick={closeForm}
                className="text-sm font-semibold text-gray-500 hover:text-gray-700 px-5 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-red-100"
              >
                {saving
                  ? <><Loader size={15} className="animate-spin" /> Saving...</>
                  : <><Save size={15} /> {editingId ? "Save Changes" : "Add Product"}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
