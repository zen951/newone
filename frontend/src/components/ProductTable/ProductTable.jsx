/**
 * ProductTable Component
 * A reusable table component that displays product information with sorting, filtering, and CRUD operations.
 *
 * @param {Function} onEdit - Callback function triggered when edit button is clicked
 * @param {Function} onDelete - Callback function triggered when delete button is clicked
 * @param {number} refreshTrigger - Value that triggers a refresh of the product data when changed
 * @param {string} searchQuery - Search term to filter products by name
 * @param {string} categoryFilter - Category ID to filter products by category
 * @param {string} supplierFilter - Supplier ID to filter products by supplier
 */

import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./productTable.module.css";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

// Base URL for API requests
const API_BASE_URL = "http://localhost:3000";

export default function ProductTable({
  onEdit,
  onDelete,
  refreshTrigger = 0,
  searchQuery = "",
  categoryFilter = "",
  supplierFilter = "",
}) {
  // State management
  const [allProducts, setAllProducts] = useState([]); // Stores all products
  const [loading, setLoading] = useState(true); // Loading state indicator
  const [error, setError] = useState(null); // Error state for handling API errors
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sorting configuration
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const productsPerPage = 10; // Number of products to show per page

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, supplierFilter]);

  // Fetch all products data when component mounts or refreshTrigger changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/products");
        setAllProducts(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [refreshTrigger]);

  // Apply all filters and search to all products
  const filteredProducts = allProducts.filter((product) => {
    // Apply search filter
    const searchLower = searchQuery.toLowerCase();
    const nameMatches = product.name.toLowerCase().includes(searchLower);

    // Apply category filter
    const categoryMatches =
      !categoryFilter || product.category_id.toString() === categoryFilter;

    // Apply supplier filter
    const supplierMatches =
      !supplierFilter || product.supplier_id.toString() === supplierFilter;

    // Product must match all active filters
    return nameMatches && categoryMatches && supplierMatches;
  });

  // Sort filtered products if sort config is set
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key]; // Handle special cases for category and supplier names
    if (sortConfig.key === "category_name") {
      aValue = a.category_name;
      bValue = b.category_name;
    } else if (sortConfig.key === "supplier_name") {
      aValue = a.supplier_name;
      bValue = b.supplier_name;
    } else if (sortConfig.key === "price") {
      // Convert price strings to numbers for proper numerical sorting
      aValue = parseFloat(a.price) || 0;
      bValue = parseFloat(b.price) || 0;
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handles column sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Renders sort icons for table columns
   * @param {string} columnKey - The column key to render icons for
   * @returns {JSX.Element} Sort icons with appropriate styling
   */
  const getSortIcon = (columnKey) => (
    <span className={classes.sortIcons}>
      <HiArrowUp
        className={
          sortConfig.key === columnKey && sortConfig.direction === "asc"
            ? classes.activeIcon
            : classes.inactiveIcon
        }
      />
      <HiArrowDown
        className={
          sortConfig.key === columnKey && sortConfig.direction === "desc"
            ? classes.activeIcon
            : classes.inactiveIcon
        }
      />
    </span>
  );

  // Loading and error states
  if (loading)
    return <div className={classes.loading}>Loading products...</div>;
  if (error) return <div className={classes.error}>{error}</div>;

  // Main table render
  return (
    <div className={classes.tableContainer}>
      <table className={classes.productTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID {getSortIcon("id")}</th>
            <th>Image</th>
            <th
              className={classes.nameColumn}
              onClick={() => handleSort("name")}
            >
              Name {getSortIcon("name")}
            </th>
            <th onClick={() => handleSort("category_name")}>
              Category {getSortIcon("category_name")}
            </th>
            <th
              className={classes.supplierColumn}
              onClick={() => handleSort("supplier_name")}
            >
              Supplier {getSortIcon("supplier_name")}
            </th>
            <th onClick={() => handleSort("price")}>
              Price {getSortIcon("price")}
            </th>
            <th onClick={() => handleSort("unit_in_stock")}>
              Stock {getSortIcon("unit_in_stock")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td className={classes.idColumn}>{product.id}</td>
              <td>
                <div className={classes.productImage}>
                  {product.image ? (
                    <img
                      src={`${API_BASE_URL}${product.image}`}
                      alt={product.name}
                    />
                  ) : (
                    <div className={classes.noImage}>No Image</div>
                  )}
                </div>
              </td>
              <td className={classes.nameColumn}>{product.name}</td>
              <td>
                <span className={classes.categoryBadge}>
                  {product.category_name}
                </span>
              </td>
              <td className={classes.supplierColumn}>
                {product.supplier_name}
              </td>
              <td className={classes.price}>
                ₪
                {product.price && !isNaN(parseFloat(product.price))
                  ? parseFloat(product.price).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                    })
                  : "0.00"}
              </td>
              <td>
                <span
                  className={`${classes.stockBadge} ${
                    product.unit_in_stock <= 10
                      ? classes.lowStock
                      : product.unit_in_stock <= 20
                      ? classes.mediumStock
                      : classes.inStock
                  }`}
                >
                  {product.unit_in_stock <= 10
                    ? `${product.unit_in_stock} - Low Stock`
                    : product.unit_in_stock <= 20
                    ? `${product.unit_in_stock} - Medium`
                    : `${product.unit_in_stock} - In Stock`}
                </span>
              </td>
              <td className={classes.actions}>
                <button
                  className={classes.editButton}
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className={classes.deleteButton}
                  onClick={() => onDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className={classes.pagination}>
          <button
            className={classes.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className={classes.pageNumbers}>
            {[1, 2, 3, 4].map((pageNum) => (
              <button
                key={pageNum}
                className={`${classes.pageNumber} ${
                  currentPage === pageNum ? classes.activePage : ""
                }`}
                onClick={() => handlePageChange(pageNum)}
                disabled={pageNum > totalPages}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            className={classes.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {sortedProducts.length === 0 && (
        <div className={classes.noResults}>
          No products found matching your criteria
        </div>
      )}
    </div>
  );
}
