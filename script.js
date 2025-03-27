// API Token
// Buraya kendi API token'ınızı ekleyin
// Token'ı almak için: https://hyperteknoloji.com.tr adresine gidin ve üye girişi yapın
const API_TOKEN = ""; // Buraya kendi token'ınızı ekleyin

let currentPage = 1;
const productsPerPage = 40;
let totalProducts = 0;

function showLoading() {
  const loadingContainer = document.getElementById("loadingContainer");
  const productContainer = document.getElementById("productContainer");
  loadingContainer.style.display = "flex";
  productContainer.style.opacity = "0.5";
}

function hideLoading() {
  const loadingContainer = document.getElementById("loadingContainer");
  const productContainer = document.getElementById("productContainer");
  loadingContainer.style.display = "none";
  productContainer.style.opacity = "1";
}

async function apiCall(url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({}),
  });
  return response.json();
}

async function fetchTotalProducts() {
  showLoading();
  try {
    const data = await apiCall(
      "https://api.hyperteknoloji.com.tr/Products/List"
    );
    totalProducts = data.data.length;
    return totalProducts;
  } catch (error) {
    return 0;
  } finally {
    hideLoading();
  }
}

async function fetchProducts(page = 1) {
  showLoading();
  try {
    const data = await apiCall(
      `https://api.hyperteknoloji.com.tr/Products/List?page=${page}&pageSize=${productsPerPage}`
    );
    return data.data;
  } catch (error) {
    return [];
  } finally {
    hideLoading();
  }
}

function displayProducts(productsToShow = []) {
  const productContainer = document.getElementById("productContainer");
  const template = document.getElementById("productTemplate");
  productContainer.innerHTML = "";

  if (!Array.isArray(productsToShow) || productsToShow.length === 0) {
    productContainer.innerHTML = '<p class="no-products">Ürün bulunamadı</p>';
    return;
  }

  const defaultImageUrl =
    "https://via.placeholder.com/400x300?text=Ürün+Görseli";

  productsToShow.forEach((product) => {
    const clone = template.content.cloneNode(true);

    const image = clone.querySelector(".product-image");
    image.src = product.productData?.productMainImage || defaultImageUrl;
    image.alt = product.productName;
    image.onerror = () => (image.src = defaultImageUrl);

    clone.querySelector(".product-title").textContent = product.productName;

    const priceContainer = clone.querySelector(".product-price-container");
    const price = clone.querySelector(".product-price");
    price.textContent = Number(product.salePrice).toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });

    if (product.marketPrice > product.salePrice) {
      const originalPrice = clone.querySelector(".product-original-price");
      originalPrice.textContent = Number(product.marketPrice).toLocaleString(
        "tr-TR",
        {
          style: "currency",
          currency: "TRY",
        }
      );
    } else {
      priceContainer.removeChild(
        clone.querySelector(".product-original-price")
      );
    }

    const detailBtn = clone.querySelector(".detail-btn");
    detailBtn.href = product.productSlug;

    productContainer.appendChild(clone);
  });
}

function updatePagination() {
  const pageNumbers = document.getElementById("pageNumbers");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  const template = document.getElementById("pageNumberTemplate");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage * productsPerPage >= totalProducts;

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  pageNumbers.innerHTML = "";

  if (startPage > 1) {
    const firstPage = template.content
      .cloneNode(true)
      .querySelector(".page-number");
    firstPage.textContent = "1";
    firstPage.onclick = () => changePage(1);
    pageNumbers.appendChild(firstPage);

    if (startPage > 2) {
      const ellipsis = document.createElement("span");
      ellipsis.className = "page-number";
      ellipsis.textContent = "...";
      pageNumbers.appendChild(ellipsis);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = template.content
      .cloneNode(true)
      .querySelector(".page-number");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.onclick = () => changePage(i);
    pageNumbers.appendChild(pageButton);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const ellipsis = document.createElement("span");
      ellipsis.className = "page-number";
      ellipsis.textContent = "...";
      pageNumbers.appendChild(ellipsis);
    }

    const lastPage = template.content
      .cloneNode(true)
      .querySelector(".page-number");
    lastPage.textContent = totalPages;
    lastPage.onclick = () => changePage(totalPages);
    pageNumbers.appendChild(lastPage);
  }
}

async function changePage(page) {
  currentPage = page;
  const products = await fetchProducts(page);
  displayProducts(products);
  updatePagination();
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    changePage(currentPage - 1);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const maxPage = Math.ceil(totalProducts / productsPerPage);
  if (currentPage < maxPage) {
    changePage(currentPage + 1);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await fetchTotalProducts();
  await changePage(1);
});
