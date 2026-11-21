
import { useMemo, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdminProducts,
  getDeletedProducts,
  createProduct,
  editProduct,
  softDeleteProduct,
  restoreProduct,
  permanentlyDeleteProduct,
} from "../../services/adminProductApi";

const initialFormData = {
  name: "",
  category: "",
  price: "",
  description: "",
  stock: "",
  image: "",
};

const productsPerPage = 8;

const categories = [
  "Exterior Upgrades",
  "Interior Upgrades",
  "Lighting",
  "Wheels & Tyres",
  "Performance Parts",
  "Car Care & Detailing",
  "Electronics & Accessories",
];

function getErrorMessage(error, fallback) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}

function AdminProducts() {
  const queryClient = useQueryClient();

  // Main states
  const [activeTab, setActiveTab] = useState("active");
  const [openDeleteMenuId, setOpenDeleteMenuId] = useState(null);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [imagePreviewError, setImagePreviewError] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch active products
  const {
    data: products = [],
    isLoading: isActiveLoading,
    isError: isActiveError,
    error: activeError,
  } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getAdminProducts,
  });

  // Fetch deleted products
  const {
    data: deletedProducts = [],
    isLoading: isDeletedLoading,
    isError: isDeletedError,
    error: deletedError,
  } = useQuery({
    queryKey: ["adminDeletedProducts"],
    queryFn: getDeletedProducts,
  });

  // Refresh product lists
  const refreshProducts = () => {
    queryClient.invalidateQueries({
      queryKey: ["adminProducts"],
    });

    queryClient.invalidateQueries({
      queryKey: ["adminDeletedProducts"],
    });
  };

  // Add product
  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: refreshProducts,
  });

  // Update product
  const updateProductMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: refreshProducts,
  });

  // Soft delete
  const softDeleteMutation = useMutation({
    mutationFn: softDeleteProduct,
    onSuccess: refreshProducts,
  });

  // Restore product
  const restoreMutation = useMutation({
    mutationFn: restoreProduct,
    onSuccess: refreshProducts,
  });

  // Permanent delete
  const permanentDeleteMutation = useMutation({
    mutationFn: permanentlyDeleteProduct,
    onSuccess: refreshProducts,
  });

  const isSaving =
    addProductMutation.isPending ||
    updateProductMutation.isPending ||
    softDeleteMutation.isPending ||
    restoreMutation.isPending ||
    permanentDeleteMutation.isPending;

  const mutationError =
    addProductMutation.error ||
    updateProductMutation.error ||
    softDeleteMutation.error ||
    restoreMutation.error ||
    permanentDeleteMutation.error;

  const isLoading =
    activeTab === "active" ? isActiveLoading : isDeletedLoading;

  const isError =
    activeTab === "active" ? isActiveError : isDeletedError;

  const currentError =
    activeTab === "active" ? activeError : deletedError;

  const error = isError
    ? getErrorMessage(currentError, "Failed to fetch products")
    : mutationError
      ? getErrorMessage(mutationError, "Product operation failed")
      : null;

  // Switch tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm("");
    setSelectedCategory("");
    setStockFilter("all");
    setShowForm(false);
    setEditingId(null);
    setOpenDeleteMenuId(null);
  };

  // Input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setImagePreviewError(false);
    }
  };

  // Add product form
  const handleAddClick = () => {
    setEditingId(null);
    setFormData(initialFormData);
    setImagePreviewError(false);

    addProductMutation.reset();
    updateProductMutation.reset();

    setShowForm(true);
  };

  // Edit product
  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      description: product.description || "",
      stock: product.stock ?? "",
      image: product.image || "",
    });

    setImagePreviewError(false);

    addProductMutation.reset();
    updateProductMutation.reset();

    setShowForm(true);
    setOpenDeleteMenuId(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      if (editingId !== null) {
        await updateProductMutation.mutateAsync({
          id: editingId,
          productData,
        });
      } else {
        await addProductMutation.mutateAsync(productData);
      }

      setFormData(initialFormData);
      setEditingId(null);
      setImagePreviewError(false);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialFormData);
    setImagePreviewError(false);
  };

  // Toggle delete menu
  const handleDeleteMenu = (id) => {
    setOpenDeleteMenuId((prev) => (prev === id ? null : id));
  };

  // Soft delete
  const handleSoftDelete = (id) => {
    setOpenDeleteMenuId(null);

    const confirmed = window.confirm(
      "Soft-delete this product? It will be hidden from the store and can be restored later."
    );

    if (confirmed) {
      softDeleteMutation.mutate(id);
    }
  };

  // Restore
  const handleRestore = (id) => {
    setOpenDeleteMenuId(null);

    const confirmed = window.confirm(
      "Are you sure you want to restore this product?"
    );

    if (confirmed) {
      restoreMutation.mutate(id);
    }
  };

  // Permanent delete
  const handlePermanentDelete = (id) => {
    setOpenDeleteMenuId(null);

    const confirmed = window.confirm(
      "Permanently delete this product? This action cannot be undone."
    );

    if (confirmed) {
      permanentDeleteMutation.mutate(id);
    }
  };

  // Current product list
  const displayedProducts =
    activeTab === "active" ? products : deletedProducts;

  // Search and filters
  const filteredProducts = useMemo(() => {
    return displayedProducts.filter((product) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "" ||
        product.category === selectedCategory;

      const matchesStock =
        activeTab === "deleted" ||
        stockFilter === "all" ||
        (stockFilter === "inStock" && Number(product.stock) > 0) ||
        (stockFilter === "outOfStock" && Number(product.stock) === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [
    displayedProducts,
    searchTerm,
    selectedCategory,
    stockFilter,
    activeTab,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safeCurrentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Filter handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleStockChange = (e) => {
    setStockFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setStockFilter("all");
    setCurrentPage(1);
  };

  // Reusable delete dropdown
  const DeleteDropdown = ({ product }) => (
    <div className="relative">
      <button
        onClick={() => handleDeleteMenu(product.id)}
        disabled={isSaving}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 px-3 py-2.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50 sm:w-auto"
      >
        Delete
        <span className="text-[10px]">
          {openDeleteMenuId === product.id ? "▲" : "▼"}
        </span>
      </button>

      {openDeleteMenuId === product.id && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-lg border border-[#383838] bg-[#1b1b1b] text-left shadow-xl">
          {activeTab === "active" && (
            <button
              onClick={() => handleSoftDelete(product.id)}
              disabled={isSaving}
              className="w-full px-4 py-3 text-left text-xs text-orange-400 transition hover:bg-orange-500/10 disabled:opacity-50"
            >
              Soft Delete
              <span className="mt-1 block text-[10px] text-gray-500">
                Move product to Recently Deleted
              </span>
            </button>
          )}

          <button
            onClick={() => handlePermanentDelete(product.id)}
            disabled={isSaving}
            className="w-full border-t border-[#333] px-4 py-3 text-left text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
          >
            Permanently Delete
            <span className="mt-1 block text-[10px] text-gray-500">
              This action cannot be undone
            </span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full min-w-0">

      {/* Page Header */}
      <div className="mb-6 flex min-w-0 flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Products Management
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage all products available in your ModGarage store.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
          <div className="rounded-lg border border-[#D6B36A]/30 bg-[#D6B36A]/10 px-4 py-3 sm:min-w-32">
            <p className="text-xs text-gray-400">Active Products</p>
            <p className="mt-1 text-xl font-bold text-[#D6B36A] sm:text-2xl">
              {products.length}
            </p>
          </div>

          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 sm:min-w-32">
            <p className="text-xs text-gray-400">Recently Deleted</p>
            <p className="mt-1 text-xl font-bold text-red-400 sm:text-2xl">
              {deletedProducts.length}
            </p>
          </div>

          {activeTab === "active" && (
            <button
              onClick={handleAddClick}
              className="col-span-2 rounded-lg bg-[#D6B36A] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#E8C982] sm:col-span-1"
            >
              + Add Product
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 break-words rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6 flex gap-5 overflow-x-auto border-b border-[#292929]">
        <button
          onClick={() => handleTabChange("active")}
          className={`shrink-0 border-b-2 px-2 py-3 text-sm font-semibold transition ${
            activeTab === "active"
              ? "border-[#D6B36A] text-[#D6B36A]"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Active Products ({products.length})
        </button>

        <button
          onClick={() => handleTabChange("deleted")}
          className={`shrink-0 border-b-2 px-2 py-3 text-sm font-semibold transition ${
            activeTab === "deleted"
              ? "border-red-400 text-red-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Recently Deleted ({deletedProducts.length})
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && activeTab === "active" && (
        <div className="mb-8 min-w-0 rounded-xl border border-[#292929] bg-[#111111] p-4 sm:p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">
            {editingId !== null ? "Edit Product" : "Add New Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-white outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-white outline-none focus:border-[#D6B36A]"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  required
                  className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-white outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                  className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-white outline-none focus:border-[#D6B36A]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="3"
                required
                className="w-full resize-y rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-white outline-none focus:border-[#D6B36A]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Product Image Path
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/products/product-name.jpg"
                required
                className="w-full rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-white outline-none focus:border-[#D6B36A]"
              />
              <p className="mt-2 text-xs text-gray-500">
                Enter an image path from your public folder or a valid image URL.
              </p>
            </div>

            {/* Image Preview */}
            <div>
              <p className="mb-3 text-sm font-medium text-gray-400">
                Image Preview
              </p>

              <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#444] bg-[#1a1a1a] p-4 sm:min-h-56">
                {formData.image.trim() && !imagePreviewError ? (
                  <img
                    key={formData.image}
                    src={formData.image}
                    alt="Product preview"
                    onError={() => setImagePreviewError(true)}
                    onLoad={() => setImagePreviewError(false)}
                    className="max-h-64 w-full rounded-lg object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-4xl text-gray-600">▧</p>
                    <p className="mt-3 text-sm text-gray-400">
                      {imagePreviewError
                        ? "Unable to load this image."
                        : "Your product image will appear here."}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                      {imagePreviewError
                        ? "Check the image path or URL."
                        : "Enter an image path above to preview it."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="submit"
                disabled={
                  isSaving ||
                  imagePreviewError ||
                  !formData.image.trim()
                }
                className="w-full rounded-lg bg-[#D6B36A] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#E8C982] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isSaving
                  ? "Saving..."
                  : editingId !== null
                    ? "Update Product"
                    : "Save Product"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="w-full rounded-lg border border-[#444] px-6 py-3 text-sm text-gray-300 transition hover:bg-[#222] sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6 min-w-0 rounded-xl border border-[#292929] bg-[#111111] p-4 sm:p-5">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Search & Filters
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search product name or category..."
            className="w-full min-w-0 rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none focus:border-[#D6B36A]"
          />

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full min-w-0 rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none focus:border-[#D6B36A]"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {activeTab === "active" && (
            <select
              value={stockFilter}
              onChange={handleStockChange}
              className="w-full min-w-0 rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none focus:border-[#D6B36A]"
            >
              <option value="all">All Stock</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-semibold text-[#D6B36A]">
              {filteredProducts.length}
            </span>{" "}
            of {displayedProducts.length} products
          </p>

          <button
            onClick={handleClearFilters}
            className="text-sm font-medium text-[#D6B36A] transition hover:text-[#E8C982]"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="min-w-0 overflow-visible rounded-xl border border-[#292929] bg-[#111111]">
        <div className="border-b border-[#292929] px-4 py-5 sm:px-6">
          <h2 className="text-lg font-semibold text-white">
            {activeTab === "active"
              ? "All Active Products"
              : "Recently Deleted Products"}
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            {activeTab === "active"
              ? "Manage products currently available in your store."
              : "Restore products or permanently remove them from your database."}
          </p>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-[#D6B36A]">
            Loading products...
          </div>
        ) : isError ? (
          <div className="py-16 text-center text-red-400">
            Unable to load products. Please try again.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="text-lg font-semibold text-gray-300">
              {activeTab === "active"
                ? "No products found"
                : "No recently deleted products"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {activeTab === "active"
                ? "Try changing your search or filters."
                : "Products you soft-delete will appear here."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="w-full table-fixed text-left">
                <thead className="border-b border-[#292929] bg-[#181818]">
                  <tr className="text-xs uppercase tracking-wider text-gray-400">
                    <th className="w-[32%] px-4 py-4">Product</th>
                    <th className="w-[22%] px-3 py-4">Category</th>
                    <th className="w-[14%] px-3 py-4">Price</th>
                    <th className="w-[10%] px-3 py-4">Stock</th>
                    <th className="w-[22%] px-3 py-4 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#292929]">
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-[#1a1a1a]"
                    >
                      <td className="px-4 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 shrink-0 rounded-lg border border-[#333] bg-[#202020] object-cover"
                          />

                          <div className="min-w-0">
                            <p className="break-words text-sm font-medium text-white">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <span className="inline-block break-words rounded-md bg-[#252525] px-2 py-1.5 text-xs text-gray-300">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-3 py-4 text-sm font-semibold text-[#D6B36A]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </td>

                      <td className="px-3 py-4 text-sm">
                        <span
                          className={
                            Number(product.stock) > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {product.stock}
                        </span>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          {activeTab === "active" && (
                            <button
                              onClick={() => handleEdit(product)}
                              disabled={isSaving}
                              className="rounded-lg border border-[#D6B36A]/30 px-3 py-2 text-xs font-medium text-[#D6B36A] transition hover:bg-[#D6B36A]/10 disabled:opacity-50"
                            >
                              Edit
                            </button>
                          )}

                          {activeTab === "deleted" && (
                            <button
                              onClick={() => handleRestore(product.id)}
                              disabled={isSaving}
                              className="rounded-lg border border-green-500/30 px-3 py-2 text-xs font-medium text-green-400 transition hover:bg-green-500/10 disabled:opacity-50"
                            >
                              Restore
                            </button>
                          )}

                          <DeleteDropdown product={product} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile and Tablet Product Cards */}
            <div className="grid grid-cols-1 gap-4 p-3 sm:grid-cols-2 sm:p-4 lg:hidden">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0 rounded-xl border border-[#303030] bg-[#171717] p-4 transition hover:border-[#D6B36A]/40"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 shrink-0 rounded-lg border border-[#333] bg-[#202020] object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold text-white sm:text-base">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        ID: {product.id}
                      </p>

                      <p className="mt-2 break-words text-xs text-gray-400">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 grid grid-cols-2 gap-3 rounded-lg bg-[#202020] p-3">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="mt-1 text-sm font-semibold text-[#D6B36A]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Stock</p>
                      <p
                        className={`mt-1 text-sm font-semibold ${
                          Number(product.stock) > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {product.stock}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    {activeTab === "active" && (
                      <button
                        onClick={() => handleEdit(product)}
                        disabled={isSaving}
                        className="w-full rounded-lg border border-[#D6B36A]/30 px-3 py-2.5 text-xs font-medium text-[#D6B36A] transition hover:bg-[#D6B36A]/10 disabled:opacity-50"
                      >
                        Edit Product
                      </button>
                    )}

                    {activeTab === "deleted" && (
                      <button
                        onClick={() => handleRestore(product.id)}
                        disabled={isSaving}
                        className="w-full rounded-lg border border-green-500/30 px-3 py-2.5 text-xs font-medium text-green-400 transition hover:bg-green-500/10 disabled:opacity-50"
                      >
                        Restore Product
                      </button>
                    )}

                    <DeleteDropdown product={product} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-[#292929] px-4 py-5 sm:flex-row sm:px-6">
              <p className="text-center text-xs text-gray-400 sm:text-left sm:text-sm">
                Showing {startIndex + 1}–
                {Math.min(
                  startIndex + productsPerPage,
                  filteredProducts.length
                )}{" "}
                of {filteredProducts.length} products
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={safeCurrentPage === 1}
                  className="rounded-lg border border-[#333] px-3 py-2 text-xs text-gray-300 transition hover:border-[#D6B36A] hover:text-[#D6B36A] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                      safeCurrentPage === index + 1
                        ? "bg-[#D6B36A] text-black"
                        : "border border-[#333] text-gray-300 hover:border-[#D6B36A]"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(totalPages, prev + 1)
                    )
                  }
                  disabled={safeCurrentPage >= totalPages}
                  className="rounded-lg border border-[#333] px-3 py-2 text-xs text-gray-300 transition hover:border-[#D6B36A] hover:text-[#D6B36A] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
