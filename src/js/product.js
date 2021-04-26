const length = 50;
const limit = 10;

async function loadProducts(page) {
  let { data: products } = await axios.get(
    `http://localhost:4000/products?_page=${page}&_limit=${limit}`
  );

  // Render products
  renderProducts(products, "product-wrapper-1");

  // Render pagination
  renderPagination(page);
}

function renderProducts(products, elementId) {
  const elementWrapper = document.getElementById(elementId);

  elementWrapper.innerHTML = products
    .map((product) => {
      // Stars
      let strStars = changeStars(product.star);

      return `<div class="san-pham card border-0 shadow-hover sanpham--unhover">
              <div class="san-pham-img-top"><img src="${
                product.img
              }" alt=""></div>
              <div class="card-body">
                <div class="san-pham__content text-left"><span>${parsePrice(
                  product.price
                )}Đ</span>
                  <h4>${product.title}</h4>
                  <div class="san-pham__content__stars">
                    <ul>
                      ${strStars}
                    </ul><span>(${product.reviews} Đánh giá)</span>
                  </div>
                  <p>${product.description}</p>
                </div>
                <div class="san-pham__btns"><a class="btn btn-yellow rounded-0 mr-2" href="">Mua ngay</a><a class="btn btn-black rounded-0" href="/product-detail.html?productId=${
                  product.id
                }">Xem chi tiết</a></div>
              </div>
            </div>`;
    })
    .join("");
}

// Phân trang
function renderPagination(currentPage) {
  let str = "";
  let pages = parseInt(length / limit);

  for (let i = 1; i <= pages; i++) {
    str += `<li class="page-item${
      i === currentPage ? " active" : ""
    }"><button class="page-link" onClick="loadProducts(${i})">${i}</button></li>`;
  }

  let pagination = document.getElementById("pagination");
  pagination.innerHTML = `<ul class="pagination justify-content-end pagination-custom">
    <li class="page-item${
      currentPage === 1 ? " disabled" : ""
    }"><button class="page-link" onClick="loadProducts(${
    currentPage - 1
  })">Trang trước</button></li>
    ${str}
    <li class="page-item${
      currentPage === pages ? " disabled" : ""
    }"><button class="page-link" onClick="loadProducts(${
    currentPage + 1
  })">Trang cuối</button></li>
  </ul>`;
}

window.addEventListener("DOMContentLoaded", (event) => {
  // loadProducts(1, 10);
  let currentPage = 1;

  loadProducts(currentPage);
});
