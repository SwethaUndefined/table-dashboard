import React, { useEffect, useState } from "react";
import axios from "axios";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import {
  Modal,
  Typography,
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import PreviewIcon from '@mui/icons-material/Preview';

const StyledTableCell = styled(TableCell)`
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const ProductModal = ({ open, onClose, product }) => {
  if (!product) return null;

  const reviews = product.reviews || [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="product-reviews"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="product-reviews" variant="h6" component="h2">
          Reviews for {product.title}
        </Typography>
        <Box>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    {review.comment} - Rating: {review.rating}
                  </Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No reviews available</Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const columns = React.useMemo(() => [
    { id: 'id', header: 'ID', accessorKey: 'id' },
    { id: 'title', header: 'Title', accessorKey: 'title' },
    { id: 'description', header: 'Description', accessorKey: 'description' },
    { id: 'category', header: 'Category', accessorKey: 'category' },
    { id: 'price', header: 'Price', accessorKey: 'price' },
    { id: 'discountPercentage', header: 'Discount', accessorKey: 'discountPercentage' },
    { id: 'rating', header: 'Rating', accessorKey: 'rating' },
    { id: 'stock', header: 'Stock', accessorKey: 'stock' },
    { id: 'tags', header: 'Tags', accessorKey: 'tags' },
    { id: 'brand', header: 'Brand', accessorKey: 'brand' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <PreviewIcon
          onClick={() => {
            setSelectedProduct(row.original);
            setModalOpen(true);
          }}
          style={{ display: "flex", justifyContent: "center", cursor: 'pointer' }}
        />
      ),
    },
  ], []);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h6" component="h1" gutterBottom>
        List of Products
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <StyledTableCell key={header.id}>
                    {header.column.columnDef.header}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <StyledTableCell key={cell.id}>
                    {cell.column.id === 'actions' ? (
                      <PreviewIcon
                        onClick={() => {
                          setSelectedProduct(row.original);
                          setModalOpen(true);
                        }}
                      />
                    ) : (
                      cell.getValue() || 'N/A'
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[4]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </Container>
  );
}

export default ProductsPage;
