/**
 * Products component - Main product management page
 *
 * This component provides a complete interface for managing products, including:
 * - Viewing products in a table format
 * - Adding new products
 * - Editing existing products
 * - Deleting products
 * - Searching products
 * - Displaying toast notifications
 *
 * @returns {JSX.Element} Products page with product table and modal
 */

import { useState, useEffect } from "react";
import ProductTable from "../../components/ProductTable/ProductTable";
import ProductModal from "../../components/ProductModal/ProductModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Toast from "../../components/Toast/Toast";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";

import classes from "./products.module.css";

export default function Products() {
  // State for controlling the product modal visibility
  const [showProductModal, setShowProductModal] = useState(false);

  // State for storing the currently selected product for editing
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State to trigger table refresh after operations
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState("");

  // State for filters
  const [categoryFilter, setCategoryFilter] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // State for toast notifications
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // State for delete confirmation modal
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    productId: null,
  });

  /**
   * Displays a toast notification with the given message and type
   * @param {string} message - The message to display
   * @param {string} type - The type of toast (success/error)
   */
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // Hides the current toast notification
  const hideToast = () => {
    setToast({ show: false, message: "", type: "success" });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Opens the product modal in edit mode with the selected product
   * @param {Object} product - The product to edit
   */
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Opens the product modal in add mode
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  /**
   * Initiates the delete confirmation process for a product
   * @param {string} productId - The ID of the product to delete
   */
  const handleDeleteProduct = (productId) => {
    setDeleteConfirm({
      show: true,
      productId,
    });
  };

  /**
   * Handles the actual deletion of a product after confirmation
   * Makes an API call to delete the product and shows appropriate toast messages
   */
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/api/products/${deleteConfirm.productId}`);
      showToast("Product deleted successfully!");
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Failed to delete product. Please try again.", "error");
    } finally {
      setDeleteConfirm({ show: false, productId: null });
    }
  };

  /**
   * Handles the save operation result from the product modal
   * @param {boolean} success - Whether the save operation was successful
   * @param {string} message - The message to display in the toast
   */
  const handleSaveProduct = (success, message) => {
    if (success) {
      showToast(message);
      setRefreshTrigger((prev) => prev + 1);
    }
  };

  // Fetch categories and suppliers on component mount
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [categoriesRes, suppliersRes] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/suppliers"),
        ]);
        setCategories(categoriesRes.data);
        setSuppliers(suppliersRes.data);
      } catch (error) {
        console.error("Error fetching filters data:", error);
        showToast("Failed to load filters", "error");
      }
    };
    fetchFiltersData();
  }, []);

  return (
    <div className={classes.productsPage}>
      <main className={classes.mainContent}>
        {/* Header section with title and search functionality */}
        <div className={classes.productHeader}>
          <h1>Product Management</h1>
          <p>Manage your inventory with ease and precision</p>

          {/* Search and Add Product section */}
          <div className={classes.searchAndAdd}>
            <div className={classes.searchWrapper}>
              <HiOutlineSearch className={classes.searchIcon} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search product name..."
                className={classes.searchInput}
              />
            </div>
            <div className={classes.filterWrapper}>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={classes.filterSelect}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
                className={classes.filterSelect}
              >
                <option value="">All Suppliers</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
            <button className={classes.addButton} onClick={handleAddProduct}>
              Add New Product
            </button>
          </div>
        </div>

        {/* Main product table component */}
        <ProductTable
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          refreshTrigger={refreshTrigger}
          searchQuery={searchQuery}
          categoryFilter={categoryFilter}
          supplierFilter={supplierFilter}
        />
      </main>
      {/* Product Modal for adding/editing products */}
      {showProductModal && (
        <ProductModal
          isOpen={showProductModal}
          onClose={() => setShowProductModal(false)}
          product={selectedProduct}
          onSave={handleSaveProduct}
        />
      )}
      {/* Toast notification component */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, productId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}
