/**
 * ProductModal component - Modal for adding/editing products
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.product - Product to edit (null for new product)
 * @param {Function} props.onSave - Function to call after saving
 * @returns {JSX.Element} Product modal
 */

import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./productModal.module.css";
import Toast from "../Toast/Toast";

// Base URL for API requests
const API_BASE_URL = "http://localhost:3000";

// Initial state for the product form
const initialFormState = {
  name: "",
  image: "",
  description: "",
  price: "",
  unit_in_stock: "",
  supplier_id: "",
  category_id: "",
};

export default function ProductModal({ isOpen, onClose, product, onSave }) {
  // State management for form data and UI
  const [productForm, setProductForm] = useState(initialFormState);
  const [categoryList, setCategoryList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Toast notification state
  const [toastState, setToastState] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Image handling states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // Fetch categories and suppliers when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    (async () => {
      try {
        // Fetch categories and suppliers data
        const categoriesRes = await axios.get("/api/categories");
        const suppliersRes = await axios.get("/api/suppliers");
        setCategoryList(categoriesRes.data);
        setSupplierList(suppliersRes.data);

        // Initialize form with product data if in edit mode
        if (product) {
          setProductForm({
            ...initialFormState,
            ...product,
            unit_in_stock: product.unit_in_stock || "0",
          });
          setImagePreviewUrl(
            product.image ? `${API_BASE_URL}${product.image}` : ""
          );
        } else {
          // Reset form for new product
          setProductForm(initialFormState);
          setImagePreviewUrl("");
        }
      } catch {
        setFormError("Failed to load form data.");
      }
      setIsLoading(false);
    })();
  }, [isOpen, product]);

  // Handle form input changes
  const handleInputChange = (e) =>
    setProductForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));

  //Handles image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleImageDelete = () => {
    setImageFile(null);
    setImagePreviewUrl("");
    setProductForm((prev) => ({ ...prev, image: "" }));
  };

  // JSX for image preview
  const renderImagePreview = () => {
    if (imagePreviewUrl) {
      return (
        <div className={classes.imagePreviewContainer}>
          <img
            src={imagePreviewUrl}
            alt="Product preview"
            className={classes.imagePreview}
          />
          <button
            type="button"
            className={classes.deleteImageButton}
            onClick={handleImageDelete}
            title="Delete image"
          >
            ×
          </button>
        </div>
      );
    }
    return null;
  };

  /**
   * Shows toast notification
   * @param {string} message - Message to display
   * @param {string} type - Toast type (success/error)
   */
  const showToast = (message, type = "success") =>
    setToastState({ show: true, message, type });

  // Hides toast notification
  const hideToast = () =>
    setToastState({ show: false, message: "", type: "success" });

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !productForm.name ||
      !productForm.price ||
      !productForm.supplier_id ||
      !productForm.category_id
    )
      return setFormError("Please fill in all required fields.");

    setIsLoading(true);
    setFormError(null);

    // Handle image upload if new image is selected
    let imageUrl = productForm.image;
    if (imageFile) {
      const formDataFile = new FormData();
      formDataFile.append("image", imageFile);
      try {
        const uploadResponse = await axios.post("/api/upload", formDataFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadResponse.data.imageUrl;
      } catch {
        showToast("Invalid image format.", "error");
        setIsLoading(false);
        return;
      }
    }

    // Prepare product data for submission
    const productData = {
      ...productForm,
      image: imageUrl,
      price: parseFloat(productForm.price),
      unit_in_stock: parseInt(productForm.unit_in_stock) || 0,
      supplier_id: parseInt(productForm.supplier_id),
      category_id: parseInt(productForm.category_id),
    };

    // Submit product data
    try {
      await (product
        ? axios.put(`/api/products/${product.id}`, productData)
        : axios.post("/api/products", productData));
      onClose();
      onSave(true, `Product ${product ? "updated" : "added"} successfully!`);
    } catch {
      showToast("Failed to save product.", "error");
    }
    setIsLoading(false);
  };

  // Don't render if modal is closed
  if (!isOpen) return null;

  // Handles click on modal overlay to close modal
  const handleOverlayClick = (e) =>
    e.target.className === classes.modalOverlay && onClose();

  return (
    <div className={classes.modalOverlay} onClick={handleOverlayClick}>
      <div className={classes.modal}>
        <div className={classes.modalHeader}>
          <h2>{product ? "Edit Product" : "Add New Product"}</h2>
          <button className={classes.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        {formError && <div className={classes.error}>{formError}</div>}
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <div className={classes.formGroup}>
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productForm.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="image">Product Image</label>
            <div className={classes.imageUploadContainer}>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className={classes.fileInput}
              />
              {renderImagePreview()}
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={productForm.description}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={productForm.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="unit_in_stock">Stock Quantity</label>
              <input
                type="number"
                id="unit_in_stock"
                name="unit_in_stock"
                value={productForm.unit_in_stock}
                onChange={handleInputChange}
                min="0"
              />
            </div>
          </div>
          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <label htmlFor="category_id">Category *</label>
              <select
                id="category_id"
                name="category_id"
                value={productForm.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>
                  Select Category
                </option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="supplier_id">Supplier *</label>
              <select
                id="supplier_id"
                name="supplier_id"
                value={productForm.supplier_id}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>
                  Select Supplier
                </option>
                {supplierList.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={classes.formActions}>
            <button
              type="button"
              className={classes.cancelButton}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={classes.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
      {toastState.show && (
        <Toast
          message={toastState.message}
          type={toastState.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
